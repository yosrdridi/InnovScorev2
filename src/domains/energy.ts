import { DomainProfile } from '../types';

export const energyDomain: DomainProfile = {
  id: 'energy',
  label: 'Énergie / Environnement',
  shortLabel: 'Énergie & Environnement',
  description: 'Stockage électrochimique (batteries, hydrogène), énergies renouvelables, captage de carbone, thermique du bâtiment avancée et dépollution.',
  iconName: 'Sun',
  terminology: {
    typicalUncertainties: [
      'Mécanismes de dégradation et perte de capacité d’accumulateurs électrochimiques sous cyclage thermique rapide',
      'Rendement de conversion de puissance et stabilité d’électrolyseurs ou piles à combustible sous régime intermittent',
      'Cinétique de chimisorption ou désorption de CO2 dans des matériaux poreux sous conditions d’humidité variables',
      'Optimisation thermo-aéraulique de systèmes de stockage thermique à chaleur latente (MCP)',
      'Dérive de sélectivité de membranes de traitement des eaux sous fort encrassement bio-organique'
    ],
    typicalExperiments: [
      'Bancs de cyclage électrochimique galvanostatique (charge/décharge sous chambres thermiques régulées)',
      'Spectroscopie d’impédance électrochimique (EIS) pour discriminer les résistances de transfert de charge',
      'Mesures de rendement énergétique sur bancs d’essais étalons (analyseurs de puissance wattmétriques de précision)',
      'Tests de perméation et sorption sous pressions contrôlées (isothermes de sorption)',
      'Bilans d’Analyse du Cycle de Vie (ACV) normalisés ISO 14040/14044 et bilans carbone dynamiques'
    ],
    typicalObjectives: [
      'Augmentation de la densité énergétique massique (Wh/kg) tout en prolongeant la durée de vie (> 2000 cycles)',
      'Augmentation du rendement global de conversion Power-to-Gas au-delà de 75%',
      'Capacité d’absorption du CO2 supérieure à 4 mmol/g avec régénération sous basse température (< 80°C)',
      'Récupération de chaleur fatale basse température (< 60°C) avec coefficient de performance (COP) élevé'
    ],
    relevantMetrics: [
      'Densité d’énergie massique (Wh/kg) et volumique (Wh/L)',
      'Rendement faradique et rendement de conversion énergétique global (%)',
      'Taux de dégradation de capacité par cycle (%/cycle)',
      'Coefficient de performance (COP ou EER)',
      'Facteur d’émission de GES évité (kg CO2-eq/kWh)'
    ],
    stateOfTheArtSources: [
      'Publications scientifiques (Journal of Power Sources, Energy & Environmental Science, Applied Energy)',
      'Brevets internationaux sur cellules de batteries, piles à hydrogène et captage de carbone',
      'Rapports d’instituts de référence de l’énergie (IEA, NREL, ADEME, CEA-Liten)',
      'Normes de sécurité et de performances des batteries (CEI 62133, CEI 62619, ISO 19880)'
    ],
    expectedEvidenceTypes: [
      'Relevés de cyclage batterie (courbes de capacité restante vs nombre de cycles) sous étuve',
      'Spectres d’impédance électrochimique (diagrammes de Nyquist) montrant l’évolution de la résistance interne',
      'Rapports de bancs d’essais thermiques et wattmétriques certifiés',
      'Analyses chromatographiques des gaz captés ou produits lors des cycles de conversion',
      'Études comparatives complètes d’Analyse du Cycle de Vie (ACV) avec inventaire de cycle de vie (ICV)'
    ]
  },
  routineActivities: [
    { keyword: 'installation standard de panneaux', category: 'Pose d’équipements commerciaux', advice: 'L’installation de panneaux photovoltaïques ou de pompes à chaleur du commerce selon les règles de l’art est une tâche d’artisanat/ingénierie.', severity: 'CRITICAL' },
    { keyword: 'audit énergétique réglementaire', category: 'Audit réglementaire', advice: 'La réalisation de diagnostics de performance énergétique (DPE) ou bilans carbone réglementaires ne constitue pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'dimensionnement selon guides ademe', category: 'Dimensionnement conventionnel', advice: 'Appliquer un guide de calcul standard pour dimensionner une chaufferie ou un réseau relève de l’ingénierie courante.', severity: 'WARNING' },
    { keyword: 'changement de fluide', category: 'Remplacement de fluide sans verrou', advice: 'Remplacer un fluide frigorigène par un autre disponible sans remise en cause des principes thermodynamiques.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle limitation de conversion énergétique, stockage ou durabilité bloquait votre système ?",
      subtext: "Identifiez le verrou physique ou électrochimique (perte de capacité, surchauffe, faible cinétique...)",
      placeholder: "Ex : La surtension à l’anode provoquait une dégradation rapide de l’électrolyte au-delà de 2 C de courant de charge...",
      extractKey: "Blocage énergétique initial",
      typicalImpassesExample: "Chute de 50% du rendement de captage en présence de traces d’humidité dans le flux gazeux."
    },
    {
      id: 2,
      question: "Quelle était la valeur mesurée sur les systèmes de référence de l’état de l’art ?",
      subtext: "Valeur de référence de départ (densité énergétique, rendement de conversion, durée de vie en cycles...)",
      placeholder: "Ex : Rendement de conversion limité à 58% et perte de 20% de capacité après seulement 300 cycles...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Capacité d’adsorption plafonnée à 1.2 mmol de CO2/g sous 1 bar."
    },
    {
      id: 3,
      question: "Quel objectif quantifié d’efficacité, de densité ou de durabilité cherchiez-vous à atteindre ?",
      subtext: "Cible de caractéristiques techniques justifiant la démarche",
      placeholder: "Ex : Atteindre un rendement supérieur à 78% avec une rétention de capacité de 85% après 1500 cycles rapides...",
      extractKey: "Objectif technique visé",
      typicalImpassesExample: "Porter la densité volumique à 420 Wh/L tout en assurant l’absence d’emballement thermique jusqu’à 150°C."
    },
    {
      id: 4,
      question: "Pourquoi les modèles électrochimiques, matériaux ou architectures connus étaient-ils insuffisants ?",
      subtext: "Expliquez l’antagonisme entre puissance, densité et stabilité",
      placeholder: "Ex : L’augmentation de l’épaisseur de l’électrode augmentait la capacité mais créait un blocage par diffusion ionique en charge rapide...",
      extractKey: "Nature du verrou électrochimique ou thermique",
      typicalImpassesExample: "Formation dendritique métallique incontrôlable menant au court-circuit interne sous fortes densités de courant."
    },
    {
      id: 5,
      question: "Quelles chimies d’électrodes, électrolytes ou géométries thermiques avez-vous testés puis abandonnés ?",
      subtext: "La description des emballements thermiques, pertes d’efficacité et POCs rejetés",
      placeholder: "Ex : Nous avons testé un électrolyte tout-solide polymère (conductivité ionique trop faible à température ambiante), puis un séparateur céramique (trop fragile sous chocs)...",
      extractKey: "Itérations et échecs énergétiques",
      typicalImpassesExample: "Abandon d’une formulation d’adsorbant zéolithique en raison d’un empoisonnement irréversible par les oxydes d’azote."
    },
    {
      id: 6,
      question: "Quels résultats concrets avez-vous validés sur banc de test et métrologie de puissance ?",
      subtext: "Données de cyclage et de rendement mesurées",
      placeholder: "Ex : Maintien de 88.6% de capacité après 1800 cycles à 3 C de décharge, rendement global mesuré à 79.2%, validation d’absence d’emballement par calorimétrie adiabatique (ARC)...",
      extractKey: "Preuves mesurées sur banc d’essai",
      typicalImpassesExample: "Rendement de restitution de chaleur de 91% validé sur banc d’essais instrumenté COFRAC."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Rendement énergétique global (%)', 'Densité d’énergie massique (Wh/kg)', 'Durée de vie opérationnelle en cycles', 'Temps de recharge à 80% (min)'],
    functional: ['Fonctionnement autonome en site isolé sans raccordement réseau', 'Bascule instantanée sans micro-coupure (< 5 ms)', 'Plage de température étendue sans préchauffage (-30°C à +60°C)'],
    ergonomic: ['Installation plug-and-play sans intervention d’électricien haute tension', 'Poids divisé par deux facilitant la manutention à une personne', 'Application de monitoring prédictif de l’état de santé (SoH)'],
    ecoDesign: ['Absence totale de terres rares ou métaux critiques (sans cobalt/nickel)', 'Taux de recyclabilité supérieur à 95% en filière standard', 'Réduction de l’empreinte carbone de fabrication de 55%']
  },
  secondaryDisciplinesSuggestions: [
    'Électrochimie & Stockage de l’Énergie',
    'Thermique des Systèmes & Fluides Caloporteurs',
    'Procédés Énergétiques & Gaz Renouvelables (Hydrogène)',
    'Matériaux pour l’Énergie & Nanostructures',
    'Analyse du Cycle de Vie (ACV) & Éco-conception',
    'Réseaux Électriques Intelligents (Smart Grids)'
  ]
};
