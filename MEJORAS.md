# 📋 CHECKLIST DE INCONSISTENCIAS Y ÁREAS DE MEJORA

Basándome en la revisión completa del proyecto, se han identificado las siguientes áreas que requieren atención:

---

## 🔴 **PROBLEMAS CRÍTICOS DE SEGURIDAD**

### ☐ 1. Credenciales de base de datos expuestas en el archivo .env

**Archivo:** `.env`

**Justificación:** El archivo `.env` contiene la contraseña de la base de datos (`DB_PASSWORD=2103`) y aunque está en `.gitignore`, si este es un repositorio de trabajo compartido o está en OneDrive, las credenciales están expuestas. Debería:

- Usar un archivo `.env.example` con valores de ejemplo
- Documentar las variables de entorno requeridas
- **NUNCA** commitear credenciales reales
- Considerar usar variables de entorno del sistema en producción

---

## 🟠 **PROBLEMAS DE ARQUITECTURA Y CÓDIGO**

### ☐ 2. Duplicación de código de carrito

**Archivos:** `carrito-page.ts` y `carrito-pages-jquery.js`

**Justificación:** Existen DOS implementaciones del mismo carrito - una en TypeScript y otra en jQuery. Esto genera:

- Código duplicado difícil de mantener
- Posibles inconsistencias en el comportamiento
- Mayor peso en el bundle final
- Confusión sobre cuál se está usando realmente

**Solución:** Elegir UNA implementación (preferiblemente la de TypeScript) y eliminar la otra.

---

### ☐ 3. jQuery cargado múltiples veces

**Archivo:** `Layout.astro`

**Justificación:** jQuery se está cargando 2 veces desde el CDN (líneas 19 y 23), lo que:

- Desperdicia ancho de banda
- Puede causar conflictos
- Ralentiza la carga de la página

**Solución:** Eliminar una de las declaraciones duplicadas.

---

### ☐ 4. Uso innecesario de jQuery en un proyecto moderno

**Archivos:** `Layout.astro`, `carrito-pages-jquery.js`

**Justificación:** jQuery es una biblioteca legacy (año 2006) que añade ~30KB de JavaScript innecesario cuando:

- Los navegadores modernos ya soportan todo lo que jQuery hacía
- Astro + TypeScript ya tienen APIs modernas del DOM
- Aumenta el tiempo de carga y el bundle size
- Va en contra de las mejores prácticas modernas

**Solución:** Migrar todo el código jQuery a JavaScript/TypeScript vanilla.

---

### ☐ 5. URLs hardcodeadas con base path

**Archivo:** `ProductosDestacados.astro` (línea 75)

**Justificación:** Hay una URL hardcodeada `/Trabajo-Integrador/productos/...` que:

- Rompe el patrón de usar `createURL()` que existe en el proyecto
- Fallará si cambia el base path del proyecto
- Es inconsistente con el resto del código

**Ejemplo problemático:**

```astro
href={`/Trabajo-Integrador/productos/${removeAccents(...)}`}
```

**Solución:** Usar la función `createURL()` consistentemente.

---

### ☐ 6. Manejo inconsistente de errores en la carga de productos

**Archivo:** `ProductosDestacados.astro`

**Justificación:** El componente hace `try-catch` pero luego hace `throw error`, lo que:

- Rompe toda la página si falla la DB
- No hay fallback ni UI de error para el usuario
- Los logs de consola no son útiles en producción

**Solución:** Implementar estados de carga/error con UI apropiada.

---

### ☐ 7. Datos de productos almacenados en múltiples formatos

**Archivos:** `backup_productos.json`, `productos_backup.json`, `productosv1.json`

**Justificación:** Hay 3 archivos JSON de backup que:

- Generan confusión sobre cuál es la fuente de verdad
- Ocupan espacio innecesario
- Pueden quedar desactualizados
- No está claro si se usan o no

**Solución:**

- Si la DB es la fuente de verdad, eliminar los JSON
- Si son backups, moverlos fuera del proyecto
- Documentar claramente su propósito

---

## 🟡 **PROBLEMAS DE RENDIMIENTO**

### ☐ 8. Consultas a DB en cada build de página estática

**Archivos:** `[producto].astro`, `productos.astro`, `index.astro`

**Justificación:** Cada página hace consultas a MySQL durante el build (`await getAllProductos()`), pero:

