import requests
import cv2
import threading
import time
import json

# Configuración
ID_USUARIO = 1
SERVER_API = 'http://192.168.1.100:3000'
ESP32_IP = 'http://192.168.1.50'
STREAM_URL = f'{ESP32_IP}/stream'
DATA_URL = f'{ESP32_IP}/data'
INIT_URL = f'{SERVER_API}/auth/init/{ID_USUARIO}'
POST_URL = f'{SERVER_API}/sensors/reading'

# Almacenamiento en memoria
datos_iniciales = {}
sensor_map = {}

def obtener_datos_iniciales():
    global datos_iniciales, sensor_map
    try:
        res = requests.get(INIT_URL)
        res.raise_for_status()
        datos_iniciales = res.json()
        print("Datos iniciales obtenidos correctamente.")

        # Mapear tipo -> id_sensor_coche para envío de datos
        for sensor in datos_iniciales['sensores']:
            sensor_map[sensor['tipo']] = sensor['id_sensor_coche']
        print(f"Mapa de sensores: {sensor_map}")

    except Exception as e:
        print(f"Error al obtener datos iniciales: {e}")
        exit(1)

def recibir_y_enviar_datos():
    while True:
        try:
            res = requests.get(DATA_URL)
            res.raise_for_status()
            datos_sensores = res.json()

            for tipo, valor in datos_sensores.items():
                id_sensor = sensor_map.get(tipo)
                if id_sensor:
                    payload = {
                        "id_sensor_coche": id_sensor,
                        "valor": valor
                    }
                    requests.post(POST_URL, json=payload)
                    print(f"Enviado: {tipo}={valor}")

        except Exception as e:
            print(f"Error en datos sensores: {e}")

        time.sleep(1)

def mostrar_stream():
    cap = cv2.VideoCapture(STREAM_URL)
    if not cap.isOpened():
        print("No se pudo abrir el stream de video.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            continue

        # Mostrar datos sobre el vídeo
        y_offset = 30
        for sensor in datos_iniciales.get('sensores', []):
            tipo = sensor['tipo']
            valor = "..."
            try:
                res = requests.get(DATA_URL, timeout=0.5)
                if res.ok:
                    valor = res.json().get(tipo, "...")
            except:
                pass

            texto = f"{tipo.upper()}: {valor} {sensor['unidad']}"
            cv2.putText(frame, texto, (10, y_offset), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
            y_offset += 25

        cv2.imshow('NitroCam - Sensor HUD', frame)
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    obtener_datos_iniciales()

    hilo_datos = threading.Thread(target=recibir_y_enviar_datos, daemon=True)
    hilo_datos.start()

    mostrar_stream()

