CREATE DATABASE IF NOT EXISTS nitronet_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
USE nitronet_db;

-- Escalas que pueden tener los coches (crear primero por dependencias)
CREATE TABLE IF NOT EXISTS escalas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    valor VARCHAR(10) NOT NULL, -- Ejemplo: "1:10", "1:8", etc.
    descripcion VARCHAR(100), -- Ejemplo: "Escala estándar para coches de competición"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Registro de coches
CREATE TABLE IF NOT EXISTS coches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL, 
    modelo VARCHAR(50),
    cc DECIMAL(5,2), -- Cilindrada en cm³
    id_escala INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_escala) REFERENCES escalas(id) ON DELETE SET NULL
);

-- Usuarios que usarán la plataforma
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nombre_uno VARCHAR(50) NOT NULL,
    nombre_dos VARCHAR(50),
    apellido_uno VARCHAR(50),
    apellido_dos VARCHAR(50),
    id_coche INT DEFAULT NULL, -- Solo tiene un coche
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_coche) REFERENCES coches(id) ON DELETE SET NULL
);

-- Roles disponibles, administradores y conductores
CREATE TABLE IF NOT EXISTS roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(20) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla para asignarle roles a los usuarios
CREATE TABLE IF NOT EXISTS usuarios_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT NOT NULL,
    id_rol INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (id_rol) REFERENCES roles(id) ON DELETE CASCADE,
    UNIQUE (id_usuario, id_rol) -- Para que no se repitan combinaciones
);

-- Tipos de sensores: estándar
CREATE TABLE IF NOT EXISTS sensores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL, -- Ej: "Temperatura"
    unidad VARCHAR(20) NOT NULL, -- Ej: °C
    tipo VARCHAR(50) NOT NULL,   -- Ej: "temperatura", "presión"
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Instancia de un sensor en un coche específico
CREATE TABLE IF NOT EXISTS sensores_coche (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_coche INT NOT NULL,
    id_sensor INT NOT NULL, -- referencia al tipo
    ubicacion VARCHAR(50),  -- opcional: motor, escape, rueda...
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_coche) REFERENCES coches(id) ON DELETE CASCADE,
    FOREIGN KEY (id_sensor) REFERENCES sensores(id) ON DELETE CASCADE
);

-- Lecturas del sensor en un coche
CREATE TABLE IF NOT EXISTS lecturas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_sensor_coche INT NOT NULL,
    valor FLOAT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_sensor_coche) REFERENCES sensores_coche(id) ON DELETE CASCADE
);

-- Registros de accesos
CREATE TABLE IF NOT EXISTS logins (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_usuario INT DEFAULT NULL,
    ip_address VARCHAR(45),
    success BOOLEAN DEFAULT TRUE,
    failure_reason VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Registro de navegadores utilizados en el acceso
CREATE TABLE IF NOT EXISTS user_agent_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_login INT NOT NULL,
    browser_name VARCHAR(50), 
    browser_version VARCHAR(20), 
    browser_major VARCHAR(10), 
    engine_name VARCHAR(50), 
    engine_version VARCHAR(20), 
    device_type VARCHAR(50),
    device_vendor VARCHAR(50),
    device_model VARCHAR(50), 
    os_name VARCHAR(50),
    os_version VARCHAR(20),
    user_agent_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_login) REFERENCES logins(id) ON DELETE CASCADE
);

-- Índices para mejorar las consultas
CREATE INDEX idx_sensores_coche_id_coche ON sensores_coche(id_coche);
CREATE INDEX idx_sensores_coche_id_sensor ON sensores_coche(id_sensor);
CREATE INDEX idx_usuarios_username ON usuarios(username);
CREATE INDEX idx_roles_tipo ON roles(tipo);
