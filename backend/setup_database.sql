-- Создание базы данных
CREATE DATABASE IF NOT EXISTS ORG;
USE ORG;

-- Таблица для пользователей (users)
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'user') NOT NULL DEFAULT 'user'
);

-- Таблица для устройств (devices)
CREATE TABLE devices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    model VARCHAR(255),
    description TEXT,
    image VARCHAR(255),
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('available', 'unavailable') NOT NULL DEFAULT 'available',
    client_name VARCHAR(255),
    client_phone VARCHAR(20)
);

-- Таблица для услуг (services)
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255),
    duration VARCHAR(50),
    category VARCHAR(100),
    is_available BOOLEAN NOT NULL DEFAULT TRUE,
    technician VARCHAR(255)
);
