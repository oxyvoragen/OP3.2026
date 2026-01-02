// app.js
// Animasi sederhana dengan anime.js dan interaksi mobile menu + form
// Pastikan anime.js sudah dimuat (index.html memuat anime.js via CDN)

document.addEventListener('DOMContentLoaded', () => {
  // Hero title animation
  if (typeof anime !== 'undefined') {
    anime.timeline({ easing: 'easeOutExpo', duration: 700 })
      .add({
        targets: '#heroTitle',
        translateY: [-30, 0],
        opacity: [0, 1],
        delay: 200
      })
      .add({
        targets: '#heroSubtitle',
        translateY: [-20, 0],
        opacity: [0, 1],
        offset: '-=400'
      })
      .add({
        targets: '.nav-link',
        opacity: [0, 1],
        translateY: [-10, 0],
        delay: anime.stagger(60),
        offset: '-=400'
      });
  }

  // Reveal on scroll for .reveal elements
  const revealEls = document.querySelectorAll('.reveal, .reveal-card');
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        if (typeof anime !== 'undefined') {
          anime({
            targets: el,
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 700,
            easing: 'easeOutCubic',
            delay: el.classList.contains('reveal-card') ? 100 : 0
          });
        } else {
          el.style.opacity = 1;
          el.style.transform = 'none';
        }
        io.unobserve(el);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(20px)';
    io.observe(el);
  });

  // Mobile menu toggle
  const btnMobile = document.getElementById('btnMobile');
  const mobileMenu = document.getElementById('mobileMenu');
  btnMobile && btnMobile.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    // simple icon switch
    const icon = document.getElementById('iconMenu');
    if (!mobileMenu.classList.contains('hidden')) {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>';
    } else {
      icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"/>';
    }
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if (href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Contact form (demo: prevent real submit and show simple animation)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.disabled = true;
      const original = btn.innerHTML;
      btn.innerHTML = 'Mengirim...';

      // fake send delay
      setTimeout(() => {
        if (typeof anime !== 'undefined') {
          anime({
            targets: '#contactForm',
            scale: [1, 0.98, 1],
            duration: 600,
            easing: 'easeOutElastic(1, .6)'
          });
        }
        alert('Terima kasih! Pesan Anda telah dikirim (demo).');
        btn.disabled = false;
        btn.innerHTML = original;
        contactForm.reset();
      }, 900);
    });
  }
});
