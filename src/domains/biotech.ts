import { DomainProfile } from '../types';

export const biotechDomain: DomainProfile = {
  id: 'biotech',
  label: 'Biotechnologies',
  shortLabel: 'Biotech',
  description: 'Génie génétique, cultures cellulaires, fermentation biologique, ingénierie des protéines, biomolécules et biocapteurs.',
  iconName: 'Dna',
  terminology: {
    typicalUncertainties: [
      'Variabilité biologique inhérente et reproductibilité des rendements d’expression cellulaire',
      'Interactions moléculaires et cinétiques enzymatiques non modélisables par voie in silico',
      'Stabilité conformationnelle et repliement de protéines recombinantes sous stress thermique',
      'Maintien de la viabilité cellulaire sous contraintes de cisaillement en bioréacteur',
      'Spécificité et affinité de liaison en présence de matrices biologiques complexes'
    ],
    typicalExperiments: [
      'Essais in vitro sur lignées cellulaires primaires ou modèles 3D (sphéroïdes/organoïdes)',
      'Cinétiques de croissance cellulaire et profils métaboliques en bioréacteurs instrumentés',
      'Caractérisations par cytométrie en flux (FACS), ELISA, Western Blot et PCR quantitative',
      'Essais de stabilité enzymatique en fonction du pH, force ionique et cofacteurs',
      'Plans d’expériences factoriels pour l’optimisation des milieux de culture synthétiques'
    ],
    typicalObjectives: [
      'Augmentation du titre volumétrique d’expression d’une protéine d’intérêt (g/L)',
      'Conservation de l’activité biologique spécifique après 6 mois de conservation',
      'Élimination des impuretés cellulaires d’hôte (HCP) sous les limites de détection',
      'Diminution du temps de doublement cellulaire sans dérive génotypique'
    ],
    relevantMetrics: [
      'Titre d’expression ou rendement de bioconversion (g/L ou % molaire)',
      'Constante d’affinité de liaison Kd (nM ou pM)',
      'Taux de viabilité cellulaire (%) et densité cellulaire viable (VCD en cellules/mL)',
      'Activité enzymatique spécifique (U/mg de protéine)',
      'Pureté chromatographique HPLC/SEC (%)'
    ],
    stateOfTheArtSources: [
      'Revues scientifiques internationales à comité de lecture (Nature Biotechnology, Bioresource Technology)',
      'Brevets sur séquences génétiques, plasmides, enzymes modifiées et souches',
      'Bases de données génomiques et protéiques (NCBI GenBank, UniProt, PDB)',
      'Protocoles de référence publiés par les consortia académiques et pharmacopées'
    ],
    expectedEvidenceTypes: [
      'Cahiers de laboratoire horodatés avec signatures contemporaines des chercheurs',
      'Rapports de cytométrie en flux avec fenêtres d’analyse et témoins négatifs',
      'Gels d’électrophorèse et profils chromatographiques HPLC/FPLC bruts',
      'Courbes cinétiques de croissance et de consommation de substrat en fermenteur',
      'Certificats d’analyse de séquençage et contrôle qualité des banques de cellules'
    ]
  },
  routineActivities: [
    { keyword: 'application directe d’un protocole connu', category: 'Application de protocole standard', advice: 'Reproduire pas à pas un kit d’extraction ou protocole de transfection commercial sans verrou scientifique relève des pratiques de laboratoire courantes.', severity: 'CRITICAL' },
    { keyword: 'analyses biologiques de routine', category: 'Analyses de routine', advice: 'Les dosages enzymatiques ou PCR de routine pour caractériser des échantillons connus ne constituent pas des travaux de recherche éligibles.', severity: 'CRITICAL' },
    { keyword: 'contrôle qualité', category: 'Contrôle qualité réglementaire', advice: 'Les tests de libération de lots ou de stérilité relèvent de l’assurance qualité et de la conformité, non de la R&D.', severity: 'WARNING' },
    { keyword: 'répétition d’expériences standard', category: 'Répétition sans incertitude', advice: 'La répétition d’expériences pour confirmer des résultats connus sans démarche de résolution d’impasse n’est pas valorisable.', severity: 'WARNING' }
  ],
  followUpQuestions: [
    {
      id: 1,
      question: "Quel mécanisme biologique, interaction cellulaire ou limitation de rendement bloquait votre projet ?",
      subtext: "Précisez l’aléa biologique (toxicité de la molécule, instabilité de repliement, faible titre d’expression...)",
      placeholder: "Ex : La protéine recombinante s’accumulait sous forme de corps d’inclusion insolubles non fonctionnels...",
      extractKey: "Blocage biologique initial",
      typicalImpassesExample: "Chute de la viabilité cellulaire sous 40% dès que la concentration en produit dépassait 1.5 g/L."
    },
    {
      id: 2,
      question: "Quelle était la valeur de référence obtenue avec les souches ou protocoles de l’état de l’art ?",
      subtext: "Valeur chiffrée observée avant vos travaux (titre d’expression, constante Kd, taux de viabilité...)",
      placeholder: "Ex : Rendement limité à 0.35 g/L avec la souche standard et 60% d’agrégats inactifs...",
      extractKey: "Valeur de référence pré-projet",
      typicalImpassesExample: "Activité enzymatique résiduelle de seulement 12% après 48h à 37°C."
    },
    {
      id: 3,
      question: "Quel objectif quantifié visiez-vous qui dépassait les connaissances publiées ?",
      subtext: "Cible de rendement ou d’affinité justifiant l’effort de recherche",
      placeholder: "Ex : Atteindre un titre de 2.5 g/L de protéine soluble correctement repliée en système continu...",
      extractKey: "Objectif biologique visé",
      typicalImpassesExample: "Augmenter l’affinité Kd sous 5 nM sans induire de cytotoxicité non spécifique."
    },
    {
      id: 4,
      question: "Pourquoi les protocoles publiés et solutions académiques connues ne permettaient-ils pas d’y parvenir ?",
      subtext: "Expliquez les verrous moléculaires ou métaboliques intrinsèques",
      placeholder: "Ex : L’état de l’art documentait une saturation de la voie de sécrétion d’hôte causant l’apoptose cellulaire...",
      extractKey: "Nature du verrou biologique",
      typicalImpassesExample: "Incompatibilité entre le promoteur inducteur fort et la capacité des chaperonnes cellulaires endogènes."
    },
    {
      id: 5,
      question: "Quelles souches, vecteurs d’expression ou formulations de milieux avez-vous testés puis abandonnés ?",
      subtext: "La description des échecs d’expression, des mortalités cellulaires et des voies explorées sans succès",
      placeholder: "Ex : Nous avons testé 3 constructions plasmidiques alternatives qui ont toutes conduit à une perte d’activité catalytique...",
      extractKey: "Itérations et impasses biologiques",
      typicalImpassesExample: "Abandon d’une stratégie de co-expression de chaperonnes ayant entraîné une contamination protéique ingérable en aval."
    },
    {
      id: 6,
      question: "Quels résultats concrets et reproductibles avez-vous mesurés lors des essais finaux ?",
      subtext: "Données analytiques validées (ELISA, chromatographie, cytométrie)",
      placeholder: "Ex : Titre d’expression stabilisé à 2.8 g/L sur 5 passages successifs, taux d’agrégats < 2.5%, affinité Kd validée à 3.2 nM...",
      extractKey: "Preuves analytiques obtenues",
      typicalImpassesExample: "Rendement de bioconversion multiplié par 4.5 avec confirmation de la structure tertiaire par dichroïsme circulaire."
    }
  ],
  ciiMetricsSuggestions: {
    technical: ['Rendement de production (g/L)', 'Taux de pureté analytique (%)', 'Durée de conservation sans perte d’activité (mois)', 'Temps de cycle de fermentation (h)'],
    functional: ['Test de détection rapide sans équipement de laboratoire complexe', 'Stabilité à température ambiante supprimant la chaîne du froid', 'Spécificité accrue éliminant les faux positifs'],
    ergonomic: ['Format de cassette prêt à l’emploi sans manipulation de réactifs toxiques', 'Volume d’échantillon prélevé divisé par 10 (microlitres)', 'Lecture visuelle colorimétrique directe'],
    ecoDesign: ['Substrats de fermentation issus de coproduits agricoles recyclés', 'Suppression de solvants organiques chlorés dans la purification', 'Milieu de culture 100% biosourcé sans sérum bovin']
  },
  secondaryDisciplinesSuggestions: [
    'Biologie Moléculaire & Génétique',
    'Bio-informatique & Modélisation In Silico',
    'Microbiologie Industrielle & Fermentation',
    'Immunologie & Anticorps Recombinants',
    'Purification Aval (Downstream Processing / FPLC)',
    'Biocapteurs & Microfluidique',
    'Enzymologie & Biocatalyse'
  ]
};
