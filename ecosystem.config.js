module.exports = {
  apps: [
    {
      name: "config-server",
      script: "java",
      args: [
        "-jar",
        "config-server/target/config-server-1.0.0-SNAPSHOT.jar"
      ],
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
      args: [
        "-Dspring.config.import=optional:configserver:http://localhost:8888",
        "-Deureka.client.service-url.defaultZone=http://localhost:8761/eureka",
        "-jar",
        "eureka-server/target/eureka-server-1.0.0-SNAPSHOT.jar"
      ],
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
      args: [
        "-Dspring.config.import=optional:configserver:http://localhost:8888",
        "-Deureka.client.service-url.defaultZone=http://localhost:8761/eureka",
        "-jar",
        "api-gateway/target/api-gateway-1.0.0-SNAPSHOT.jar"
      ],
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
      args: [
        "-Dspring.datasource.url=jdbc:mysql://127.0.0.1:3306/agrisense_device_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
        "-Dspring.datasource.username=agrisense_app",
        "-Dspring.datasource.password=AgriSense@2026",
        "-Dspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver",
        "-Dspring.jpa.hibernate.ddl-auto=update",
        "-Dspring.config.import=optional:configserver:http://localhost:8888",
        "-Deureka.client.service-url.defaultZone=http://localhost:8761/eureka",
        "-jar",
        "device-service/target/device-service-1.0.0-SNAPSHOT.jar"
      ],
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
      args: [
        "-Dspring.data.mongodb.uri=mongodb://localhost:27017/agrisense_sensor_db",
        "-Dspring.config.import=optional:configserver:http://localhost:8888",
        "-Deureka.client.service-url.defaultZone=http://localhost:8761/eureka",
        "-Dalert.integration.base-url=http://localhost:8083",
        "-jar",
        "sensor-data-service/target/sensor-data-service-1.0.0-SNAPSHOT.jar"
      ],
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
      args: [
        "-Dspring.datasource.url=jdbc:mysql://127.0.0.1:3306/agrisense_alert_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
        "-Dspring.datasource.username=agrisense_app",
        "-Dspring.datasource.password=AgriSense@2026",
        "-Dspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver",
        "-Dspring.jpa.hibernate.ddl-auto=update",
        "-Dspring.config.import=optional:configserver:http://localhost:8888",
        "-Deureka.client.service-url.defaultZone=http://localhost:8761/eureka",
        "-jar",
        "alert-service/target/alert-service-1.0.0-SNAPSHOT.jar"
      ],
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
      args: [
        "-Dspring.datasource.url=jdbc:mysql://127.0.0.1:3306/agrisense_media_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC",
        "-Dspring.datasource.username=agrisense_app",
        "-Dspring.datasource.password=AgriSense@2026",
        "-Dspring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver",
        "-Dspring.jpa.hibernate.ddl-auto=update",
        "-Dspring.config.import=optional:configserver:http://localhost:8888",
        "-Deureka.client.service-url.defaultZone=http://localhost:8761/eureka",
        "-Dmedia.storage.mode=gcs",
        "-Dmedia.storage.bucket=agrisense-media-warushika-2026",
        "-Dmedia.storage.public-base-url=https://storage.googleapis.com/agrisense-media-warushika-2026",
        "-Dmedia.storage.project-id=project-8b7500b1-855a-4cd2-8bf",
        "-jar",
        "media-service/target/media-service-1.0.0-SNAPSHOT.jar"
      ],
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


