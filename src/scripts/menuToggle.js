document.addEventListener('DOMContentLoaded', function () {
  const menuCheckbox = document.getElementById('menu-checkbox');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuToggle = document.getElementById('menu-toggle');

  if (menuCheckbox && mobileMenu && menuToggle) {
    console.log('Elementos del menú encontrados correctamente');

    // Función para actualizar el menú basado en el estado del checkbox
    function updateMenu() {
      if (menuCheckbox.checked) {
        // Menú abierto
        mobileMenu.classList.remove('hidden');
        menuToggle.setAttribute('aria-label', 'Cerrar menú');
        console.log('Menú abierto');
      } else {
        // Menú cerrado
        mobileMenu.classList.add('hidden');
        menuToggle.setAttribute('aria-label', 'Abrir menú');
        console.log('Menú cerrado');
      }
    }

    // Escuchar cambios en el checkbox (esto maneja automáticamente los clics en el label)
    menuCheckbox.addEventListener('change', updateMenu);

    // Función para cerrar el menú
    function cerrarMenu() {
      menuCheckbox.checked = false;
      updateMenu();
      console.log('Menú cerrado desde enlace');
    }

    // Cerrar menú cuando se hace clic en un enlace
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach((link) => {
      link.addEventListener('click', cerrarMenu);
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function (e) {
      const target = e.target;
      const isClickInsideMenu = mobileMenu.contains(target);
      const isClickOnToggle = menuToggle.contains(target);

      if (!isClickInsideMenu && !isClickOnToggle && menuCheckbox.checked) {
        cerrarMenu();
      }
    });

    // Cerrar menú con tecla Escape (accesibilidad)
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuCheckbox.checked) {
        cerrarMenu();
      }
    });

    // Inicializar el estado correcto
    updateMenu();
  } else {
    console.error('No se pudieron encontrar los elementos del menú');
  }
});
