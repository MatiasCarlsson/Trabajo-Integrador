# 🌸 Bloom Distribuciones - E-commerce Web

> Un sitio web de e-commerce moderno desarrollado con **Astro**, **Tailwind CSS** y **MySQL** para la venta de productos de salud y belleza de la marca Omnilife.

![Astro](https://img.shields.io/badge/Astro-5.13.3-blueviolet)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.17-38bdf8)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6)

---

## 📋 Descripción del Proyecto

**Bloom Distribuciones** es una plataforma de comercio electrónico que permite a los usuarios explorar, ver detalles y realizar pedidos de productos de salud, belleza y bienestar de la marca Omnilife. El proyecto incluye un sistema de carrito de compras con integración a WhatsApp para finalizar pedidos.

### 🎯 Funcionalidades Principales

- ✅ **Catálogo de productos** con 85+ productos de Omnilife
- ✅ **Base de datos MySQL** para gestión de productos
- ✅ **Sistema de carrito** con localStorage para persistencia
- ✅ **Páginas dinámicas** para cada producto
- ✅ **Integración con WhatsApp** para pedidos
- ✅ **Slider informativo** sobre el equipo
- ✅ **Diseño responsivo** con Tailwind CSS
- ✅ **Interfaz moderna** con gradientes y glassmorphism

---

## 🛠️ Stack Tecnológico

### Frontend

- **[Astro 5.13.3](https://astro.build/)** - Framework web moderno
- **[Tailwind CSS 3.4.17](https://tailwindcss.com/)** - Framework CSS utility-first
- **TypeScript** - Tipado estático

### Backend

- **[MySQL 8.0](https://www.mysql.com/)** - Base de datos relacional
- **[mysql2](https://github.com/sidorares/node-mysql2)** - Cliente MySQL para Node.js
- **[dotenv](https://github.com/motdotla/dotenv)** - Gestión de variables de entorno

---

## 🚀 Inicio Rápido

### Prerequisitos

- Node.js 18+
- MySQL 8.0+
- npm o pnpm

### 1. Clonar el repositorio

```bash
git clone https://github.com/MatiasCarlsson/Trabajo-Integrador.git
cd Trabajo-Integrador
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar la base de datos

#### Crear la base de datos

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p omnilife_db < database/insert_productos.sql
```

#### Configurar variables de entorno

Copia el archivo de ejemplo y edítalo con tus credenciales:

```bash
cp .env.example .env
```

Edita `.env`:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña
DB_NAME=omnilife_db
```

### 4. Probar la conexión

```bash
npm run dev
```

Visita: <http://localhost:4321/Trabajo-Integrador/test-db>

### 5. Ver el sitio

- **Inicio**: <http://localhost:4321/Trabajo-Integrador/>
- **Productos**: <http://localhost:4321/Trabajo-Integrador/productos>
- **Carrito**: <http://localhost:4321/Trabajo-Integrador/carrito>

---

## 📁 Estructura del Proyecto

```text
Trabajo-Integrador/
├── database/               # Scripts SQL
│   ├── schema.sql         # Estructura de tablas
│   ├── insert_productos.sql # Datos de productos
│   ├── queries.sql        # Consultas útiles
│   └── README.md          # Documentación de BD
├── public/
│   └── img/               # Imágenes públicas
├── src/
│   ├── assets/            # Assets del proyecto
│   ├── components/        # Componentes Astro
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ProductCard.astro
│   │   └── ProductosDestacados.astro
│   ├── data/              # Datos estáticos (deprecado)
│   │   └── productos.json
│   ├── layouts/           # Layouts de página
│   │   └── Layout.astro
│   ├── lib/               # Utilidades y configuración
│   │   └── db.ts         # Conexión a MySQL
│   ├── pages/             # Páginas del sitio
│   │   ├── index.astro
│   │   ├── productos.astro
│   │   ├── carrito.astro
│   │   ├── contacto.astro
│   │   ├── test-db.astro
│   │   └── productos/
│   │       └── [producto].astro
│   ├── scripts/           # Scripts del cliente
│   │   ├── carrito-page.ts
│   │   └── menuToggle.js
│   ├── services/          # Servicios de negocio
│   │   └── productService.ts
│   └── styles/            # Estilos globales
│       └── layout.css
├── .env                   # Variables de entorno (NO subir a Git)
├── .env.example          # Ejemplo de configuración
├── astro.config.mjs      # Configuración de Astro
├── tailwind.config.js    # Configuración de Tailwind
├── tsconfig.json         # Configuración de TypeScript
├── MIGRACION_DB.md       # Guía completa de migración
├── INICIO_RAPIDO_DB.md   # Inicio rápido con BD
└── package.json
```

---

## 🗄️ Base de Datos

### Estructura

La base de datos incluye las siguientes tablas:

- **productos** - Catálogo de productos (85 productos)
- **categorias** - Categorías de productos (preparada para futuro)
- **producto_categoria** - Relación N:N (preparada para futuro)
- **inventario** - Control de stock (preparada para futuro)

### Servicios disponibles

```typescript
// Obtener todos los productos
const productos = await getAllProductos();

// Obtener producto por ID
const producto = await getProductoById(1);

// Buscar productos
const resultados = await searchProductos('crema');

// Productos destacados
const destacados = await getProductosDestacados(6);

// Estadísticas
const stats = await getProductosStats();
```

📖 **Documentación completa**: Ver [MIGRACION_DB.md](./MIGRACION_DB.md)

---

## 🎨 Características de Diseño

### Paleta de Colores

```css
/* Principales */
--bloom-primary: #9333ea /* Violeta principal */ --bloom-secondary: #ec4899
  /* Rosa secundario */ /* Gradientes */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
```

### Componentes Destacados

- **Header**: Navegación responsive con menú hamburguesa
- **ProductCard**: Tarjetas de producto con hover effects
- **Slider**: Carrusel de información del equipo
- **Footer**: Footer con información de contacto

---

## 🧪 Testing

### Probar conexión a BD

```bash
# Navega a
http://localhost:4321/Trabajo-Integrador/test-db
```

### Verificar productos

```bash
mysql -u root -p omnilife_db -e "SELECT COUNT(*) FROM productos;"
```

---

## 📦 Comandos Disponibles

| Comando             | Acción                                                        |
| :------------------ | :------------------------------------------------------------ |
| `npm install`       | Instala dependencias                                          |
| `npm run dev`       | Inicia servidor de desarrollo en `localhost:4321`             |
| `npm run build`     | Construye el sitio para producción en `./dist/`               |
| `npm run preview`   | Vista previa del build antes de deployar                      |
| `npm run astro ...` | Ejecuta comandos de Astro CLI como `astro add`, `astro check` |

---

## 🚢 Deployment

### Build para producción

```bash
npm run build
```

El sitio compilado estará en `./dist/`

### Variables de entorno de producción

Crea `.env.production`:

```env
DB_HOST=tu_servidor_mysql
DB_USER=usuario_produccion
DB_PASSWORD=contraseña_segura
DB_NAME=omnilife_db
```

---

## 🔐 Seguridad

- ✅ Variables de entorno para credenciales
- ✅ `.env` incluido en `.gitignore`
- ✅ Prepared statements para prevenir SQL injection
- ✅ Pool de conexiones para mejor performance

---

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es privado y pertenece a Bloom Distribuciones.

---

## 👥 Equipo

**Matías Carlsson** - Desarrollador Principal

**Proyecto**: Trabajo Integrador - E-commerce Omnilife

## 📚 Recursos Adicionales

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Tailwind CSS](https://tailwindcss.com/docs)
- [Guía de MySQL](https://dev.mysql.com/doc/)
- [MIGRACION_DB.md](./MIGRACION_DB.md) - Guía completa de base de datos
- [INICIO_RAPIDO_DB.md](./INICIO_RAPIDO_DB.md) - Inicio rápido

---

⭐ **Si te gusta este proyecto, dale una estrella en GitHub!**
