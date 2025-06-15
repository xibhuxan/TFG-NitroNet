#include <Arduino.h>
#include <WiFi.h>
#include <esp_camera.h>
#include <ArduinoJson.h>
#include <AsyncTCP.h>
#include <ESPAsyncWebServer.h>

// ===== CONFIGURACIÓN WIFI =====
const char* ssid = "TU_SSID";
const char* password = "TU_PASS";

// ===== UART SERIAL CON ARDUINO =====
HardwareSerial ArduinoSerial(1); // UART1
#define RXD1 3  // GPIO3 (U0RXD)
#define TXD1 1  // GPIO1 (U0TXD)

// ===== JSON BUFFER DATOS SENSORES =====
String sensorData = "{}";  // Guarda el último JSON válido

// ===== WEBSERVER =====
AsyncWebServer server(80);

// ===== INICIALIZAR CÁMARA =====
void initCamera() {
  camera_config_t config;
  config.ledc_channel = LEDC_CHANNEL_0;
  config.ledc_timer = LEDC_TIMER_0;
  config.pin_d0 = 5;
  config.pin_d1 = 18;
  config.pin_d2 = 19;
  config.pin_d3 = 21;
  config.pin_d4 = 36;
  config.pin_d5 = 39;
  config.pin_d6 = 34;
  config.pin_d7 = 35;
  config.pin_xclk = 0;
  config.pin_pclk = 22;
  config.pin_vsync = 25;
  config.pin_href = 23;
  config.pin_sscb_sda = 26;
  config.pin_sscb_scl = 27;
  config.pin_pwdn = 32;
  config.pin_reset = -1;
  config.xclk_freq_hz = 20000000;
  config.pixel_format = PIXFORMAT_JPEG;

  if(psramFound()) {
    config.frame_size = FRAMESIZE_QVGA;
    config.jpeg_quality = 10;
    config.fb_count = 2;
  } else {
    config.frame_size = FRAMESIZE_QQVGA;
    config.jpeg_quality = 12;
    config.fb_count = 1;
  }

  esp_err_t err = esp_camera_init(&config);
  if (err != ESP_OK) {
    Serial.printf("Error inicializando cámara: 0x%x", err);
    return;
  }
}

// ===== STREAM DE CÁMARA MJPEG =====
void streamVideo(AsyncWebServerRequest *request) {
  AsyncWebServerResponse *response = request->beginChunkedResponse("multipart/x-mixed-replace; boundary=frame", [](uint8_t *buffer, size_t maxLen, size_t index) -> size_t {
    camera_fb_t *fb = esp_camera_fb_get();
    if (!fb) return 0;

    size_t len = snprintf((char*)buffer, maxLen,
                          "--frame\r\nContent-Type: image/jpeg\r\nContent-Length: %u\r\n\r\n",
                          fb->len);
    if (len + fb->len + 2 > maxLen) {
      esp_camera_fb_return(fb);
      return 0;
    }

    memcpy(buffer + len, fb->buf, fb->len);
    len += fb->len;
    buffer[len++] = '\r';
    buffer[len++] = '\n';

    esp_camera_fb_return(fb);
    return len;
  });
  request->send(response);
}

// ===== LECTURA UART DE ARDUINO =====
void readSerialFromArduino() {
  while (ArduinoSerial.available()) {
    String line = ArduinoSerial.readStringUntil('\n');
    line.trim();
    if (line.startsWith("{") && line.endsWith("}")) {
      sensorData = line;
    }
  }
}

// ===== SETUP PRINCIPAL =====
void setup() {
  Serial.begin(115200);
  ArduinoSerial.begin(9600, SERIAL_8N1, RXD1, TXD1);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi conectado. IP: " + WiFi.localIP().toString());

  initCamera();

  server.on("/data", HTTP_GET, [](AsyncWebServerRequest *request) {
    request->send(200, "application/json", sensorData);
  });

  server.on("/stream", HTTP_GET, streamVideo);

  server.begin();
}

// ===== LOOP =====
void loop() {
  readSerialFromArduino();
}

