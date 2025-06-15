#include <Arduino.h>
#include <ArduinoJson.h>

// Pines de sensores (simulados, puedes ajustarlos)
const int TEMP_SENSOR_PIN = A0;
const int RPM_SENSOR_PIN = 2;
const int SPEED_SENSOR_PIN = A1;
const int VOLTAGE_SENSOR_PIN = A2;

// Variables auxiliares (puedes adaptar según los sensores reales)
volatile unsigned int rpmCount = 0;
unsigned long lastRPMMillis = 0;

// Simulación de lectura de temperatura
float readTemperature() {
  int raw = analogRead(TEMP_SENSOR_PIN);
  float voltage = raw * (5.0 / 1023.0);
  float temperatureC = (voltage - 0.5) * 100; // Ejemplo genérico
  return temperatureC;
}

// Simulación de lectura de velocidad (e.g., sensor hall, potenciómetro)
float readSpeed() {
  int raw = analogRead(SPEED_SENSOR_PIN);
  return map(raw, 0, 1023, 0, 100); // km/h (simulado)
}

// Lectura de voltaje de batería
float readVoltage() {
  int raw = analogRead(VOLTAGE_SENSOR_PIN);
  float voltage = raw * (5.0 / 1023.0) * 2; // Suponiendo divisor de voltaje
  return voltage;
}

// Interrupción para contar RPM
void countRPM() {
  rpmCount++;
}

// Cálculo de RPM basado en interrupciones
int readRPM() {
  unsigned long now = millis();
  unsigned long elapsed = now - lastRPMMillis;
  lastRPMMillis = now;

  noInterrupts();
  unsigned int count = rpmCount;
  rpmCount = 0;
  interrupts();

  float rpm = (count * 60000.0) / elapsed; // suponiendo una señal por vuelta
  return rpm;
}

// Enviar datos como JSON por puerto serie
void sendSensorData() {
  StaticJsonDocument<256> doc;

  doc["temperature"] = readTemperature();
  doc["rpm"] = readRPM();
  doc["speed"] = readSpeed();
  doc["voltage"] = readVoltage();

  serializeJson(doc, Serial);
  Serial.println(); // para delimitar la lectura
}

void setup() {
  Serial.begin(115200);

  pinMode(RPM_SENSOR_PIN, INPUT);
  attachInterrupt(digitalPinToInterrupt(RPM_SENSOR_PIN), countRPM, RISING);

  lastRPMMillis = millis();
}

void loop() {
  sendSensorData();
  delay(200);
}

