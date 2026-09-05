const catalogBtn = document.getElementById('catalogBtn');
const menuToggle = document.getElementById('menuToggle');
const menu = document.getElementById('menu');
const navbar = document.getElementById('navbar');
const floatingWhatsapp = document.getElementById('floatingWhatsapp');

const whatsappCatalog =
  'https://wa.me/59896018390?text=Hola%20Cathy!%20Quiero%20ver%20el%20cat%C3%A1logo';

catalogBtn?.addEventListener('click', () => {
  window.open(whatsappCatalog, '_blank', 'noopener,noreferrer');
});

// Botón flotante de WhatsApp
floatingWhatsapp?.addEventListener('click', () => {
  window.open(
    'https://wa.me/59896018390?text=Hola%20Cathy!%20Quiero%20hacer%20una%20consulta',
    '_blank',
    'noopener,noreferrer'
  );
});

// Menú móvil
menuToggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('active');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

// Cerrar menú al tocar un enlace
document.querySelectorAll('.menu-link').forEach(link => {
  link.addEventListener('click', () => {
    menu?.classList.remove('active');
    menuToggle?.classList.remove('active');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

// Navbar con efecto al hacer scroll
function updateNavbar() {
  navbar?.classList.toggle('scrolled', window.scrollY > 45);
}

window.addEventListener('scroll', updateNavbar, { passive: true });
updateNavbar();

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    event.preventDefault();

    const offset = 85;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: y,
      behavior: 'smooth'
    });
  });
});

// Animaciones de entrada
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// Contadores
const statNumbers = document.querySelectorAll('[data-count]');

const statsObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const element = entry.target;
      const target = Number(element.dataset.count);
      const duration = 1200;
      const start = performance.now();

      function animate(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);

        element.textContent = Math.floor(target * eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      }

      requestAnimationFrame(animate);
      statsObserver.unobserve(element);
    });
  },
  { threshold: 0.7 }
);

statNumbers.forEach(el => statsObserver.observe(el));

// Activar la sección actual en el menú
const sections = document.querySelectorAll('main section[id], header[id]');
const menuLinks = document.querySelectorAll('.menu-link');

const sectionObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      menuLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: '-35% 0px -55% 0px' }
);

sections.forEach(section => sectionObserver.observe(section));

// Procesar el embed de Instagram cuando termina de cargar
window.addEventListener('load', () => {
  if (window.instgrm) {
    window.instgrm.Embeds.process();
  }
});
