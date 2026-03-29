module.exports = {
  apps: [
    {
      name: "config-server",
      script: "java",
      args: "-jar config-server/target/config-server-1.0.0-SNAPSHOT.jar",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "./logs/config-server-out.log",
      error_file: "./logs/config-server-error.log"
    },
    {
      name: "eureka-server",
      script: "java",
      args: "-jar eureka-server/target/eureka-server-1.0.0-SNAPSHOT.jar",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "./logs/eureka-server-out.log",
      error_file: "./logs/eureka-server-error.log"
    },
    {
      name: "api-gateway",
      script: "java",
      args: "-jar api-gateway/target/api-gateway-1.0.0-SNAPSHOT.jar",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "./logs/api-gateway-out.log",
      error_file: "./logs/api-gateway-error.log"
    },
    {
      name: "device-service",
      script: "java",
      args: "-jar device-service/target/device-service-1.0.0-SNAPSHOT.jar",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "./logs/device-service-out.log",
      error_file: "./logs/device-service-error.log"
    },
    {
      name: "sensor-data-service",
      script: "java",
      args: "-jar sensor-data-service/target/sensor-data-service-1.0.0-SNAPSHOT.jar",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "./logs/sensor-data-service-out.log",
      error_file: "./logs/sensor-data-service-error.log"
    },
    {
      name: "alert-service",
      script: "java",
      args: "-jar alert-service/target/alert-service-1.0.0-SNAPSHOT.jar",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "./logs/alert-service-out.log",
      error_file: "./logs/alert-service-error.log"
    },
    {
      name: "media-service",
      script: "java",
      args: "-jar media-service/target/media-service-1.0.0-SNAPSHOT.jar",
      cwd: ".",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "./logs/media-service-out.log",
      error_file: "./logs/media-service-error.log"
    },
    {
      name: "farm-dashboard",
      script: "npm",
      args: "run preview -- --host 0.0.0.0 --port 4173",
      cwd: "./farm-dashboard",
      autorestart: true,
      watch: false,
      max_restarts: 10,
      out_file: "../logs/farm-dashboard-out.log",
      error_file: "../logs/farm-dashboard-error.log"
    }
  ]
};
