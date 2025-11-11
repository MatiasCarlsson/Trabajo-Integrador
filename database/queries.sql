-- ============================================
-- Consultas SQL Útiles
-- Base de Datos: omnilife_db
-- ============================================

USE omnilife_db;

-- ============================================
-- 1. CONSULTAS BÁSICAS
-- ============================================

-- Ver todos los productos
SELECT * FROM productos;

-- Contar total de productos
SELECT COUNT(*) as total FROM productos;

-- Ver productos con sus precios ordenados
SELECT id, nombre, precio, puntos 
FROM productos 
ORDER BY precio DESC;

-- ============================================
-- 2. CONSULTAS DE BÚSQUEDA
-- ============================================

-- Buscar producto por nombre (parcial)
SELECT * FROM productos 
WHERE nombre LIKE '%Omni%';

-- Productos dentro de un rango de precio
SELECT nombre, precio 
FROM productos 
WHERE precio BETWEEN 20000 AND 40000
ORDER BY precio;

-- Productos con menos de X puntos
SELECT nombre, puntos, precio 
FROM productos 
WHERE puntos <= 30
ORDER BY puntos;

-- ============================================
-- 3. CONSULTAS ESTADÍSTICAS
-- ============================================

-- Precio promedio, mínimo y máximo
SELECT 
    AVG(precio) as precio_promedio,
    MIN(precio) as precio_minimo,
    MAX(precio) as precio_maximo,
    AVG(puntos) as puntos_promedio
FROM productos;

-- Top 10 productos más caros
SELECT nombre, precio, puntos 
FROM productos 
ORDER BY precio DESC 
LIMIT 10;

-- Top 10 productos más económicos
SELECT nombre, precio, puntos 
FROM productos 
ORDER BY precio ASC 
LIMIT 10;

-- ============================================
-- 4. CONSULTAS DE ACTUALIZACIÓN
-- ============================================

-- Actualizar precio de un producto
-- UPDATE productos 
-- SET precio = 35000 
-- WHERE nombre = 'Agua Blum';

-- Actualizar descripción de un producto
-- UPDATE productos 
-- SET descripcion = 'Nueva descripción del producto'
-- WHERE id = 1;

-- Aplicar descuento del 10% a todos los productos
-- UPDATE productos 
-- SET precio = precio * 0.9;

-- ============================================
-- 5. CONSULTAS CON INVENTARIO (Futuro)
-- ============================================

-- Ver productos con su stock (cuando se implemente)
-- SELECT p.nombre, p.precio, i.stock 
-- FROM productos p
-- LEFT JOIN inventario i ON p.id = i.producto_id
-- ORDER BY i.stock ASC;

-- Productos con stock bajo (cuando se implemente)
-- SELECT p.nombre, i.stock, i.stock_minimo
-- FROM productos p
-- INNER JOIN inventario i ON p.id = i.producto_id
-- WHERE i.stock < i.stock_minimo;

-- ============================================
-- 6. CONSULTAS CON CATEGORÍAS (Futuro)
-- ============================================

-- Ver productos por categoría (cuando se implemente)
-- SELECT c.nombre as categoria, p.nombre as producto, p.precio
-- FROM productos p
-- INNER JOIN producto_categoria pc ON p.id = pc.producto_id
-- INNER JOIN categorias c ON pc.categoria_id = c.id
-- ORDER BY c.nombre, p.nombre;

-- Contar productos por categoría (cuando se implemente)
-- SELECT c.nombre, COUNT(pc.producto_id) as total_productos
-- FROM categorias c
-- LEFT JOIN producto_categoria pc ON c.id = pc.categoria_id
-- GROUP BY c.id, c.nombre;

-- ============================================
-- 7. ELIMINACIÓN (USAR CON PRECAUCIÓN)
-- ============================================

-- Eliminar un producto específico
-- DELETE FROM productos WHERE id = 1;

-- Eliminar productos por rango de precio
-- DELETE FROM productos WHERE precio < 1000;

-- TRUNCAR tabla (eliminar todos los datos pero mantener estructura)
-- TRUNCATE TABLE productos;
