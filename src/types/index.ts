export type CompanySize = 'MICRO' | 'PETITE' | 'MOYENNE' | 'ETI' | 'GRANDE';

export type DomainId = 
  | 'software'
  | 'mechanical'
  | 'electronics'
  | 'biotech'
  | 'pharma'
  | 'chemistry'
  | 'industrialProcesses'
  | 'energy'
  | 'medicalDevices'
  | 'generic';

export interface DomainProfile {
  id: DomainId;
  label: string;
  shortLabel: string;
  description: string;
  iconName: string;
  terminology: {
    typicalUncertainties: string[];
    typicalExperiments: string[];
    typicalObjectives: string[];
    relevantMetrics: string[];
    stateOfTheArtSources: string[];
    expectedEvidenceTypes: string[];
  };
  routineActivities: {
    keyword: string;
    category: string;
    advice: string;
    severity: 'WARNING' | 'CRITICAL';
  }[];
  followUpQuestions: {
    id: number;
    question: string;
    subtext: string;
    placeholder: string;
    extractKey: string;
    typicalImpassesExample: string;
  }[];
  ciiMetricsSuggestions: {
    technical: string[];
    functional: string[];
    ergonomic: string[];
    ecoDesign: string[];
  };
  secondaryDisciplinesSuggestions: string[];
}

export interface DomainDetectionResult {
  primaryDomain: DomainId;
  secondaryDomains: string[];
  confidence: number;
  detectedKeywords: string[];
  suggestedAddition?: string;
}

export interface Company {
  id: string;
  name: string;
  siren: string;
  naf: string;
  size: CompanySize; // Crucial: CII is restricted to PME (Micro, Petite, Moyenne)
  fiscalYearEnd: string;
  sector: string;
  rdTeamSize: number;
  contactName: string;
  contactEmail: string;
  notes?: string;
}

export type ScoreLevel = 0 | 1 | 2 | 3 | 4 | 5;

export type PotentialLevel = 'TRES_FAIBLE' | 'FAIBLE' | 'A_APPROFONDIR' | 'MODERE' | 'FORT';
export type ConfidenceLevel = 'FAIBLE' | 'MOYENNE' | 'ELEVEE';

export type MatrixPosition = 'CIR' | 'CII' | 'INGENIERIE' | 'APPROFONDIR';

export interface CIRDimension {
  key: 'etatDeLart' | 'verrou' | 'incertitude' | 'demarche' | 'connaissances';
  title: string;
  score: ScoreLevel;
  justification: string;
  favorablePoints: string[];
  unfavorablePoints: string[];
  missingElements: string[];
}

export interface FrascatiCriterion {
  id: 'nouveaute' | 'creativite' | 'incertitude' | 'systematicite' | 'transferabilite';
  name: string;
  definition: string;
  score: ScoreLevel;
  supportingElements: string[];
  weakeningElements: string[];
  missingInformation: string[];
}

export interface EngineeringAlert {
  keyword: string;
  category: string;
  detectedTextSnippet?: string;
  severity: 'WARNING' | 'CRITICAL';
  recommendation: string;
}

export interface CIIAxis {
  axis: 'performancesTechniques' | 'fonctionnalites' | 'ergonomie' | 'ecoconception';
  title: string;
  productPerformance: string;
  competitorsPerformance: string;
  differential: string;
  evidenceAvailable: string;
  innovationLevel: ScoreLevel;
}

export interface CIIAnalysis {
  isPmeEligible: boolean; // Must be PME (<250 employees, <50M€ CA)
  productName: string;
  productType: 'MATERIEL' | 'IMMATERIEL' | 'MIXTE';
  targetAudience: string;
  referenceMarket: string;
  competitorProducts: string;
  axes: CIIAxis[];
  prototypeStatus: {
    hasPrototype: boolean;
    prototypeType: 'PROTOTYPE' | 'PILOTE' | 'MVP' | 'DEMONSTRATEUR' | 'AUCUN';
    description: string;
    userTestingDone: boolean;
    readyForMarket: boolean;
  };
  overallScore: number;
  potential: PotentialLevel;
  justification: string;
}

