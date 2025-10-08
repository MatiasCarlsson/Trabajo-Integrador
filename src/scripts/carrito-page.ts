// Interfaz para tipado de productos del carrito
interface ProductoCarrito {
  id: string;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
}

/**
 * Función principal: carga y renderiza el carrito desde localStorage
 * Se ejecuta al cargar la página y después de cada modificación
 */
function cargarCarrito(): void {
  // Obtener productos del localStorage
  const carrito: ProductoCarrito[] = JSON.parse(
    localStorage.getItem('carrito') || '[]'
  );

  // Obtenerlos elementos del DOM
  const carritoVacio = document.getElementById('carrito-vacio');
  const carritoContenido = document.getElementById('carrito-contenido');
  const itemsCarrito = document.getElementById('items-carrito');
  const totalCarrito = document.getElementById('total-carrito');

  // Si no hay productos, mostrar mensaje de carrito vacío
  if (carrito.length === 0) {
    carritoVacio?.classList.remove('hidden');
    carritoContenido?.classList.add('hidden');
    return;
  }

  // Mostrar contenido del carrito
  carritoVacio?.classList.add('hidden');
  carritoContenido?.classList.remove('hidden');

  // Generar HTML para cada producto del carrito
  const itemsHTML = carrito
    .map(
      (producto) => `
    <div class="flex items-center justify-between border-b pb-4" data-id="${producto.id}">
      <div class="flex-1">
        <h3 class="font-semibold">${producto.nombre}</h3>
        <p class="text-gray-600">Precio: ${formatearPrecio(producto.precio)}</p>
      </div>
      
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <button class="btn-decrementar bg-gray-200 px-3 py-1 rounded" data-id="${producto.id}">-</button>
          <span class="cantidad px-3">${producto.cantidad}</span>
          <button class="btn-incrementar bg-gray-200 px-3 py-1 rounded" data-id="${producto.id}">+</button>
        </div>
        
        <div class="text-right">
          <p class="font-semibold">${formatearPrecio(producto.precio * producto.cantidad)}</p>
          <button class="btn-eliminar text-red-600 text-sm hover:text-red-800" data-id="${producto.id}">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join('');

  // Insertar HTML generado en el DOM
  if (itemsCarrito) {
    itemsCarrito.innerHTML = itemsHTML;
  }

  // Calcular y mostrar el total general
  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );
  if (totalCarrito) {
    totalCarrito.textContent = formatearPrecio(total);
  }

  // Generar mensaje dinámico para WhatsApp
  generarMensajeWhatsApp(carrito, total);

  // Configurar todos los event listeners
  agregarEventListeners();
}

/**
 * Genera el mensaje personalizado para WhatsApp con todos los productos
 * @param carrito - Array de productos en el carrito
 * @param total - Precio total de la compra
 */
function generarMensajeWhatsApp(
  carrito: ProductoCarrito[],
  total: number
): void {
  const botonWhatsApp = document.getElementById(
    'finalizar-compra'
  ) as HTMLAnchorElement;

  if (!botonWhatsApp || carrito.length === 0) return;

  // Crear el mensaje estructurado
  let mensaje = '🛍️ *Hola! Quiero realizar este pedido:*\n\n';

  // Agregar cada producto con sus detalles
  carrito.forEach((producto, index) => {
    mensaje += `${index + 1}. *${producto.nombre}*\n`;
    mensaje += `   • Cantidad: ${producto.cantidad}\n`;
    mensaje += `   • Precio unitario: ${formatearPrecio(producto.precio)}\n`;
    mensaje += `   • Subtotal: ${formatearPrecio(producto.precio * producto.cantidad)}\n\n`;
  });

  // Agregar total y mensaje de cierre
  mensaje += `💰 *TOTAL: ${formatearPrecio(total)}*\n\n`;
  mensaje += '¿Podrías confirmar la disponibilidad y el tiempo de entrega?\n\n';
  mensaje += '¡Gracias! 😊';

  // Codificar el mensaje para usar en URL
  const mensajeCodificado = encodeURIComponent(mensaje);

  // Actualizar el enlace de WhatsApp con el mensaje dinámico
  botonWhatsApp.href = `https://wa.me/5493764725856?text=${mensajeCodificado}`;

  console.log('📱 Mensaje de WhatsApp generado:', mensaje);
}

/**
 * Formatea los precios en pesos argentinos
 * @param precio - Precio numérico a formatear
 * @returns Precio formateado como string
 */
function formatearPrecio(precio: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(precio);
}

/**
 * Configura todos los event listeners para los botones del carrito
 * Se ejecuta después de renderizar el HTML dinámico
 */
function agregarEventListeners(): void {
  // Botones para incrementar cantidad (+)
  document.querySelectorAll('.btn-incrementar').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).dataset.id;
      cambiarCantidad(id!, 1);
    });
  });

  // Botones para decrementar cantidad (-)
  document.querySelectorAll('.btn-decrementar').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).dataset.id;
      cambiarCantidad(id!, -1);
    });
  });

  // Botones para eliminar productos individuales
  document.querySelectorAll('.btn-eliminar').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = (e.target as HTMLElement).dataset.id;
      eliminarProducto(id!);
    });
  });

  // Botón para vaciar todo el carrito
  document.getElementById('limpiar-carrito')?.addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
      localStorage.removeItem('carrito');
      cargarCarrito();
    }
  });
}

/**
 * Modifica la cantidad de un producto específico
 * @param id - ID del producto a modificar
 * @param cambio - Cantidad a sumar o restar (1 o -1)
 */
function cambiarCantidad(id: string, cambio: number): void {
  const carrito: ProductoCarrito[] = JSON.parse(
    localStorage.getItem('carrito') || '[]'
  );
  const producto = carrito.find((item) => item.id === id);

  if (producto) {
    producto.cantidad += cambio;

    // Si la cantidad llega a 0 o menos, eliminar el producto
    if (producto.cantidad <= 0) {
      eliminarProducto(id);
      return;
    }

    // Guardar cambios y recargar la vista
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito(); // Esto regenerará el mensaje de WhatsApp automáticamente
  }
}

/**
 * Elimina un producto específico del carrito
 * @param id - ID del producto a eliminar
 */
function eliminarProducto(id: string): void {
  const carrito: ProductoCarrito[] = JSON.parse(
    localStorage.getItem('carrito') || '[]'
  );
  const carritoFiltrado = carrito.filter((item) => item.id !== id);
  localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
  cargarCarrito(); // Esto regenerará el mensaje de WhatsApp automáticamente
}

document.addEventListener('DOMContentLoaded', cargarCarrito);
