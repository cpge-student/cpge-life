// ============================================
// FICHIER : /js/lang.js
// DESCRIPTION : Gestion multilingue centralisée
// ============================================

const LANGUAGES = {
    fr: { name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    en: { name: 'English', flag: '🇬🇧', dir: 'ltr' },
    ar: { name: 'العربية', flag: '🇲🇦', dir: 'rtl' },
    tr: { name: 'Türkçe', flag: '🇹🇷', dir: 'ltr' }
};

let currentLang = localStorage.getItem('lang') || 'fr';
let translations = {};
let isTranslating = false;

// ============================================================
// CHARGEMENT DES TRADUCTIONS
// ============================================================
async function loadLanguage(lang) {
    if (isTranslating) return;
    isTranslating = true;

    try {
        const response = await fetch(`lang/${lang}.json`);
        if (!response.ok) throw new Error(`Fichier ${lang}.json introuvable`);
        translations = await response.json();
        currentLang = lang;
        localStorage.setItem('lang', lang);
        applyTranslations();
        updateLangDirection();
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang: lang } }));
        isTranslating = false;
        return true;
    } catch (error) {
        console.warn(`Erreur chargement ${lang}:`, error);
        if (lang !== 'fr') {
            isTranslating = false;
            return loadLanguage('fr');
        }
        isTranslating = false;
        return false;
    }
}

// ============================================================
// APPLICATION DES TRADUCTIONS
// ============================================================
function applyTranslations() {
    if (!translations || Object.keys(translations).length === 0) return;

    // Éléments avec data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = getNestedValue(translations, key);
        if (value !== undefined && value !== null) {
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

    // Éléments avec data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const value = getNestedValue(translations, key);
        if (value !== undefined && value !== null) {
            el.innerHTML = value;
        }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = getNestedValue(translations, key);
        if (value !== undefined && value !== null) {
            el.placeholder = value;
        }
    });

    // Titles
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
        const key = el.getAttribute('data-i18n-title');
        const value = getNestedValue(translations, key);
        if (value !== undefined && value !== null) {
            el.title = value;
        }
    });

    // Alt
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
        const key = el.getAttribute('data-i18n-alt');
        const value = getNestedValue(translations, key);
        if (value !== undefined && value !== null) {
            el.alt = value;
        }
    });

    // Bouton de langue
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        const langInfo = LANGUAGES[currentLang];
        if (langInfo) {
            langBtn.innerHTML = `<i class="fas fa-globe"></i> ${langInfo.flag} ${langInfo.name}`;
        }
    }

    // Dropdown des langues
    document.querySelectorAll('.lang-dropdown a').forEach(link => {
        const lang = link.getAttribute('data-lang');
        if (lang && LANGUAGES[lang]) {
            const info = LANGUAGES[lang];
            link.innerHTML = `${info.flag} ${info.name}`;
        }
    });

    // Titre de la page
    if (translations.site && translations.site.name) {
        const slogan = translations.site.slogan || '';
        document.title = translations.site.name + (slogan ? ' - ' + slogan : '');
    }
}

// ============================================================
// UTILITAIRES
// ============================================================
function getNestedValue(obj, path) {
    if (!obj || !path) return undefined;
    return path.split('.').reduce((acc, part) => {
        if (acc && acc[part] !== undefined && acc[part] !== null) {
            return acc[part];
        }
        return undefined;
    }, obj);
}

function updateLangDirection() {
    const dir = LANGUAGES[currentLang]?.dir || 'ltr';
    document.documentElement.dir = dir;
    document.documentElement.lang = currentLang;
    if (dir === 'rtl') {
        document.body.classList.add('rtl');
    } else {
        document.body.classList.remove('rtl');
    }
}

async function changeLanguage(lang) {
    if (lang === currentLang || isTranslating) return;
    await loadLanguage(lang);
    // Recharger les données dynamiques
    if (window.renderEcoles) window.renderEcoles();
    if (window.renderFilieres) window.renderFilieres();
    if (window.renderCentres) window.renderCentres();
    if (window.renderTemoignages) window.renderTemoignages();
}

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    const savedLang = localStorage.getItem('lang') || 'fr';
    loadLanguage(savedLang);

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
window.getTranslations = () => translations;
window.loadLanguage = loadLanguage;