# 🗄️ Migración de JSON a MySQL

Este documento explica cómo usar la base de datos MySQL en lugar del archivo JSON.

## 📋 Prerequisitos

1. **MySQL instalado y corriendo**
   - MySQL 5.7+ o MariaDB 10.3+
   - Servidor MySQL en ejecución

2. **Base de datos creada**

   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p omnilife_db < database/insert_productos.sql
   ```

## ⚙️ Configuración

### 1. Variables de entorno

Edita el archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=omnilife_db
```

⚠️ **IMPORTANTE**: Nunca subas el archivo `.env` a Git. Ya está incluido en `.gitignore`.

### 2. Instalar dependencias

Las dependencias ya están instaladas. Si necesitas reinstalar:

```bash
npm install mysql2 dotenv
```

## 🚀 Uso

### Servicios disponibles

El servicio `productService.ts` proporciona las siguientes funciones:

```typescript
// Obtener todos los productos
const productos = await getAllProductos();

// Obtener producto por ID
const producto = await getProductoById(1);

// Buscar por nombre
const producto = await getProductoByNombre('agua-blum');

// Buscar por texto
const resultados = await searchProductos('crema');

// Productos por rango de precio
const productos = await getProductosByPrecio(10000, 50000);

// Productos destacados
const destacados = await getProductosDestacados(6);

// Productos recientes
const recientes = await getProductosRecientes(10);

// Estadísticas
const stats = await getProductosStats();
```

### En componentes Astro

```astro
---
import { getAllProductos } from '@services/productService';

const productos = await getAllProductos();
---

<div>
  {productos.map(p => (
    <h3>{p.nombre}</h3>
    <p>Precio: ${p.precio}</p>
  ))}
</div>
```

## 🔄 Páginas migradas

Las siguientes páginas ya están usando la base de datos:

- ✅ `/productos` - Lista de productos
- ✅ `/productos/[producto]` - Detalle de producto
- ✅ `/` (ProductosDestacados) - Productos destacados en home

## 🛠️ Desarrollo

### Comandos útiles

```bash
# Desarrollo normal
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

### Verificar conexión

Para verificar que la conexión funciona, puedes crear una página de prueba:

```astro
---
// src/pages/test-db.astro
import { countProductos } from '@services/productService';

const total = await countProductos();
---

<html>
  <body>
    <h1>Test de conexión DB</h1>
    <p>Total de productos: {total}</p>
  </body>
</html>
```

## 🔍 Troubleshooting

### Error: "Cannot find module 'mysql2'"

```bash
npm install mysql2
```

### Error: "Access denied for user"

Verifica tus credenciales en `.env`:

- Usuario correcto
- Contraseña correcta
- Base de datos existe

### Error: "connect ECONNREFUSED"

El servidor MySQL no está corriendo. Inicia MySQL:

**Windows:**

```bash
net start MySQL80  # o el nombre de tu servicio
```

### Error: "Unknown database 'omnilife_db'"

Crea la base de datos:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p omnilife_db < database/insert_productos.sql
```

## 📊 Estructura de datos

### Tipo Producto (TypeScript)

```typescript
interface Producto {
  id: number;
  nombre: string;
  puntos: number;
  precio: number;
  imagen_url: string;
  descripcion: string;
  created_at: Date;
  updated_at: Date;
}
```

### Transformación para componentes

Algunos componentes esperan el formato antiguo del JSON. Usa esta transformación:

```typescript
const productosFormateados = productos.map(p => ({
  nombre: p.nombre,
  puntos: p.puntos,
  precio: p.precio,
  imagen: p.imagen_url,  // Nota: imagen_url -> imagen
  descripcion: p.descripcion
}));
```

## 🔐 Seguridad

### Producción

Para producción, crea un usuario específico con permisos limitados:

```sql
CREATE USER 'omnilife_app'@'localhost' IDENTIFIED BY 'contraseña_segura';
GRANT SELECT, INSERT, UPDATE, DELETE ON omnilife_db.* TO 'omnilife_app'@'localhost';
FLUSH PRIVILEGES;
```

Actualiza `.env.production`:

```env
DB_USER=omnilife_app
DB_PASSWORD=contraseña_segura
```

## 📝 Próximos pasos

- [ ] Añadir cache de consultas
- [ ] Implementar paginación
- [ ] Añadir filtros avanzados
- [ ] Sistema de categorías
- [ ] Gestión de inventario
- [ ] Panel de administración

## 💡 Tips

1. **Pool de conexiones**: Ya está configurado automáticamente
2. **Prepared statements**: Todas las consultas usan parámetros seguros
3. **Error handling**: Implementa try-catch en producción
4. **Performance**: El pool mantiene conexiones abiertas para mejor rendimiento

## 📞 Soporte

Si tienes problemas, verifica:

1. MySQL está corriendo
2. Credenciales en `.env` son correctas
3. Base de datos y tablas existen
4. Permisos de usuario correctos
