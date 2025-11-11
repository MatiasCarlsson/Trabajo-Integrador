// src/services/productService.ts
// Servicio para manejar operaciones relacionadas con productos

import { query, type Producto } from '../lib/db';

/**
 * Obtener todos los productos
 */
export async function getAllProductos(): Promise<Producto[]> {
  return await query<Producto[]>('SELECT * FROM productos ORDER BY nombre ASC');
}

/**
 * Obtener un producto por ID
 */
export async function getProductoById(id: number): Promise<Producto | null> {
  const productos = await query<Producto[]>(
    'SELECT * FROM productos WHERE id = ?',
    [id]
  );
  return productos.length > 0 ? productos[0] : null;
}

/**
 * Obtener un producto por nombre (URL-friendly)
 */
export async function getProductoByNombre(
  nombre: string
): Promise<Producto | null> {
  // Decodificar el nombre de la URL y buscar
  const nombreDecodificado = decodeURIComponent(nombre.replace(/-/g, ' '));
  const productos = await query<Producto[]>(
    'SELECT * FROM productos WHERE LOWER(nombre) = LOWER(?)',
    [nombreDecodificado]
  );
  return productos.length > 0 ? productos[0] : null;
}

/**
 * Buscar productos por texto
 */
export async function searchProductos(searchTerm: string): Promise<Producto[]> {
  return await query<Producto[]>(
    'SELECT * FROM productos WHERE nombre LIKE ? OR descripcion LIKE ? ORDER BY nombre ASC',
    [`%${searchTerm}%`, `%${searchTerm}%`]
  );
}

/**
 * Obtener productos por rango de precio
 */
export async function getProductosByPrecio(
  min: number,
  max: number
): Promise<Producto[]> {
  return await query<Producto[]>(
    'SELECT * FROM productos WHERE precio BETWEEN ? AND ? ORDER BY precio ASC',
    [min, max]
  );
}

/**
 * Obtener productos destacados (los más caros o con más puntos)
 */
export async function getProductosDestacados(
  limit: number = 6
): Promise<Producto[]> {
  // LIMIT no acepta placeholders en MySQL2, usamos interpolación segura con parseInt
  const safeLimit = parseInt(limit.toString(), 10);
  return await query<Producto[]>(
    `SELECT * FROM productos ORDER BY puntos DESC, precio DESC LIMIT ${safeLimit}`
  );
}

/**
 * Obtener productos recientes
 */
export async function getProductosRecientes(
  limit: number = 10
): Promise<Producto[]> {
  // LIMIT no acepta placeholders en MySQL2, usamos interpolación segura con parseInt
  const safeLimit = parseInt(limit.toString(), 10);
  return await query<Producto[]>(
    `SELECT * FROM productos ORDER BY created_at DESC LIMIT ${safeLimit}`
  );
}

/**
 * Contar total de productos
 */
export async function countProductos(): Promise<number> {
  const result = await query<any[]>('SELECT COUNT(*) as total FROM productos');
  return result[0].total;
}

/**
 * Obtener estadísticas de productos
 */
export async function getProductosStats() {
  const result = await query<any[]>(`
    SELECT 
      COUNT(*) as total,
      MIN(precio) as precio_minimo,
      MAX(precio) as precio_maximo,
      AVG(precio) as precio_promedio,
      MIN(puntos) as puntos_minimo,
      MAX(puntos) as puntos_maximo,
      AVG(puntos) as puntos_promedio
    FROM productos
  `);
  return result[0];
}
