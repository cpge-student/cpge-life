// ============================================
// FICHIER : /js/search.js
// DESCRIPTION : Système de recherche global
// ============================================

// ============================================================
// DONNÉES DE RECHERCHE
// ============================================================
let searchData = {
    cours: [],
    ecoles: [],
    centres: [],
    annales: [],
    documents: []
};

// ============================================================
// INITIALISATION
// ============================================================
document.addEventListener('DOMContentLoaded', function() {
    // Indexer les données
    indexData();

    // Gestionnaire de recherche
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');

    if (searchInput) {
        searchInput.addEventListener('input', function(e) {
            const query = this.value.trim();
            if (query.length >= 2) {
                performSearch(query);
            } else {
                clearSearchResults();
            }
        });

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query.length >= 2) {
                    performSearch(query);
                }
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const input = document.querySelector('.search-bar input');
            const query = input ? input.value.trim() : '';
            if (query.length >= 2) {
                performSearch(query);
            }
        });
    }
});

// ============================================================
// INDEXATION DES DONNÉES
// ============================================================
function indexData() {
    // Index des centres
    if (typeof centresData !== 'undefined') {
        searchData.centres = centresData.map(c => ({
            id: c.id,
            title: c.nom,
            subtitle: c.sigle + ' · ' + c.ville,
            type: 'centres',
            url: 'centres.html',
            filieres: c.filieres,
            region: c.region
        }));
    }

    // Index des écoles marocaines
    if (typeof ECOLES_DATA !== 'undefined') {
        searchData.ecoles = ECOLES_DATA.map(e => ({
            id: e.id,
            title: e.nom,
            subtitle: e.acronyme + ' · ' + e.ville,
            type: 'ecoles',
            url: 'grandes-ecoles-maroc.html',
            filieres: e.filieres
        }));
    }

    // Index des écoles françaises
    if (typeof ECOLES_FRANCE_DATA !== 'undefined') {
        ECOLES_FRANCE_DATA.forEach(e => {
            searchData.ecoles.push({
                id: e.id || e.nom,
                title: e.nom,
                subtitle: e.ville + ' · ' + e.banque,
                type: 'ecoles',
                url: `ecole-france-detail.html?id=${e.id || 0}`,
                filieres: e.filieres || []
            });
        });
    }

    // Index des filières
    if (typeof SITE_DATA !== 'undefined' && SITE_DATA.filieres) {
        SITE_DATA.filieres.forEach(f => {
            searchData.documents.push({
                id: f.id,
                title: f.nom + ' - ' + f.titre,
                subtitle: f.matieres ? f.matieres.join(' · ') : '',
                type: 'documents',
                url: `filiere-${f.id}.html`
            });
        });
    }

    // Index des annales (simulé)
    const banques = ['X-ENS', 'CCS', 'CCMP', 'CCINP', 'CNC'];
    const filieres = ['MP', 'PSI', 'TSI'];
    const annees = [2026, 2025, 2024, 2023, 2022];

    banques.forEach(b => {
        filieres.forEach(f => {
            annees.forEach(a => {
                searchData.annales.push({
                    id: `${b}-${f}-${a}`,
                    title: `${b} - ${f} - ${a}`,
                    subtitle: `Annales ${b} - ${f}`,
                    type: 'annales',
                    url: 'annales.html'
                });
            });
        });
    });
}

// ============================================================
// RECHERCHE
// ============================================================
function performSearch(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    // Recherche dans toutes les catégories
    Object.keys(searchData).forEach(category => {
        searchData[category].forEach(item => {
            const matchTitle = item.title.toLowerCase().includes(lowerQuery);
            const matchSubtitle = item.subtitle && item.subtitle.toLowerCase().includes(lowerQuery);
            const matchFiliere = item.filieres && item.filieres.some(f => f.toLowerCase().includes(lowerQuery));

            if (matchTitle || matchSubtitle || matchFiliere) {
                results.push({
                    ...item,
                    category: category,
                    score: (matchTitle ? 3 : 0) + (matchSubtitle ? 2 : 0) + (matchFiliere ? 1 : 0)
                });
            }
        });
    });

    // Trier par score
    results.sort((a, b) => b.score - a.score);

    // Afficher les résultats
    displayResults(results, query);
}

