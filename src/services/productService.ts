// src/services/productService.ts
// Servicio de lógica de negocio para productos

import type { Producto } from '@database/db';
import type { FiltrosProducto } from './queries/productoQueries';
import {
  queryProductos,
  queryProductoById,
  queryProductoByNombre,
  queryCountProductos,
  queryProductosStats,
} from './queries/productoQueries';

// Tipos de transformación
export interface ProductoFormateado {
  id: string;
  nombre: string;
  puntos: number;
  precio: number;
  imagen: string;
  descripcion: string;
}

export interface ProductosStats {
  total: number;
  precio_minimo: number;
  precio_maximo: number;
  precio_promedio: number;
  puntos_minimo: number;
  puntos_maximo: number;
  puntos_promedio: number;
}

// UTILIDADES DE TRANSFORMACIÓN

/**
 * Transformar producto de DB a formato de visualización
 */
export function formatearProducto(producto: Producto): ProductoFormateado {
  return {
    id: producto.id.toString(),
    nombre: producto.nombre,
    puntos: producto.puntos,
    precio: producto.precio,
    imagen: producto.imagen_url,
    descripcion: producto.descripcion,
  };
}

/**
 * Transformar lista de productos
 */
export function formatearProductos(
  productos: Producto[]
): ProductoFormateado[] {
  return productos.map(formatearProducto);
}

/**
 * Decodificar nombre desde URL (ej: "Agua-Blum" -> "Agua Blum")
 */
export function decodificarNombreURL(nombreURL: string): string {
  return decodeURIComponent(nombreURL.replace(/-/g, ' '));
}

/**
 * Obtener todos los productos (sin filtros)
 */
export async function getAllProductos(): Promise<Producto[]> {
  return queryProductos({ ordenarPor: 'nombre', orden: 'asc' });
}

/**
 * Buscar productos con filtros avanzados
 */
export async function buscarProductos(
  filtros: FiltrosProducto
): Promise<Producto[]> {
  return queryProductos(filtros);
}

/**
 * Obtener un producto por ID
 */
export async function getProductoById(id: number): Promise<Producto | null> {
  return queryProductoById(id);
}

/**
 * Obtener un producto por nombre (URL-friendly)
 */
export async function getProductoByNombre(
  nombreURL: string
): Promise<Producto | null> {
  const nombreDecodificado = decodificarNombreURL(nombreURL);
  return queryProductoByNombre(nombreDecodificado);
}

/**
 * Buscar productos por término de búsqueda simple
 */
export async function searchProductos(searchTerm: string): Promise<Producto[]> {
  return queryProductos({
    busqueda: searchTerm,
    ordenarPor: 'nombre',
    orden: 'asc',
  });
}

/**
 * Obtener productos por rango de precio
 */
export async function getProductosByPrecio(
  min: number,
  max: number
): Promise<Producto[]> {
  return queryProductos({
    precioMin: min,
    precioMax: max,
    ordenarPor: 'precio',
    orden: 'asc',
  });
}

/**
 * Obtener productos destacados (ordenados por puntos y precio)
 */
export async function getProductosDestacados(
  limit: number = 6
): Promise<Producto[]> {
  return queryProductos({
    ordenarPor: 'puntos',
    orden: 'desc',
    limit,
  });
}

/**
 * Obtener productos recientes
 */
export async function getProductosRecientes(
  limit: number = 10
): Promise<Producto[]> {
  return queryProductos({
    ordenarPor: 'reciente',
    limit,
  });
}

// FUNCIONES DE ESTADÍSTICAS

/**
 * Contar total de productos (con filtros opcionales)
 */
export async function countProductos(
  filtros: FiltrosProducto = {}
): Promise<number> {
  return queryCountProductos(filtros);
}

/**
 * Obtener estadísticas generales de productos
 */
export async function getProductosStats(): Promise<ProductosStats> {
  return queryProductosStats();
}
