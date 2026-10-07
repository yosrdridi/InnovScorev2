import { DomainProfile } from '../types';

export const pharmaDomain: DomainProfile = {
  id: 'pharma',
  label: 'Pharmaceutique',
  shortLabel: 'Pharmaceutique',
  description: 'Galénique, formulation de principes actifs, cinétiques de libération, biodisponibilité, stabilité physico-chimique et essais précliniques.',
  iconName: 'Pill',
  terminology: {
    typicalUncertainties: [
      'Solubilité aqueuse critique et faible biodisponibilité orale de principes actifs BCS classe II/IV',
      'Instabilité chimique ou dégradation d’un principe actif (API) en présence d’excipients usuels',
      'Contrôle non prédictible de la cinétique de libération prolongée ou ciblée (formes à libération modifiée)',
      'Polymorphisme cristallin imprévisible lors de la mise à l’échelle du procédé de cristallisation',
      'Agrégation de macromolécules ou peptides thérapeutiques en solution aqueuse'
    ],
    typicalExperiments: [
      'Essais de dissolution in vitro selon les méthodes normalisées de la pharmacopée (USP/Ph. Eur.)',
      'Études de stabilité accélérée en étuves ICH (40°C / 75% HR) avec suivi des impuretés de dégradation',
      'Caractérisation de la forme cristalline par diffraction des rayons X sur poudre (XRPD) et DSC',
      'Tests de perméabilité membranaire sur cellules Caco-2 ou modèles PAMPA',
      'Formulations de dispersion solide, nanoémulsions, liposomes ou encapsulation polymérique'
    ],
    typicalObjectives: [
      'Multiplication de la biodisponibilité absolue (AUC) sans augmentation de la variabilité interindividuelle',
      'Obtention d’un profil de dissolution d’ordre zéro sur 24 heures consécutives',
      'Maintien de la stabilité chimique (teneur en impuretés < 0.2%) sur 24 mois à température ambiante',
      'Réduction des effets indésirables gastro-intestinaux par enrobage gastrorésistant ciblé'
    ],
    relevantMetrics: [
      'Aire sous la courbe AUC et concentration maximale Cmax (profils PK)',
      'Pourcentage de principe actif dissous à temps t (% dissous)',
      'Taux d’impuretés de dégradation totales et apparentées (%)',
      'Taille moyenne des nanoparticules/vésicules (nm) et indice de polydispersité (PDI)',
      'Rendement d’encapsulation du principe actif (%)'
    ],
    stateOfTheArtSources: [
      'Pharmacopées officielles (Ph. Eur., USP, JP) et directives ICH',
      'Publications scientifiques de pharmacotechnie (Journal of Controlled Release, International Journal of Pharmaceutics)',
      'Brevets de formulation, systèmes d’administration et dérivés galéniques',
      'Rapports d’évaluation publique des agences du médicament (ANSM, EMA, FDA)'
    ],
    expectedEvidenceTypes: [
      'Profils de dissolution comparatifs normalisés avec calcul du facteur de similitude f2',
      'Rapports analytiques HPLC-MS de stabilité selon les conditions ICH',
      'Diffractogrammes de rayons X (XRPD) et thermogrammes de calorimétrie différentielle (DSC)',
      'Dossiers de fabrication de lots expérimentaux de développement avec protocoles signés',
      'Résultats de perméabilité in vitro ou pharmacocinétique in vivo comparée'
    ]
  },
  routineActivities: [
    { keyword: 'formulation selon une méthode connue', category: 'Formulation galénique standard', advice: 'Mélanger des excipients conventionnels selon les ratios standards de la pharmacopée relève de la pratique industrielle courante.', severity: 'CRITICAL' },
    { keyword: 'essais réglementaires standards', category: 'Essais réglementaires ICH de routine', advice: 'La simple exécution des tests réglementaires sans recherche de levée de verrou n’est pas éligible au CIR.', severity: 'WARNING' },
    { keyword: 'analyses de routine', category: 'Contrôle analytique courant', advice: 'Le dosage par chromatographie pour vérifier la conformité d’un lot est une tâche d’assurance qualité.', severity: 'CRITICAL' },
    { keyword: 'production standard', category: 'Fabrication de lots commerciaux', advice: 'La fabrication pilote de validation industrielle post-formulation est exclue du CIR.', severity: 'CRITICAL' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quelle difficulté de formulation, solubilité ou stabilité chimique était insoluble avec les approches connues ?",
      subtext: "Identifiez le verrou galénique (cristallisation rapide, dégradation en milieu gastrique, précipitation...)",
      placeholder: "Ex : Le principe actif précipitait instantanément lors du passage en milieu intestinal neutre...",
      extractKey: "Blocage de formulation initial",
      typicalImpassesExample: "Dégradation oxydative rapide du principe actif en présence des tensioactifs classiques."
    },
    {
      id: 2,
      question: "Quelle était la valeur de dissolution ou biodisponibilité mesurée avec les formulations classiques ?",
      subtext: "Mesure chiffrée de référence avant vos travaux",
      placeholder: "Ex : Taux de dissolution inférieur à 18% après 60 minutes selon le test USP paddle...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Biodisponibilité orale inférieure à 4% avec une variabilité inter-individuelle de 65%."
    },
    {
      id: 3,
      question: "Quel objectif de libération, stabilité ou absorption visiez-vous ?",
      subtext: "Cible quantitative déterminant le succès de la recherche",
      placeholder: "Ex : Atteindre un taux de dissolution de 85% en 30 minutes et maintenir une stabilité de 18 mois...",
      extractKey: "Objectif galénique visé",
      typicalImpassesExample: "Profil de libération linéaire d’ordre zéro constant sur 18 heures sans effet de relargage initial (burst release)."
    },
    {
      id: 4,
      question: "Pourquoi les excipients, polymères et technologies de formulation usuels échouaient-ils ?",
      subtext: "Expliquez l’incompatibilité physico-chimique fondamentale",
      placeholder: "Ex : Les polymères hydrophiles classiques provoquaient une séparation de phase amorphe lors du séchage par atomisation...",
      extractKey: "Nature du verrou galénique",
      typicalImpassesExample: "Incompatibilité thermodynamique entre la matrice lipidique et la polarité du principe actif."
    },
    {
      id: 5,
      question: "Quelles compositions de matrice, nanoparticules ou polymères avez-vous testés puis abandonnés ?",
      subtext: "La description des formulations instables, précipitations et échecs de dissolution",
      placeholder: "Ex : Nous avons testé 4 formulations à base de cyclodextrines (précipitation rapide), puis un co-solvant (toxicité inacceptable)...",
      extractKey: "Itérations et impasses galéniques",
      typicalImpassesExample: "Abandon d’un système d’enrobage acrylique en raison d’une rupture d’intégrité à pH 5.5."
    },
    {
      id: 6,
      question: "Quels résultats quantitatifs in vitro ou précliniques avez-vous validés sur le lot final ?",
      subtext: "Données analytiques et pharmacocinétiques obtenues",
      placeholder: "Ex : Profil de libération validé avec f2 = 78, dissolution complète à 92% en 45 min, stabilité ICH confirmée à 12 mois sans impureté...",
      extractKey: "Preuves analytiques validées",
      typicalImpassesExample: "AUC plasmatique multipliée par 3.8 chez l’animal avec réduction de moitié de la dose nécessaire."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Taux de dissolution à 30 min (%)', 'Stabilité chimique sous stress ICH (mois)', 'Biodisponibilité relative AUC (+%)', 'Teneur résiduelle en solvants (ppm)'],
    functional: ['Forme orodispersible se dissolvant en moins de 15 secondes sans eau', 'Prise médicamenteuse réduite de 3 fois par jour à 1 seule prise par jour', 'Goût désagréable masqué sans dégradation de cinétique'],
    ergonomic: ['Conditionnement unitaire sécurisé inviolable mais ouverture facilitée pour patients arthritiques', 'Emballage compact portable résistant à l’humidité tropicale', 'Dispositif de dosage visuel anti-surdosage'],
    ecoDesign: ['Suppression totale des solvants organiques halogénés dans la fabrication', 'Excipients issus de sources renouvelables certifiées', 'Emballage blister sans PVC 100% recyclable']
  },
  secondaryDisciplinesSuggestions: [
    'Galénique & Pharmacotechnie',
    'Chimie Analytique & Chromatographie (HPLC-MS)',
    'Pharmacocinétique & Pharmacodynamie (PK/PD)',
    'Chimie Physique & Cristallographie Pharmaceutique',
    'Nanotechnologies & Systèmes d’Administration Ciblés',
    'Toxicologie Préclinique'
  ]
};
