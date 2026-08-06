// ============================================
// FICHIER : /js/init.js
// DESCRIPTION : Initialisation de toutes les pages
// ============================================

(function() {
    'use strict';

    function initAccessibility() {
        document.querySelectorAll('a[target="_blank"]').forEach(link => {
            if (!link.getAttribute('aria-label')) {
                const text = link.textContent?.trim() || 'Lien';
                link.setAttribute('aria-label', `${text} (s'ouvre dans un nouvel onglet)`);
            }
        });
    }

    function initDropdowns() {
        document.querySelectorAll('.nav-item').forEach(item => {
            const dropdown = item.querySelector('.dropdown');
            if (!dropdown) return;

            item.addEventListener('mouseenter', function() {
                dropdown.style.opacity = '1';
                dropdown.style.visibility = 'visible';
                dropdown.style.transform = 'translateY(0)';
            });

            item.addEventListener('mouseleave', function() {
                dropdown.style.opacity = '0';
                dropdown.style.visibility = 'hidden';
                dropdown.style.transform = 'translateY(-8px)';
            });
        });
    }

    function initLangSelector() {
        const langBtn = document.querySelector('.lang-btn');
        const dropdown = document.querySelector('.lang-dropdown');
        if (langBtn && dropdown) {
            // Le hover est déjà géré par CSS
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            initAccessibility();
            initDropdowns();
            initLangSelector();
        });
    } else {
        initAccessibility();
        initDropdowns();
        initLangSelector();
    }

})();