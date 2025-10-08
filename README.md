# 🌸 Bloom Distribuciones - E-commerce Web# Astro Starter Kit: Basics

> Un sitio web de e-commerce moderno desarrollado con **Astro** y **Tailwind CSS** para la venta de productos de salud y belleza de la marca Omnilife.```sh

npm create astro@latest -- --template basics

## 📋 Descripción del Proyecto```

**Bloom Distribuciones** es una plataforma de comercio electrónico que permite a los usuarios explorar, ver detalles y realizar pedidos de productos de salud, belleza y bienestar de la marca Omnilife. El proyecto incluye un sistema de carrito de compras con integración a WhatsApp para finalizar pedidos.> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

### 🎯 Funcionalidades Principales## 🚀 Project Structure

- **Catálogo de productos** con 50+ productos de OmnilifeInside of your Astro project, you'll see the following folders and files:

- **Sistema de carrito** con localStorage para persistencia

- **Páginas dinámicas** para cada producto```text

- **Integración con WhatsApp** para pedidos/

- **Slider informativo** sobre el equipo├── public/

- **Diseño responsivo** con Tailwind CSS│ └── favicon.svg

- **Interfaz moderna** con gradientes y glassmorphism├── src

│   ├── assets

## 🛠️ Stack Tecnológico│   │   └── astro.svg

│   ├── components

### Frontend Framework│   │   └── Welcome.astro

- **[Astro 5.13.3](https://astro.build/)** - Framework web moderno para sitios estáticos y aplicaciones híbridas│   ├── layouts

│   │   └── Layout.astro

### Estilización│   └── pages

- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Framework CSS utility-first│   └── index.astro

- **[@astrojs/tailwind 6.0.2](https://docs.astro.build/en/guides/integrations-guide/tailwind/)** - Integración oficial de Tailwind para Astro└── package.json

````

### Desarrollo

- **TypeScript** - Tipado estático para JavaScriptTo learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

- **CSS3** - Estilos personalizados y animaciones

- **JSON** - Gestión de datos de productos## 🧞 Commands



### Tools & UtilitiesAll commands are run from the root of the project, from a terminal:

- **[Prettier 3.6.2](https://prettier.io/)** - Formateador de código

- **prettier-plugin-astro** - Plugin de Prettier para archivos .astro| Command                   | Action                                           |

- **prettier-plugin-tailwindcss** - Plugin para ordenar clases de Tailwind| :------------------------ | :----------------------------------------------- |

- **csv-parse** - Utilidad para procesamiento de archivos CSV| `npm install`             | Installs dependencies                            |

| `npm run dev`             | Starts local dev server at `localhost:4321`      |

## 📁 Estructura del Proyecto| `npm run build`           | Build your production site to `./dist/`          |

| `npm run preview`         | Preview your build locally, before deploying     |

```| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |

📦 trabajo-integrador/| `npm run astro -- --help` | Get help using the Astro CLI                     |

├── 🔧 astro.config.mjs          # Configuración de Astro

├── 📋 package.json              # Dependencias y scripts## 👀 Want to learn more?

├── 🎨 tailwind.config.js        # Configuración de Tailwind CSS

├── 📝 tsconfig.json             # Configuración de TypeScriptFeel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

├── 🌐 public/                   # Archivos estáticos
│   ├── 🖼️ img/                  # Imágenes del sitio
│   └── 📄 bloom_logo.ico        # Favicon
└── 📂 src/
    ├── 🎨 assets/               # Recursos del proyecto
    ├── 🧩 components/           # Componentes reutilizables
    │   ├── 🛒 CarritoCompra.astro
    │   ├── 📱 Header.astro
    │   ├── 🛍️ ProductCard.astro
    │   ├── 🎠 CarrucelProximamente.astro
    │   └── 📊 SliderAbout.astro
    ├── 📊 data/
    │   └── 🛍️ productos.json     # Base de datos de productos
    ├── 🏗️ layouts/
    │   └── 📄 Layout.astro       # Layout principal
    ├── 📄 pages/                # Páginas del sitio
    │   ├── 🏠 index.astro        # Página de inicio
    │   ├── 🛍️ productos.astro    # Catálogo de productos
    │   ├── 🛒 carrito.astro      # Carrito de compras
    │   ├── ℹ️ acercaDeNosotros.astro
    │   ├── 📞 contacto.astro
    │   └── 📁 productos/
    │       └── 🔗 [producto].astro # Páginas dinámicas de productos
    ├── 🔧 scripts/              # JavaScript/TypeScript
    │   ├── 🛒 carrito-page.ts   # Lógica del carrito
    │   └── 📱 menuToggle.js     # Menú móvil
    └── 🎨 styles/               # Estilos CSS personalizados
        ├── 🎯 ArrowSliderAbout.css
        ├── 🖥️ layout.css
        └── 📱 menuToggle.css
````

## 🎨 Diseño y UI/UX

### Paleta de Colores

