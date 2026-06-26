/* ============================================
   Navigation & Header Behavior
   ============================================ */

(function() {
  'use strict';

  // Highlight current page in nav
  function highlightCurrentPage() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a, .mobile-menu a');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      if (href === currentPath || (currentPath === '' && href === 'index.html')) {
        link.classList.add('active');
      }

      // Mark legal/policy pages for footer
      if (href.includes('privacy') || href.includes('terms') || href.includes('compliance')) {
        link.setAttribute('rel', 'noopener');
      }
    });
  }

  // Add subtle background to header on scroll
  function initHeaderBehavior() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let ticking = false;

    function update() {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      ticking = false;
    }

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    highlightCurrentPage();
    initHeaderBehavior();
  });

})();