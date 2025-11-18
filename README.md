# 🌸 Bloom Distribuciones - E-commerce Web

> Plataforma de e-commerce moderna desarrollada con **Astro** y **Tailwind CSS** para la distribución de productos de salud, belleza y bienestar de la marca Omnilife.

![Astro](https://img.shields.io/badge/Astro-5.13.3-blueviolet)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)

---

## 📖 Descripción del Proyecto

**Bloom Distribuciones** es una plataforma de comercio electrónico que permite a los usuarios explorar y adquirir productos de salud, belleza y bienestar de la marca Omnilife. El proyecto combina tecnologías web modernas con una base de datos MySQL para gestión dinámica de productos.

### 🎯 Funcionalidades Principales

- ✅ **Catálogo dinámico** con más de 85 productos de Omnilife
- ✅ **Sistema de carrito** persistente con localStorage
- ✅ **Páginas estáticas generadas** para cada producto (SSG)
- ✅ **Integración directa con WhatsApp** para finalizar pedidos
- ✅ **Búsqueda y filtrado** de productos en tiempo real
- ✅ **Diseño 100% responsivo** optimizado para móviles, tablets y desktop
- ✅ **Interfaz moderna** con gradientes personalizados y efectos glassmorphism
- ✅ **Componentes modulares** reutilizables (Header, Footer, Cards, Icons)
- ✅ **Base de datos MySQL** para gestión de productos en desarrollo

---

## 🛠️ Stack Tecnológico

### Frontend

- **[Astro 5.13.3](https://astro.build/)** - Framework web moderno para sitios estáticos
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Framework CSS utility-first
- **TypeScript** - Tipado estático para mayor seguridad

### Backend/Base de Datos

- **MySQL 8.0** - Base de datos relacional (desarrollo)
- **mysql2** - Driver Node.js para MySQL

### Herramientas de Desarrollo

- **Prettier** - Formateo de código
- **ESLint** - Linting de código
- **dotenv** - Gestión de variables de entorno

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+
- npm o pnpm
- MySQL 8.0+ (para desarrollo con base de datos)

### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasCarlsson/Trabajo-Integrador.git
cd Trabajo-Integrador
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto (usa `.env.example` como referencia):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_password
DB_NAME=omnilife_db
```

### 4. Configurar la base de datos (opcional)

Si deseas trabajar con MySQL en desarrollo:

```bash
# Importar el schema
mysql -u root -p < database/schema.sql

# Importar datos de productos
mysql -u root -p omnilife_db < database/insert_productos.sql
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
pnpm dev
```

### 6. Acceder al sitio

- **Inicio**: <http://localhost:4321/Trabajo-Integrador/>
- **Productos**: <http://localhost:4321/Trabajo-Integrador/productos>
- **Carrito**: <http://localhost:4321/Trabajo-Integrador/carrito>
- **Acerca de**: <http://localhost:4321/Trabajo-Integrador/acercaDeNosotros>

---

## 📁 Estructura del Proyecto

```text
Trabajo-Integrador/
├── database/                   # Base de datos
│   ├── db.ts                  # Configuración de conexión MySQL
│   ├── schema.sql             # Schema de la base de datos
│   └── insert_productos.sql  # Datos de productos
├── public/
│   └── img/                   # Imágenes públicas
├── src/
│   ├── components/            # Componentes Astro
│   │   ├── Header.astro       # Header con navegación y búsqueda
│   │   ├── Footer.astro       # Footer con degradado responsive
│   │   ├── ProductCard.astro  # Tarjeta de producto
│   │   ├── ProductosDestacados.astro
│   │   ├── ProductosPopulares.astro
│   │   └── icons/             # Componentes de iconos SVG
│   │       ├── Instagram.astro
│   │       ├── WhatsApp.astro
│   │       └── CarritoCompra.astro
│   ├── data/                  # Datos estáticos (backups)
│   │   └── backup_productos.json
│   ├── layouts/
│   │   └── Layout.astro       # Layout principal
│   ├── pages/                 # Páginas del sitio
│   │   ├── index.astro        # Página principal
│   │   ├── productos.astro    # Catálogo completo
│   │   ├── carrito.astro      # Carrito de compras
│   │   ├── acercaDeNosotros.astro
│   │   ├── contacto.astro
│   │   └── productos/
│   │       └── [producto].astro  # Página dinámica por producto
│   ├── scripts/               # Scripts del cliente
│   │   ├── carrito-pages-jquery.js
│   │   ├── menuToggle.js
│   │   └── components/
│   │       ├── carouselProductos.ts
│   │       └── slider.js
│   ├── services/              # Lógica de negocio
│   │   ├── productService.ts  # Servicio de productos
│   │   └── queries/
│   │       └── productoQueries.ts  # Consultas a BD
│   ├── styles/                # Estilos globales
│   │   ├── layout.css
│   │   ├── menuToggle.css
│   │   └── ArrowSliderAbout.css
│   └── types/                 # Tipos TypeScript
├── .env                       # Variables de entorno (no commiteado)
├── .env.example              # Ejemplo de variables de entorno
├── astro.config.mjs          # Configuración de Astro
├── tailwind.config.js        # Configuración de Tailwind
├── tsconfig.json             # Configuración de TypeScript
├── MEJORAS.md                # Checklist de mejoras y problemas detectados
└── package.json
```

---

## 🎨 Paleta de Colores

El proyecto usa una paleta personalizada definida en `tailwind.config.js`:

```css
--bloom-bg: #f8f8d9 /* Fondo principal */ --bloom-primary: #b1a08a
  /* Color principal */ --bloom-accent: #bfa4c0 /* Lavanda/Acento */
  --bloom-deep: #968d7d /* Variante oscura */ --bloom-contrast: #463c37
  /* Texto legible */;
```

### Gradientes Principales

```css
/* Header */
background: linear-gradient(
  360deg,
  rgba(240, 236, 229, 1) 0%,
  rgb(191, 164, 192, 1) 100%
);

/* Footer */
background: linear-gradient(to bottom, #f0ece5 0%, #e8dfe0 50%, #bfa4c0 100%);
```

---

## 🔧 Servicios Disponibles

### ProductService

```typescript
// Obtener todos los productos
const productos = await getAllProductos();

// Obtener producto por ID
const producto = await getProductoById(1);

// Buscar productos
const resultados = await searchProductos('crema');

// Productos destacados (ordenados por puntos)
const destacados = await getProductosDestacados(6);

// Productos recientes
const recientes = await getProductosRecientes(10);

// Estadísticas de productos
const stats = await getProductosStats();

// Filtrado avanzado
const filtrados = await buscarProductos({
  busqueda: 'skincare',
  precioMin: 1000,
  precioMax: 5000,
  ordenarPor: 'precio',
  orden: 'asc',
  limit: 10,
});
```

---

## 📦 Comandos Disponibles

| Comando             | Acción                                            |
| :------------------ | :------------------------------------------------ |
| `npm install`       | Instala dependencias                              |
| `npm run dev`       | Inicia servidor de desarrollo en `localhost:4321` |
| `npm run build`     | Construye el sitio para producción en `./dist/`   |
| `npm run preview`   | Vista previa del build antes de deployar          |
| `npm run astro ...` | Ejecuta comandos de Astro CLI                     |

---

## 🚢 Deployment

### Build para producción

```bash
npm run build
```

El sitio se genera de forma estática en `./dist/` y puede desplegarse en:

- GitHub Pages
- Netlify
- Vercel
- Cualquier hosting de archivos estáticos

**Configuración actual**: El sitio está configurado para GitHub Pages con `base: '/Trabajo-Integrador'`

---

## 🔐 Arquitectura de Datos

### Desarrollo

- Conexión a MySQL local
- Consultas dinámicas durante el build
- Pool de conexiones para mejor rendimiento

### Producción

- Páginas estáticas pre-generadas (SSG)
- Sin dependencias de base de datos en runtime
- Datos embebidos en las páginas durante el build

---

## 🎯 Características Destacadas

### Sistema de Carrito

- Persistencia con `localStorage`
- Actualización dinámica del contador
- Generación automática de mensaje para WhatsApp
- Validación de cantidades

### Búsqueda y Filtrado

- Búsqueda en tiempo real
- Filtros por precio
- Ordenamiento múltiple (nombre, precio, puntos)
- Contador de resultados

### Componentes Modulares

- **Header**: Navegación responsive con menú hamburguesa animado
- **Footer**: Degradado responsive con redes sociales
- **ProductCard**: Tarjetas con hover effects
- **Icons**: SVGs componentizados (Instagram, WhatsApp, Carrito)

---

## 📝 Mejoras Pendientes

Ver el archivo [MEJORAS.md](./MEJORAS.md) para una lista completa de:

- 🔴 Problemas críticos de seguridad
- 🟠 Problemas de arquitectura y código
- 🟡 Problemas de rendimiento
- 🟢 Mejoras de calidad y mantenibilidad
- 🔵 Mejoras de experiencia de usuario

---

## 👥 Equipo

**Hannah Dalila Bojanovich** - Co-desarrolladora
**Matías Viana Carlsson** - Co-desarrollador

Distribuidores Mercantiles Independientes de Omnilife

---

## 📄 Licencia

Este proyecto es de carácter educativo - Trabajo Integrador.

---

## 📞 Contacto

- **Instagram**: [@bloom.distribuciones](https://www.instagram.com/bloom.distribuciones/)
- **WhatsApp**: [+54 9 3764 725856](https://wa.me/5493764725856)
- **Sitio Oficial Omnilife**: [omnilife.com](https://www.omnilife.com/es-ar/)

---

## 📚 Recursos y Documentación

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

⭐ **Si te gusta este proyecto, dale una estrella en GitHub!**

---

**Nota Legal**: Estos productos no son medicamentos. El consumo de estos productos es responsabilidad de quien los recomienda y de quien los usa. Este sitio web no es el sitio oficial de Omnilife de México S.A. de C.V.
