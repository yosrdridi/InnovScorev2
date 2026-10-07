import { DomainProfile } from '../types';

export const industrialProcessesDomain: DomainProfile = {
  id: 'industrialProcesses',
  label: 'Procédés Industriels',
  shortLabel: 'Procédés Industriels',
  description: 'Génie des procédés, scale-up pilote, réacteurs chimiques/biochimiques, séparation, thermique industrielle, automatisation avancée et modélisation multi-échelle.',
  iconName: 'Factory',
  terminology: {
    typicalUncertainties: [
      'Non-transposition des transferts de matière ou de chaleur lors du changement d’échelle (scale-up du laboratoire au pilote)',
      'Phénomènes d’encrassement (fouling), colmatage ou abrasion rapide des réacteurs sous flux continu',
      'Instabilité hydrodynamique ou ségrégation de poudres/émulsions dans des cuves de grand volume',
      'Contrôle non linéaire de la cinétique de réaction sous contraintes thermiques exothermiques sévères',
      'Rendement massique et énergétique dégradé de manière imprévisible lors de la marche continue'
    ],
    typicalExperiments: [
      'Conception et exploitation d’une unité pilote ou d’un démonstrateur semi-industriel instrumenté',
      'Plans d’expériences méthodiques (DoE / surface de réponse) pour identifier les facteurs d’influence',
      'Mesures de temps de séjour (DTS), traceurs et profils de vitesse par anémométrie ou CFD',
      'Bilan matière et thermique complet en régime transitoire et établi sur pilote',
      'Campagnes de criblage de membranes de filtration, garnissages ou catalyseurs industriels'
    ],
    typicalObjectives: [
      'Augmentation du rendement massique global de conversion de 15% en flux continu',
      'Diminution de la consommation énergétique spécifique du procédé de 30% (kWh/tonne)',
      'Élimination d’un sous-produit toxique ou réduction des rejets polluants à la source',
      'Passage d’un procédé discontinu (batch) à un procédé continu ultra-compact et intensifié'
    ],
    relevantMetrics: [
      'Rendement de conversion massique (%) et sélectivité',
      'Consommation énergétique spécifique (kWh/kg de produit ou MJ/h)',
      'Productivité volumétrique (kg/h/m³ de réacteur)',
      'Temps de séjour moyen et dispersion axiale Pe (nombre de Péclet)',
      'Taux d’abattement d’émissions ou d’impuretés (%)'
    ],
    stateOfTheArtSources: [
      'Revues de génie des procédés (Chemical Engineering Science, Industrial & Engineering Chemistry Research)',
      'Brevets de procédés continus, réacteurs et méthodes de séparation thermique/membranaire',
      'Ouvrages et modèles de référence de génie chimique (Perry’s Chemical Engineers’ Handbook)',
      'Publications techniques d’instituts de recherche industrielle (IFPEN, CEA, CNRS)'
    ],
    expectedEvidenceTypes: [
      'Schémas tuyauterie et instrumentation (PID) de l’unité pilote expérimentale',
      'Relevés automatisés de supervision (SCADA) horodatés lors des essais de scale-up',
      'Bilans matière et énergie comparatifs validés par analyses analytiques des flux',
      'Matrices de plans d’expériences (DoE) et analyses statistiques de variance (ANOVA)',
      'Rapports d’autopsie d’encrassement ou d’usure des éléments internes du pilote'
    ]
  },
  routineActivities: [
    { keyword: 'réglage d’automates', category: 'Programmation d’automates conventionnelle', advice: 'Le paramétrage ou l’écriture de grafcets sur automates programmables (Siemens, Schneider) relève des règles de l’art de l’automaticien.', severity: 'CRITICAL' },
    { keyword: 'optimisation courante de ligne', category: 'Amélioration continue de productivité', advice: 'Le lean manufacturing ou l’ajustement de cadence d’une ligne de production existante ne constitue pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'maintenance d’outillage', category: 'Maintenance d’outillages', advice: 'La rénovation ou le changement de buses ou de vérins relève de la maintenance industrielle.', severity: 'CRITICAL' },
    { keyword: 'transposition d’échelle conventionnelle', category: 'Augmentation géométrique simple', advice: 'Multiplier la taille d’un mélangeur selon des règles géométriques établies sans verrou hydrodynamique démontré n’est pas éligible.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quel verrou de transfert de matière, transfert thermique ou stabilité du procédé était insoluble ?",
      subtext: "Identifiez le phénomène physique limitant (mélange diphasique, exothermie incontrôlable, colmatage...)",
      placeholder: "Ex : Le réacteur de laboratoire à 2L ne dissipait plus la chaleur lors de la transposition à l’échelle 100L...",
      extractKey: "Verrou de procédé initial",
      typicalImpassesExample: "Colmatage complet des membranes de nanofiltration après seulement 4 heures de fonctionnement continu."
    },
    {
      id: 2,
      question: "Quelle était la performance mesurée sur l’installation pilote initiale ou en laboratoire ?",
      subtext: "Mesure de référence de départ (rendement, consommation, temps de cycle...)",
      placeholder: "Ex : Rendement limité à 61% avec une production de 18% de sous-produits goudronneux indésirables...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Consommation d’énergie de 4.8 kWh/kg de produit, économiquement non viable pour une échelle industrielle."
    },
    {
      id: 3,
      question: "Quel objectif quantifié de rendement, sélectivité ou intensité de procédé visiez-vous ?",
      subtext: "Cible chiffrée justifiant la conception de l’unité pilote de recherche",
      placeholder: "Ex : Maintenir un rendement de 88% en continu à débit de 50 kg/h avec une sélectivité supérieure à 95%...",
      extractKey: "Objectif de procédé visé",
      typicalImpassesExample: "Multiplier la productivité volumétrique par 5 tout en abaissant la température opératoire de 40°C."
    },
    {
      id: 4,
      question: "Pourquoi les corrélations de génie des procédés et simulateurs standard (Aspen, ProSim) ne permettaient-ils pas de prédire le résultat ?",
      subtext: "Expliquez l’inadéquation des modèles thermodynamiques ou hydrodynamiques",
      placeholder: "Ex : Les équations d’état thermodynamiques standards ne prenaient pas en compte les équilibres liquide-vapeur en présence de co-solvants ioniques...",
      extractKey: "Nature du verrou de scale-up",
      typicalImpassesExample: "Comportement rhéologique thixotrope imprévisible provoquant des zones de recirculation morte dans le réacteur."
    },
    {
      id: 5,
      question: "Quelles géométries de réacteurs, garnissages ou cinétiques d’injection avez-vous testés puis abandonnés ?",
      subtext: "La description des arrêts d’urgence de pilote, encrassements et itérations d’essais",
      placeholder: "Ex : Nous avons testé un réacteur tubulaire à chicanes (colmatage rapide), puis un lit fixe catalytique (perte de charge excessive)...",
      extractKey: "Itérations et échecs de procédé",
      typicalImpassesExample: "Abandon d’une technologie de micro-mélangeur en raison d’une érosion mécanique prématurée des injecteurs sous pression."
    },
    {
      id: 6,
      question: "Quels résultats concrets avez-vous validés sur l’unité pilote instrumentée ?",
      subtext: "Données expérimentales en régime continu stabilisé",
      placeholder: "Ex : Fonctionnement continu validé sur 120 heures consécutives sans encrassement, rendement stabilisé à 89.4%, consommation abaissée à 2.1 kWh/kg...",
      extractKey: "Preuves mesurées sur pilote",
      typicalImpassesExample: "Bilan matière bouclé à 98.7% avec confirmation de la qualité du produit fini sur 3 campagnes pilotes successives."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Rendement matière de conversion (%)', 'Consommation énergétique spécifique (kWh/t)', 'Débit volumique de traitement (m³/h)', 'Durée de vie des éléments filtrants (h)'],
    functional: ['Fonctionnement continu sans interruption pour nettoyage', 'Auto-adaptation du procédé aux variations de matière première', 'Intensification réduisant l’encombrement au sol par 3'],
    ergonomic: ['Pupitre de pilotage ergonomique avec prédiction d’anomalies', 'Opérations de maintenance réduites à une seule intervention trimestrielle', 'Niveau sonore ramené sous 70 dBA'],
    ecoDesign: ['Réduction de 50% de la consommation d’eau en circuit fermé', 'Valorisation de la chaleur fatale intégrée', 'Zéro rejet liquide polluant (ZLD)']
  },
  secondaryDisciplinesSuggestions: [
    'Génie Chimique & Dimensionnement de Réacteurs',
    'Thermodynamique & Transferts Thermiques Industriels',
    'Mécanique des Fluides & Écoulements Polyphasiques',
    'Séparation Membranaire & Filtration',
    'Plans d’Expériences (DoE) & Analyse Statistique',
    'Automatique & Contrôle Avancé de Procédés'
  ]
};
