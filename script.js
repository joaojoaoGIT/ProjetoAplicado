// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check saved theme
if (localStorage.getItem('theme') === 'dark') {
  body.classList.add('dark');
  themeToggle.textContent = '☀️';
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// Mobile Menu
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      navLinks.classList.remove('active');
    }
  });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Carousel
const carousel = document.getElementById('carousel');
const slides = carousel.querySelectorAll('.carousel-slide');
const dots = carousel.querySelectorAll('.carousel-btn');
const prevBtn = carousel.querySelector('.carousel-prev');
const nextBtn = carousel.querySelector('.carousel-next');
let currentSlide = 0;

const carouselExplanation = document.getElementById('carouselExplanation');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  currentSlide = index;
  // Atualiza a explicação abaixo do carrossel com o dataset da imagem ativa
  try {
    const img = slides[index].querySelector('.carousel-img');
    if (img && carouselExplanation) {
      carouselExplanation.textContent = img.dataset.expl || img.alt || '';
    }
  } catch (err) {
    // silencioso
  }
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => showSlide(i));
});

prevBtn.addEventListener('click', () => {
  showSlide(currentSlide === 0 ? slides.length - 1 : currentSlide - 1);
});

nextBtn.addEventListener('click', () => {
  showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
});

// Auto-play carousel
let carouselInterval = setInterval(() => {
  showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
}, 5000);

// Pause autoplay on mouse enter, resume on leave
carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
carousel.addEventListener('mouseleave', () => {
  carouselInterval = setInterval(() => {
    showSlide(currentSlide === slides.length - 1 ? 0 : currentSlide + 1);
  }, 5000);
});

// Modal (ampliar imagem ao clicar)
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

// Abrir modal ao clicar em qualquer imagem do carrossel
carousel.querySelectorAll('.carousel-img').forEach(img => {
  img.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const src = img.src || img.getAttribute('src');
    const caption = img.dataset.name || img.alt || '';
    console.log('[carousel click] img src:', src, 'name:', caption);
    modalImg.src = src;
    modalImg.alt = img.alt || '';
    modalCaption.textContent = caption;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

// Fechar modal
function closeModal() {
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  modalImg.src = '';
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if (e.target === modal || e.target === modalImg) {
    closeModal();
  }
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
});

// Permitir abrir o modal também a partir da imagem do fluxograma
const flowImg = document.querySelector('.flow-image');
if (flowImg) {
  flowImg.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('[flowImg click] src:', flowImg.src, 'name:', flowImg.dataset.name);
    modalImg.src = flowImg.src;
    modalImg.alt = flowImg.alt || '';
    modalCaption.textContent = flowImg.dataset.name || flowImg.alt || '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

// Permitir abrir o modal a partir da imagem do Banco de Dados (se existir)
const dbImg = document.querySelector('.db-image');
if (dbImg) {
  dbImg.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('[dbImg click] src:', dbImg.src, 'name:', dbImg.dataset.name);
    modalImg.src = dbImg.src;
    modalImg.alt = dbImg.alt || '';
    modalCaption.textContent = dbImg.dataset.name || dbImg.alt || '';
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
}

// Abrir modal ao clicar em fotos dos team-cards / team-single-card
// Removed modal opening for team images per design: team images no longer open modal.
