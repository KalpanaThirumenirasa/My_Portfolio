document.getElementById('year').textContent = new Date().getFullYear();

// Scroll progress bar + header shadow
const header = document.getElementById('header');
const progressBar = document.getElementById('progress-bar');

function onScroll() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = progress + '%';
  header.classList.toggle('scrolled', scrollTop > 10);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Mobile nav toggle
const navToggle = document.getElementById('nav-toggle');
const nav = document.getElementById('nav');

navToggle.addEventListener('click', () => {
  nav.classList.toggle('open');
  navToggle.classList.toggle('active');
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle.classList.remove('active');
  });
});

// Scroll-spy for active nav link
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav a');

const spyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const link = document.querySelector(`.nav a[href="#${id}"]`);
    if (!link) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

sections.forEach(section => spyObserver.observe(section));

// Reveal-on-scroll animation
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  revealObserver.observe(el);
});
