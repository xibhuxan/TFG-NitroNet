# 🚗 TFG-NitroNet

**NitroNet** es un sistema para gestión y monitoreo de coches nitro en tiempo real. Este repositorio contiene **el backend hecho con NestJS**, los distintos **frontend en React** para administradores y usuarios. También un **panel de visualización pública**, además de las configuraciones necesarias para el entorno de desarrollo.

---

## 📦 Tecnologías principales

- 🧠 **Backend:** NestJS
- 🎨 **Frontend:** React
- 🐬 **Base de datos:** MariaDB (local)
- 📚 **Documentación API:** Swagger

---

## 🚀 Puesta en marcha

### 1. Clona el proyecto

```bash
git clone https://github.com/xibhuxan/TFG-NitroNet.git
```
Entra en cada carpeta de back y front. Teniendo node instalado, realiza el siguiente comando en cada una. Se recomienda node lts 20 o 22.

```bash
npm install
```

Crea un archivo de variables de entorno `.env` completando el template suministrado.

Crear la base de datos (pendiente)

Ejecutar el servidor.

```bash
cd backend
npm run start:dev
```

Si necesitas conocer las apis entra en `http://localhost:3000/api
`.
