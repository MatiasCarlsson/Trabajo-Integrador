// database/db.ts
// Configuración de conexión a MySQL

import mysql from 'mysql2/promise';
import { config } from 'dotenv';

// Cargar variables de entorno desde el archivo .env
config();

// Pool de conexiones: reutiliza conexiones en lugar de crear una nueva cada vez
export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306'),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'omnilife_db',
  connectionLimit: 1, // Máximo 1 conexión simultánea
});

/**
 * Ejecuta una consulta SQL que devuelve múltiples filas
 *
 * @template T - El tipo de dato que esperas recibir (ej: Producto, Usuario, etc.)
 * @param sql - La consulta SQL a ejecutar (ej: "SELECT * FROM productos WHERE precio > ?")
 * @param params - Array de parámetros para reemplazar los ? en la consulta (opcional)
 * @returns Promise con un array de resultados del tipo T
 *
 * Ejemplo de uso:
 * const productos = await query<Producto>('SELECT * FROM productos WHERE precio > ?', [1000]);
 * // productos será de tipo Producto[]
 */
export async function query<T>(sql: string, params?: any[]): Promise<T[]> {
  const [rows] = await pool.query(sql, params || []);
  return rows as T[];
}

/**
 * Ejecuta una consulta SQL que devuelve UNA SOLA fila (o null si no encuentra nada)
 *
 * @template T - El tipo de dato que esperas recibir
 * @param sql - La consulta SQL a ejecutar
 * @param params - Array de parámetros para reemplazar los ? en la consulta (opcional)
 * @returns Promise con un objeto del tipo T, o null si no se encontró nada
 *
 * Ejemplo de uso:
 * const producto = await queryOne<Producto>('SELECT * FROM productos WHERE id = ?', [1]);
 * // producto será de tipo Producto | null
 */
export async function queryOne<T>(
  sql: string,
  params?: any[]
): Promise<T | null> {
  const results = await query<T>(sql, params);
  return results[0] || null;
}

// TIPOS DE DATOS

/**
 * Interfaz que representa un producto de la base de datos
 */
export interface Producto {
  id: number;
  nombre: string;
  puntos: number;
  precio: number;
  imagen_url: string;
  descripcion: string;
  created_at?: Date;
  updated_at?: Date;
}