// ============================================================
// AFFICHAGE DES RÉSULTATS
// ============================================================
function displayResults(results, query) {
    // Supprimer les anciens résultats
    clearSearchResults();

    if (results.length === 0) {
        showNoResults(query);
        return;
    }

    // Limiter à 10 résultats
    const maxResults = 10;
    const displayResults = results.slice(0, maxResults);

    const container = document.createElement('div');
    container.className = 'search-results-dropdown';
    container.id = 'searchResultsDropdown';

    // En-tête
    const header = document.createElement('div');
    header.className = 'search-header';
    header.innerHTML = `<span>${results.length} résultat${results.length > 1 ? 's' : ''} trouvé${results.length > 1 ? 's' : ''}</span>`;
    container.appendChild(header);

    // Résultats
    displayResults.forEach(item => {
        const resultItem = document.createElement('a');
        resultItem.className = 'search-result-item';
        resultItem.href = item.url || '#';

        const iconMap = {
            'centres': '🏫',
            'ecoles': '🎓',
            'annales': '📜',
            'documents': '📄',
            'cours': '📚'
        };

        const icon = iconMap[item.category] || '📄';

        resultItem.innerHTML = `
            <div class="result-icon">${icon}</div>
            <div class="result-content">
                <div class="result-title">${highlightText(item.title, query)}</div>
                <div class="result-subtitle">${item.subtitle || ''}</div>
                <div class="result-category">${getCategoryLabel(item.category)}</div>
            </div>
        `;

        container.appendChild(resultItem);
    });

    // Lien "Voir tous les résultats"
    if (results.length > maxResults) {
        const seeAll = document.createElement('a');
        seeAll.className = 'search-see-all';
        seeAll.href = '#';
        seeAll.textContent = `Voir tous les ${results.length} résultats →`;
        seeAll.addEventListener('click', function(e) {
            e.preventDefault();
            alert(`🔍 ${results.length} résultats trouvés pour "${query}"\n\nCette fonctionnalité ouvrira une page de résultats détaillés.`);
        });
        container.appendChild(seeAll);
    }

    // Positionner le dropdown sous la barre de recherche
    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        const rect = searchBar.getBoundingClientRect();
        container.style.position = 'fixed';
        container.style.top = (rect.bottom + 5) + 'px';
        container.style.left = rect.left + 'px';
        container.style.width = Math.min(rect.width, 500) + 'px';
        document.body.appendChild(container);
    } else {
        document.body.appendChild(container);
    }
}

// ============================================================
// UTILITAIRES
// ============================================================
function clearSearchResults() {
    const existing = document.getElementById('searchResultsDropdown');
    if (existing) existing.remove();
}

function showNoResults(query) {
    const container = document.createElement('div');
    container.className = 'search-results-dropdown';
    container.id = 'searchResultsDropdown';
    container.innerHTML = `
        <div class="search-no-results">
            <i class="fas fa-search"></i>
            <p>Aucun résultat pour "<strong>${query}</strong>"</p>
            <span>Essayez d'autres mots-clés</span>
        </div>
    `;

    const searchBar = document.querySelector('.search-bar');
    if (searchBar) {
        const rect = searchBar.getBoundingClientRect();
        container.style.position = 'fixed';
        container.style.top = (rect.bottom + 5) + 'px';
        container.style.left = rect.left + 'px';
        container.style.width = Math.min(rect.width, 500) + 'px';
        document.body.appendChild(container);
    } else {
        document.body.appendChild(container);
    }
}

function getCategoryLabel(category) {
    const labels = {
        'centres': '🏫 Centre CPGE',
        'ecoles': '🎓 Grande École',
        'annales': '📜 Annales',
        'documents': '📄 Document',
        'cours': '📚 Cours'
    };
    return labels[category] || category;
}

function highlightText(text, query) {
    if (!text) return '';
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
}

// ============================================================
// FERMETURE AU CLIC EXTÉRIEUR
// ============================================================
document.addEventListener('click', function(e) {
    const dropdown = document.getElementById('searchResultsDropdown');
    const searchBar = document.querySelector('.search-bar');
    if (dropdown && searchBar && !searchBar.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.remove();
    }
});