# Deployment Guide

This guide is focused on the course submission requirements for AgriSense Cloud.

## 1. Build the backend JAR files

From the project root:

```powershell
mvn clean install
```

Expected JAR locations:

- `config-server/target/config-server-1.0.0-SNAPSHOT.jar`
- `eureka-server/target/eureka-server-1.0.0-SNAPSHOT.jar`
- `api-gateway/target/api-gateway-1.0.0-SNAPSHOT.jar`
- `device-service/target/device-service-1.0.0-SNAPSHOT.jar`
- `sensor-data-service/target/sensor-data-service-1.0.0-SNAPSHOT.jar`
- `alert-service/target/alert-service-1.0.0-SNAPSHOT.jar`
- `media-service/target/media-service-1.0.0-SNAPSHOT.jar`

## 2. Build the React frontend

From `farm-dashboard/`:

```powershell
npm install
npm run build
```

For PM2 preview mode:

```powershell
npm run preview -- --host 0.0.0.0 --port 4173
```

## 3. PM2 process management

Create a `logs/` folder in the project root before starting PM2:

```powershell
New-Item -ItemType Directory -Force logs
```

Start all services:

```powershell
pm2 start ecosystem.config.js
```

Useful commands:

```powershell
pm2 status
pm2 logs
pm2 monit
pm2 restart all
pm2 save
pm2 startup
```

Course requirement note:
`pm2 monit` must be shown during the screen recording after SSHing into each VM.

## 4. Suggested local startup order

1. MySQL
2. MongoDB
3. `config-server`
4. `eureka-server`
5. `api-gateway`
6. `device-service`
7. `sensor-data-service`
8. `alert-service`
9. `media-service`
10. `farm-dashboard`

## 5. GCP mapping

These are the required resources from the guideline and how this project should map to them:

- `VM Instance Groups`: deploy backend services on instance groups instead of single fixed VMs
- `VM Instance Templates`: define the machine image and startup process
- `Disk Images`: capture your prepared VM image after setup
- `Health Checks`: attach to load balancers and instance groups
- `Load Balancing`: route public traffic to the platform
- `Cloud DNS`: map your public domain/subdomains
- `Cloud NAT Gateway` and `Cloud Router`: support outbound internet access from private instances
- `VPC Network` and `Firewall Rules`: expose only the ports you actually need
- `Cloud SQL`: host MySQL databases
- `MongoDB`: if self-managed, run it visibly on VMs; if managed externally, keep proof of integration
- `Cloud Storage`: use for media files in the final deployment version
- `Firestore`: the guideline lists this under visible GCP resources, so be prepared to show it in the console if your lecturer expects it

## 6. High availability expectations

The guideline says single-instance platform deployments lose marks. For the final deployment, aim for:

- multiple instances of `config-server`
- multiple instances of `eureka-server`
- multiple instances of `api-gateway`
- backend services deployed on scalable instance groups

## 7. Eureka dashboard

You must expose the Eureka dashboard publicly and put the URL in the main `README.md`.

Expected local URL:

```text
http://localhost:8761
```

For submission, replace that with the public deployed URL.

## 8. Final manual tasks before submission

- configure `media-service` to use Google Cloud Storage by setting `MEDIA_STORAGE_BUCKET`, `GCP_PROJECT_ID`, and `GOOGLE_APPLICATION_CREDENTIALS` on the deployment target
- build and test all services on a machine with Java, Maven, Node, npm, MySQL, and MongoDB installed
- create separate GitHub repositories for each service and the frontend
- create one final main repository containing them as Git submodules
- deploy all required infrastructure to GCP
- expose the public Eureka dashboard URL in `README.md`
- record the GCP console walkthrough and `pm2 monit` on the VMs

