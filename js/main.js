/* ============================================
   Main JS - primecodevaultlink.com
   ============================================ */

(function() {
  'use strict';

  // Loading screen
  window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
      setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 600);
      }, 400);
    }
  });

  // Header scroll effect
  const header = document.querySelector('.site-header');
  function handleScroll() {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll, { passive: true });

  // Mobile menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');

  function openMobileMenu() {
    mobileMenu?.classList.add('open');
    mobileOverlay?.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    mobileOverlay?.classList.remove('open');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileOverlay?.addEventListener('click', closeMobileMenu);

  document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const isOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('open');
      });

      if (!isOpen) {
        item.classList.add('open');
      }
    });
  });

  // Counter animation
  function animateCounters() {
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-counter'), 10);
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 1800;
      const start = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(target * eased);
        counter.textContent = current.toLocaleString() + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target.toLocaleString() + suffix;
        }
      }
      requestAnimationFrame(update);
    });
  }

  // Reveal-on-scroll with safe fallback
  function initReveal() {
    const reveals = document.querySelectorAll('.reveal, .stagger, .slide-in-left, .slide-in-right, .slide-in-up, .slide-in-down, .scale-in, .fade-in');
    reveals.forEach(el => el.classList.add('reveal-init'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
      reveals.forEach(el => observer.observe(el));

      // Force-reveal everything above the fold after 1.2s as a safety net
      setTimeout(() => {
        reveals.forEach(el => el.classList.add('visible'));
      }, 1200);
    } else {
      reveals.forEach(el => el.classList.add('visible'));
    }
  }
  initReveal();

  // Intersection Observer for counters
  if ('IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    document.querySelectorAll('[data-counter]').forEach(el => counterObserver.observe(el));
  }

  // Particles for hero
  function createParticles() {
    const container = document.querySelector('.hero-particles');
    if (!container) return;

    const particleCount = window.innerWidth < 768 ? 18 : 35;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = (10 + Math.random() * 10) + 's';

      const size = 1 + Math.random() * 2.5;
      particle.style.width = size + 'px';
      particle.style.height = size + 'px';

      const colors = ['#00d4ff', '#8b5cf6', '#e82127'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      particle.style.background = color;
      particle.style.boxShadow = `0 0 ${4 + size * 2}px ${color}`;

      container.appendChild(particle);
    }
  }
  createParticles();

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerHeight = header?.offsetHeight || 80;
        const offsetTop = target.offsetTop - headerHeight - 20;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });

  // Form submit
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const submitBtn = this.querySelector('[type="submit"]');
      const originalText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';

      setTimeout(() => {
        submitBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> Message Sent!';
        submitBtn.style.background = 'linear-gradient(135deg, #22d3a8, #00d4ff)';

        setTimeout(() => {
          this.reset();
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
          submitBtn.style.background = '';
        }, 3000);
      }, 1200);
    });
  });

  // Active nav
  function updateActiveNav() {
    const path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-menu a, .mobile-menu a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
  updateActiveNav();

  // Console branding
  console.log('%c primecodevaultlink ', 'background: linear-gradient(135deg, #00d4ff, #8b5cf6); color: white; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: bold;');
  console.log('%c Engineering Calm Technology ', 'color: #00d4ff; font-size: 12px;');

})();
