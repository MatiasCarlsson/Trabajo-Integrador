// src/lib/db.ts
// Configuración y conexión a la base de datos MySQL

import mysql from 'mysql2/promise';

// Configuración de la conexión
const config = {
  host: import.meta.env.DB_HOST || 'localhost',
  port: parseInt(import.meta.env.DB_PORT || '3306'),
  user: import.meta.env.DB_USER || 'root',
  password: import.meta.env.DB_PASSWORD || '',
  database: import.meta.env.DB_NAME || 'omnilife_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Crear pool de conexiones (mejor rendimiento que conexiones individuales)
let pool: mysql.Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = mysql.createPool(config);
  }
  return pool;
}

// Función para ejecutar consultas
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const connection = await getPool().getConnection();
  try {
    const [rows] = await connection.execute(sql, params);
    return rows as T;
  } finally {
    connection.release();
  }
}

// Función para cerrar el pool (útil en desarrollo)
export async function closePool() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

// Tipos de datos
export interface Producto {
  id: number;
  nombre: string;
  puntos: number;
  precio: number;
  imagen_url: string;
  descripcion: string;
  created_at: Date;
  updated_at: Date;
}