```css
--bloom-bg: #f8f8d9 /* Fondo principal - beige claro */ --bloom-primary: #b1a08a
  /* Color principal - marrón suave */ --bloom-accent: #bfa4c0
  /* Acento - lavanda */ --bloom-deep: #968d7d /* Variante oscura */
  --bloom-contrast: #463c37 /* Texto legible - marrón oscuro */;
```

### Características de Diseño

- **Gradientes suaves** con colores de la marca
- **Glassmorphism** en formularios y tarjetas
- **Animaciones CSS** para mejorar la experiencia
- **Diseño responsive** optimizado para todos los dispositivos
- **Iconografía** personalizada y consistente

## 📋 Funcionalidades Detalladas

### 🏠 Página de Inicio

- Carrusel de próximos productos
- Sección de productos destacados
- Área de combos especiales

### 🛍️ Catálogo de Productos

- Visualización de todos los productos disponibles
- Tarjetas de producto con imagen, nombre, precio
- Botones "Añadir al carrito" funcionales

### 🛒 Sistema de Carrito

- **Persistencia** con localStorage del navegador
- **Gestión de cantidades** (incrementar/decrementar)
- **Cálculo automático** de totales
- **Eliminación** de productos individuales
- **Vaciado completo** del carrito
- **Generación automática** de mensajes para WhatsApp

### 📱 Integración WhatsApp

```typescript
// Ejemplo del mensaje generado automáticamente
🛍️ *Hola! Quiero realizar este pedido:*

1. *Producto A*
   • Cantidad: 2
   • Precio unitario: $XX.XXX
   • Subtotal: $XX.XXX

💰 *TOTAL: $XX.XXX*

¿Podrías confirmar la disponibilidad y el tiempo de entrega?
¡Gracias! 😊
```

### 🔗 Páginas Dinámicas

- URLs amigables generadas automáticamente desde nombres de productos
- Normalización de caracteres especiales y espacios
- Rutas SEO-optimizadas

## 📊 Gestión de Datos

### Productos

El archivo `productos.json` contiene **50+ productos** con la siguiente estructura:

```json
{
  "nombre": "Nombre del Producto",
  "puntos": 50,
  "precio": 25000,
  "imagen": "https://cdn.omnilife.com/...",
  "descripcion": "Descripción detallada del producto..."
}
```

### Características de los Datos

- **Precios** en pesos argentinos
- **Imágenes** desde CDN oficial de Omnilife
- **Descripciones** completas de productos
- **Sistema de puntos** para programa de lealtad

## 🚀 Scripts Disponibles

```bash
# Desarrollo - servidor local con hot reload
npm run dev

# Construcción - optimizada para producción
npm run build

# Vista previa - servidor de la build de producción
npm run preview

# Comando Astro - acceso directo a CLI
npm run astro
```

## 🌐 Páginas Implementadas

| Página                  | Ruta                  | Descripción                             |
| ----------------------- | --------------------- | --------------------------------------- |
| **Inicio**              | `/`                   | Landing page con productos destacados   |
| **Productos**           | `/productos`          | Catálogo completo de productos          |
| **Producto Individual** | `/productos/[nombre]` | Detalles específicos de cada producto   |
| **Carrito**             | `/carrito`            | Gestión completa del carrito de compras |
| **Acerca de Nosotros**  | `/acercaDeNosotros`   | Slider informativo del equipo           |
| **Contacto**            | `/contacto`           | Formulario de contacto                  |

## ⚙️ Configuración del Entorno

### Rutas de Importación Configuradas

```json
{
  "@components/*": ["src/components/*"],
  "@layouts/*": ["src/layouts/*"],
  "@pages/*": ["src/pages/*"],
  "@data/*": ["src/data/*"],
  "@styles/*": ["src/styles/*"],
  "@scripts/*": ["src/scripts/*"],
  "@public/*": ["public/*"]
}
```

### Configuración de Astro

- **Integración Tailwind** activada
- **DevToolbar** deshabilitado para producción
- **Configuración estricta** de TypeScript

## 🎯 Estado Actual del Proyecto

### ✅ Funcionalidades Completadas

- [x] Estructura base con Astro
- [x] Diseño responsive con Tailwind CSS
- [x] Sistema de navegación completo
- [x] Catálogo de productos funcional
- [x] Carrito de compras con localStorage
- [x] Integración WhatsApp para pedidos
- [x] Páginas dinámicas de productos
- [x] Slider informativo del equipo
- [x] Formulario de contacto
- [x] Optimización de imágenes y rendimiento

## 📞 Información de Contacto

- **WhatsApp:** +54 9 376 472-5856
- **Distribuidora:** Bloom Distribuciones
- **Productos:** Omnilife Argentina

## 🔧 Instalación y Desarrollo

### Prerrequisitos

- Node.js 18+
- npm o yarn

### Pasos para desarrollo local

```bash
# Clonar el repositorio
git clone [URL_DEL_REPOSITORIO]

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# El sitio estará disponible en http://localhost:4321
```

---
