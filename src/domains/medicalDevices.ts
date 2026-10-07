import { DomainProfile } from '../types';

export const medicalDevicesDomain: DomainProfile = {
  id: 'medicalDevices',
  label: 'Dispositifs Médicaux',
  shortLabel: 'Dispositifs Médicaux',
  description: 'Conception d’implants, instrumentation chirurgicale, monitorage physiologique in vivo, diagnostic embarqué et dispositifs combinés sous contraintes de biocompatibilité.',
  iconName: 'HeartPulse',
  terminology: {
    typicalUncertainties: [
      'Biocompatibilité et réponse immunitaire/inflammatoire tissulaire à long terme face à de nouveaux biomatériaux',
      'Fidélité de mesure de signaux physiologiques ultra-faibles en présence d’artéfacts de mouvement du patient',
      'Résistance mécanique et biocompatibilité après cycles de stérilisation répétés (autoclave, oxyde d’éthylène, rayons gamma)',
      'Intégrité de transmission sans fil à travers les tissus biologiques vivants sans échauffement SAR nocif',
      'Fiabilité critique d’algorithmes embarqués de détection prédictive (SaMD) sans faux négatif létal'
    ],
    typicalExperiments: [
      'Essais de biocompatibilité selon la série de normes ISO 10993 (cytotoxicité, irritation, sensibilisation, hémocompatibilité)',
      'Bancs d’essais simulant l’environnement physiologique (bains thermostatés à 37°C en liquide biologique simulé SBF)',
      'Campagnes de mesures sur simulateurs électrophysiologiques et fantômes tissulaires étalonnés',
      'Essais de fatigue mécanique dynamique sous milieu corrosif simulant le fluide corporel',
      'Études précliniques in vivo ou ex vivo sur tissus biologiques pour valider l’ergonomie chirurgicale et l’efficacité'
    ],
    typicalObjectives: [
      'Miniaturisation extrême permettant une implantation percutanée mini-invasive',
      'Obtention d’un rapport signal sur bruit physiologique diagnostique sans contact invasif',
      'Élimination du risque de thrombogénicité ou de colonisation bactérienne par revêtements bioactifs',
      'Autonomie énergétique implantable supérieure à 10 ans sans remplacement chirurgical'
    ],
    relevantMetrics: [
      'Indice de viabilité cellulaire relative (% vs témoin ISO 10993-5)',
      'Sensibilité (%) et spécificité diagnostique (%)',
      'Taux d’absorption spécifique SAR (W/kg)',
      'Résistance à l’usure ou perte de masse en milieu SBF (mg/an)',
      'Dérive de mesure capteur sur 1000 heures d’immersion physiologique'
    ],
    stateOfTheArtSources: [
      'Publications médicales et de biomatériaux (Biomaterials, IEEE Transactions on Biomedical Engineering, Lancet Digital Health)',
      'Brevets mondiaux sur technologies d’implants, capteurs physiologiques et instrumentation médicale',
      'Normes de référence des dispositifs médicaux (ISO 13485, ISO 14971, IEC 60601-1, ISO 10993)',
      'Guides de l’ANSM, de la FDA et du Groupe de Coordination des Dispositifs Médicaux (MDCG)'
    ],
    expectedEvidenceTypes: [
      'Rapports d’essais de biocompatibilité certifiés par laboratoire GLP (Bonnes Pratiques de Laboratoire)',
      'Enregistrements bruts de signaux physiologiques sur bancs d’essais et fantômes étalonnés',
      'Dossier de gestion des risques techniques (ISO 14971) documentant les verrous et réductions de risque inhérentes',
      'Rapports d’essais de vieillissement accéléré en milieu physiologique artificiel',
      'Protocoles et comptes-rendus d’investigations précliniques ou ergonomiques avec praticiens hospitaliers'
    ]
  },
  routineActivities: [
    { keyword: 'marquage ce réglementaire de routine', category: 'Démarches réglementaires MDR', advice: 'La simple constitution du dossier réglementaire de marquage CE sans levée de verrou technique ne constitue pas de la R&D.', severity: 'CRITICAL' },
    { keyword: 'assemblage de capteurs médicaux standards', category: 'Assemblage de capteurs du marché', advice: 'Connecter un capteur SpO2 ou ECG commercial à un microcontrôleur relève de l’ingénierie d’intégration.', severity: 'CRITICAL' },
    { keyword: 'application directe des normes iso', category: 'Application littérale de normes', advice: 'Suivre les prescriptions d’une norme sans obstacle scientifique nouveau relève du travail de conformité réglementaire.', severity: 'WARNING' },
    { keyword: 'adaptation dimensionnelle d’implant', category: 'Variation de taille d’implant', advice: 'Décliner une gamme de prothèses en plusieurs tailles sans calculs de rupture ou de biomécanique avancés est une activité de bureau d’études.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle contrainte physiologique, de biocompatibilité ou de mesure biomédicale était insoluble ?",
      subtext: "Identifiez le verrou médical/biotechnologique (artéfacts physiologiques, rejet tissulaire, dérive de capteur...)",
      placeholder: "Ex : Les mouvements respiratoires et musculaires saturaient les signaux électriques cardiaques de basse amplitude...",
      extractKey: "Blocage biomédical initial",
      typicalImpassesExample: "Dégradation de l’isolation diélectrique de l’électrode après seulement 3 mois en immersion saline à 37°C."
    },
    {
      id: 2,
      question: "Quelle était la valeur de référence mesurée avec les dispositifs ou capteurs de l’état de l’art ?",
      subtext: "Valeur chiffrée observée avant vos travaux (rapport signal/bruit, taux d’échec d’implantation, usure...)",
      placeholder: "Ex : Rapport signal sur bruit limité à 8 dB avec un taux de faux positifs d’arythmie de 22%...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Diamètre externe minimum de 8 mm rendant l’accès vasculaire mini-invasif impossible."
    },
    {
      id: 3,
      question: "Quel objectif quantifié de performance clinique ou biomécanique visiez-vous ?",
      subtext: "Cible de précision, de miniaturisation ou de biocompatibilité justifiant la R&D",
      placeholder: "Ex : Descendre sous un diamètre de 2.8 mm tout en garantissant une sensibilité de détection de 99.5%...",
      extractKey: "Objectif biomédical visé",
      typicalImpassesExample: "Atteindre une biocompatibilité sans prolifération de tissu cicatriciel fibreux encapsulant sur 12 mois."
    },
    {
      id: 4,
      question: "Pourquoi les biomatériaux, normes ou composants médicaux standard échouaient-ils à résoudre le problème ?",
      subtext: "Expliquez l’antagonisme entre tenue mécanique, stérilisation et tolérance biologique",
      placeholder: "Ex : Les polymères de qualité médicale usuels perdaient leur élasticité après stérilisation vapeur ou adsorbaient les protéines plasmatiques...",
      extractKey: "Nature du verrou biomédical",
      typicalImpassesExample: "L’atténuation des ondes radio dans les tissus biologiques riches en eau empêchait la télémesure profonde sans échauffement."
    },
    {
      id: 5,
      question: "Quelles architectures d’électrodes, matériaux de gainage ou algorithmes de filtrage avez-vous testés puis abandonnés ?",
      subtext: "La description des prototypes défaillants en milieu simulé et des échecs d’essais",
      placeholder: "Ex : Nous avons testé un revêtement en silicone biocompatible (délaminage sous contrainte), puis un alliage nitinol poli (dérive d’impédance cutanée)...",
      extractKey: "Itérations et impasses médicales",
      typicalImpassesExample: "Abandon d’une sonde de mesure capacitive en raison d’une sensibilité excessive aux variations de température corporelle."
    },
    {
      id: 6,
      question: "Quels résultats concrets avez-vous validés sur bancs d’essais physiologiques et protocoles normés ?",
      subtext: "Données de métrologie et de biocompatibilité mesurées",
      placeholder: "Ex : Sensibilité diagnostique validée à 99.2% sur bancs d’essais fantômes, viabilité cellulaire ISO 10993-5 supérieure à 96%, tenue mécanique validée à 10 millions de cycles en milieu SBF...",
      extractKey: "Preuves mesurées obtenues",
      typicalImpassesExample: "Rapport signal sur bruit accru de +14 dB, absence totale de thrombus vérifiée sur banc de circulation sanguine extracorporelle."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Sensibilité diagnostique (%)', 'Diamètre d’insertion / encombrement (mm/Fr)', 'Autonomie de batterie (années/jours)', 'Temps de stérilisation admissible (cycles)'],
    functional: ['Diagnostic précoce en continu sans hospitalisation', 'Transmission sécurisée sans fil des alertes au praticien', 'Auto-calibration continue sans intervention médicale'],
    ergonomic: ['Pose percutanée en moins de 3 minutes par un seul geste chirurgical', 'Dispositif invisible et indolore pour le patient au quotidien', 'Interface praticien avec visualisation claire des alarmes critiques'],
    ecoDesign: ['Composants électroniques détachables pour réutilisation après stérilisation', 'Suppression des consommables à usage unique non recyclables', 'Emballage stérile compact réduisant l’encombrement de stockage hospitalier de 60%']
  },
  secondaryDisciplinesSuggestions: [
    'Biomatériaux & Biocompatibilité (ISO 10993)',
    'Électronique Médicale & Traitement du Signal Physiologique',
    'Biomécanique & Implants Dynamiques',
    'Logiciel Dispositif Médical (SaMD / IEC 62304)',
    'Micro-usinage & Microfluidique Médicale',
    'Ergonomie Clinique & Facteurs Humains (IEC 62366)'
  ]
};
