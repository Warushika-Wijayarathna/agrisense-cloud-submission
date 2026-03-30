#include <WiFi.h>
#include <HTTPClient.h>

HardwareSerial mySerial(2);

const char* ssid = "SLT-Fiber-2.4G-0442";
const char* password = "ef1f718aa#";
const char* serverUrl = "http://34.124.221.108:8080/api/sensor-data";
const char* deviceId = "sensor-01";

const int dryValue = 4095;
const int wetValue = 300;

void setup() {
  Serial.begin(115200);
  mySerial.begin(9600, SERIAL_8N1, 16, -1);

  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

void loop() {
  if (mySerial.available()) {
    String data = mySerial.readStringUntil('\n');
    data.trim();

    Serial.println("Received: " + data);

    int first = data.indexOf(',');
    int second = data.indexOf(',', first + 1);

    if (first == -1 || second == -1) {
      Serial.println("Invalid serial format");
      return;
    }

    float temp = data.substring(0, first).toFloat();
    float hum = data.substring(first + 1, second).toFloat();
    int soilRaw = data.substring(second + 1).toInt();

    float soilPercent = mapSoilToPercent(soilRaw);

    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.print(" C | Humidity: ");
    Serial.print(hum);
    Serial.print(" % | Soil Raw: ");
    Serial.print(soilRaw);
    Serial.print(" | Soil Moisture: ");
    Serial.print(soilPercent);
    Serial.println(" %");

    sendToServer(temp, hum, soilPercent);
  }
}

float mapSoilToPercent(int rawValue) {
  float percent = ((float)(dryValue - rawValue) / (dryValue - wetValue)) * 100.0;

  if (percent < 0) percent = 0;
  if (percent > 100) percent = 100;

  return percent;
}

void sendToServer(float t, float h, float soilPercent) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;

    http.begin(serverUrl);
    http.addHeader("Content-Type", "application/json");

    String json = "{";
    json += "\"deviceId\":\"" + String(deviceId) + "\",";
    json += "\"temperature\":" + String(t, 2) + ",";
    json += "\"humidity\":" + String(h, 2) + ",";
    json += "\"soilMoisture\":" + String(soilPercent, 2);
    json += "}";

    int response = http.POST(json);

    Serial.print("HTTP Response: ");
    Serial.println(response);
    Serial.println(http.getString());

    http.end();
  } else {
    Serial.println("WiFi disconnected");
  }
}
