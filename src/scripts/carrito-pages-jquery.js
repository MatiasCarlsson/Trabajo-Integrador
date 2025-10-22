$(document).ready(function () {
  function updateCartCount() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    let totalCantidad = 0;
    carrito.forEach((producto) => {
      totalCantidad += producto.cantidad;
    });

    const $cartCount = $('#cart-count');

    if (totalCantidad > 0) {
      $cartCount.text(totalCantidad).removeClass('hidden');
    } else {
      $cartCount.addClass('hidden');
    }
  }

  window.updateCartCount = updateCartCount;

  updateCartCount();

  function formatearPrecio(precio) {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
    }).format(precio);
  }

  function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');

    const $carritoVacio = $('#carrito-vacio');
    const $carritoContenido = $('#carrito-contenido');
    const $itemsCarrito = $('#items-carrito');
    const $totalCarrito = $('#total-carrito');

    // Si no hay productos
    if (carrito.length === 0) {
      $carritoVacio.removeClass('hidden');
      $carritoContenido.addClass('hidden');
      return;
    }

    // Mostrar contenido
    $carritoVacio.addClass('hidden');
    $carritoContenido.removeClass('hidden');

    // Generar HTML de productos
    let itemsHTML = '';
    carrito.forEach((producto) => {
      itemsHTML += `
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
      `;
    });

    $itemsCarrito.html(itemsHTML);

    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio * producto.cantidad;
    });
    $totalCarrito.text(formatearPrecio(total));

    generarMensajeWhatsApp(carrito, total);

    agregarEventListeners();

    updateCartCount();
  }

  function generarMensajeWhatsApp(carrito, total) {
    const $botonWhatsApp = $('#finalizar-compra');

    if ($botonWhatsApp.length === 0 || carrito.length === 0) return;

    let mensaje = '🛍️ *Hola! Quiero realizar este pedido:*\n\n';

    carrito.forEach((producto, index) => {
      mensaje += `${index + 1}. *${producto.nombre}*\n`;
      mensaje += `   • Cantidad: ${producto.cantidad}\n`;
      mensaje += `   • Precio unitario: ${formatearPrecio(producto.precio)}\n`;
      mensaje += `   • Subtotal: ${formatearPrecio(producto.precio * producto.cantidad)}\n\n`;
    });

    mensaje += `💰 *TOTAL: ${formatearPrecio(total)}*\n\n`;
    mensaje +=
      '¿Podrías confirmar la disponibilidad y el tiempo de entrega?\n\n';
    mensaje += '¡Gracias! 😊';

    const mensajeCodificado = encodeURIComponent(mensaje);
    $botonWhatsApp.attr(
      'href',
      `https://wa.me/5493764725856?text=${mensajeCodificado}`
    );
  }

  function agregarEventListeners() {
    // Incrementar cantidad
    $('.btn-incrementar')
      .off('click')
      .on('click', function () {
        const id = $(this).data('id');
        cambiarCantidad(id, 1);
      });

    // Decrementar cantidad
    $('.btn-decrementar')
      .off('click')
      .on('click', function () {
        const id = $(this).data('id');
        cambiarCantidad(id, -1);
      });

    // Eliminar producto
    $('.btn-eliminar')
      .off('click')
      .on('click', function () {
        const id = $(this).data('id');
        eliminarProducto(id);
      });

    // Vaciar carrito
    $('#limpiar-carrito')
      .off('click')
      .on('click', function () {
        if (confirm('¿Estás seguro de que quieres vaciar el carrito?')) {
          localStorage.removeItem('carrito');
          cargarCarrito();
        }
      });
  }

  function cambiarCantidad(id, cambio) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const producto = carrito.find((item) => item.id === id);

    if (producto) {
      producto.cantidad += cambio;

      if (producto.cantidad <= 0) {
        eliminarProducto(id);
        return;
      }

      localStorage.setItem('carrito', JSON.stringify(carrito));
      cargarCarrito();
    }
  }

  function eliminarProducto(id) {
    const carrito = JSON.parse(localStorage.getItem('carrito') || '[]');
    const carritoFiltrado = carrito.filter((item) => item.id !== id);
    localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));
    cargarCarrito();
  }

  if ($('#carrito-container').length > 0) {
    cargarCarrito();
  }
});
