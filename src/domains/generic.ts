import { DomainProfile } from '../types';

export const genericDomain: DomainProfile = {
  id: 'generic',
  label: 'Autre domaine scientifique ou technique',
  shortLabel: 'Autre / Multidisciplinaire',
  description: 'Projets scientifiques ou d’ingénierie avancée transversaux, agronomie, optique/photonique, géosciences, acoustique ou physique appliquée.',
  iconName: 'Sparkles',
  terminology: {
    typicalUncertainties: [
      'Incertitude sur la faisabilité physique ou méthodologique du phénomène étudié',
      'Incapacité des modèles théoriques établis à rendre compte des interactions observées',
      'Non-linéarités ou comportements instables face à des variations de paramètres d’environnement',
      'Sensibilité critique aux conditions initiales ou aux bruits de mesure',
      'Impossibilité de prédire le résultat final sans recourir à une démarche d’expérimentation'
    ],
    typicalExperiments: [
      'Plans d’expériences méthodiques avec variation systématique des facteurs d’influence',
      'Mesures physiques sur bancs d’essais étalonnés avec chaînes d’acquisition dédiées',
      'Prototypes de laboratoire et maquettes d’investigation pour tester des hypothèses',
      'Modélisations analytiques et simulations numériques corrélées aux observations réelles',
      'Campagnes de caractérisation avec analyse de la dispersion statistique des résultats'
    ],
    typicalObjectives: [
      'Levée d’un verrou scientifique ou technique non documenté dans l’état des connaissances',
      'Acquisition de nouvelles connaissances sur le comportement d’un système complexe',
      'Validation de la transférabilité et de la reproductibilité des résultats obtenus',
      'Établissement d’un modèle prédictif validé par l’expérience'
    ],
    relevantMetrics: [
      'Écart relatif entre prédiction théorique et résultat mesuré (%)',
      'Répétabilité et reproductibilité des mesures (écart-type / coefficient de variation)',
      'Seuil de sensibilité ou limite de détection du phénomène',
      'Rendement global ou gain de performance par rapport à l’état initial (%)',
      'Domaine de validité paramétrique du modèle établi'
    ],
    stateOfTheArtSources: [
      'Publications scientifiques internationales et thèses universitaires',
      'Brevets d’invention déposés au niveau mondial (INPI, OEB, OMPI)',
      'Normes techniques et rapports d’organismes de recherche spécialisés',
      'Littérature technique et bases de données spécialisées du domaine'
    ],
    expectedEvidenceTypes: [
      'Cahiers de laboratoire et comptes-rendus de manipulation horodatés',
      'Rapports d’essais et procès-verbaux de mesures certifiés',
      'Données brutes d’acquisition et feuilles de calcul d’analyse statistique',
      'Publications, communications scientifiques ou brevets issus des travaux',
      'Relevés de temps contemporains signés des chercheurs et ingénieurs impliqués'
    ]
  },
  routineActivities: [
    { keyword: 'application des règles de l’art', category: 'Pratiques professionnelles courantes', advice: 'La mise en œuvre des méthodes standard du métier sans obstacle scientifique ne relève pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'études de faisabilité commerciale', category: 'Études d’opportunité commerciale', advice: 'Les études de marché ou de rentabilité économique sont exclues du périmètre de la recherche.', severity: 'CRITICAL' },
    { keyword: 'essais de conformité de routine', category: 'Tests de routine', advice: 'Les tests usuels pour s’assurer du respect d’un cahier des charges connu relèvent du contrôle qualité.', severity: 'WARNING' },
    { keyword: 'utilisation standard d’outils', category: 'Utilisation conventionnelle d’outils', advice: 'L’emploi d’outils ou d’équipements commerciaux selon leur manuel d’utilisation ne constitue pas de la R&D.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle difficulté technique ou scientifique fondamentale bloquait votre projet ?",
      subtext: "Identifiez le verrou précis pour lequel aucune solution n’était directement accessible",
      placeholder: "Ex : Le comportement du système devenait chaotique dès que la pression oscillait au-delà de 5 bars...",
      extractKey: "Blocage fondamental initial",
      typicalImpassesExample: "Incapacité à stabiliser la réponse du capteur en présence de dérives thermiques ambiantes."
    },
    {
      id: 2,
      question: "Quelle était la valeur ou l’état de référence mesuré avant vos travaux ?",
      subtext: "Valeur chiffrée ou comportement observé avec les solutions de l’état de l’art",
      placeholder: "Ex : Taux d’erreur de mesure supérieur à 25% avec les méthodes traditionnelles...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Sensibilité plafonnée à 0.8 V/bar avec un niveau de bruit de fond inacceptable."
    },
    {
      id: 3,
      question: "Quel objectif quantifié visiez-vous qui justifiait d’engager des travaux de recherche ?",
      subtext: "Cible de caractéristiques techniques à atteindre",
      placeholder: "Ex : Réduire l’erreur sous le seuil de 2% tout en doublant la bande passante utile...",
      extractKey: "Objectif technique visé",
      typicalImpassesExample: "Établir un modèle prédictif avec un coefficient de corrélation R² > 0.95 sur l’ensemble de la plage d’usage."
    },
    {
      id: 4,
      question: "Pourquoi les connaissances accessibles et méthodes connues ne permettaient-elles pas de résoudre ce problème ?",
      subtext: "Expliquez les limites de l’état de l’art et des théories disponibles",
      placeholder: "Ex : Les équations analytiques existantes supposaient un régime laminaire inapplicable à cette échelle...",
      extractKey: "Nature du verrou scientifique",
      typicalImpassesExample: "Absence de données publiées sur les couplages magneto-élastiques pour cette famille de structures."
    },
    {
      id: 5,
      question: "Quelles hypothèses et voies exploratoires avez-vous testées puis abandonnées ?",
      subtext: "La description des échecs d’expérimentation, impasses et itérations méthodiques",
      placeholder: "Ex : Nous avons formulé une première hypothèse de compensation passive (échec de linéarité), puis exploré un modèle semi-empirique...",
      extractKey: "Itérations et impasses documentées",
      typicalImpassesExample: "Abandon d’une méthode optique interférométrique en raison d’une trop grande sensibilité aux vibrations du milieu."
    },
    {
      id: 6,
      question: "Quels résultats concrets, quantitatifs et reproductibles avez-vous obtenus ?",
      subtext: "Données expérimentales mesurées démontrant la levée de l’incertitude",
      placeholder: "Ex : Erreur résiduelle stabilisée à 1.4% sur 50 campagnes de mesures indépendantes, confirmation de la répétabilité du protocole...",
      extractKey: "Preuves et résultats obtenus",
      typicalImpassesExample: "Modèle validé sur banc d’essai avec un R² de 0.97, reproductibilité confirmée sur 3 configurations distinctes."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Précision de mesure ou détection (%)', 'Rendement énergétique / efficacité (%)', 'Durée de vie opérationnelle', 'Temps de réponse du système (s/ms)'],
    functional: ['Fonctionnalité inédite sur le marché de référence', 'Capacité de fonctionnement en milieu hostile / sévère', 'Autonomie d’usage accrue'],
    ergonomic: ['Facilité de mise en œuvre ne nécessitant pas d’expert dédié', 'Interface de restitution claire et accessible', 'Réduction des risques pour l’opérateur'],
    ecoDesign: ['Réduction des consommations de ressources ou d’énergie', 'Suppression de substances dangereuses ou polluantes', 'Conception modulaire facilitant la réparation et le recyclage']
  },
  secondaryDisciplinesSuggestions: [
    'Optique & Photonique',
    'Physique des Matériaux & Matière Condensée',
    'Acoustique & Traitement du Signal',
    'Sciences de l’Environnement & Écologie',
    'Agronomie & Agro-technologies',
    'Métrologie Avancée & Instrumentation'
  ]
};
