/* ============================================================
   NEXTBYTE — main.js
   Form validation, interactions, misc
   ============================================================ */

'use strict';

// ---- CONTACT FORM ----
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<span>Enviando…</span>';
    btn.disabled = true;

    await new Promise(r => setTimeout(r, 1400));

    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      ¡Mensaje enviado!`;
    btn.style.background = 'linear-gradient(135deg, #00ffb3, #00d4ff)';
    btn.style.color = '#03050a';

    setTimeout(() => {
      form.reset();
      btn.innerHTML = orig;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.color = '';
    }, 3000);
  });
}

// ---- ACTIVE NAV LINK ON SCROLL ----
const sections  = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// Add active style
const style = document.createElement('style');
style.textContent = `.nav-links a.active { color: var(--accent) !important; }
.nav-links a.active::after { width: 100% !important; }`;
document.head.appendChild(style);


// ---- TILT EFFECT ON CARDS ----
document.querySelectorAll('.service-card, .team-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect  = card.getBoundingClientRect();
    const cx = rect.left + rect.width  / 2;
    const cy = rect.top  + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width  / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    card.style.transform = `translateY(-6px) perspective(600px) rotateX(${-dy * 5}deg) rotateY(${dx * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});


// ---- YEAR IN FOOTER ----
const yr = document.getElementById('footerYear');
if (yr) yr.textContent = new Date().getFullYear();


// ---- TECH STACK BADGES GLOW ----
document.querySelectorAll('.tech-badge').forEach(b => {
  b.addEventListener('mouseenter', () => {
    b.style.boxShadow = '0 0 16px rgba(0,212,255,.25)';
  });
  b.addEventListener('mouseleave', () => {
    b.style.boxShadow = '';
  });
});


// ---- COPY EMAIL ----
const emailTriggers = document.querySelectorAll('[data-copy-email]');
emailTriggers.forEach(el => {
  el.addEventListener('click', () => {
    const email = el.dataset.copyEmail;
    navigator.clipboard.writeText(email).then(() => {
      const prev = el.textContent;
      el.textContent = '¡Copiado!';
      setTimeout(() => el.textContent = prev, 2000);
    });
  });
});
