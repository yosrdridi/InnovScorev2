import { DomainProfile } from '../types';

export const mechanicalDomain: DomainProfile = {
  id: 'mechanical',
  label: 'Mécanique',
  shortLabel: 'Mécanique',
  description: 'Comportement des structures, dynamique des fluides, résistance des matériaux, cinématique complexe, thermique mécanique et fatigue.',
  iconName: 'Wrench',
  terminology: {
    typicalUncertainties: [
      'Comportement en fatigue non linéaire sous chargements multiaxiaux aléatoires',
      'Phénomènes de résonance vibratoire ou de flottement aéroélastique non prédictibles par calcul analytique',
      'Friction, grippage et usure tribologique sous températures ou pressions extrêmes',
      'Déformations élastoplastiques complexes lors de l’emboutissage ou du fluage',
      'Couplages aéro-thermo-mécaniques dans des géométries confinées'
    ],
    typicalExperiments: [
      'Essais de traction, flexion et résilience sur éprouvettes instrumentées',
      'Campagnes de bancs d’endurance et d’essais vibratoires sur pot vibrant (shaker)',
      'Mesures par corrélation d’images numériques (DIC) et jauges d’extensométrie',
      'Simulations par éléments finis (FEA / CFD) corrélées aux mesures physiques',
      'Essais en soufflerie ou en chambre climatique sous sollicitations combinées'
    ],
    typicalObjectives: [
      'Allègement de la structure tout en conservant une rigidité torsionnelle critique',
      'Extension de la durée de vie en fatigue au-delà de 10^7 cycles',
      'Suppression des modes propres vibratoires perturbateurs dans la plage opérationnelle',
      'Optimisation du coefficient de traînée (Cx) sans dégradation du refroidissement'
    ],
    relevantMetrics: [
      'Limite d’élasticité Re (MPa) et résistance à la rupture Rm (MPa)',
      'Facteur d’amortissement modal et fréquences propres (Hz)',
      'Déformation unitaire (micro-déformations) et flèche maximale (mm)',
      'Coefficient de frottement (µ) et taux d’usure (mm³/N.m)',
      'Masse volumique et gain de masse (%)'
    ],
    stateOfTheArtSources: [
      'Publications scientifiques (Journal of Mechanical Engineering, ASME, Elsevier Mécanique)',
      'Brevets mécaniques (brevets WO/EP sur liaisons, articulations, allègement)',
      'Normes internationales de calcul de fatigue et RDM (Eurocodes, ISO, AFNOR)',
      'Catalogues et fiches matériaux certifiées des métallurgistes et fabricants'
    ],
    expectedEvidenceTypes: [
      'Rapports d’essais de traction, fatigue ou rupture certifiés en laboratoire',
      'Cartographies de contraintes de Von Mises issues de simulations FEA avec validation par jauges',
      'Photos et expertises micrographiques de faciès de rupture suite aux essais de validation',
      'Plans de définition et tolérancement géométrique issus de calculs itératifs',
      'Relevés accélérométriques et spectres de réponses vibratoires'
    ]
  },
  routineActivities: [
    { keyword: 'cao classique', category: 'Conception CAO standard', advice: 'Le tracé de pièces sous SolidWorks ou CATIA relève du bureau d’études standard sans verrou scientifique.', severity: 'CRITICAL' },
    { keyword: 'dimensionnement utilisant des méthodes connues', category: 'Calcul RDM conventionnel', advice: 'L’application directe des formules de résistance des matériaux de base (poutres, RDM linéaire) est une pratique courante.', severity: 'CRITICAL' },
    { keyword: 'adaptation géométrique d’une pièce', category: 'Modification dimensionnelle', advice: 'Modifier l’épaisseur ou la longueur d’une pièce existante sans remise en cause théorique ne constitue pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'choix de composants standards', category: 'Sélection sur catalogue', advice: 'Le dimensionnement et l’achat de roulements, visseries ou actionneurs sur catalogue de fabricant est une activité d’ingénierie courante.', severity: 'WARNING' },
    { keyword: 'industrialisation classique', category: 'Préparation outillage / Usinage', advice: 'La conception des gammes d’usinage, de tôlerie ou des moules de série est exclue du périmètre CIR.', severity: 'CRITICAL' },
    { keyword: 'modification d’un produit existant', category: 'Évolution de produit standard', advice: 'L’adaptation d’un produit sans incertitude scientifique objective n’est pas valorisable au CIR.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle contrainte mécanique ou limite de résistance était impossible à respecter avec les solutions connues ?",
      subtext: "Précisez le type de sollicitation (fatigue multiaxiale, choc, résonance, friction thermique...)",
      placeholder: "Ex : Rupture prématurée par fatigue oligocyclique constatée après seulement 50 000 cycles sous vibrations...",
      extractKey: "Contrainte de blocage mécanique",
      typicalImpassesExample: "Déformation plastique excessive dès que la température franchissait 220°C."
    },
    {
      id: 2,
      question: "Quelle était la valeur de performance mesurée avant vos travaux sur les solutions de référence ?",
      subtext: "Valeur chiffrée observée sur les pièces existantes (durée de vie, contrainte maximale admissible, flèche...)",
      placeholder: "Ex : Tenue à 45 000 cycles sous contrainte de 320 MPa avec les alliages standards du marché...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Masse minimale incompressible de 14.5 kg avec les géométries tubulaires classiques."
    },
    {
      id: 3,
      question: "Quel objectif quantifié visiez-vous qui nécessitait de dépasser les règles de l’art usuelles ?",
      subtext: "Cible de tenue mécanique ou d’allègement justifiant la démarche de recherche",
      placeholder: "Ex : Atteindre 250 000 cycles sans amorce de crique avec un allègement de structure de 30%...",
      extractKey: "Objectif technique visé",
      typicalImpassesExample: "Limiter la flèche sous charge à 0.4 mm tout en diminuant la masse de 25%."
    },
    {
      id: 4,
      question: "Pourquoi les abaques, normes ou méthodes de calcul RDM standard ne permettaient-ils pas de résoudre ce problème ?",
      subtext: "Expliquez l’inadéquation des modèles analytiques (non-linéarités, couplages, anisotropie...)",
      placeholder: "Ex : Les abaques de Wöhler standard ne s’appliquent pas aux états de contraintes triaxiales combinées avec gradient thermique...",
      extractKey: "Nature du verrou scientifique ou technique",
      typicalImpassesExample: "Divergence entre le calcul éléments finis élastique linéaire et le comportement réel en rupture ductile."
    },
    {
      id: 5,
      question: "Quelles hypothèses géométriques ou matériaux ont été testées puis abandonnées lors des campagnes d’essais ?",
      subtext: "La description des prototypes détruits, des ruptures prématurées et des itérations d’essais",
      placeholder: "Ex : Nous avons testé une première géométrie nervurée (rupture au raccordement d’angle), puis un traitement de grenaillage (contraintes résiduelles néfastes)...",
      extractKey: "Itérations et impasses mécaniques",
      typicalImpassesExample: "Abandon d’une structure treillis en titane en raison d’un flambement asymétrique lors des crash-tests."
    },
    {
      id: 6,
      question: "Quels résultats concrets et mesures sur banc d’essai avez-vous obtenus sur le prototype final ?",
      subtext: "Données expérimentales validées sur banc d’essais physiques",
      placeholder: "Ex : Endurance validée à 310 000 cycles sans crique, masse finale réduite à 9.8 kg (-32%), mesures jauges conformes...",
      extractKey: "Résultats mesurés sur banc",
      typicalImpassesExample: "Absence de rupture après 1 million de cycles sur banc d’endurance hydraulique certifié."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Masse de la structure (kg)', 'Résistance à la rupture (MPa)', 'Durée de vie en fatigue (cycles)', 'Rendement mécanique (%)'],
    functional: ['Intégration d’un mécanisme de verrouillage rapide sans outil', 'Compatibilité multi-supports universelle', 'Réduction du jeu fonctionnel'],
    ergonomic: ['Effort de manœuvre réduit de 60% pour l’opérateur', 'Prise en main optimisée (poignée équilibrée)', 'Atténuation des vibrations transmises aux mains'],
    ecoDesign: ['Réduction de la matière première de 35%', 'Utilisation d’alliages 100% recyclables sans traitement polluant', 'Démontabilité aisée en fin de vie']
  },
  secondaryDisciplinesSuggestions: [
    'Résistance des Matériaux (RDM)',
    'Calcul par Éléments Finis (FEA)',
    'Dynamique des Fluides Numérique (CFD)',
    'Tribologie & Traitements de Surface',
    'Acoustique & Vibrations',
    'Thermique des Structures',
    'Fabrication Additive Métallique'
  ]
};
