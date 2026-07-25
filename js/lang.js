// ============================================
// FICHIER : /js/lang.js
// DESCRIPTION : Gestion du multilingue
// ============================================

const LANGUAGES = {
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
    tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' }
};

let currentLang = localStorage.getItem('lang') || 'fr';
let translations = {};

// ============================================================
// CHARGEMENT DES TRADUCTIONS
// ============================================================
async function loadLanguage(lang) {
    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) throw new Error(`Fichier ${lang}.json introuvable`);
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();
        updateLangDirection();
        return true;
    } catch (error) {
        console.warn(`Erreur chargement ${lang}:`, error);
        // Fallback vers français
        if (lang !== 'fr') {
            return loadLanguage('fr');
        }
        return false;
    }
}

// ============================================================
// APPLICATION DES TRADUCTIONS
// ============================================================
function applyTranslations() {
    // Sélecteurs avec attributs data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        if (value !== undefined) {
            // Si c'est un input, mettre dans placeholder ou value
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                if (el.getAttribute('data-i18n-type') === 'placeholder') {
                    el.placeholder = value;
                } else {
                    el.value = value;
                }
            } else {
                el.textContent = value;
            }
        }
    });

    // Mettre à jour le bouton de langue
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        const langInfo = LANGUAGES[currentLang];
        langBtn.innerHTML = `<i class="fas fa-globe"></i> ${langInfo.flag} ${langInfo.name}`;
    }

    // Mettre à jour les liens du dropdown
    document.querySelectorAll('.lang-dropdown a').forEach(link => {
        const lang = link.getAttribute('data-lang');
        if (lang) {
            const info = LANGUAGES[lang];
            link.innerHTML = `${info.flag} ${info.name}`;
        }
    });

    // Mettre à jour le titre de la page
    if (translations.site && translations.site.name) {
        document.title = translations.site.name + ' - ' + (translations.site.slogan || '');
    }
}

// ============================================================
// FONCTION UTILITAIRE
// ============================================================
function getNestedValue(obj, path) {
    return path.split('.').reduce((acc, part) => acc && acc[part] !== undefined ? acc[part] : undefined, obj);
}

// ============================================================
// DIRECTION RTL/LTR
// ============================================================
function updateLangDirection() {
    const dir = LANGUAGES[currentLang]?.dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;

    // Ajuster le style pour RTL
    if (dir === 'rtl') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
}

// ============================================================
// CHANGEMENT DE LANGUE
// ============================================================
async function changeLanguage(lang) {
    if (lang === currentLang) return;
    await loadLanguage(lang);
    // Recharger les données dynamiques si nécessaire
    if (window.renderEcoles) window.renderEcoles();
    if (window.renderFilieres) window.renderFilieres();
    if (window.renderCentres) window.renderCentres();
}

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', async function() {
    // Charger la langue sauvegardée
    const savedLang = localStorage.getItem('lang') || 'fr';
    await loadLanguage(savedLang);

    // Gestionnaire des clics sur les langues
    document.querySelectorAll('.lang-dropdown a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            if (lang) {
                changeLanguage(lang);
            }
        });
    });
});

// Exposer les fonctions globalement
window.changeLanguage = changeLanguage;
window.currentLang = () => currentLang;
window.t = (key) => getNestedValue(translations, key);