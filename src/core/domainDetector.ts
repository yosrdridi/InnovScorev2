import { Project, DomainId, DomainDetectionResult } from '../types';
import { ALL_DOMAINS } from '../domains';

interface DomainKeywordRule {
  domain: DomainId;
  keywords: string[];
  disciplines: string[];
}

const DOMAIN_KEYWORD_RULES: DomainKeywordRule[] = [
  {
    domain: 'software',
    keywords: [
      'algorithme', 'logiciel', 'software', 'python', 'c++', 'code', 'ia', 'intelligence artificielle',
      'deep learning', 'machine learning', 'pytorch', 'tensorflow', 'base de données', 'api', 'cloud',
      'frontend', 'backend', 'scalabilité', 'latence', 'framework', 'dataset', 'réseau de neurones'
    ],
    disciplines: ['Intelligence Artificielle', 'Traitement du Signal', 'Systèmes Distribués', 'Vision par Ordinateur']
  },
  {
    domain: 'mechanical',
    keywords: [
      'mécanique', 'matériau', 'fatigue', 'vibration', 'frottement', 'friction', 'déformation', 'résistance',
      'rupture', 'traction', 'flexion', 'cao', 'catia', 'solidworks', 'usinage', 'pièce', 'châssis',
      'poutre', 'éléments finis', 'fea', 'moteur', 'engrenage', 'roulement', 'plasturgie'
    ],
    disciplines: ['Résistance des Matériaux', 'Calcul par Éléments Finis (FEA)', 'Tribologie', 'Dynamique des Fluides']
  },
  {
    domain: 'electronics',
    keywords: [
      'électronique', 'carte', 'pcb', 'circuit', 'microcontrôleur', 'cortex', 'stm32', 'fpga', 'dsp',
      'signal', 'cem', 'bruit', 'fréquence', 'puissance', 'batterie', 'consommation', 'courant',
      'tension', 'oscilloscope', 'rf', 'antenne', 'composant', 'routage', 'firmware', 'embarqué'
    ],
    disciplines: ['Systèmes Embarqués (Firmware)', 'Électronique Numérique & Analogique', 'Compatibilité Électromagnétique (CEM)', 'Radiofréquences']
  },
  {
    domain: 'biotech',
    keywords: [
      'biologique', 'cellulaire', 'in vitro', 'in vivo', 'protéine', 'adn', 'arn', 'génétique', 'gène',
      'enzyme', 'fermentation', 'bioréacteur', 'culture', 'souche', 'cytométrie', 'elisa', 'western blot',
      'pcr', 'bactérie', 'levure', 'recombinant', 'anticorps', 'biomasse'
    ],
    disciplines: ['Biologie Moléculaire', 'Bio-informatique', 'Génie Génétique', 'Microbiologie & Fermentation']
  },
  {
    domain: 'pharma',
    keywords: [
      'médicament', 'pharmaceutique', 'principe actif', 'api', 'formulation', 'galénique', 'comprimé',
      'gélule', 'biodisponibilité', 'dissolution', 'pharmacocinétique', 'auc', 'cmax', 'stabilité ich',
      'excipient', 'solubilité', 'libération prolongée', 'cristallisation', 'polymorphisme'
    ],
    disciplines: ['Galénique & Pharmacotechnie', 'Pharmacocinétique (PK/PD)', 'Chimie Thérapeutique', 'Toxicologie Préclinique']
  },
  {
    domain: 'chemistry',
    keywords: [
      'chimie', 'chimique', 'synthèse', 'polymère', 'résine', 'catalyseur', 'molécule', 'solvant',
      'composite', 'nanomatériau', 'nanoparticule', 'réaction', 'tg', 'viscosité', 'rhéologie',
      'spectroscopie', 'rmn', 'ftir', 'corrosion', 'adhésif', 'revêtement'
    ],
    disciplines: ['Chimie des Polymères', 'Nanomatériaux', 'Chimie Analytique', 'Science des Surfaces & Adhésion']
  },
  {
    domain: 'industrialProcesses',
    keywords: [
      'procédé', 'scale-up', 'pilote', 'usine', 'ligne', 'rendement', 'réacteur', 'continuité',
      'distillation', 'filtration', 'séparation', 'extrusion', 'mélangeur', 'colmatage', 'encrassement',
      'temps de séjour', 'perte de charge', 'bilan matière', 'bilan thermique', 'automate'
    ],
    disciplines: ['Génie des Procédés', 'Thermodynamique Industrielle', 'Filtration & Séparation Membranaire', 'Plans d’Expériences (DoE)']
  },
  {
    domain: 'energy',
    keywords: [
      'énergie', 'batterie', 'accumulateur', 'cellule', 'lithium', 'hydrogène', 'pile à combustible',
      'électrolyseur', 'panneau solaire', 'photovoltaïque', 'éolien', 'chaleur fatale', 'stockage thermique',
      'acv', 'carbone', 'co2', 'captage', 'cop', 'isolation', 'mcp'
    ],
    disciplines: ['Électrochimie & Batteries', 'Thermique des Systèmes', 'Énergies Renouvelables', 'Analyse du Cycle de Vie (ACV)']
  },
  {
    domain: 'medicalDevices',
    keywords: [
      'médical', 'dispositif médical', 'implant', 'prothèse', 'patient', 'clinique', 'chirurgical',
      'biocompatibilité', 'iso 10993', 'marquage ce', 'capteur physiologique', 'eeg', 'ecg', 'sang',
      'tissu', 'stérilisation', 'autoclave', 'diagnostic', 'mini-invasif', 'in vivo'
    ],
    disciplines: ['Biomatériaux & Biocompatibilité', 'Électronique Médicale', 'Biomécanique', 'Logiciel Dispositif Médical (SaMD)']
  }
];

