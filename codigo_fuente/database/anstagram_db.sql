-- Script de Base de Datos para Anstagram
-- UTCV - 9° IDGS - Administración de Proyectos de TI
-- Autores: Diego Sanchez, Alberto Valerio, Joaquin Daniel Garcia

-- Crear base de datos si no existe
CREATE DATABASE IF NOT EXISTS anstagram_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE anstagram_db;

-- 1. Tabla de Usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    foto_perfil VARCHAR(255) DEFAULT 'default_profile.png',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabla de Publicaciones
CREATE TABLE IF NOT EXISTS publicaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Tabla de Likes (Megusta)
CREATE TABLE IF NOT EXISTS likes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    publicacion_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY usuario_publicacion_unique (usuario_id, publicacion_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabla de Comentarios
CREATE TABLE IF NOT EXISTS comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    publicacion_id INT NOT NULL,
    contenido TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (publicacion_id) REFERENCES publicaciones(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Tabla de Seguidores
CREATE TABLE IF NOT EXISTS seguidores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    seguidor_id INT NOT NULL,
    seguido_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY seguidor_seguido_unique (seguidor_id, seguido_id),
    FOREIGN KEY (seguidor_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (seguido_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 6. Tabla de Stories (Historias con expiración)
CREATE TABLE IF NOT EXISTS stories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NOT NULL,
    imagen_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expira_at TIMESTAMP NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Índices para optimizar consultas frecuentes
CREATE INDEX idx_publicaciones_usuario ON publicaciones(usuario_id);
CREATE INDEX idx_likes_publicacion ON likes(publicacion_id);
CREATE INDEX idx_comentarios_publicacion ON comentarios(publicacion_id);
CREATE INDEX idx_seguidores_seguido ON seguidores(seguido_id);
CREATE INDEX idx_stories_usuario ON stories(usuario_id);

-- Insertar Datos Semilla (Seed Data)
-- Contraseñas cifradas correspondientes a 'password123'
INSERT INTO usuarios (username, email, password_hash, bio, foto_perfil) VALUES
('diego_sanchez', 'diego@anstagram.com', '$2a$10$7Rz6/d9m17k6l0vU2iI8fOn9XfF7c8QfAHzuJ1mEqbJ6wS83r2R4y', 'Líder de Proyecto & Backend Dev de Anstagram. UTCV 9-IDGS.', 'diego_profile.png'),
('alberto_valerio', 'alberto@anstagram.com', '$2a$10$7Rz6/d9m17k6l0vU2iI8fOn9XfF7c8QfAHzuJ1mEqbJ6wS83r2R4y', 'Frontend Developer & Diseñador de Interfaces UI/UX.', 'alberto_profile.png'),
('joaquin_garcia', 'joaquin@anstagram.com', '$2a$10$7Rz6/d9m17k6l0vU2iI8fOn9XfF7c8QfAHzuJ1mEqbJ6wS83r2R4y', 'Administrador de Base de Datos y Especialista QA.', 'joaquin_profile.png');

INSERT INTO publicaciones (usuario_id, imagen_url, descripcion) VALUES
(1, 'uploads/post_diego_1.jpg', '¡Arrancando el proyecto de Administración de Proyectos de TI! #Anstagram #UTCV'),
(2, 'uploads/post_alberto_1.jpg', 'Diseñando la interfaz premium de Anstagram usando React y CSS puro. ¡Se ve genial! 🎨'),
(3, 'uploads/post_joaquin_1.jpg', 'Base de datos MySQL diseñada y optimizada con índices listos para producción.');

INSERT INTO likes (usuario_id, publicacion_id) VALUES
(1, 2),
(1, 3),
(2, 1),
(3, 1),
(3, 2);

INSERT INTO comentarios (usuario_id, publicacion_id, contenido) VALUES
(2, 1, '¡Excelente iniciativa, Diego! Vamos con todo.'),
(3, 1, 'Ya tengo listos los scripts de la base de datos para integrarlos al backend.'),
(1, 2, '¡Ese diseño está increíble, Alberto! Excelente combinación de colores.'),
(2, 3, 'Gran trabajo con la base de datos, Joaquín. Las relaciones e índices quedaron perfectos.');

INSERT INTO seguidores (seguidor_id, seguido_id) VALUES
(1, 2), -- Diego sigue a Alberto
(1, 3), -- Diego sigue a Joaquín
(2, 1), -- Alberto sigue a Diego
(3, 1), -- Joaquín sigue a Diego
(3, 2); -- Joaquín sigue a Alberto

INSERT INTO stories (usuario_id, imagen_url, expira_at) VALUES
(1, 'uploads/story_diego.jpg', DATE_ADD(NOW(), INTERVAL 1 DAY)),
(2, 'uploads/story_alberto.jpg', DATE_ADD(NOW(), INTERVAL 1 DAY)),
(3, 'uploads/story_joaquin.jpg', DATE_ADD(NOW(), INTERVAL 1 DAY));
