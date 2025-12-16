/**
 * Carrusel de Productos Populares
 * Maneja la rotación automática de productos cada 5 segundos
 * con pausa al hacer hover y navegación manual por indicadores
 */

export function initCarouselProductos() {
  const carousel = document.getElementById('carousel-productos');
  if (!carousel) return;

  const track = carousel.querySelector('.carousel-track');
  const dots = carousel.querySelectorAll('.carousel-dot');
  const items = carousel.querySelectorAll('.carousel-item');
  let currentIndex = 0;
  let autoplayInterval: number;

  /**
   * Actualiza la posición del carrusel y los indicadores
   */
  function updateCarousel(index: number) {
    currentIndex = index;
    const offset = -100 * currentIndex;
    
    if (track) {
      (track as HTMLElement).style.transform = `translateX(${offset}%)`;
    }

    // Actualizar indicadores
    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.remove('bg-gray-300');
        dot.classList.add('bg-bloom-primary');
      } else {
        dot.classList.remove('bg-bloom-primary');
        dot.classList.add('bg-gray-300');
      }
    });
  }

  /**
   * Avanza al siguiente producto
   */
  function nextSlide() {
    const next = (currentIndex + 1) % items.length;
    updateCarousel(next);
  }

  /**
   * Inicia la rotación automática cada 5 segundos
   */
  function startAutoplay() {
    autoplayInterval = window.setInterval(nextSlide, 5000);
  }

  /**
   * Detiene la rotación automática
   */
  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
    }
  }

  // Click en indicadores para navegación manual
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt((dot as HTMLElement).dataset.index || '0');
      stopAutoplay();
      updateCarousel(index);
      startAutoplay();
    });
  });

  // Pausar al hacer hover sobre el carrusel
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  // Iniciar autoplay
  startAutoplay();
}
