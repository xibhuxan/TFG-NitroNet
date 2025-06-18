#include <Arduino.h>
#include <Wire.h>
#include <ArduinoJson.h>

#include <MPU6050.h>
#include <Adafruit_MLX90614.h>
#include <Adafruit_INA219.h>

#define HALL_SENSOR_PIN 2

volatile unsigned int rpmCount = 0;
unsigned long lastRPMMillis = 0;

MPU6050 mpu;
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
Adafruit_INA219 ina219;

void countRPM() {
  rpmCount++;
}

float readTemperature() {
  return mlx.readObjectTempC();
}

float readAcceleration() {
  int16_t ax, ay, az;
  mpu.getAcceleration(&ax, &ay, &az);
  return sqrt(ax * ax + ay * ay + az * az) / 16384.0;
}

float readVoltage() {
  return ina219.getBusVoltage_V();
}

float readCurrent() {
  return ina219.getCurrent_mA();
}

int readRPM() {
  unsigned long now = millis();
  unsigned long elapsed = now - lastRPMMillis;
  if (elapsed == 0) return 0; // Evitar división por cero
  
  lastRPMMillis = now;

  noInterrupts();
  unsigned int count = rpmCount;
  rpmCount = 0;
  interrupts();

  float rpm = (count * 60000.0) / elapsed;
  return (int)rpm;
}

void sendSensorData() {
  StaticJsonDocument<200> doc;

  doc["temperature"] = readTemperature();
  doc["acceleration"] = readAcceleration();
  doc["voltage"] = readVoltage();
  doc["current"] = readCurrent();
  doc["rpm"] = readRPM();

  serializeJson(doc, Serial);
  Serial.println();
}

void setup() {
  Serial.begin(115200);
  Wire.begin();

  pinMode(HALL_SENSOR_PIN, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(HALL_SENSOR_PIN), countRPM, RISING);

  lastRPMMillis = millis();

  mpu.initialize();
  if (!mpu.testConnection()) {
    Serial.println("MPU6050 connection failed");
  }
  
  if (!mlx.begin()) {
    Serial.println("MLX90614 not found");
    while(1);
  }
  
  if (!ina219.begin()) {
    Serial.println("INA219 not found");
    while(1);
  }
}

void loop() {
  sendSensorData();
  delay(200);
}