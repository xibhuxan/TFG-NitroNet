# 🚗 TFG-NitroNet

**NitroNet** es un sistema para gestión y monitoreo de coches nitro en tiempo real. Este repositorio contiene **el backend hecho con NestJS**, los distintos **frontend en React** para administradores y usuarios. También un **panel de visualización pública**, además de las configuraciones necesarias para el entorno de desarrollo.

---

## 📦 Tecnologías principales

* 🧠 **Backend:** NestJS
* 🎨 **Frontend:** React
* 🐬 **Base de datos:** MariaDB (local)
* 📚 **Documentación API:** Swagger

---

## 🚀 Puesta en marcha

### 1. Clona el proyecto

```bash
git clone https://github.com/xibhuxan/TFG-NitroNet.git
```

Entra en cada carpeta de backend y frontend. Teniendo Node instalado (se recomienda la versión LTS 20 o 22), ejecuta:

```bash
npm install
```

Crea un archivo de variables de entorno `.env` completando el template suministrado.

Crear la base de datos (pendiente)

Ejecutar el servidor:

```bash
cd backend
npm run start:dev
```

Si necesitas conocer las APIs entra en `http://localhost:3000/api`

---

## ⚙️ Preparación del entorno

### Sistema operativo

El sistema está pensado para usarse en **Raspberry Pi OS** (64 bits con entorno de escritorio), aunque también es compatible con cualquier otra distribución Linux. Para comodidad y accesibilidad, se recomienda usar una imagen personalizada preconfigurada.

Si prefieres hacerlo manualmente:

1. Instala [Raspberry Pi Imager](https://www.raspberrypi.com/software/) en tu PC.
2. En sistemas Debian:

```bash
sudo apt install rpi-imager
```

3. Conecta tu SSD o tarjeta microSD por USB.
4. Usa Raspberry Pi OS (versión completa 64 bits) desde el Imager.
5. Configura usuario, contraseña y Wi-Fi (opcional).
6. Inserta el dispositivo en la Raspberry Pi y conecta periféricos.
7. Espera a que complete la configuración inicial.

### Base de datos MariaDB

```bash
sudo apt install mariadb-server -y
sudo systemctl start mariadb
sudo systemctl enable mariadb
sudo mysql_secure_installation
```

### NodeJS y Backend (NestJS)

Se recomienda usar **NVM** para gestionar versiones de NodeJS:

```bash
wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash
```

Reinicia la terminal y luego:

```bash
nvm install --lts=iron
nvm use lts/iron
```

Esto instalará la versión 20 LTS, compatible con todas las dependencias.

### Instalación del proyecto

```bash
git clone https://github.com/xibhuxan/TFG-NitroNet.git
cd TFG-NitroNet
cd backend && npm install
cd ../frontend && npm install
```

### Script de automatización

(Próximamente: script `.sh` para automatizar la instalación y configuración completa)

---

## 🎓 Requisitos recomendados (hardware)

* Raspberry Pi 5 (con carcasa Argon ONE V3 con soporte M.2)
* SSD M.2
* Monitor, teclado y ratón para la configuración inicial
* Conexión Wi-Fi o Ethernet

---

¡Listo! Ya tienes el sistema NitroNet preparado para gestionar coches nitro en tiempo real. 🚀
