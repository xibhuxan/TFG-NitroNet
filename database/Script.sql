CREATE DATABASE nitronet_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_520_ci;
USE nitronet_db;

CREATE TABLE escalas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	valor VARCHAR(10) NOT NULL, -- Ejemplo: "1:10", "1:8", etc.
	descripcion VARCHAR(100) -- Ejemplo: "Escala estándar para coches de competición"
);

CREATE TABLE coches (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50), 
	modelo VARCHAR(50),
	cc DECIMAL(5,2), -- Cilindrada en cm³
	id_escala INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (id_escala) REFERENCES escalas(id) ON DELETE SET NULL
);

CREATE TABLE usuarios (
	id INT AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(50) UNIQUE NOT NULL,
	password_hash VARCHAR(255) NOT NULL,
	nombre_uno VARCHAR(50),
	nombre_dos VARCHAR(50),
	apellido_uno VARCHAR(50),
	apellido_dos VARCHAR(50),
	id_coche INT, -- Solo tiene un coche
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (id_coche) REFERENCES coches(id) ON DELETE SET NULL
);

CREATE TABLE sensores (
	id INT AUTO_INCREMENT PRIMARY KEY,
	nombre VARCHAR(50),
	unidad VARCHAR(20), -- Ejemplo: °C, RPM, m/s²
	tipo VARCHAR(50), -- Ejemplo: temperatura, velocidad
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE coches_sensores (
	id_coche INT,
	id_sensor INT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	PRIMARY KEY (id_coche, id_sensor),
	FOREIGN KEY (id_coche) REFERENCES coches(id) ON DELETE CASCADE,
	FOREIGN KEY (id_sensor) REFERENCES sensores(id) ON DELETE CASCADE
);

CREATE TABLE lecturas (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_coche INT,
	id_sensor INT,
	valor FLOAT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (id_coche) REFERENCES coches(id) ON DELETE CASCADE,
	FOREIGN KEY (id_sensor) REFERENCES sensores(id) ON DELETE CASCADE
);

CREATE TABLE logins (
	id INT AUTO_INCREMENT PRIMARY KEY,
	id_usuario INT DEFAULT NULL,
	username VARCHAR(50),
	ip_address VARCHAR(45),
	success BOOLEAN DEFAULT TRUE,
	failure_reason VARCHAR(255) DEFAULT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

	FOREIGN KEY (id_usuario) REFERENCES usuarios(id) ON DELETE CASCADE
);

CREATE TABLE user_agent_logs (
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