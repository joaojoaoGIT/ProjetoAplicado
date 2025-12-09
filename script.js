// -------------------------
// script.js — arquivo limpo e consolidado
// -------------------------

// Elementos globais
const body = document.body;

// THEME TOGGLE
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  // Aplicar tema salvo
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
    themeToggle.textContent = '☀️';
  } else {
    themeToggle.textContent = '🌙';
  }

  themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// MOBILE MENU
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.querySelector('.nav-links');
if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navLinks) navLinks.classList.remove('active');
      }
    }
  });
});

// NAVBAR SCROLL EFFECT
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// CAROUSEL
const carousel = document.getElementById('carousel');
let slides = [];
let dots = [];
let prevBtn = null;
let nextBtn = null;
let currentSlide = 0;
let carouselInterval = null;

const carouselExplanation = document.getElementById('carouselExplanation');

function showSlide(index) {
  if (!slides || slides.length === 0) return;
  index = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
  if (dots) dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  currentSlide = index;
  try {
    const img = slides[index].querySelector('.carousel-img');
    if (img && carouselExplanation) carouselExplanation.textContent = img.dataset.expl || img.alt || '';
  } catch (err) { /* ignore */ }
}

if (carousel) {
  slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
  dots = Array.from(carousel.querySelectorAll('.carousel-btn'));
  prevBtn = carousel.querySelector('.carousel-prev');
  nextBtn = carousel.querySelector('.carousel-next');

  if (dots.length) dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
  if (prevBtn) prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

  // autoplay
  carouselInterval = setInterval(() => showSlide(currentSlide + 1), 5000);
  carousel.addEventListener('mouseenter', () => clearInterval(carouselInterval));
  carousel.addEventListener('mouseleave', () => { carouselInterval = setInterval(() => showSlide(currentSlide + 1), 5000); });
}

// MODAL FOR IMAGES
const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalClose = document.getElementById('modalClose');

function openImageInModal(src, alt, caption) {
  if (!modal || !modalImg || !modalCaption) return;
  modalImg.src = src || '';
  modalImg.alt = alt || '';
  modalCaption.textContent = caption || '';
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  if (modalImg) modalImg.src = '';
  document.body.style.overflow = '';
}

if (carousel && modal && modalImg && modalCaption) {
  carousel.querySelectorAll('.carousel-img').forEach(img => {
    img.addEventListener('click', (e) => {
      e.preventDefault(); e.stopPropagation();
      const src = img.src || img.getAttribute('src');
      const caption = img.dataset.name || img.alt || '';
      openImageInModal(src, img.alt || '', caption);
    });
  });
}

if (modalClose) modalClose.addEventListener('click', closeModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal || e.target === modalImg) closeModal(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && modal.classList.contains('active')) closeModal(); });

// Click-to-open for flow and db images
const flowImg = document.querySelector('.flow-image');
if (flowImg) flowImg.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openImageInModal(flowImg.src, flowImg.alt || '', flowImg.dataset.name || flowImg.alt || ''); });
const dbImg = document.querySelector('.db-image');
if (dbImg) dbImg.addEventListener('click', (e) => { e.preventDefault(); e.stopPropagation(); openImageInModal(dbImg.src, dbImg.alt || '', dbImg.dataset.name || dbImg.alt || ''); });

// MOCKUP VIDEO: prefer 1.5x playback when possible
document.addEventListener('DOMContentLoaded', () => {
  const mockupVideo = document.getElementById('mockupVideo');
  if (!mockupVideo) return;
  mockupVideo.muted = true;
  mockupVideo.loop = true;

  const applyPlayback = () => {
    try {
      mockupVideo.playbackRate = 1.5;
      const p = mockupVideo.play();
      if (p && typeof p.catch === 'function') p.catch(() => { mockupVideo.muted = true; });
    } catch (e) { /* silent */ }
  };

  if (mockupVideo.readyState >= 2) applyPlayback();
  else mockupVideo.addEventListener('canplay', applyPlayback, { once: true });
});

// EOF
