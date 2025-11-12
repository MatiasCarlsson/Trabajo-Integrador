// src/lib/db.ts
// Configuración y conexión a Supabase

import { createClient } from '@supabase/supabase-js';

// Configuración de Supabase
// Estas credenciales son públicas y seguras de exponer (anon key)
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://eedhkrxokjldkxgfrxua.supabase.co';
const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlZGhrcnhva2psZGt4Z2ZyeHVhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI5MDM2NTIsImV4cCI6MjA3ODQ3OTY1Mn0.MG4wpL1uzSZJCjpcGcUq9-VYRJMeBpVkFkgo61mnYfU';

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
