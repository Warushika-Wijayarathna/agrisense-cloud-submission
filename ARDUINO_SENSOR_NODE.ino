#include <DHT.h>

#define DHTPIN 2
#define DHTTYPE DHT22

DHT dht(DHTPIN, DHTTYPE);

int soilPin = A0;

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  float temp = dht.readTemperature();
  float hum = dht.readHumidity();
  int soil = analogRead(soilPin);

  if (isnan(temp) || isnan(hum)) {
    return;
  }

  Serial.print(temp);
  Serial.print(",");
  Serial.print(hum);
  Serial.print(",");
  Serial.println(soil);

  delay(2000);
}
