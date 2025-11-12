// src/lib/db.ts
// Configuración y conexión a Supabase

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Faltan variables de entorno: PUBLIC_SUPABASE_URL o PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseKey);

// Función helper para ejecutar consultas SQL raw (si es necesario)
export async function query<T = any>(sql: string, params?: any[]): Promise<T> {
  // Nota: Supabase prefiere usar su API, pero si necesitas SQL raw:
  // tendrías que usar las funciones RPC o el client de PostgreSQL
  throw new Error('Use supabase.from() en lugar de query() directa');
}

// Función para cerrar el pool (útil en desarrollo)
export async function closePool() {
  // No es necesario con el cliente de Supabase
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
