/* ══════════════════════════════════════════════
   KERL JAN SUMONTAO — Portfolio JS
   ══════════════════════════════════════════════ */

// ── Portfolio filter ──
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item[data-category]');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      const cat = item.dataset.category;
      if (filter === 'all' || cat === filter || cat === 'all') {
        item.classList.remove('hidden');
        item.style.animation = 'fadeIn 0.35s ease forwards';
      } else {
        item.classList.add('hidden');
      }
    });
  });
});

// ── Smooth nav highlight on scroll ──
const sections = document.querySelectorAll('section[id], footer[id]');
const navLinks = document.querySelectorAll('.nav-links a, .hero-nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -50% 0px',
  threshold: 0
};

const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.opacity = '0.5';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.opacity = '1';
          link.style.fontWeight = '600';
        } else {
          link.style.fontWeight = '400';
        }
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ── Nav shrink on scroll ──
const topNav = document.getElementById('top-nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 80) {
    topNav.style.padding = '0.75rem 3rem';
    topNav.style.background = 'rgba(17,17,17,0.97)';
    topNav.style.backdropFilter = 'blur(8px)';
  } else {
    topNav.style.padding = '1.1rem 3rem';
    topNav.style.background = '#111111';
    topNav.style.backdropFilter = 'none';
  }
});

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submit-btn');
  const success = document.getElementById('form-success');

  btn.textContent = 'SENDING...';
  btn.style.opacity = '0.6';

  setTimeout(() => {
    btn.textContent = 'SENT ✓';
    success.style.display = 'block';
    document.getElementById('contact-form').reset();

    setTimeout(() => {
      btn.textContent = 'SUBMIT';
      btn.style.opacity = '1';
      success.style.display = 'none';
    }, 4000);
  }, 1200);
}

// ── Scroll-in animation ──
const animElems = document.querySelectorAll(
  '.service-card, .skill-item, .portfolio-item, .form-field, .section-title-wrap'
);

const animObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      animObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

animElems.forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(22px)';
  el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
  animObserver.observe(el);
});

// ── Keyframes via JS (for portfolio filter) ──
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.97); }
    to   { opacity: 1; transform: scale(1); }
  }
`;
document.head.appendChild(style);
