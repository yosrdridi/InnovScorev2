import { DomainProfile } from '../types';

export const softwareDomain: DomainProfile = {
  id: 'software',
  label: 'Informatique / Logiciel / IA / Data',
  shortLabel: 'Logiciel & IA',
  description: 'Conception d’algorithmes, architectures logicielles sous fortes contraintes, intelligence artificielle, traitement de données massives.',
  iconName: 'Cpu',
  terminology: {
    typicalUncertainties: [
      'Convergence ou stabilité mathématique d’un algorithme non prédictible',
      'Incapacité des architectures existantes à respecter un plafond de latence ou de consommation mémoire',
      'Complexité algorithmique non linéaire en présence de graphes ou volumes massifs',
      'Généralisation et biais de modèles neuronaux face à des distributions de données non stationnaires',
      'Garantie de cohérence distribuée sous partition réseau sans verrouillage bloquant'
    ],
    typicalExperiments: [
      'Campagnes de benchmarks comparatifs sur jeux de données étalons (datasets de référence)',
      'Simulations de Monte Carlo ou tests de résistance stochastiques',
      'Mesures de temps d’exécution (profilage mémoire/CPU en nano/millisecondes)',
      'Itérations d’entraînement avec variations des fonctions de perte et hyperparamètres',
      'Implémentation de POCs (Proof of Concept) jetables pour invalider des hypothèses'
    ],
    typicalObjectives: [
      'Réduction de la latence de traitement sous un seuil critique',
      'Augmentation de la précision (F1-score, mAP, recall) sur cas complexes',
      'Optimisation de l’empreinte mémoire ou de l’utilisation GPU',
      'Traitement de flux de données continus sans perte de paquets'
    ],
    relevantMetrics: [
      'Latence moyenne et percentile 99 (ms)',
      'Débit de traitement (transactions/s, FPS)',
      'Consommation RAM (Mo/Go) et charge CPU/GPU (%)',
      'Taux d’erreur (MAE, RMSE, top-1 accuracy)',
      'Taille du modèle compressé (Mo)'
    ],
    stateOfTheArtSources: [
      'Publications académiques (IEEE, ACM, NeurIPS, ICML, arXiv)',
      'Brevets de traitement de données et algorithmes déposés',
      'Bibliothèques open source de référence et documentation de leurs limites',
      'Benchmarks techniques publiés par des laboratoires de recherche'
    ],
    expectedEvidenceTypes: [
      'Rapports d’essais comparatifs et courbes de performances',
      'Historique de commits Git et branches de recherche montrant les POCs abandonnés',
      'Tickets de suivi des hypothèses et anomalies d’investigation (Jira, GitLab)',
      'Jeux de données de test et protocoles de validation croisée',
      'Spécifications formelles des algorithmes développés'
    ]
  },
  routineActivities: [
    { keyword: 'intégration d’api', category: 'Consommation d’API tierces', advice: 'Une simple interconnexion d’API existantes (REST, GraphQL, Stripe) relève des règles de l’art du développeur.', severity: 'WARNING' },
    { keyword: 'développement crud', category: 'Développement d’interfaces CRUD', advice: 'Les formulaires Create/Read/Update/Delete standards ne comportent aucun verrou scientifique.', severity: 'CRITICAL' },
    { keyword: 'migration', category: 'Migration de framework ou de base de données', advice: 'Le portage technique ou la montée de version logicielle est formellement exclu du CIR sans incertitude méthodologique majeure.', severity: 'CRITICAL' },
    { keyword: 'refactoring', category: 'Refactoring / Réusinage de code', advice: 'Le nettoyage de dette technique et l’application de design patterns standards relèvent de la saine ingénierie.', severity: 'CRITICAL' },
    { keyword: 'maintenance', category: 'Maintenance corrective et évolutive', advice: 'La correction de bugs et les patches logiciels relèvent de l’exploitation courante.', severity: 'CRITICAL' },
    { keyword: 'changement d’infrastructure', category: 'Infrastructure / Déploiement Cloud', advice: 'Le passage vers le Cloud ou conteneurisation Docker est une tâche d’ingénierie d’exploitation.', severity: 'WARNING' },
    { keyword: 'paramétrage logiciel', category: 'Configuration logicielle / ERP / CMS', advice: 'Le paramétrage ou l’adaptation de progiciels du marché (SAP, Salesforce, WordPress) n’est pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'création d’interfaces', category: 'Création d’écrans ou responsive design', advice: 'L’intégration UI/UX conventionnelle relève de l’ingénierie web (peut être valorisé au CII sur l’ergonomie si rupture d’usage).', severity: 'WARNING' },
    { keyword: 'automatisation standard', category: 'Scripts d’automatisation', advice: 'L’écriture de pipelines CI/CD ou de scripts shell relève des pratiques établies.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle performance ou limite algorithmique était insuffisante avec les solutions existantes ?",
      subtext: "Identifiez la métrique précise (temps de calcul, passage à l’échelle, mémoire, précision...)",
      placeholder: "Ex : Le temps d’inférence dépassait 450 ms avec les bibliothèques open source...",
      extractKey: "Métrique de blocage initiale",
      typicalImpassesExample: "Incapacité des réseaux profonds standards à converger sous la contrainte de mémoire vive."
    },
    {
      id: 2,
      question: "Quelle était la valeur de référence de cette métrique avant vos travaux ?",
      subtext: "Fournissez la mesure de départ documentée dans l’état de l’art ou sur vos benchmarks initiaux",
      placeholder: "Ex : 480 ms en moyenne mesurée sur dataset d’évaluation étalon...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Taux de faux positifs de 14.2% avec l’algorithme SVM standard."
    },
    {
      id: 3,
      question: "Quel objectif chiffré visiez-vous qui était jugé irréalisable avec les méthodes connues ?",
      subtext: "La cible technique requise justifiant l’investigation",
      placeholder: "Ex : Descendre sous le seuil critique de 15 ms en virgule fixe...",
      extractKey: "Cible technique visée",
      typicalImpassesExample: "Maintien d’un F1-score > 0.92 avec un temps de calcul inférieur à 20 ms."
    },
    {
      id: 4,
      question: "Pourquoi les approches documentées dans la littérature ne permettaient-elles pas d’atteindre cet objectif ?",
      subtext: "Caractérisez le verrou scientifique ou mathématique (explosion combinatoire, instabilité numérique...)",
      placeholder: "Ex : La non-linéarité des gradients entraînait une explosion combinatoire...",
      extractKey: "Nature du verrou scientifique",
      typicalImpassesExample: "Divergence numérique lors de la projection des matrices creuses."
    },
    {
      id: 5,
      question: "Quelles hypothèses et architectures avez-vous testées puis abandonnées (itérations d’échecs) ?",
      subtext: "La démonstration d’impasses techniques et de POCs rejetés prouve la réalité de l’incertitude",
      placeholder: "Ex : Nous avons testé un modèle CNN compact (échec de phase), puis une quantification 8 bits (perte de convergence)...",
      extractKey: "Itérations et échecs documentés",
      typicalImpassesExample: "Abandon de l’approche par arbres de décision en raison d’un surapprentissage irréductible."
    },
    {
      id: 6,
      question: "Quels résultats quantitatifs avez-vous finalement obtenus sur vos jeux d’essais ?",
      subtext: "Données mesurées finales comparées à l’état de référence",
      placeholder: "Ex : Latence stabilisée à 12.4 ms sur GPU embarqué, gain de précision de +6.8%...",
      extractKey: "Preuves et résultats chiffrés",
      typicalImpassesExample: "Gain de 35% de débit mesuré sur 1 million de requêtes simultanées."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Latence de traitement (ms)', 'Débit transactionnel (req/s)', 'Taux de compression (%)', 'Temps de démarrage (s)'],
    functional: ['Fonctionnalité d’analyse en direct temps réel', 'Génération automatique de rapports prédictifs', 'Mode hors-ligne résilient'],
    ergonomic: ['Réduction du nombre de clics pour accomplir la tâche (-50%)', 'Visualisation 3D interactive intuitive', 'Navigation adaptée aux malvoyants'],
    ecoDesign: ['Réduction de la consommation serveur de 40%', 'Architecture serveur green computing', 'Algorithmes allégés basse énergie']
  },
  secondaryDisciplinesSuggestions: [
    'Intelligence Artificielle & Deep Learning',
    'Traitement Automatique du Langage (NLP)',
    'Vision par Ordinateur',
    'Systèmes Distribués & Cloud',
    'Cybersécurité & Cryptographie',
    'Traitement du Signal Numérique',
    'Algorithmique des Graphes'
  ]
};
