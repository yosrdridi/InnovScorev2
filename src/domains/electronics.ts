import { DomainProfile } from '../types';

export const electronicsDomain: DomainProfile = {
  id: 'electronics',
  label: 'Électronique / Systèmes Embarqués',
  shortLabel: 'Électronique & Embarqué',
  description: 'Conception hardware de cartes, traitement analogique/numérique, compatibilité électromagnétique (CEM), radiofréquences, firmware temps réel et gestion énergétique.',
  iconName: 'Zap',
  terminology: {
    typicalUncertainties: [
      'Stabilité du rapport signal sur bruit face aux perturbations électromagnétiques conduites/rayonnées',
      'Dissipation thermique critique dans un boîtier étanche scellé ultra-miniaturisé',
      'Intégrité du signal haute fréquence (gigahertz) en présence de diaphonie et réflexions de ligne',
      'Optimisation de l’autonomie sur batterie avec micro-récupération d’énergie (energy harvesting)',
      'Dérive thermique des composants de mesure de précision sous environnement sévère'
    ],
    typicalExperiments: [
      'Mesures à l’oscilloscope numérique rapide, analyseur de spectre et analyseur de réseau vectoriel (VNA)',
      'Passage en chambre anéchoïque pour qualification pré-CEM (émissions et immunités rayonnées)',
      'Mesures thermographiques infrarouges de points chauds sur cartes de prototypage',
      'Tests de consommation en profil dynamique (analyseur de courant sous micro-ampères)',
      'Campagnes de caractérisation en étuve climatique à cycles rapides (-40°C à +85°C)'
    ],
    typicalObjectives: [
      'Diminution du courant de veille (sleep mode) sous 1 µA tout en conservant un réveil en &lt; 5 µs',
      'Amélioration de la bande passante sans augmentation du bruit thermique Johnson-Nyquist',
      'Conception d’un étage de puissance à rendement &gt; 96% sans dissipateur encombrant',
      'Conformité CEM classe B sans blindage lourd métallique'
    ],
    relevantMetrics: [
      'Consommation moyenne (mA) et autonomie estimée (heures/années)',
      'Rapport signal sur bruit SNR (dB) et taux de distorsion harmonique THD',
      'Atténuation des perturbations CEM rayonnées (dBµV/m)',
      'Élévation de température jonction-boîtier delta-T (°C)',
      'Bande passante utile (MHz/GHz) et gigue temporelle (jitter en picosecondes)'
    ],
    stateOfTheArtSources: [
      'Publications IEEE (IEEE Transactions on Circuits and Systems, Microwave Theory)',
      'Brevets sur architectures électroniques, alimentations à découpage et filtrage',
      'Notes d’application et errata constructeurs démontrant les limites de composants',
      'Normes CEM et de sécurité électrique (CISPR, EN 55032, RED, MIL-STD)'
    ],
    expectedEvidenceTypes: [
      'Relevés de mesures à l’oscilloscope horodatés et captures d’analyseur de spectre',
      'Rapports d’essais en chambre anéchoïque (courbes d’émissions rayonnées pré-test)',
      'Schémas électroniques commentés explicitant les filtres ou étages propriétaires',
      'Cartographies thermiques FLIR identifiant la résolution des points chauds',
      'Logs d’essais de consommation dynamique et feuilles de calcul de bilan de puissance'
    ]
  },
  routineActivities: [
    { keyword: 'assemblage de composants standards', category: 'Assemblage de composants', advice: 'Connecter des composants du commerce selon leur schéma typique de datasheet ne constitue pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'application directe de datasheets', category: 'Application de notes d’application', advice: 'Suivre le montage de référence fourni par le fabricant du microcontrôleur relève des règles de l’art.', severity: 'CRITICAL' },
    { keyword: 'adaptation d’une carte existante', category: 'Modification mineure de carte', advice: 'Changer un connecteur ou modifier légèrement les dimensions d’un PCB sans verrou d’intégrité du signal est une opération courante.', severity: 'WARNING' },
    { keyword: 'routage standard', category: 'Routage PCB conventionnel', advice: 'Le placement et routage standard de pistes sans contrainte hyperfréquence ou CEM extrême relève du travail de bureau d’études.', severity: 'CRITICAL' },
    { keyword: 'intégration de modules disponibles sur le marché', category: 'Intégration de modules sur étagère', advice: 'Acheter un module Bluetooth/Wi-Fi pré-certifié et le piloter par commandes AT relève de l’ingénierie d’intégration.', severity: 'CRITICAL' },
    { keyword: 'mise en conformité classique', category: 'Certification réglementaire', advice: 'Les démarches administratives de certification CE sans investigation de recherche ne sont pas valorisables.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle contrainte électronique, CEM ou énergétique était bloquante avec les schémas existants ?",
      subtext: "Précisez le problème physique (bruit analogique, surchauffe, consommation en veille, diaphonie...)",
      placeholder: "Ex : Les perturbations induites par l’onduleur détérioraient le rapport signal sur bruit sous le seuil de 18 dB...",
      extractKey: "Contrainte de blocage électronique",
      typicalImpassesExample: "Dérive thermique excessive de l’amplificateur de transimpédance au-delà de 50°C."
    },
    {
      id: 2,
      question: "Quelle était la valeur de performance mesurée avant vos travaux sur les montages de référence ?",
      subtext: "Valeur chiffrée observée avec les composants usuels (bruit mesuré, autonomie, courant de fuite...)",
      placeholder: "Ex : Consommation de repos de 28 mA empêchant une autonomie supérieure à 3 jours sur batterie bouton...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Bruit de fond résiduel de 12 mV RMS masquant le signal physiologique utile."
    },
    {
      id: 3,
      question: "Quel objectif quantifié visiez-vous qui nécessitait de concevoir une architecture inédite ?",
      subtext: "Cible de précision, de bande passante ou de consommation justifiant les recherches",
      placeholder: "Ex : Obtenir une autonomie certifiée de 2 ans avec un courant de veille inférieur à 800 nA...",
      extractKey: "Objectif technique visé",
      typicalImpassesExample: "Maintenir la linéarité du signal analogique jusqu’à 2.4 GHz avec un THD < -65 dB."
    },
    {
      id: 4,
      question: "Pourquoi les notes d’application et schémas recommandés des constructeurs étaient-ils inopérants ?",
      subtext: "Expliquez l’incompatibilité des solutions recommandées par les fabricants de semi-conducteurs",
      placeholder: "Ex : Le schéma de référence constructeur entraînait une surtension capacitive destructive lors des commutations rapides GaN...",
      extractKey: "Nature du verrou scientifique ou technique",
      typicalImpassesExample: "Les filtres passifs classiques atténuaient les harmoniques mais détruisaient la réponse impulsionnelle rapide."
    },
    {
      id: 5,
      question: "Quelles topologies de circuits ou de filtres avez-vous prototypées puis abandonnées ?",
      subtext: "La description des cartes prototypes rejetées, des instabilités oscillatoires et des itérations de routage",
      placeholder: "Ex : La première maquette à pompe de charge générait des harmoniques parasites inacceptables, nous avons dû concevoir un régulateur LDO à résonance adaptative...",
      extractKey: "Itérations et échecs matériels",
      typicalImpassesExample: "Abandon d’un étage d’amplification différentiel à cause d’un couplage inductif parasite avec le plan de masse."
    },
    {
      id: 6,
      question: "Quels résultats concrets avez-vous validés lors des mesures sur banc et analyseur de spectre ?",
      subtext: "Données mesurées finales comparées à l’état de référence",
      placeholder: "Ex : Courant de veille mesuré à 650 nA, immunité CEM validée à 30 V/m sans anomalie, autonomie mesurée sur banc à 26 mois...",
      extractKey: "Mesures validées sur carte",
      typicalImpassesExample: "Plancher de bruit abaissé de 18 dB, permettant l’acquisition de signaux faibles de 50 µV."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Autonomie opérationnelle (heures/mois)', 'Consommation électrique en charge (mW)', 'Précision de mesure (bits/mV)', 'Fréquence de rafraîchissement (kHz)'],
    functional: ['Appairage sans fil instantané à basse consommation', 'Recharge sans fil ultra-rapide par induction', 'Diagnostic intégré d’usure de batterie'],
    ergonomic: ['Encombrement réduit de 70% pour intégration textile ou murale', 'Absence d’interrupteur physique grâce au réveil par mouvement', 'Indication d’état lumineuse discrète'],
    ecoDesign: ['Élimination des piles bouton jetables au profit d’un supercondensateur', 'Circuit sans plomb (RoHS poussée) et composants recyclables', 'Consommation en veille quasi nulle']
  },
  secondaryDisciplinesSuggestions: [
    'Systèmes Embarqués (Firmware Temps Réel)',
    'Compatibilité Électromagnétique (CEM)',
    'Radiofréquences & Antennes (RF)',
    'Électronique de Puissance & Conversion d’Énergie',
    'Capteurs & Métrologie de Précision',
    'Conception Hardware de PCB Haute Densité (HDI)',
    'Micro-récupération d’Énergie (Energy Harvesting)'
  ]
};
