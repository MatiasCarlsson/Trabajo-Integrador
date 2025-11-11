# Base de Datos Omnilife

Este directorio contiene la estructura y datos de la base de datos MySQL para el sistema de productos Omnilife.

## 📁 Archivos

- **`schema.sql`** - Definición de tablas y estructura de la base de datos
- **`insert_productos.sql`** - Inserción de todos los productos desde el JSON
- **`queries.sql`** - Consultas SQL útiles y ejemplos

## 🚀 Instalación

### Requisitos previos

- MySQL 5.7+ o MariaDB 10.3+
- Cliente MySQL (mysql-cli, MySQL Workbench, phpMyAdmin, etc.)

### Pasos de instalación

#### Opción 1: Usando línea de comandos

```bash
# 1. Conectar a MySQL
mysql -u root -p

# 2. Ejecutar los scripts en orden
source database/schema.sql
source database/insert_productos.sql
```

#### Opción 2: Script único

```bash
# Ejecutar todo en un solo comando
mysql -u root -p < database/schema.sql
mysql -u root -p omnilife_db < database/insert_productos.sql
```

#### Opción 3: Usando MySQL Workbench

1. Abrir MySQL Workbench
2. Conectar a tu servidor MySQL
3. File → Open SQL Script → Seleccionar `schema.sql`
4. Ejecutar el script (⚡ Lightning icon)
5. Repetir con `insert_productos.sql`

## 📊 Estructura de la Base de Datos

### Tabla: `productos`

Almacena la información principal de cada producto.

| Campo         | Tipo          | Descripción                   |
| ------------- | ------------- | ----------------------------- |
| `id`          | INT           | ID único (auto-incremental)   |
| `nombre`      | VARCHAR(255)  | Nombre del producto           |
| `puntos`      | INT           | Puntos del producto           |
| `precio`      | DECIMAL(10,2) | Precio en pesos argentinos    |
| `imagen_url`  | TEXT          | URL de la imagen              |
| `descripcion` | TEXT          | Descripción del producto      |
| `created_at`  | TIMESTAMP     | Fecha de creación             |
| `updated_at`  | TIMESTAMP     | Fecha de última actualización |

### Tablas adicionales (preparadas para futuro)

- **`categorias`** - Categorías de productos
- **`producto_categoria`** - Relación N:N entre productos y categorías
- **`inventario`** - Control de stock

## 🔍 Consultas Comunes

```sql
-- Ver todos los productos
SELECT * FROM productos;

-- Buscar por nombre
SELECT * FROM productos WHERE nombre LIKE '%Omni%';

-- Productos por rango de precio
SELECT nombre, precio FROM productos
WHERE precio BETWEEN 20000 AND 40000;

-- Top 10 más caros
SELECT nombre, precio FROM productos
ORDER BY precio DESC LIMIT 10;
```

Más consultas disponibles en `queries.sql`

## 📝 Próximas Mejoras

- [ ] Implementar categorías de productos
- [ ] Sistema de inventario
- [ ] Tabla de clientes
- [ ] Sistema de pedidos/ventas
- [ ] Historial de precios
- [ ] Sistema de descuentos y promociones

## 🔐 Seguridad

⚠️ **Importante**: En producción:

- Cambiar las credenciales por defecto
- Crear usuarios con permisos específicos
- No usar el usuario `root`
- Implementar backups automáticos

```sql
-- Crear usuario específico para la aplicación
CREATE USER 'omnilife_app'@'localhost' IDENTIFIED BY 'contraseña_segura';
GRANT SELECT, INSERT, UPDATE, DELETE ON omnilife_db.* TO 'omnilife_app'@'localhost';
FLUSH PRIVILEGES;
```

## 🛠️ Mantenimiento

### Backup

```bash
# Crear backup
mysqldump -u root -p omnilife_db > backup_$(date +%Y%m%d).sql

# Restaurar backup
mysql -u root -p omnilife_db < backup_20250111.sql
```

### Verificar integridad

```sql
USE omnilife_db;
CHECK TABLE productos;
OPTIMIZE TABLE productos;
```

## 📞 Soporte

Para problemas o preguntas sobre la base de datos, contactar al equipo de desarrollo.
