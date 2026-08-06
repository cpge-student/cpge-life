// ============================================
// FICHIER : /js/data.js
// DESCRIPTION : Données centralisées du site
// ============================================

const SITE_DATA = {
    // ========================================
    // 1. IDENTITÉ DU SITE
    // ========================================
    identity: {
        name: "CPGE scientifique",
        slogan: "Prépare ton avenir avec excellence.",
        description: "Classes Préparatoires aux Grandes Écoles · Maroc"
    },

    // ========================================
    // 2. STATISTIQUES GLOBALES
    // ========================================
    stats: {
        etablissements: 28,
        filieres: 3,
        etudiants: "10K+",
        ressources: "2K+"
    },

    // ========================================
    // 3. RÉSEAUX SOCIAUX
    // ========================================
    social: {
        instagram: "https://instagram.com/ctrlaltstudy",
        linkedin: "https://www.linkedin.com/in/hamza-margal-a6496741b/",
        telephone: "+212 631-909130",
        email: "bde.ltm.2026@gmail.com"
    },

    // ========================================
    // 4. ÉVÉNEMENTS (Compte à rebours)
    // ========================================
    evenements: [
        {
            id: "x-ens",
            nom: "X-ENS",
            date: "2027-04-12T07:00:00",
            icone: "🎓",
            couleur: "#EF4444"
        },
        {
            id: "mines",
            nom: "Mines",
            date: "2027-04-19T07:00:00",
            icone: "⛏️",
            couleur: "#F59E0B"
        },
        {
            id: "ccinp",
            nom: "CCINP",
            date: "2027-04-26T07:00:00",
            icone: "📝",
            couleur: "#10B981"
        },
        {
            id: "centrale",
            nom: "Centrale",
            date: "2027-05-03T07:00:00",
            icone: "⚡",
            couleur: "#3B82F6"
        },
        {
            id: "cnc",
            nom: "CNC",
            date: "2027-05-21T08:00:00",
            icone: "🏆",
            couleur: "#8B5CF6"
        }
    ],

    // ========================================
    // 5. FILIÈRES
    // ========================================
    filieres: [
        {
            id: "mp",
            nom: "MP",
            titre: "Maths & Physique",
            description: "La prépa MP (Mathématiques et Physique) se distingue par sa nature hautement théorique et abstraite, mettant l'accent sur le formalisme conceptuel.",
            matieres: ["Mathématiques", "Physique", "Informatique"],
            banques: ["X-ENS", "Mines", "CCINP", "Centrale", "CNC", "UM6P"],
            couleur: "#4F46E5",
            icone: "📐",
            tauxReussite: 79.2
        },
        {
            id: "psi",
            nom: "PSI",
            titre: "Physique & Sciences de l'Ingénieur",
            description: "La filière PSI (Physique et Sciences de l'Ingénieur) se différencie par son ancrage concret et son approche technologique des sciences.",
            matieres: ["Physique", "Chimie", "Sciences de l'Ingénieur"],
            banques: ["X-ENS", "Mines", "CCINP", "Centrale", "CNC", "UM6P"],
            couleur: "#06B6D4",
            icone: "🔧",
            tauxReussite: 88.4
        },
        {
            id: "tsi",
            nom: "TSI",
            titre: "Technologies & Sciences Industrielles",
            description: "La filière TSI (Technologie et Sciences Industrielles) se distingue par sa pédagogie ancrée dans le réel, réservée aux bacheliers des filières technologiques.",
            matieres: ["Génie Électrique", "Génie Mécanique", "Physique"],
            banques: ["CCINP", "Centrale", "CNC", "UM6P"],
            couleur: "#F59E0B",
            icone: "⚙️",
            tauxReussite: 86.2
        }
    ],

    // ========================================
    // 6. CENTRES EN VEDETTE (6)
    // ========================================
    centresVedette: [
        {
            id: "lmy-ra",
            nom: "Lycée Moulay Youssef",
            sigle: "LMY-Ra",
            ville: "Rabat",
            filieres: ["MP", "PSI"],
            eleves: 291,
            taux: "93.5% (MP), 84.1% (PSI)"
        },
        {
            id: "lmv-ca",
            nom: "Lycée Mohammed V",
            sigle: "LMV-Ca",
            ville: "Casablanca",
            filieres: ["MP", "PSI"],
            eleves: 262,
            taux: "91.0% (MP), 88.2% (PSI)"
        },
        {
            id: "lit-ma",
            nom: "Lycée Ibn Timiya",
            sigle: "LIT-Ma",
            ville: "Marrakech",
            filieres: ["MP", "PSI"],
            eleves: 281,
            taux: "94.7% (MP), 91.1% (PSI)"
        },
        {
            id: "ltm-mo",
            nom: "Lycée Technique",
            sigle: "LTM-Mo",
            ville: "Mohammedia",
            filieres: ["MP", "TSI"],
            eleves: 119,
            taux: "82.1% (MP), 81.3% (TSI)"
        },
        {
            id: "lrs-ag",
            nom: "Lycée Reda Slaoui",
            sigle: "LRS-Ag",
            ville: "Agadir",
            filieres: ["MP", "PSI", "TSI"],
            eleves: 203,
            taux: "88.0% (MP), 92.9% (PSI), 90.8% (TSI)"
        },
        {
            id: "lmi-fe",
            nom: "Lycée Moulay Idriss",
            sigle: "LMI-Fe",
            ville: "Fès",
            filieres: ["MP", "PSI"],
            eleves: 198,
            taux: "91.9% (MP), 85.7% (PSI)"
        }
    ],

    // ========================================
    // 7. TÉMOIGNAGES (vides pour l'instant)
    // ========================================
    temoignages: [
  {
    "nom": "Page",
    "etablissement": "CPGE Lycée technique, Mohammedia",
    "filiere": "MP",
    "annee": "2ème année",
    "texte": "Test"
  }
],

    // ========================================
    // 8. MENU PRINCIPAL
    // ========================================
    menu: [
        {
            nom: "Écoles",
            sous: [
                "Centres CPGE",
                "Grandes Écoles Maroc",
                "Grandes Écoles France",
                "UM6P"
            ]
        },
        {
            nom: "Filières",
            sous: ["MP", "PSI", "TSI"]
        },
        {
            nom: "Documents",
            sous: ["SUP","SPE", "Drive complet"]
        },
        {
            nom: "Annales",
            sous: ["CNC", "CCINP", "CCMP", "CCS", "Banque X-ENS"]
        },
        {
            nom: "Actualités",
            sous: null
        },
        {
            nom: "Contact",
            sous: null
        }
    ]
};