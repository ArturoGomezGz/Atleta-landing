/* ============================================================
   Atleta — main.js
   ============================================================ */

// --- Nav scroll ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// --- Hamburger ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger?.addEventListener('click', () => {
  const open = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open);
  const [s1, s2, s3] = hamburger.querySelectorAll('span');
  if (open) {
    s1.style.cssText = 'transform: rotate(45deg) translate(5px, 5px)';
    s2.style.opacity = '0';
    s3.style.cssText = 'transform: rotate(-45deg) translate(5px, -5px)';
  } else {
    [s1, s2, s3].forEach(s => (s.style.cssText = ''));
  }
});

mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => (s.style.cssText = ''));
  });
});

// --- Reveal on scroll ---
const revealEls = document.querySelectorAll(
  '.feature-card, .testimonial-card, .problem-card, .flow-step, .proof-stat, .metric-card, .hero__mockup'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = (i % 4) * 80;
      setTimeout(() => entry.target.classList.add('visible'), delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// --- Bar chart animation ---
const bars = document.querySelectorAll('.chart-bar');
const chartObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.style.height;
      entry.target.style.height = '0%';
      requestAnimationFrame(() => {
        setTimeout(() => { entry.target.style.height = target; }, 100);
      });
      chartObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

bars.forEach(bar => chartObserver.observe(bar));

// --- Form ---
async function handleForm(e) {
  e.preventDefault();
  const form = e.target;
  const data = {
    nombre: form[0].value,
    email:  form[1].value,
  };

  try {
    await fetch('https://n8n-production-d43c.up.railway.app/webhook-test/acceso-anticipado', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch (err) {
    console.error('Error al enviar:', err);
  }

  const toast = document.getElementById('toast');
  toast.classList.add('show');
  form.reset();
  setTimeout(() => toast.classList.remove('show'), 4500);
}
