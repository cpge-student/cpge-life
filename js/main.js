// ============================================
// FICHIER : /js/main.js
// DESCRIPTION : Script principal du site
// ============================================

document.addEventListener('DOMContentLoaded', function() {

    // ========================================
    // 1. MODE SOMBRE (Dark Mode)
    // ========================================
    const themeToggle = document.getElementById('themeToggle');

    if (themeToggle) {
        // Vérifier les préférences système
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }

        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');

            if (currentTheme === 'dark') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }

    // ========================================
    // 2. ANIMATION DES COMPTEURS
    // ========================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');

        counters.forEach(function(counter) {
            const target = parseInt(counter.getAttribute('data-count'));
            if (!target) return;

            const duration = 2000;
            const step = Math.max(1, Math.floor(target / 60));
            let current = 0;

            const interval = setInterval(function() {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }

                // Formatage pour les grands nombres (10K+)
                if (target >= 10000) {
                    counter.textContent = (current / 1000).toFixed(1) + 'K+';
                } else {
                    counter.textContent = current;
                }
            }, duration / 60);
        });
    }

    // Lancer l'animation quand la section est visible
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.3 });

        observer.observe(statsSection);
    }

    // ========================================
    // 3. AFFICHAGE DES CENTRES VEDETTE
    // ========================================
    const centresGrid = document.getElementById('centresGrid');

    if (centresGrid && SITE_DATA.centresVedette) {
        SITE_DATA.centresVedette.forEach(function(centre) {
            const card = document.createElement('div');
            card.className = 'centre-card';

            // Badge des filières
            let filieresHtml = '';
            centre.filieres.forEach(function(f) {
                const cls = f.toLowerCase();
                filieresHtml += `<span class="${cls}">${f}</span>`;
            });

            card.innerHTML = `
                <div class="centre-name">${centre.nom}</div>
                <div class="centre-sigle">${centre.sigle}</div>
                <div class="centre-ville">📍 ${centre.ville}</div>
                <div class="centre-filieres">${filieresHtml}</div>
                <div class="centre-stats">
                    <span>👨‍🎓 <strong>${centre.eleves}</strong> étudiants</span>
                    <span>📊 <strong>${centre.taux}</strong></span>
                </div>
            `;

            centresGrid.appendChild(card);
        });
    }

    // ========================================
    // 4. AFFICHAGE DES FILIÈRES
    // ========================================
    const filieresGrid = document.getElementById('filieresGrid');

    if (filieresGrid && SITE_DATA.filieres) {
        SITE_DATA.filieres.forEach(function(filiere) {
            const card = document.createElement('div');
            card.className = `filiere-card ${filiere.id}`;

            // Banques d'épreuves
            let banquesHtml = filiere.banques.map(function(b) {
                return `<span>${b}</span>`;
            }).join(' • ');

            card.innerHTML = `
                <div class="filiere-icon">${filiere.icone}</div>
                <div class="filiere-title">${filiere.nom} - ${filiere.titre}</div>
                <div class="filiere-banques">
                    <strong>Banques autorisées :</strong> ${banquesHtml}
                </div>
                <a href="#" class="btn">Voir la filière →</a>
            `;

            filieresGrid.appendChild(card);
        });
    }

    // ========================================
    // 5. AFFICHAGE DES TÉMOIGNAGES
    // ========================================
    const temoignagesGrid = document.getElementById('temoignagesGrid');

    if (temoignagesGrid && SITE_DATA.temoignages) {
        SITE_DATA.temoignages.forEach(function(t) {
            const card = document.createElement('div');
            card.className = 'temoignage-card';

            card.innerHTML = `
                <div class="quote">"${t.texte}"</div>
                <div class="author">
                    <span class="name">${t.nom}</span>
                    <span class="school">${t.etablissement}</span>
                    <span class="filiere">${t.filiere} - ${t.annee}</span>
                </div>
            `;

            temoignagesGrid.appendChild(card);
        });
    }

    // ========================================
    // 6. COMPTE À REBOURS - PLACEMENT
    // ========================================
    const countdownSection = document.querySelector('.countdown-section');

    if (countdownSection) {
        // Créer le conteneur des cercles
        const container = document.createElement('div');
        container.className = 'countdown-circles';
        container.id = 'countdownContainer';
        countdownSection.appendChild(container);

        // Charger le script countdown.js
        const script = document.createElement('script');
        script.src = 'js/countdown.js';
        script.defer = true;
        document.body.appendChild(script);
    }

    // ========================================
    // 7. GESTION DE LA RECHERCHE
    // ========================================
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');

    if (searchInput && searchButton) {
        function performSearch() {
            const query = searchInput.value.trim().toLowerCase();
            if (query.length > 0) {
                // Recherche dans les centres
                const centres = SITE_DATA.centresVedette || [];
                const results = centres.filter(function(c) {
                    return c.nom.toLowerCase().includes(query) ||
                           c.ville.toLowerCase().includes(query) ||
                           c.sigle.toLowerCase().includes(query);
                });

                if (results.length > 0) {
                    alert(`🔍 Résultats trouvés : ${results.length} centre(s)\n\n` +
                          results.map(function(r) {
                              return `- ${r.nom} (${r.ville})`;
                          }).join('\n'));
                } else {
                    alert('🔍 Aucun résultat trouvé pour "' + query + '"');
                }
            }
        }

        searchButton.addEventListener('click', performSearch);
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // ========================================
    // 8. ANIMATIONS AU SCROLL
    // ========================================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.centre-card, .filiere-card, .temoignage-card');

        elements.forEach(function(el) {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 80;

            if (isVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Ajouter les styles d'animation
    const style = document.createElement('style');
    style.textContent = `
        .centre-card, .filiere-card, .temoignage-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
    `;
    document.head.appendChild(style);

    // Écouter le scroll
    window.addEventListener('scroll', animateOnScroll);
    setTimeout(animateOnScroll, 500);
});