export function detectProjectDomain(project: Partial<Project>): DomainDetectionResult {
  const combinedText = [
    project.name || '',
    project.generalDescription || '',
    project.context || '',
    project.objectives || '',
    project.difficultiesEncountered || '',
    project.workCarriedOut || '',
    project.experiments || '',
    (project.technologiesUsed || []).join(' ')
  ].join(' ').toLowerCase();

  const domainScores: Record<DomainId, number> = {
    software: 0,
    mechanical: 0,
    electronics: 0,
    biotech: 0,
    pharma: 0,
    chemistry: 0,
    industrialProcesses: 0,
    energy: 0,
    medicalDevices: 0,
    generic: 0
  };

  const matchedKeywords: Record<DomainId, string[]> = {
    software: [],
    mechanical: [],
    electronics: [],
    biotech: [],
    pharma: [],
    chemistry: [],
    industrialProcesses: [],
    energy: [],
    medicalDevices: [],
    generic: []
  };

  const detectedDisciplinesList: string[] = [];

  for (const rule of DOMAIN_KEYWORD_RULES) {
    for (const kw of rule.keywords) {
      if (combinedText.includes(kw)) {
        domainScores[rule.domain] += 1;
        matchedKeywords[rule.domain].push(kw);
      }
    }
  }

  // Find top score
  let bestDomain: DomainId = project.primaryDomain || 'software';
  let maxScore = 0;

  for (const [dom, score] of Object.entries(domainScores) as [DomainId, number][]) {
    if (score > maxScore) {
      maxScore = score;
      bestDomain = dom;
    }
  }

  // Secondary domains (any domain with at least 2 keywords or > 30% of maxScore)
  const secondaryDomains: string[] = [];
  for (const [dom, score] of Object.entries(domainScores) as [DomainId, number][]) {
    if (dom !== bestDomain && score >= 2) {
      secondaryDomains.push(dom);
      // add corresponding disciplines
      const rule = DOMAIN_KEYWORD_RULES.find(r => r.domain === dom);
      if (rule) {
        detectedDisciplinesList.push(...rule.disciplines);
      }
    }
  }

  // Calculate confidence: relative to length and separation
  const totalKeywords = Object.values(domainScores).reduce((a, b) => a + b, 0);
  let confidence = 0.5;
  if (totalKeywords >= 5) {
    confidence = Math.min(0.96, 0.6 + (maxScore / totalKeywords) * 0.35);
  } else if (totalKeywords >= 2) {
    confidence = 0.72;
  }

  // Check for suggested addition
  let suggestedAddition: string | undefined = undefined;
  const currentDisciplines = project.secondaryDisciplines || [];
  for (const disc of detectedDisciplinesList) {
    if (!currentDisciplines.includes(disc)) {
      suggestedAddition = disc;
      break;
    }
  }

  return {
    primaryDomain: bestDomain,
    secondaryDomains,
    confidence: Number(confidence.toFixed(2)),
    detectedKeywords: matchedKeywords[bestDomain] || [],
    suggestedAddition
  };
}
