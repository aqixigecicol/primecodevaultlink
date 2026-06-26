/* ============================================
   Animations JS - primecodevaultlink.com
   ============================================ */

(function() {
  'use strict';

  // ============================================
  // Cursor Glow Follow
  // ============================================
  function initCursorGlow() {
    if (window.innerWidth < 768) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      glowX += (mouseX - glowX) * 0.15;
      glowY += (mouseY - glowY) * 0.15;
      glow.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ============================================
  // Magnetic Buttons
  // ============================================
  function initMagnetic() {
    const magneticElements = document.querySelectorAll('.magnetic');

    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      });

      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  // ============================================
  // Feature Card Mouse Glow
  // ============================================
  function initFeatureCardGlow() {
    const cards = document.querySelectorAll('.feature-card, .app-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mx', `${x}%`);
        card.style.setProperty('--my', `${y}%`);
      });
    });
  }

  // ============================================
  // 3D Tilt Cards
  // ============================================
  function initTiltCards() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
      });
    });
  }

  // ============================================
  // Stagger Reveal Observer
  // ============================================
  function initStaggerObserver() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal, .stagger, .slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, .scale-in, .fade-in').forEach(el => {
      observer.observe(el);
    });
  }

  // ============================================
  // Magnetic Button Ripple
  // ============================================
  function initRippleButtons() {
    document.querySelectorAll('.btn-primary').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const rect = btn.getBoundingClientRect();
        const ripple = document.createElement('span');
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          left: ${e.clientX - rect.left - size / 2}px;
          top: ${e.clientY - rect.top - size / 2}px;
          background: radial-gradient(circle, rgba(255,255,255,0.5), transparent 60%);
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        `;
        btn.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });

    // Inject ripple keyframes
    if (!document.getElementById('ripple-keyframes')) {
      const style = document.createElement('style');
      style.id = 'ripple-keyframes';
      style.textContent = `
        @keyframes ripple {
          to { transform: scale(2); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ============================================
  // Parallax on hero
  // ============================================
  function initParallax() {
    const hero = document.querySelector('.hero-bg-grid, .page-hero .hero-bg-grid');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      if (scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    }, { passive: true });
  }

  // ============================================
  // Init All
  // ============================================
  document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initMagnetic();
    initFeatureCardGlow();
    initTiltCards();
    initStaggerObserver();
    initRippleButtons();
    initParallax();
  });

})();
