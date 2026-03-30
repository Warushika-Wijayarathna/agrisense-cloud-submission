#!/usr/bin/env bash
set -euo pipefail

export DEBIAN_FRONTEND=noninteractive

PROJECT_ROOT="${PROJECT_ROOT:-/opt/agrisense-cloud-submission}"
REPO_URL="${REPO_URL:-https://github.com/Warushika-Wijayarathna/agrisense-cloud-submission.git}"
REPO_BRANCH="${REPO_BRANCH:-main}"
ENV_DIR="/etc/agrisense"
ENV_FILE="${ENV_DIR}/agrisense.env"
LOG_FILE="/var/log/agrisense-startup.log"

exec > >(tee -a "${LOG_FILE}") 2>&1

echo "[agrisense] startup script started at $(date -Iseconds)"

mkdir -p "${ENV_DIR}"

if [[ ! -f "${ENV_FILE}" ]]; then
  echo "[agrisense] missing ${ENV_FILE}; create it before using this startup script"
  exit 1
fi

# shellcheck disable=SC1090
source "${ENV_FILE}"

apt-get update
apt-get install -y openjdk-25-jdk maven git curl unzip ca-certificates gnupg

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
  apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  npm install -g pm2
fi

if ! command -v mongod >/dev/null 2>&1; then
  curl -fsSL https://pgp.mongodb.com/server-8.0.asc | \
    gpg --dearmor -o /usr/share/keyrings/mongodb-server-8.0.gpg
  echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" \
    > /etc/apt/sources.list.d/mongodb-org-8.0.list
  apt-get update
  apt-get install -y mongodb-org
  systemctl enable mongod
  systemctl restart mongod
fi

if [[ ! -x "${CLOUD_SQL_PROXY_BIN}" ]]; then
  curl -Lo "${CLOUD_SQL_PROXY_BIN}" \
    https://storage.googleapis.com/cloud-sql-connectors/cloud-sql-proxy/v2.18.3/cloud-sql-proxy.linux.amd64
  chmod +x "${CLOUD_SQL_PROXY_BIN}"
fi

install -m 0644 "${PROJECT_ROOT}/gcp/cloud-sql-proxy.service" /etc/systemd/system/cloud-sql-proxy.service || true

if [[ ! -d "${PROJECT_ROOT}/.git" ]]; then
  git clone --recurse-submodules --branch "${REPO_BRANCH}" "${REPO_URL}" "${PROJECT_ROOT}"
else
  git -C "${PROJECT_ROOT}" fetch origin
  git -C "${PROJECT_ROOT}" checkout "${REPO_BRANCH}"
  git -C "${PROJECT_ROOT}" pull --ff-only origin "${REPO_BRANCH}"
  git -C "${PROJECT_ROOT}" submodule sync --recursive
  git -C "${PROJECT_ROOT}" submodule update --init --recursive
fi

cd "${PROJECT_ROOT}"
cp ecosystem.config.js ecosystem.config.cjs
mkdir -p logs

systemctl daemon-reload
systemctl enable cloud-sql-proxy
systemctl restart cloud-sql-proxy

for service_dir in config-server eureka-server api-gateway device-service sensor-data-service alert-service media-service; do
  echo "[agrisense] building ${service_dir}"
  (cd "${PROJECT_ROOT}/${service_dir}" && mvn clean package -DskipTests)
done

echo "[agrisense] building farm-dashboard"
(cd "${PROJECT_ROOT}/farm-dashboard" && npm install && npm run build)

pm2 delete all || true
pm2 start ecosystem.config.cjs --only config-server
sleep 20
pm2 start ecosystem.config.cjs --only eureka-server
sleep 20
pm2 start ecosystem.config.cjs --only api-gateway
sleep 25
pm2 start ecosystem.config.cjs --only device-service
sleep 25
pm2 start ecosystem.config.cjs --only sensor-data-service
sleep 25
pm2 start ecosystem.config.cjs --only alert-service
sleep 25
pm2 start ecosystem.config.cjs --only media-service
sleep 25
pm2 start ecosystem.config.cjs --only farm-dashboard
sleep 15

pm2 save
pm2 startup systemd -u "$(whoami)" --hp "$HOME" || true

echo "[agrisense] startup script finished at $(date -Iseconds)"
