// ============================================
// FICHIER : /js/theme.js
// DESCRIPTION : Gestion centralisée du thème
// ============================================

(function() {
    'use strict';

    window.initTheme = function() {
        const themeToggle = document.getElementById('themeToggle');
        if (!themeToggle) {
            // Si le bouton n'existe pas, on attend un peu
            setTimeout(window.initTheme, 100);
            return;
        }

        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }

        // Supprimer les anciens écouteurs pour éviter les doublons
        themeToggle.removeEventListener('click', window._themeToggleHandler);
        window._themeToggleHandler = function() {
            const current = document.documentElement.getAttribute('data-theme');
            if (current === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        };
        themeToggle.addEventListener('click', window._themeToggleHandler);
    };

    // Exécuter au chargement
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initTheme);
    } else {
        window.initTheme();
    }

})();