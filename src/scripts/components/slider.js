/**
 * Inicializa un slider con imágenes y texto
 * @param {Array} images - Array de objetos con propiedades src, alt, text o array de URLs de imágenes
 * @param {string} sliderId - ID del contenedor del slider
 * @param {Object} options - Opciones adicionales (autoplay, etc)
 */
export function initSlider(images, sliderId = 'sliderAbout', options = {}) {
  console.log('Iniciando slider con imágenes:', images);

  if (!images || !images.length) {
    console.error('No se proporcionaron imágenes para el slider');
    return;
  }

  // Elementos del DOM
  const sliderContainer = document.getElementById(sliderId);
  const img = document.getElementById('sliderImage');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  const aboutText = document.getElementById('aboutText');

  if (!sliderContainer || !img || !prevBtn || !nextBtn) {
    console.error(
      'No se encontraron todos los elementos necesarios para el slider'
    );
    return;
  }

  let currentIndex = 0;

  // Determina si estamos usando un array simple de URLs o un array de objetos completos
  const isSimpleArray = typeof images[0] === 'string';

  function updateSlider() {
    if (isSimpleArray) {
      // Si es un array simple de URLs
      img.src = images[currentIndex];
      img.alt = `Slide ${currentIndex + 1}`;

      // Si hay un elemento de texto y options.texts está definido
      if (aboutText && options.texts && options.texts[currentIndex]) {
        aboutText.textContent = options.texts[currentIndex];
      }
    } else {
      // Si es un array de objetos completos
      img.src = images[currentIndex].src || images[currentIndex].image;
      img.alt = images[currentIndex].alt || `Slide ${currentIndex + 1}`;

      if (aboutText && images[currentIndex].text) {
        aboutText.textContent = images[currentIndex].text;
      }
    }

    // Animación opcional
    // img.style.opacity = 0;
    // setTimeout(() => {
    //   img.style.opacity = 1;
    // }, 100);
  }

  function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateSlider();
  }

  function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateSlider();
  }

  // Event listeners
  prevBtn.addEventListener('click', prevImage);
  nextBtn.addEventListener('click', nextImage);

  // Autoplay opcional
  // Autoplay opcional
  if (options.autoplay) {
    let interval; // Declarar la variable fuera para poder reasignarla

    // Función para iniciar el autoplay
    function startAutoplay() {
      // Limpiar cualquier intervalo existente primero
      if (interval) clearInterval(interval);
      interval = setInterval(nextImage, options.autoplaySpeed || 3000);
    }

    // Iniciar el autoplay inicialmente
    startAutoplay();

    // Detener autoplay al pasar el mouse por encima
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(interval);
      interval = null; // Importante: marcar como null para saber que fue limpiado
    });

    // Reiniciar autoplay al quitar el mouse
    if (options.resumeAutoplay) {
      sliderContainer.addEventListener('mouseleave', () => {
        startAutoplay(); // Reutilizar la función para iniciar
      });
    }

    // Limpiar el intervalo cuando se destruye el componente
    window.addEventListener('beforeunload', () => {
      if (interval) clearInterval(interval);
    });
  }
  updateSlider();

  // Devolver métodos públicos para control externo
  return {
    next: nextImage,
    prev: prevImage,
    goTo: (index) => {
      currentIndex = index % images.length;
      updateSlider();
    },
  };
}