export interface EvidenceItem {
  id: string;
  projectId: string;
  title: string;
  type: 
    | 'DOCUMENTATION_TECHNIQUE'
    | 'RAPPORT_ESSAIS'
    | 'BENCHMARK'
    | 'PUBLICATION_SCIENTIFIQUE'
    | 'JIRA_GIT'
    | 'PROTOTYPE'
    | 'CAHIER_LABO'
    | 'COMPTE_RENDU_REUNION'
    | 'FEUILLES_TEMPS'
    | 'PLANS_CAO'
    | 'DONNEES_BRUTES_MESURES'
    | 'ANALYSES_PHYSICO_CHIMIQUES'
    | 'PROTOCOLE_BIOLOGIQUE'
    | 'RAPPORT_ACV'
    | 'HOMOLOGATION_NORMES';
  date: string;
  author: string;
  associatedClaim: string; // Claim it supports (e.g., "Verrou Levée sur le filtre Kalman")
  reliability: 'SOLIDE' | 'MODEREE' | 'FAIBLE'; // Solide = horodaté, mesurable, tiers
  urlOrRef: string;
  comments: string;
}

export interface MissingInfoItem {
  id: string;
  category: 'ETAT_DE_LART' | 'VERROU' | 'EXPERIMENTATION' | 'RESULTATS' | 'PERSONNEL' | 'CII_MARCHE';
  title: string;
  description: string;
  impactOnAudit: string;
  recommendedQuestion: string;
  expectedDeliverable: string;
  resolved: boolean;
}

export interface SmartQuestionInteraction {
  id: string;
  question: string;
  context: string;
  userAnswer: string;
  suggestedFollowUp?: string;
  fieldToUpdate?: string;
  detectedFacts?: string[];
}

export interface ProjectTeamMember {
  id: string;
  name: string;
  role: string;
  qualification: 'DOCTEUR' | 'INGENIEUR' | 'TECHNICIEN' | 'AUTRE';
  daysSpent: number;
}

export interface Project {
  id: string;
  companyId: string;
  name: string;
  year: number;
  projectLead: string;
  startDate: string;
  endDate: string;

  // Domain & Disciplines
  primaryDomain: DomainId;
  secondaryDisciplines: string[];
  aiDetectedDomain?: DomainDetectionResult;
  
  // Description & Qualification
  generalDescription: string;
  context: string;
  objectives: string;
  technologiesUsed: string[];
  knownStateOfTheArt: string;
  difficultiesEncountered: string;
  workCarriedOut: string;
  experiments: string;
  results: string;
  
  // Specific Qualification Questions (Section 2)
  problemToSolve: string;
  whyExistingSolutionsInsufficient: string;
  knowledgeLevelAtStart: string;
  canBeSolvedByStandardKnowledge: boolean;
  feasibilityUncertainty: string;
  hypothesesFormulated: string;
  quantitativeDataAvailable: string;
  newKnowledgeAcquired: string;
  reproducibleResults: boolean;
  unresolvedBarriers: string;
  
  // Team & Resources
  teamMembers: ProjectTeamMember[];
  totalDaysSpent: number;
  estimatedBudget: number; // in euros
  
  // CIR Scores & Frascati
  cirDimensions: CIRDimension[];
  frascatiCriteria: FrascatiCriterion[];
  
  // CII Analysis
  ciiAnalysis: CIIAnalysis;
  
  // Evidences & Follow-up
  evidences: EvidenceItem[];
  missingInformation: MissingInfoItem[];
  smartInterviews: SmartQuestionInteraction[];
  
  // Calculated status
  lastUpdated: string;
}

export interface AuditSynthesis {
  cirPotential: PotentialLevel;
  ciiPotential: PotentialLevel;
  confidence: ConfidenceLevel;
  matrixPosition: MatrixPosition;
  cirScoreTotal: number; // Score global CIR sur base de /5
  frascatiScoreTotal: number; // Score global Frascati sur base de /5
  ciiScoreTotal: number; // Score global CII sur base de /5
  engineeringAlertCount: number;
  missingInfoCount: number;
  evidenceStrengthAverage: 'SOLIDE' | 'MODEREE' | 'FAIBLE';
  keyAuditStrengths: string[];
  keyAuditWeaknesses: string[];
  recommendations: string[];
}
