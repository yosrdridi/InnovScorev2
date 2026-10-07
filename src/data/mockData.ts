import { Company, Project } from '../types';

export const INITIAL_COMPANIES: Company[] = [
  {
    id: 'comp-1',
    name: 'SynapTech Solutions SAS',
    siren: '849 203 112',
    naf: '72.19Z - Recherche-développement en autres sciences physiques et naturelles',
    size: 'PETITE', // PME (<50 pers) => Eligible CIR & CII
    fiscalYearEnd: '31/12/2025',
    sector: 'DeepTech / Neurotechnologies & Intelligence Artificielle',
    rdTeamSize: 14,
    contactName: 'Dr. Éléonore Vasseur',
    contactEmail: 'e.vasseur@synaptech-solutions.fr',
    notes: 'Société innovante créée en 2021. Travaux sur le traitement du signal biomédical et neurosciences computationnelles.'
  },
  {
    id: 'comp-2',
    name: 'EcoPack Technologies SARL',
    siren: '751 908 443',
    naf: '22.22Z - Fabrication d’emballages en matières plastiques et biosourcées',
    size: 'MOYENNE', // PME (<250 pers) => Eligible CIR & CII
    fiscalYearEnd: '31/12/2025',
    sector: 'Éco-matériaux, Emballages intelligents & IoT passif',
    rdTeamSize: 7,
    contactName: 'Marc Lemoine',
    contactEmail: 'm.lemoine@ecopack-tech.com',
    notes: 'PME industrielle en transition écologique. Conception d’emballages thermorégulés réutilisables pour le fret pharmaceutique.'
  },
  {
    id: 'comp-3',
    name: 'TransLogistix Group SA',
    siren: '440 221 889',
    naf: '52.29B - Affrètement et organisation des transports',
    size: 'ETI', // ETI => Exclue du CII ! Eligible uniquement au CIR
    fiscalYearEnd: '31/12/2025',
    sector: 'Logistique multimodale & Systèmes d’information',
    rdTeamSize: 22,
    contactName: 'Julien Bertin (DAF)',
    contactEmail: 'j.bertin@translogistix.com',
    notes: 'Entreprise de taille intermédiaire (ETI - 650 salariés). Attention : le dispositif CII est strictement réservé aux PME.'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    companyId: 'comp-1',
    name: 'NeuroSense-RT : Filtrage Adaptatif d’Artéfacts EEG en Milieu Ambulatoire',
    year: 2025,
    projectLead: 'Dr. Éléonore Vasseur (Docteure en Traitement du Signal)',
    startDate: '2025-01-15',
    endDate: '2025-12-20',
    primaryDomain: 'medicalDevices',
    secondaryDisciplines: ['Électronique Médicale', 'Traitement du Signal Numérique', 'Intelligence Artificielle & Deep Learning'],
    generalDescription: 'Développement d’une architecture algorithmique de détection et suppression en temps réel des artéfacts myogéniques et oculaires sur signaux électroencéphalographiques (EEG) ultra-basse puissance.',
    context: 'L’enregistrement EEG en conditions de vie réelle (ambulatoire) est massivement pollué par les mouvements musculaires (EMG) et clignements oculaires (EOG), saturant le rapport signal sur bruit.',
    objectives: 'Atteindre une latence de débruitage inférieure à 12 ms avec conservation de la phase spectrale sans recourir à des voies de référence auxiliaires.',
    technologiesUsed: ['Python', 'C++ DSP', 'PyTorch', 'Algorithmes Wavelet-ICA', 'Filtrage Kalman Adaptatif', 'Microcontrôleur Cortex-M33'],
    knownStateOfTheArt: 'L’état de l’art académique (analyses FastICA, EEMD-BSS de Sweeney et al. 2022) exige des fenêtres temporelles supérieures à 500 ms et une puissance de calcul incompatible avec l’embarqué. Les approches par réseaux de neurones profonds (EEGNet) dégradent la phase fréquentielle.',
    difficultiesEncountered: 'Impossibilité mathématique d’inverser les matrices de covariance en temps réel sur microcontrôleur basse consommation tout en préservant les bandes d’ondes Gamma (30-80 Hz). L’instabilité numérique des filtres adaptatifs en présence de sauts d’impédance cutanée constituait un verrou fondamental.',
    workCarriedOut: 'Formulation d’un nouveau modèle stochastique à décomposition parcimonieuse multirésolution. Conception d’un banc d’expérimentation matériel avec générateur de signaux synthétiques bruités calibrés. Réalisation de 4 séries de campagnes comparatives.',
    experiments: 'Campagne de tests sur 36 volontaires sains avec protocoles de mouvements calibrés (mastication, saccades oculaires). Comparaison systématique avec 4 bibliothèques de référence (MNE-Python, EEGLAB). 14 itérations d’ajustement des hyperparamètres de régularisation.',
    results: 'Rapport signal sur bruit amélioré de +8.4 dB par rapport à la méthode de référence (W-ICA), latence stable à 9.8 ms sur Cortex-M33, reproductibilité validée sur 100% des profils d’impédance testés.',
    
    // Qualification questionnaire
    problemToSolve: 'Suppression temps réel des bruits myomoteurs sans capteurs auxiliaires et sans altération des signaux cérébraux utiles.',
    whyExistingSolutionsInsufficient: 'Toutes les approches documentées dans la littérature nécessitent soit un post-traitement différé (non temps-réel), soit des voies électrophysiologiques de référence impossibles en casque léger.',
    knowledgeLevelAtStart: 'Connaissances limitées aux méthodes statistiques globales (ICA classique) inapplicables au flux continu temps réel basse consommation.',
    canBeSolvedByStandardKnowledge: false,
    feasibilityUncertainty: 'Incertitude totale sur la stabilité mathématique de l’algorithme en virgule fixe et la conservation de l’information de phase.',
    hypothesesFormulated: 'Hypothèse 1 : Une projection orthogonale dans un sous-espace d’ondelettes dynamiques permet de découpler les transitoires musculaires. Hypothèse 2 : La régularisation bayésienne récursive stabilise le filtre en présence de micro-déconnexions.',
    quantitativeDataAvailable: 'Métriques SNR mesurées (+8.4 dB), latence moyenne 9.8 ms (écart-type 0.6 ms), consommation mémoire 48 Ko RAM.',
    newKnowledgeAcquired: 'Établissement d’un modèle mathématique original de décorrélation parcimonieuse en flux continu, réutilisable pour d’autres biocapteurs (ECG ambulatoire).',
    reproducibleResults: true,
    unresolvedBarriers: 'La robustesse en cas de transpiration excessive avec dérivée d’offset continu nécessite encore des investigations pour 2026.',
    
    // Team & Budget
    teamMembers: [
      { id: 'tm-1', name: 'Dr. Éléonore Vasseur', role: 'Directrice R&D & Mathématicienne', qualification: 'DOCTEUR', daysSpent: 160 },
      { id: 'tm-2', name: 'Karim Belkacem', role: 'Ingénieur Embarqué & DSP', qualification: 'INGENIEUR', daysSpent: 135 },
      { id: 'tm-3', name: 'Sophie Danet', role: 'Ingénieure Data Science', qualification: 'INGENIEUR', daysSpent: 90 }
    ],
    totalDaysSpent: 385,
    estimatedBudget: 245000,
    
    // CIR Evaluation
    cirDimensions: [
      {
        key: 'etatDeLart',
        title: 'État de l’art',
        score: 4,
        justification: 'État de l’art exhaustif fondé sur les publications IEEE Transactions on Biomedical Engineering 2021-2024 et l’étude des brevets de détection EEG.',
        favorablePoints: ['Bibliographie académique identifiant les limites de l’ICA et de l’EEMD', 'Benchmark des bibliothèques open-source et des brevets déposés'],
        unfavorablePoints: [],
        missingElements: []
      },
      {
        key: 'verrou',
        title: 'Verrou scientifique ou technique',
        score: 4,
        justification: 'Verrou mathématique avéré : décorrélation aveugle en streaming continu sans voie de référence sous contrainte de 12 ms.',
        favorablePoints: ['La difficulté dépasse largement les règles de l’art d’un développeur DSP', 'Incertitude fondamentale sur l’inversion matricielle récursive'],
        unfavorablePoints: [],
        missingElements: []
      },
      {
        key: 'incertitude',
        title: 'Incertitude',
        score: 4,
        justification: 'La convergence du modèle n’était absolument pas prédictible avant les simulations de Monte Carlo.',
        favorablePoints: ['Faisabilité initiale incertaine, rejet des solutions directes', 'Phénomènes d’instabilité numérique imprévisibles'],
        unfavorablePoints: [],
        missingElements: []
      },
      {
        key: 'demarche',
        title: 'Démarche expérimentale',
        score: 4,
        justification: 'Campagnes d’essais structurées avec protocole de validation clinique et métriques quantifiées.',
        favorablePoints: ['14 itérations d’ajustement documentées', 'Échecs initiaux consignés avec abandon d’approches naïves', 'Mesures de SNR et latences sur banc étalon'],
        unfavorablePoints: [],
        missingElements: []
      },
      {
        key: 'connaissances',
        title: 'Production de connaissances nouvelles',
        score: 4,
        justification: 'Production d’un corpus théorique inédit et rédaction d’un projet d’article scientifique.',
        favorablePoints: ['Connaissances transférables à l’électrophysiologie embarquée', 'Preuve de concept validée sur banc indépendant'],
        unfavorablePoints: [],
        missingElements: []
      }
    ],
    
    // Frascati 5 Criteria
    frascatiCriteria: [
      {
        id: 'nouveaute',
        name: 'Nouveauté',
        definition: 'Les travaux doivent viser l’acquisition de connaissances nouvelles dépassant l’état des connaissances accessibles.',
        score: 4,
        supportingElements: ['Modèle théorique original de décorrélation en flux continu sans voie EOG'],
        weakeningElements: [],
        missingInformation: []
      },
      {
        id: 'creativite',
        name: 'Créativité',
        definition: 'Les travaux doivent reposer sur des concepts ou hypothèses originales et non uniquement sur l’application de solutions standards.',
        score: 4,
        supportingElements: ['Hybridation ondelettes parcimonieuses et régularisation bayésienne récursive'],
        weakeningElements: [],
        missingInformation: []
      },
      {
        id: 'incertitude',
        name: 'Incertitude',
        definition: 'Le résultat, le coût, les performances ou la méthode ne doivent pas être entièrement prévisibles au début des travaux.',
        score: 4,
        supportingElements: ['Impossibilité de prédire la stabilité numérique du filtre en virgule fixe'],
        weakeningElements: [],
        missingInformation: []
      },
      {
        id: 'systematicite',
        name: 'Systématicité',
        definition: 'Les travaux doivent être conduits suivant une démarche organisée, planifiée et documentée.',
        score: 4,
        supportingElements: ['Cahier de manipulation de laboratoire, plan de test, traçabilité Git et Jira'],
        weakeningElements: [],
        missingInformation: []
      },
      {
        id: 'transferabilite',
        name: 'Transférabilité / Reproductibilité',
        definition: 'Les résultats ou connaissances obtenus doivent pouvoir être documentés, reproduits ou réutilisés.',
        score: 4,
        supportingElements: ['Résultats reproductibles sur jeux de données synthétiques et cohortes de test'],
        weakeningElements: [],
        missingInformation: []
      }
    ],
    
    // CII Evaluation (Secondary for this project)
    ciiAnalysis: {
      isPmeEligible: true,
      productName: 'Dispositif EEG Ambulatoire NeuroSense Mini',
      productType: 'MIXTE',
      targetAudience: 'Neurologues et centres du sommeil',
      referenceMarket: 'Casques EEG Holter du marché européen (Emotiv, Brain Products)',
      competitorProducts: 'Dispositifs existants nécessitant un bonnet lourd avec gel conducteur',
      axes: [
        {
          axis: 'performancesTechniques',
          title: 'Performances techniques',
          productPerformance: 'Autonomie 18h en continu, SNR > 22 dB',
          competitorsPerformance: 'Autonomie 4h ou traitement post-hoc différé',
          differential: 'Gain d’autonomie de 350% et traitement temps réel',
          evidenceAvailable: 'Rapports de banc de test thermique et énergétique',
          innovationLevel: 4
        },
        {
          axis: 'fonctionnalites',
          title: 'Fonctionnalités',
          productPerformance: 'Alerte instantanée des pointes épileptiques en direct',
          competitorsPerformance: 'Simple enregistrement sur carte SD',
          differential: 'Surveillance active embarquée',
          evidenceAvailable: 'Spécification fonctionnelle validée',
          innovationLevel: 3
        },
        {
          axis: 'ergonomie',
          title: 'Ergonomie',
          productPerformance: 'Casque souple textile 120g sans gel',
          competitorsPerformance: 'Casques rigides 450g avec application de gel',
          differential: 'Confort de port nocturne sans irritation cutanée',
          evidenceAvailable: 'Enquête d’ergonomie auprès de 15 patients',
          innovationLevel: 3
        },
        {
          axis: 'ecoconception',
          title: 'Écoconception',
          productPerformance: 'Électrodes réutilisables en silicone conducteur lavable',
          competitorsPerformance: 'Consommables plastiques à usage unique',
          differential: 'Réduction de 80% des déchets consommables',
          evidenceAvailable: 'Bilan d’Analyse du Cycle de Vie (ACV)',
          innovationLevel: 3
        }
      ],
      prototypeStatus: {
        hasPrototype: true,
        prototypeType: 'PROTOTYPE',
        description: 'Prototype fonctionnel Alpha 2 testé sur banc et sujets d’essai.',
        userTestingDone: true,
        readyForMarket: false
      },
      overallScore: 13,
      potential: 'FORT',
      justification: 'Le projet possède également un potentiel CII fort sur son prototype produit, mais son éligibilité CIR est prioritaire et plus protectrice.'
    },
    
    // Evidences
    evidences: [
      {
        id: 'ev-1',
        projectId: 'proj-1',
        title: 'Étude bibliographique et cartographie de l’état de l’art IEEE 2024',
        type: 'PUBLICATION_SCIENTIFIQUE',
        date: '2025-02-10',
        author: 'Dr. Éléonore Vasseur',
        associatedClaim: 'Démonstration des limites des algorithmes FastICA et Wavelet standards',
        reliability: 'SOLIDE',
        urlOrRef: 'REF-BIBLIO-NS-2025-01.pdf',
        comments: 'Documente 28 publications internationales avec analyse critique.'
      },
      {
        id: 'ev-2',
        projectId: 'proj-1',
        title: 'Rapport d’essais comparatifs sur banc de signaux étalons',
        type: 'RAPPORT_ESSAIS',
        date: '2025-07-18',
        author: 'Karim Belkacem',
        associatedClaim: 'Gain de SNR mesuré à +8.4 dB et latence 9.8 ms',
        reliability: 'SOLIDE',
        urlOrRef: 'TEST-BENCH-RT-RESULTS-v3.xlsx',
        comments: 'Contient les courbes d’erreur quadratique moyenne et de latence horodatées.'
      },
      {
        id: 'ev-3',
        projectId: 'proj-1',
        title: 'Historique des commits et branches de recherche GitLab',
        type: 'JIRA_GIT',
        date: '2025-11-30',
        author: 'Équipe R&D DSP',
        associatedClaim: 'Traçabilité des 14 itérations d’optimisation algorithmique',
        reliability: 'SOLIDE',
        urlOrRef: 'gitlab.synaptech.internal/rd/dsp-kalman-wavelets',
        comments: 'Logs de commits horodatés montrant les POCs abandonnés.'
      }
    ],
    
    missingInformation: [],
    smartInterviews: [
      {
        id: 'int-1',
        question: 'Quelle performance était insuffisante avec les solutions existantes ?',
        context: 'État de l’art & Verrou',
        userAnswer: 'La latence de traitement dépassait 500 ms sur processeur classique, rendant impossible la détection en direct des crises épileptiques.',
        suggestedFollowUp: 'Quelle était la puissance électrique disponible sur votre cible embarquée ?',
        fieldToUpdate: 'difficultiesEncountered',
        detectedFacts: ['Latence initiale > 500ms', 'Objectif temps réel < 12ms', 'Contrainte ultra-basse puissance']
      }
    ],
    lastUpdated: '2025-12-22'
  },
  {
    id: 'proj-2',
    companyId: 'comp-2',
    name: 'SmartPack Pro : Emballage Isotherme Connecté Autonome et Éco-conçu',
    year: 2025,
    projectLead: 'Marc Lemoine (Directeur Innovation Produit)',
    startDate: '2025-03-01',
    endDate: '2025-11-15',
    primaryDomain: 'mechanical',
    secondaryDisciplines: ['Thermique des Structures', 'Éco-matériaux', 'Capteurs & Métrologie'],
    generalDescription: 'Conception et prototypage d’un conteneur réutilisable pour produits thermosensibles (vaccins, biothérapies) intégrant un matériau à changement de phase biosourcé et un système de traçabilité basse consommation.',
    context: 'Les emballages pharmaceutiques jetables en polystyrène génèrent un volume de déchets critique et un taux de rupture de chaîne du froid de 3.2% lors des transits douaniers.',
    objectives: 'Maintenir la plage +2°C / +8°C pendant 96 heures consécutives sans alimentation active, avec enregistrement des températures par tag NFC passif.',
    technologiesUsed: ['Matériau à changement de phase (MCP)', 'Biopolymère PLA/PHA expansé', 'Capteur NFC passif sans batterie', 'Moulage par compression sous vide'],
    knownStateOfTheArt: 'Les conteneurs passifs du marché (Sopavex, ThermoSafe) tiennent 48h à 72h avec des gels eutectiques lourds ou nécessitent des caisses actives réfrigérées motorisées très coûteuses.',
    difficultiesEncountered: 'Difficulté à assembler le matériau isolant biosourcé avec les parois étanches sans créer de ponts thermiques dans les angles du conteneur.',
    workCarriedOut: 'Dimensionnement thermique par simulation CAO standard, conception de 3 géométries d’emboîtement de couvercle, prototypage rapide en impression 3D et thermoformage, tests en chambre climatique.',
    experiments: 'Essais de maintien thermique en étuve climatique à +35°C constant pour comparer les 3 variantes de joints d’étanchéité.',
    results: 'Validation d’un prototype capable de maintenir la plage 2-8°C pendant 98 heures, avec un gain de poids de 32% par rapport aux solutions isothermes équivalentes.',
    
    // Qualification questionnaire
    problemToSolve: 'Créer un emballage isotherme réutilisable 50 fois offrant des performances de maintien au froid supérieures aux produits concurrents sans composants jetables.',
    whyExistingSolutionsInsufficient: 'Les produits du marché n’atteignent pas 96h d’autonomie sans dépasser la limite de poids pour le fret express avion.',
    knowledgeLevelAtStart: 'Les propriétés physiques des MCP et des isolants biosourcés sont bien documentées chez les fournisseurs de polymères.',
    canBeSolvedByStandardKnowledge: true, // Key: solvable by engineering rules of thumb!
    feasibilityUncertainty: 'Pas d’incertitude scientifique sur les équations de transfert thermique (loi de Fourier standard), mais incertitude sur l’ergonomie de fermeture rapide et la tenue mécanique aux chocs.',
    hypothesesFormulated: 'Optimisation de la géométrie des emboîtements pour éliminer les fuites convectives.',
    quantitativeDataAvailable: 'Courbe de température en chambre climatique (98h à +35°C), masse totale 4.2 kg vs 6.1 kg pour le concurrent direct.',
    newKnowledgeAcquired: 'Savoir-faire interne de conception moule et règles d’assemblage, mais pas de nouveau principe physique découvert.',
    reproducibleResults: true,
    unresolvedBarriers: 'Aucun verrou fondamental non résolu.',
    
    teamMembers: [
      { id: 'tm-4', name: 'Marc Lemoine', role: 'Chef de projet innovation', qualification: 'INGENIEUR', daysSpent: 95 },
      { id: 'tm-5', name: 'Camille Roux', role: 'Designer produit & plasturgie', qualification: 'INGENIEUR', daysSpent: 75 }
    ],
    totalDaysSpent: 170,
    estimatedBudget: 110000,
    
    // CIR: Weak (Engineering & product development, not fundamental R&D)
    cirDimensions: [
      {
        key: 'etatDeLart',
        title: 'État de l’art',
        score: 1,
        justification: 'Benchmark purement commercial des produits concurrents, absence d’analyse de la littérature scientifique thermique.',
        favorablePoints: ['Benchmark commercial précis des produits concurrents'],
        unfavorablePoints: ['Pas de bibliographie académique', 'Utilisation de matériaux disponibles dans le commerce'],
        missingElements: ['Vérifier s’il existe des brevets sur la formulation MCP']
      },
      {
        key: 'verrou',
        title: 'Verrou scientifique ou technique',
        score: 1,
        justification: 'Difficulté d’ingénierie et d’ajustement mécanique classique (suppression des ponts thermiques), résolue par règles de l’art.',
        favorablePoints: ['Contrainte dimensionnelle forte'],
        unfavorablePoints: ['Problème de plasturgie et d’assemblage classique sans incertitude physique majeure'],
        missingElements: []
      },
      {
        key: 'incertitude',
        title: 'Incertitude',
        score: 1,
        justification: 'Résultat prévisible à partir des équations de transfert thermique et des fiches techniques des MCP.',
        favorablePoints: ['Incertitude sur la tenue aux vibrations de transport'],
        unfavorablePoints: ['Comportement thermique modélisable sans rupture théorique'],
        missingElements: []
      },
      {
        key: 'demarche',
        title: 'Démarche expérimentale',
        score: 2,
        justification: 'Tests en chambre climatique pour valider le cahier des charges, mais pas d’expérimentation scientifique fondamentale.',
        favorablePoints: ['Courbes de température enregistrées'],
        unfavorablePoints: ['Simple qualification fonctionnelle de prototype'],
        missingElements: []
      },
      {
        key: 'connaissances',
        title: 'Production de connaissances nouvelles',
        score: 1,
        justification: 'Acquisition d’un savoir-faire industriel interne sans publication ni création de connaissances génériques.',
        favorablePoints: ['REX interne utile pour la gamme'],
        unfavorablePoints: ['Pas de connaissances nouvelles au sens de Frascati'],
        missingElements: []
      }
    ],
    
    frascatiCriteria: [
      { id: 'nouveaute', name: 'Nouveauté', definition: 'Acquisition de connaissances nouvelles.', score: 1, supportingElements: [], weakeningElements: ['Connaissances déjà disponibles chez les fabricants de MCP'], missingInformation: [] },
      { id: 'creativite', name: 'Créativité', definition: 'Concepts ou hypothèses originaux.', score: 2, supportingElements: ['Agencement géométrique original du joint'], weakeningElements: ['Application des règles de l’art du design d’emballage'], missingInformation: [] },
      { id: 'incertitude', name: 'Incertitude', definition: 'Incertitude sur la faisabilité.', score: 1, supportingElements: [], weakeningElements: ['Faisabilité prévisible dès la phase de CAO'], missingInformation: [] },
      { id: 'systematicite', name: 'Systématicité', definition: 'Démarche organisée et planifiée.', score: 3, supportingElements: ['Suivi rigoureux des campagnes d’essais thermiques'], weakeningElements: [], missingInformation: [] },
      { id: 'transferabilite', name: 'Transférabilité', definition: 'Résultats reproductibles.', score: 2, supportingElements: ['Plans CAO documentés'], weakeningElements: ['Pas de transfert scientifique externe'], missingInformation: [] }
    ],
    
    // CII: Very Strong!
    ciiAnalysis: {
      isPmeEligible: true, // EcoPack is PME
      productName: 'Boîtier Isotherme SmartPack Pro 24L',
      productType: 'MATERIEL',
      targetAudience: 'Laboratoires pharmaceutiques et transporteurs de produits de santé',
      referenceMarket: 'Marché européen des emballages isothermes passifs certifiés BPF',
      competitorProducts: 'Caisses polystyrène jetables Sopapack et caisses rigides EutecticBox 72h',
      axes: [
        {
          axis: 'performancesTechniques',
          title: 'Performances techniques',
          productPerformance: 'Maintien de température 98h (+35°C ext), masse à vide 4.2 kg',
          competitorsPerformance: 'Maintien max 72h, masse moyenne 6.1 kg',
          differential: 'Autonomie accrue de +36% et allègement de 31%',
          evidenceAvailable: 'Rapports d’essais thermiques comparatifs en chambre certifiée COFRAC',
          innovationLevel: 4
        },
        {
          axis: 'fonctionnalites',
          title: 'Fonctionnalités',
          productPerformance: 'Capteur de température sans batterie interrogé par smartphone NFC à travers la paroi',
          competitorsPerformance: 'Dataloggers USB nécessitant l’ouverture de la caisse (rupture thermique)',
          differential: 'Lecture de conformité douanière instantanée sans rupture de scellé',
          evidenceAvailable: 'Spécification technique de l’antenne NFC et tests terrain',
          innovationLevel: 4
        },
        {
          axis: 'ergonomie',
          title: 'Ergonomie',
          productPerformance: 'Système d’ouverture/fermeture sans scotch en 4 secondes avec poignées escamotables',
          competitorsPerformance: 'Fermeture par ruban adhésif renforcé fastidieux (1 min 30 par colis)',
          differential: 'Productivité logistique multipliée par 10 lors du conditionnement',
          evidenceAvailable: 'Chronométrage vidéo sur poste d’emballage logistique',
          innovationLevel: 3
        },
        {
          axis: 'ecoconception',
          title: 'Écoconception',
          productPerformance: 'Matériaux biosourcés recyclables à 94%, réutilisable 50 cycles',
          competitorsPerformance: 'Polystyrène expansé à usage unique non valorisé',
          differential: 'Réduction de l’empreinte carbone de 68% sur le cycle de vie',
          evidenceAvailable: 'Analyse de Cycle de Vie (ACV) normalisée ISO 14040',
          innovationLevel: 4
        }
      ],
      prototypeStatus: {
        hasPrototype: true,
        prototypeType: 'PROTOTYPE',
        description: 'Deux prototypes échelle 1 entièrement injectés et testés en conditions réelles.',
        userTestingDone: true,
        readyForMarket: false
      },
      overallScore: 15,
      potential: 'FORT',
      justification: 'Excellente éligibilité au Crédit Impôt Innovation (CII). Les 4 axes démontrent des performances nettement supérieures aux solutions concurrentes sur le marché pertinent, avec prototype tangible et statut PME.'
    },
    
    evidences: [
      {
        id: 'ev-4',
        projectId: 'proj-2',
        title: 'Rapport de tests thermiques comparatifs en chambre climatique COFRAC',
        type: 'RAPPORT_ESSAIS',
        date: '2025-08-14',
        author: 'Laboratoire d’Essais Thermiques Sud',
        associatedClaim: 'Maintien de température 98h vs 72h pour les leaders du marché',
        reliability: 'SOLIDE',
        urlOrRef: 'RAP-COFRAC-2025-884.pdf',
        comments: 'Rapport d’organisme tiers indépendant avec courbes étalonnées.'
      },
      {
        id: 'ev-5',
        projectId: 'proj-2',
        title: 'Étude d’écoconception et Analyse du Cycle de Vie (ACV)',
        type: 'DOCUMENTATION_TECHNIQUE',
        date: '2025-09-02',
        author: 'Cabinet EcoLife Conseils',
        associatedClaim: 'Réduction de 68% des émissions de CO2 par rapport au polystyrène',
        reliability: 'SOLIDE',
        urlOrRef: 'ACV-SMARTPACK-2025.pdf',
        comments: 'Calcul conforme aux normes ISO 14040 et 14044.'
      }
    ],
    
    missingInformation: [
      {
        id: 'miss-cii-1',
        category: 'CII_MARCHE',
        title: 'Étude formelle des prix de vente et fiches techniques concurrentes',
        description: 'Disposer des fiches produits officielles des concurrents directs pour consolider le dossier justificatif CII.',
        impactOnAudit: 'L’administration demande la preuve formelle des caractéristiques techniques des concurrents comparés.',
        recommendedQuestion: 'Avez-vous archivé les plaquettes commerciales et fiches techniques des concurrents datées de 2025 ?',
        expectedDeliverable: 'Dossier de veille concurrentielle avec fiches techniques téléchargeables.',
        resolved: false
      }
    ],
    smartInterviews: [],
    lastUpdated: '2025-11-20'
  },
  {
    id: 'proj-3',
    companyId: 'comp-3',
    name: 'CloudPortal 2.0 : Migration Microservices et Refonte UX Portail Client',
    year: 2025,
    projectLead: 'Alexandre Meyer (Responsable Informatique)',
    startDate: '2025-01-01',
    endDate: '2025-10-31',
    primaryDomain: 'software',
    secondaryDisciplines: ['Systèmes Distribués & Cloud', 'DevOps & Infrastructure'],
    generalDescription: 'Migration de l’application monolithique PHP vers une architecture microservices Node.js / React avec intégration d’API REST de transporteurs tiers et changement d’infrastructure vers AWS.',
    context: 'L’ancien portail web souffrait de ralentissements et nécessitait une maintenance corrective trop fréquente lors des pics d’activité.',
    objectives: 'Améliorer le confort d’utilisation pour les clients, refactoring de la base de code, intégration d’API de géolocalisation et mise en conformité RGPD.',
    technologiesUsed: ['React', 'TypeScript', 'Node.js Express', 'Docker', 'AWS ECS', 'PostgreSQL', 'Intégration d’API Stripe et Shippo'],
    knownStateOfTheArt: 'L’équipe a suivi la documentation officielle AWS et les tutoriels React pour structurer l’application.',
    difficultiesEncountered: 'Difficulté à synchroniser les données entre l’ancienne base MySQL et la nouvelle base Postgres lors du changement d’infrastructure, et gestion des droits utilisateurs.',
    workCarriedOut: 'Développement logiciel standard avec création d’interfaces responsives, refactoring du code legacy, paramétrage logiciel des conteneurs Docker et automatisation des déploiements CI/CD.',
    experiments: 'Tests unitaires et tests de charge avec Apache JMeter pour vérifier la tenue des serveurs.',
    results: 'Mise en production réussie en septembre 2025. Vitesse de chargement des pages améliorée de 40%, satisfaction client en hausse.',
    
    // Qualification questionnaire
    problemToSolve: 'Moderniser le portail client vieillissant et supprimer les bugs récurrents.',
    whyExistingSolutionsInsufficient: 'Le système interne monolithique était devenu trop complexe à maintenir.',
    knowledgeLevelAtStart: 'Les technologies choisies (React, Node, Docker) sont largement maîtrisées par le marché.',
    canBeSolvedByStandardKnowledge: true,
    feasibilityUncertainty: 'Aucune incertitude sur la faisabilité technique : de milliers d’entreprises ont déjà réalisé cette même migration.',
    hypothesesFormulated: 'Aucune hypothèse scientifique formulée.',
    quantitativeDataAvailable: 'Temps de chargement des pages passé de 2.8s à 1.7s.',
    newKnowledgeAcquired: 'Montée en compétence des développeurs sur React et Docker.',
    reproducibleResults: true,
    unresolvedBarriers: 'Aucun.',
    
    teamMembers: [
      { id: 'tm-6', name: 'Alexandre Meyer', role: 'Lead Dev', qualification: 'INGENIEUR', daysSpent: 140 },
      { id: 'tm-7', name: 'Thomas Vidal', role: 'Développeur Frontend', qualification: 'AUTRE', daysSpent: 110 }
    ],
    totalDaysSpent: 250,
    estimatedBudget: 145000,
    
    // CIR: 0/4 across the board! Classic engineering trap!
    cirDimensions: [
      {
        key: 'etatDeLart',
        title: 'État de l’art',
        score: 0,
        justification: 'Aucun état de l’art scientifique. Simple consultation de la documentation éditeur et de tutoriels d’intégration.',
        favorablePoints: [],
        unfavorablePoints: ['Documentation purement technique/commerciale standard'],
        missingElements: ['Recherche de verrou algorithmique spécifique']
      },
      {
        key: 'verrou',
        title: 'Verrou scientifique ou technique',
        score: 0,
        justification: 'Difficultés de gestion de projet et d’intégration classique, entièrement résolubles par l’application des règles de l’art du génie logiciel.',
        favorablePoints: [],
        unfavorablePoints: ['Migration de base de données et intégration d’API sont des opérations courantes'],
        missingElements: []
      },
      {
        key: 'incertitude',
        title: 'Incertitude',
        score: 0,
        justification: 'Le résultat était parfaitement prédictible dès lors que les composants tiers étaient correctement configurés.',
        favorablePoints: [],
        unfavorablePoints: ['Aucune incertitude méthodologique ou théorique'],
        missingElements: []
      },
      {
        key: 'demarche',
        title: 'Démarche expérimentale',
        score: 0,
        justification: 'Cycle en V ou méthodologie agile classique : conception, codage, tests unitaires et déploiement.',
        favorablePoints: [],
        unfavorablePoints: ['Absence totale d’hypothèses préalables et de protocoles d’essais de recherche'],
        missingElements: []
      },
      {
        key: 'connaissances',
        title: 'Production de connaissances nouvelles',
        score: 0,
        justification: 'Simple montée en compétences interne des équipes sur des technologies du marché.',
        favorablePoints: [],
        unfavorablePoints: ['Aucun apport pour l’état des connaissances'],
        missingElements: []
      }
    ],
    
    frascatiCriteria: [
      { id: 'nouveaute', name: 'Nouveauté', definition: 'Acquisition de connaissances nouvelles.', score: 0, supportingElements: [], weakeningElements: ['Technologies standard du marché (React, Docker, AWS)'], missingInformation: [] },
      { id: 'creativite', name: 'Créativité', definition: 'Concepts originaux.', score: 1, supportingElements: ['Nouvelle interface graphique'], weakeningElements: ['Design patterns conventionnels'], missingInformation: [] },
      { id: 'incertitude', name: 'Incertitude', definition: 'Incertitude sur la faisabilité.', score: 0, supportingElements: [], weakeningElements: ['Faisabilité garantie'], missingInformation: [] },
      { id: 'systematicite', name: 'Systématicité', definition: 'Démarche organisée.', score: 2, supportingElements: ['Gestion de sprint Scrum'], weakeningElements: ['Pas de démarche scientifique'], missingInformation: [] },
      { id: 'transferabilite', name: 'Transférabilité', definition: 'Résultats reproductibles.', score: 1, supportingElements: [], weakeningElements: ['Spécifique au SI de l’entreprise'], missingInformation: [] }
    ],
    
    // CII: Ineligible (Company is ETI, and standard portal is not a disruptive product)
    ciiAnalysis: {
      isPmeEligible: false, // TransLogistix is ETI !
      productName: 'Portail Logistique Web Client',
      productType: 'IMMATERIEL',
      targetAudience: 'Clients expéditeurs TransLogistix',
      referenceMarket: 'Portails SaaS de suivi d’expéditions de fret',
      competitorProducts: 'Portails équivalents des transporteurs Geodis, Kuehne+Nagel',
      axes: [
        {
          axis: 'performancesTechniques',
          title: 'Performances techniques',
          productPerformance: 'Temps de réponse 1.7s',
          competitorsPerformance: 'Temps de réponse 1.5s',
          differential: 'Aucune supériorité technique par rapport aux standards',
          evidenceAvailable: 'Logs JMeter',
          innovationLevel: 1
        },
        {
          axis: 'fonctionnalites',
          title: 'Fonctionnalités',
          productPerformance: 'Téléchargement de bordereaux PDF et tracking GPS',
          competitorsPerformance: 'Fonctionnalités déjà présentes chez tous les acteurs',
          differential: 'Mise à niveau fonctionnelle sans nouveauté',
          evidenceAvailable: 'Spécifications',
          innovationLevel: 1
        },
        {
          axis: 'ergonomie',
          title: 'Ergonomie',
          productPerformance: 'Interface moderne responsive',
          competitorsPerformance: 'Interfaces modernes similaires',
          differential: 'Confort utilisateur standard',
          evidenceAvailable: 'Maquettes Figma',
          innovationLevel: 1
        },
        {
          axis: 'ecoconception',
          title: 'Écoconception',
          productPerformance: 'Non mesuré',
          competitorsPerformance: 'Non mesuré',
          differential: 'Aucun différentiel documenté',
          evidenceAvailable: 'Aucune',
          innovationLevel: 0
        }
      ],
      prototypeStatus: {
        hasPrototype: false,
        prototypeType: 'AUCUN',
        description: 'Mise en production directe sur l’environnement de production commercial.',
        userTestingDone: false,
        readyForMarket: true
      },
      overallScore: 3,
      potential: 'TRES_FAIBLE',
      justification: 'Inéligibilité totale : l’entreprise est une ETI (exclue du CII), et le produit n’apporte aucune supériorité par rapport au marché.'
    },
    
    evidences: [
      {
        id: 'ev-6',
        projectId: 'proj-3',
        title: 'Tickets Jira de sprints de développement et refactoring',
        type: 'JIRA_GIT',
        date: '2025-05-12',
        author: 'Alexandre Meyer',
        associatedClaim: 'Suivi des tâches de développement des interfaces',
        reliability: 'MODEREE',
        urlOrRef: 'jira.translogistix.internal/browse/PORTAL-2025',
        comments: 'Les tickets décrivent des tâches d’intégration d’API et de création de composants UI.'
      }
    ],
    
    missingInformation: [
      {
        id: 'miss-eng-1',
        category: 'VERROU',
        title: 'Absence de verrou scientifique ou technique identifié',
        description: 'Le projet décrit des travaux d’ingénierie logicielle courante sans incertitude technique objective.',
        impactOnAudit: 'Rejet fiscal garanti avec application possible des pénalités pour manquement délibéré.',
        recommendedQuestion: 'Un algorithme d’optimisation sous contraintes a-t-il été développé pour le calcul de tournées ? Si non, le projet ne peut être valorisé au CIR.',
        expectedDeliverable: 'Requalification ou exclusion du projet de l’assiette CIR.',
        resolved: false
      }
    ],
    smartInterviews: [],
    lastUpdated: '2025-10-31'
  }
];
