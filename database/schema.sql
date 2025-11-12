-- ============================================
-- Base de Datos para Productos Omnilife
-- MySQL Database Schema
-- ============================================

-- Eliminar base de datos si existe (usar con cuidado)
-- DROP DATABASE IF EXISTS omnilife_db;

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS omnilife_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE omnilife_db;

-- ============================================
-- Tabla: productos
-- ============================================
CREATE TABLE productos (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    puntos INT NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    imagen_url TEXT,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_nombre (nombre),
    INDEX idx_precio (precio),
    INDEX idx_puntos (puntos)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: categorias (preparada para futuro)
-- ============================================
CREATE TABLE categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: producto_categoria (relación N:N)
-- ============================================
CREATE TABLE producto_categoria (
    producto_id INT NOT NULL,
    categoria_id INT NOT NULL,
    PRIMARY KEY (producto_id, categoria_id),
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE,
    FOREIGN KEY (categoria_id) REFERENCES categorias(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- Tabla: inventario (preparada para futuro)
-- ============================================
CREATE TABLE inventario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    producto_id INT UNIQUE NOT NULL,
    stock INT DEFAULT 0,
    stock_minimo INT DEFAULT 5,
    FOREIGN KEY (producto_id) REFERENCES productos(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
