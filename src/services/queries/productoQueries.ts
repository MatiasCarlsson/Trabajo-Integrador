// src/services/queries/productoQueries.ts
// Consultas específicas para productos - Capa de datos (usando MySQL)

import type { Producto } from '@database/db';
import { query, queryOne } from '@database/db';

// Tipos de filtros
export interface FiltrosProducto {
  busqueda?: string;
  precioMin?: number;
  precioMax?: number;
  puntosMin?: number;
  puntosMax?: number;
  ordenarPor?: 'nombre' | 'precio' | 'puntos' | 'reciente';
  orden?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

/**
 * Obtener todos los productos con filtros opcionales
 */
export async function queryProductos(
  filtros: FiltrosProducto = {}
): Promise<Producto[]> {
  let sql =
    'SELECT id, nombre, puntos, precio, imagen_url, descripcion, created_at, updated_at FROM productos';
  const params: any[] = [];
  const conditions: string[] = [];

  // Filtro de búsqueda por nombre o descripción
  if (filtros.busqueda && filtros.busqueda.trim() !== '') {
    conditions.push('(nombre LIKE ? OR descripcion LIKE ?)');
    const termino = `%${filtros.busqueda.trim()}%`;
    params.push(termino, termino);
  }

  // Filtro de rango de precio
  if (filtros.precioMin !== undefined) {
    conditions.push('precio >= ?');
    params.push(filtros.precioMin);
  }
  if (filtros.precioMax !== undefined) {
    conditions.push('precio <= ?');
    params.push(filtros.precioMax);
  }

  // Filtro de rango de puntos
  if (filtros.puntosMin !== undefined) {
    conditions.push('puntos >= ?');
    params.push(filtros.puntosMin);
  }
  if (filtros.puntosMax !== undefined) {
    conditions.push('puntos <= ?');
    params.push(filtros.puntosMax);
  }

  // Agregar condiciones WHERE si existen
  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // Ordenamiento
  const orden = filtros.orden === 'desc' ? 'DESC' : 'ASC';
  switch (filtros.ordenarPor) {
    case 'precio':
      sql += ` ORDER BY precio ${orden}`;
      break;
    case 'puntos':
      sql += ` ORDER BY puntos ${orden}`;
      break;
    case 'reciente':
      sql += ` ORDER BY created_at ${orden}`;
      break;
    case 'nombre':
    default:
      sql += ` ORDER BY nombre ${orden}`;
      break;
  }

  // Paginación
  if (filtros.limit !== undefined) {
    sql += ' LIMIT ?';
    params.push(filtros.limit);
  }
  if (filtros.offset !== undefined) {
    sql += ' OFFSET ?';
    params.push(filtros.offset);
  }

  // Solo pasar params si hay parámetros
  return params.length > 0 
    ? await query<Producto>(sql, params)
    : await query<Producto>(sql);
}

/**
 * Obtener un producto por ID
 */
export async function queryProductoById(id: number): Promise<Producto | null> {
  const sql =
    'SELECT id, nombre, puntos, precio, imagen_url, descripcion, created_at, updated_at FROM productos WHERE id = ?';
  return await queryOne<Producto>(sql, [id]);
}

/**
 * Obtener un producto por nombre exacto (case-insensitive)
 */
export async function queryProductoByNombre(
  nombre: string
): Promise<Producto | null> {
  const sql =
    'SELECT id, nombre, puntos, precio, imagen_url, descripcion, created_at, updated_at FROM productos WHERE LOWER(nombre) = LOWER(?)';
  return await queryOne<Producto>(sql, [nombre]);
}

/**
 * Contar productos con filtros opcionales
 */
export async function queryCountProductos(
  filtros: FiltrosProducto = {}
): Promise<number> {
  let sql = 'SELECT COUNT(*) as total FROM productos';
  const params: any[] = [];
  const conditions: string[] = [];

  // Aplicar los mismos filtros que en queryProductos
  if (filtros.busqueda && filtros.busqueda.trim() !== '') {
    conditions.push('(nombre LIKE ? OR descripcion LIKE ?)');
    const termino = `%${filtros.busqueda.trim()}%`;
    params.push(termino, termino);
  }

  if (filtros.precioMin !== undefined) {
    conditions.push('precio >= ?');
    params.push(filtros.precioMin);
  }
  if (filtros.precioMax !== undefined) {
    conditions.push('precio <= ?');
    params.push(filtros.precioMax);
  }

  if (filtros.puntosMin !== undefined) {
    conditions.push('puntos >= ?');
    params.push(filtros.puntosMin);
  }
  if (filtros.puntosMax !== undefined) {
    conditions.push('puntos <= ?');
    params.push(filtros.puntosMax);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  // Solo pasar params si hay condiciones
  const result = params.length > 0 
    ? await queryOne<{ total: number }>(sql, params)
    : await queryOne<{ total: number }>(sql);
  return result ? result.total : 0;
}

/**
 * Obtener estadísticas de precio y puntos
 */
export async function queryProductosStats() {
  const sql = `
    SELECT 
      COUNT(*) as total,
      MIN(precio) as precio_minimo,
      MAX(precio) as precio_maximo,
      ROUND(AVG(precio)) as precio_promedio,
      MIN(puntos) as puntos_minimo,
      MAX(puntos) as puntos_maximo,
      ROUND(AVG(puntos)) as puntos_promedio
    FROM productos
  `;

  const result = await queryOne<{
    total: number;
    precio_minimo: number;
    precio_maximo: number;
    precio_promedio: number;
    puntos_minimo: number;
    puntos_maximo: number;
    puntos_promedio: number;
  }>(sql);

  return (
    result || {
      total: 0,
      precio_minimo: 0,
      precio_maximo: 0,
      precio_promedio: 0,
      puntos_minimo: 0,
      puntos_maximo: 0,
      puntos_promedio: 0,
    }
  );
}