- Es un sitio estático (`output: 'static'`)
- La DB no estará disponible en producción (GitHub Pages)
- Esto solo funciona en desarrollo
- Debería usar los archivos JSON para el build estático

**Solución:**

- Usar archivos JSON estáticos para el build
- O cambiar a SSR si realmente se necesita DB en runtime
- Documentar claramente la estrategia de datos

---

### ☐ 9. Productos aleatorios se generan en cada request

**Archivo:** `[producto].astro`

**Justificación:** La función `getRandomProducts()` usa `Math.random()` durante el build, lo que:

- Genera diferentes productos "aleatorios" en cada build
- No es predecible
- Podría causar hidratación incorrecta

**Solución:** Generar productos recomendados basados en categoría o similaridad en lugar de aleatoriedad.

---

### ☐ 10. Imágenes sin optimización

**Archivo:** Múltiples componentes

**Justificación:** Las imágenes se cargan directamente sin optimización:

- No hay `width`/`height` definidos (causa CLS - Cumulative Layout Shift)
- No hay lazy loading
- No hay formatos modernos (WebP, AVIF)
- Afecta el rendimiento y SEO

**Solución:** Usar el componente `<Image>` de Astro para optimización automática.

---

## 🟢 **MEJORAS DE CALIDAD Y MANTENIBILIDAD**

### ☐ 11. Falta documentación de la estrategia de datos

**Archivos:** README.md

**Justificación:** No está claro si el proyecto usa:

- MySQL en desarrollo y JSON en producción
- Solo JSON
- Solo MySQL con SSR

Esta confusión dificulta el mantenimiento y onboarding de nuevos desarrolladores.

**Solución:** Documentar claramente la arquitectura de datos.

---

### ☐ 12. TODO comentado sin resolver

**Archivo:** `Footer.astro` (línea 24)

**Justificación:** Existe un comentario `<!-- TODO agregar estos filtros en los productos -->` que:

- Indica funcionalidad pendiente
- No tiene issue/ticket asociado
- Puede olvidarse fácilmente

**Solución:** Crear issues en GitHub para TODOs o completar/eliminar el comentario.

---

### ☐ 13. Funcionalidad de combos sin implementar

**Archivo:** `ProductosDestacados.astro`

**Justificación:** Hay links a combos (`/productos/combo-belleza-natural`) que:

- No existen como páginas
- Generarán 404 en producción
- Confunden a los usuarios

**Solución:** Implementar las páginas de combos o remover los enlaces.

---

### ☐ 14. Inconsistencia en el formato de precios

**Archivos:** Múltiples componentes

**Justificación:** Se usan diferentes configuraciones para formatear precios:

- `'es-ES'` en algunos lugares
- `'es-AR'` en otros
- Genera inconsistencia visual

**Solución:** Crear una función utilitaria central `formatPrice()` usada en todo el proyecto.

---

### ☐ 15. Scripts de base de datos desactualizados

**Archivo:** `database/schema.sql`

**Justificación:** El schema define tablas (`categorias`, `inventario`, `producto_categoria`) que:

- No se usan en el código actual
- Están marcadas como "preparadas para futuro"
- Generan confusión

**Solución:** Mantener solo las tablas actualmente en uso, o documentar el roadmap.

---

### ☐ 16. Falta de validación de datos del carrito

**Archivos:** `carrito-page.ts`, `carrito-pages-jquery.js`

**Justificación:** No hay validación de:

- Cantidades negativas
- Precios manipulados en localStorage
- Productos inexistentes
- Datos corruptos en localStorage

**Solución:** Implementar validación y sanitización de datos del carrito.

---

### ☐ 17. Manejo de estados del carrito no sincronizado

**Archivos:** Múltiples

**Justificación:** El contador del carrito (`updateCartCount()`) se actualiza en algunos lugares pero no en otros:

- Puede desincronizarse
- No hay single source of truth
- Dificulta el debugging

**Solución:** Implementar un sistema de eventos/observables para el carrito.

---

### ☐ 18. Código comentado sin eliminar

**Archivo:** `carrito.astro` (línea 89)

**Justificación:**

```astro
// import '../scripts/carrito-page.ts';

```

Código comentado que:

- Genera confusión
- Indica indecisión en el diseño
- Debería eliminarse si no se usa

**Solución:** Eliminar código muerto.

---

### ☐ 19. Puntos de producto no se muestran consistentemente

**Archivos:** Múltiples componentes

**Justificación:** Los productos tienen un campo `puntos` en la DB pero:

