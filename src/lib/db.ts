// src/lib/db.ts
// Configuración y conexión a la base de datos PostgreSQL (Supabase)

import { Pool } from 'pg';

// Configuración de la conexión para Supabase
const config = {
  connectionString: import.meta.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
};

// Crear pool de conexiones (mejor rendimiento que conexiones individuales)
let pool: InstanceType<typeof Pool> | null = null;

export function getPool() {
  if (!pool) {
    pool = new Pool(config);
  }
  return pool;
}

// Función para ejecutar consultas
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  const client = await getPool().connect();
  try {
    const result = await client.query(sql, params);
    return result.rows as T;
  } finally {
    client.release();
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
