import { DomainProfile } from '../types';

export const chemistryDomain: DomainProfile = {
  id: 'chemistry',
  label: 'Chimie / Matériaux',
  shortLabel: 'Chimie & Matériaux',
  description: 'Synthèse moléculaire, formulation chimique, nanocomposites, polymères biosourcés, céramiques avancées, revêtements et catalyseurs.',
  iconName: 'Atom',
  terminology: {
    typicalUncertainties: [
      'Contrôle de la réaction chimique, sélectivité isomérique ou cinétique de polymérisation',
      'Compatibilité interfaciale et dispersion homogène de nanoparticules ou charges dans une matrice polymère',
      'Dégradation physico-chimique sous vieillissement accéléré (UV, ozone, hydrolyse, oxydation)',
      'Compromis antagoniste entre dureté de surface et résilience aux chocs sans fragilisation',
      'Propriétés rhéologiques non newtoniennes complexes lors de la mise en œuvre ou extrusion'
    ],
    typicalExperiments: [
      'Caractérisations spectroscopiques (RMN, FTIR, Raman) et spectrométrie de masse',
      'Analyses thermiques (ATG pour la dégradation, DSC pour les transitions vitreuses)',
      'Analyses structurales par diffraction des rayons X (DRX) et microscopie électronique (MEB/MET)',
      'Essais mécaniques normalisés (traction, choc Charpy, dureté Shore/Vickers)',
      'Enceintes de vieillissement climatique accéléré (brouillard salin, xénon test UV, cycles QUV)'
    ],
    typicalObjectives: [
      'Synthèse d’un nouveau matériau présentant une conductivité thermique ou électrique spécifique',
      'Augmentation de la résistance thermique de service continue au-delà de 250°C',
      'Substitution totale de composés pétrosourcés par des monomères d’origine végétale',
      'Auto-cicatrisation ou effet barrière hydrophobe/oléophobe permanent sans PFAS'
    ],
    relevantMetrics: [
      'Température de transition vitreuse Tg (°C) et décomposition thermique Td (°C)',
      'Viscosité dynamique (Pa.s) et module élastique de conservation G’ (Pa)',
      'Perméabilité aux gaz O2/H2O (OTR, WVTR en g/m²/24h)',
      'Rendement réactionnel de synthèse (%) et indice de polydispersité Ip',
      'Adhérence de revêtement (classement ISO quadrillage ou traction)'
    ],
    stateOfTheArtSources: [
      'Revues de chimie et science des matériaux (ACS, RSC, Macromolecules, Advanced Materials)',
      'Brevets mondiaux sur formulations chimiques, résines, catalyseurs et composites',
      'Normes de caractérisation chimique et matériaux (ISO, ASTM)',
      'Fiches techniques et fiches de données de sécurité (FDS) des fabricants de résines'
    ],
    expectedEvidenceTypes: [
      'Spectres RMN, spectres infrarouges FTIR et thermogrammes ATG/DSC horodatés',
      'Clichés de microscopie électronique (MEB) démontrant la dispersion à l’échelle nanométrique',
      'Rapports d’essais de vieillissement accéléré selon normes ISO/ASTM en laboratoire agréé',
      'Comptes-rendus de pesée et cahiers de laboratoire décrivant les conditions réactionnelles',
      'Courbes rhéologiques en fonction de la température et du gradient de cisaillement'
    ]
  },
  routineActivities: [
    { keyword: 'mélange conventionnel', category: 'Formulation courante sans verrou', advice: 'Le simple mélange d’ingrédients disponibles dans le commerce selon les préconisations fournisseurs n’est pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'fiches techniques fournisseurs', category: 'Application de fiches techniques', advice: 'Mettre en œuvre une résine selon le mode d’emploi de son fabricant relève du savoir-faire d’atelier.', severity: 'WARNING' },
    { keyword: 'synthèse selon procédés documentés', category: 'Synthèse conventionnelle', advice: 'Reproduire une voie de synthèse chimique déjà décrite dans un brevet ou une publication sans obstacle théorique.', severity: 'CRITICAL' },
    { keyword: 'contrôles de pureté usuels', category: 'Contrôles de routine', advice: 'Les analyses de pureté de routine pour vérifier un lot de matière première relèvent du contrôle qualité.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle propriété physico-chimique ou limite de synthèse était bloquante avec les molécules et matériaux connus ?",
      subtext: "Identifiez le verrou de matériau (incompatibilité de phase, dégradation thermique, viscosité ingérable...)",
      placeholder: "Ex : Les nanoparticules de silice s’aggloméraient instantanément, créant des amorces de rupture prématurée...",
      extractKey: "Blocage physico-chimique initial",
      typicalImpassesExample: "Chute de 80% de la résistance mécanique après seulement 100 heures d’exposition UV."
    },
    {
      id: 2,
      question: "Quelle était la valeur mesurée sur les matériaux de référence de l’état de l’art ?",
      subtext: "Mesure de référence de départ (température de service, perméabilité, module d’Young...)",
      placeholder: "Ex : Température maximale d’utilisation limitée à 140°C avec les résines époxy usuelles...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Perméabilité à l’oxygène de 120 cm³/m²/24h, insuffisante pour la protection requise."
    },
    {
      id: 3,
      question: "Quel objectif quantifié de performance matériau cherchiez-vous à atteindre ?",
      subtext: "Cible de caractéristiques techniques justifiant la démarche",
      placeholder: "Ex : Garantir une tenue continue à 240°C tout en conservant une ténacité supérieure à 45 kJ/m²...",
      extractKey: "Objectif technique visé",
      typicalImpassesExample: "Diviser la perméabilité à la vapeur d’eau par un facteur 10 sans plastifiant halogéné."
    },
    {
      id: 4,
      question: "Pourquoi les voies de synthèse ou formulations chimiques documentées étaient-elles insuffisantes ?",
      subtext: "Expliquez l’antagonisme chimique ou thermodynamique",
      placeholder: "Ex : L’augmentation du taux de réticulation augmentait la tenue thermique mais rendait le polymère excessivement cassant...",
      extractKey: "Nature du verrou chimique",
      typicalImpassesExample: "Incompatibilité d’énergie de surface entre la charge minérale hydrophile et la matrice hydrophobe."
    },
    {
      id: 5,
      question: "Quelles formulations, additifs ou voies de fonctionnalisation avez-vous testés puis abandonnés ?",
      subtext: "La description des déphasages, instabilités rhéologiques et échecs de polymérisation",
      placeholder: "Ex : Nous avons testé des agents de couplage silanes (perte de transparence optique), puis une voie sol-gel (temps de gélification trop court)...",
      extractKey: "Itérations et échecs chimiques",
      typicalImpassesExample: "Abandon d’un catalyseur organométallique en raison d’une coloration résiduelle inacceptable et d’une instabilité à l’air."
    },
    {
      id: 6,
      question: "Quels résultats analytiques et mesures physiques avez-vous obtenus sur le matériau final ?",
      subtext: "Données de caractérisation validées en laboratoire",
      placeholder: "Ex : Tg mesurée par DSC à 258°C, dispersion nanométrique vérifiée par MEB sans agglomérat, tenue au brouillard salin validée à 1500h...",
      extractKey: "Preuves analytiques obtenues",
      typicalImpassesExample: "Résistance au choc augmentée de 65% sans perte de rigidité, validée par essais Charpy normalisés."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Température maximale de service continue (°C)', 'Résistance à la rupture / choc (kJ/m²)', 'Taux d’allègement massique (%)', 'Imperméabilité aux gaz (barrière)'],
    functional: ['Revêtement auto-nettoyant permanent sans détergent', 'Adhésion multi-matériaux sans primaire d’accrochage toxique', 'Propriété anti-statique durable'],
    ergonomic: ['Matériau à toucher doux (soft-touch) résistant aux rayures', 'Application à froid sans émanation d’odeur nocive (zéro COV)', 'Séchage ultra-rapide en 30 secondes'],
    ecoDesign: ['Formulation 100% biosourcée sans perturbateurs endocriniens', 'Absence totale de composés perfluorés (PFAS-free)', 'Recyclabilité boucle fermée certifiée']
  },
  secondaryDisciplinesSuggestions: [
    'Chimie des Polymères & Synthèse Macromoléculaire',
    'Nanomatériaux & Nanotechnologies',
    'Chimie Analytique & Caractérisation Spectroscopique',
    'Rhéologie & Mise en Œuvre des Fluides Complexes',
    'Chimie Verte & Éco-conception Moléculaire',
    'Science des Surfaces, Interfaces & Adhésion'
  ]
};