- No se muestra en todas las vistas
- No está claro qué representan
- Puede ser un sistema de recompensas no implementado

**Solución:** Implementar completamente el sistema de puntos o removerlo.

---

### ☐ 20. Falta de accesibilidad (a11y)

**Archivos:** Múltiples componentes

**Justificación:** Faltan mejoras de accesibilidad:

- Botones sin labels descriptivos
- Imágenes sin alt text apropiado
- Falta de navegación por teclado en carrusel
- No hay skip links
- Contraste de colores no verificado

**Solución:** Auditar con Lighthouse y corregir problemas de accesibilidad.

---

## 🔵 **MEJORAS DE EXPERIENCIA DE USUARIO**

### ☐ 21. Alertas nativas en lugar de UI moderna

**Archivos:** `[producto].astro`, `CartButtonAdd.astro`

**Justificación:** Se usa `alert()` nativo que:

- Bloquea la UI
- Se ve anticuado
- No es personalizable
- Mala UX en móvil

**Solución:** Implementar toasts/notificaciones modernas (ej: usando Sonner, React-Toastify, o custom).

---

### ☐ 22. Falta feedback visual al añadir al carrito

**Archivos:** Componentes de productos

**Justificación:** Solo hay un alert, pero no:

- Animación del ícono del carrito
- Transición visual del producto
- Confirmación visual moderna

**Solución:** Añadir animaciones y feedback visual.

---

### ☐ 23. Búsqueda usa sessionStorage en lugar de URL params

**Archivo:** `Header.astro`, `productos.astro`

**Justificación:** La búsqueda se guarda en sessionStorage, lo que:

- No permite compartir búsquedas (no hay URL)
- Se pierde al cerrar la pestaña
- No permite back/forward del navegador
- Mala UX y SEO

**Solución:** Usar query params en la URL (`?q=termo-busqueda`).

---

### ☐ 24. Falta página 404 personalizada

**Archivos:** No existe `404.astro`

**Justificación:** Las rutas inexistentes muestran error genérico:

- Mala experiencia de usuario
- No hay navegación de recuperación
- Pierde oportunidad de retener al usuario

**Solución:** Crear página 404 personalizada con links útiles.

---

### ☐ 25. Carrito no persiste entre sesiones correctamente

**Archivos:** Sistema de carrito

**Justificación:** El carrito usa `localStorage` pero:

- No hay TTL (Time To Live)
- Productos pueden quedar obsoletos
- Precios pueden cambiar
- No hay sincronización con el servidor

**Solución:** Implementar validación de datos del carrito al cargar.

---

## ⚙️ **CONFIGURACIÓN Y TOOLING**

### ☐ 26. Falta archivo .env.example

**Archivos:** Raíz del proyecto

**Justificación:** No hay ejemplo de variables de entorno:

- Dificulta onboarding
- No documenta variables requeridas
- Otros desarrolladores no sabrán qué configurar

**Solución:** Crear `.env.example` con valores placeholder.

---

### ☐ 27. Falta configuración de Prettier

**Archivo:** `.prettierrc.js` existe pero `.prettierrc` también

**Justificación:** Hay dos archivos de configuración de Prettier:

- Puede causar conflictos
- No está claro cuál prevalece

**Solución:** Mantener solo uno (preferiblemente `.prettierrc.js`).

---

### ☐ 28. TypeScript paths no incluyen @types

**Archivo:** `tsconfig.json`

**Justificación:** Los paths alias están bien pero:

- No hay alias para tipos compartidos (`@types/*`)
- Podría mejorar la organización

**Solución:** Considerar añadir alias para tipos si el proyecto crece.

---

## 📊 **RESUMEN POR PRIORIDAD**

### 🔴 **Urgente (Seguridad)**

- Credenciales expuestas en .env

### 🟠 **Alta (Funcionalidad)**

- Duplicación de código del carrito
- jQuery cargado múltiples veces
- URLs hardcodeadas
- Estrategia de datos confusa (DB vs JSON)

### 🟡 **Media (Rendimiento y Calidad)**

- Eliminación de jQuery
- Optimización de imágenes
- Validación de datos del carrito
- Manejo de errores inconsistente

### 🟢 **Baja (UX y Polish)**

- Alertas nativas → Toasts modernos
- Página 404
- Documentación mejorada
- Accesibilidad

---

**Nota:** Esta checklist permite priorizar las mejoras según el impacto en seguridad, funcionalidad y experiencia de usuario.
