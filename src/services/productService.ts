// src/services/productService.ts
// Servicio para manejar operaciones relacionadas con productos

import { supabase } from '../lib/db';
import type { Producto } from '../lib/db';

/**
 * Obtener todos los productos
 */
export async function getAllProductos(): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Obtener un producto por ID
 */
export async function getProductoById(id: number): Promise<Producto | null> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
}

/**
 * Obtener un producto por nombre (URL-friendly)
 */
export async function getProductoByNombre(
  nombre: string
): Promise<Producto | null> {
  // Decodificar el nombre de la URL y buscar
  const nombreDecodificado = decodeURIComponent(nombre.replace(/-/g, ' '));
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .ilike('nombre', nombreDecodificado)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return data;
}

/**
 * Buscar productos por texto
 */
export async function searchProductos(searchTerm: string): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .or(`nombre.ilike.%${searchTerm}%,descripcion.ilike.%${searchTerm}%`)
    .order('nombre', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Obtener productos por rango de precio
 */
export async function getProductosByPrecio(
  min: number,
  max: number
): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .gte('precio', min)
    .lte('precio', max)
    .order('precio', { ascending: true });

  if (error) throw error;
  return data || [];
}

/**
 * Obtener productos destacados (los más caros o con más puntos)
 */
export async function getProductosDestacados(
  limit: number = 6
): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('puntos', { ascending: false })
    .order('precio', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

/**
 * Obtener productos recientes
 */
export async function getProductosRecientes(
  limit: number = 10
): Promise<Producto[]> {
  const { data, error } = await supabase
    .from('productos')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data || [];
}

/**
 * Contar total de productos
 */
export async function countProductos(): Promise<number> {
  const { count, error } = await supabase
    .from('productos')
    .select('*', { count: 'exact', head: true });

  if (error) throw error;
  return count || 0;
}

/**
 * Obtener estadísticas de productos
 */
export async function getProductosStats() {
  const { data, error } = await supabase
    .from('productos')
    .select('precio, puntos');

  if (error) throw error;

  if (!data || data.length === 0) {
    return {
      total: 0,
      precio_minimo: 0,
      precio_maximo: 0,
      precio_promedio: 0,
      puntos_minimo: 0,
      puntos_maximo: 0,
      puntos_promedio: 0,
    };
  }

  const precios = data.map((p) => p.precio);
  const puntos = data.map((p) => p.puntos);

  return {
    total: data.length,
    precio_minimo: Math.min(...precios),
    precio_maximo: Math.max(...precios),
    precio_promedio: precios.reduce((a, b) => a + b, 0) / precios.length,
    puntos_minimo: Math.min(...puntos),
    puntos_maximo: Math.max(...puntos),
    puntos_promedio: puntos.reduce((a, b) => a + b, 0) / puntos.length,
  };
}
