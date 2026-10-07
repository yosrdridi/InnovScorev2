import { Project, EngineeringAlert, PotentialLevel, ConfidenceLevel, MissingInfoItem } from '../types';
import { getDomainProfile } from '../domains';

export function detectDomainRoutineActivities(project: Project): EngineeringAlert[] {
  const profile = getDomainProfile(project.primaryDomain);
  
  const combinedText = [
    project.generalDescription || '',
    project.workCarriedOut || '',
    project.difficultiesEncountered || '',
    project.objectives || '',
    (project.technologiesUsed || []).join(' ')
  ].join(' ').toLowerCase();

  const alerts: EngineeringAlert[] = [];
  const addedCategories = new Set<string>();

  // Check routine activities from the primary domain
  for (const item of profile.routineActivities) {
    if (combinedText.includes(item.keyword.toLowerCase())) {
      if (!addedCategories.has(item.category)) {
        addedCategories.add(item.category);
        alerts.push({
          keyword: item.keyword,
          category: item.category,
          severity: item.severity,
          recommendation: item.advice
        });
      }
    }
  }

  // Also check generic common traps
  const genericTraps = [
    { keyword: 'maintenance', category: 'Maintenance de routine', advice: 'Les tâches de maintenance corrective et courante relèvent du MCO.', severity: 'CRITICAL' as const },
    { keyword: 'mise en conformité', category: 'Conformité réglementaire', advice: 'L’adaptation à une norme sans incertitude technique n’est pas de la R&D.', severity: 'WARNING' as const }
  ];

  for (const trap of genericTraps) {
    if (combinedText.includes(trap.keyword)) {
      if (!addedCategories.has(trap.category)) {
        addedCategories.add(trap.category);
        alerts.push({
          keyword: trap.keyword,
          category: trap.category,
          severity: trap.severity,
          recommendation: trap.advice
        });
      }
    }
  }

  return alerts;
}

export function evaluateCirPotential(project: Project, criticalAlertCount: number): {
  cirPotential: PotentialLevel;
  cirScoreTotal: number;
  frascatiScoreTotal: number;
} {
  const cirScores = project.cirDimensions.map(d => d.score);
  const cirRawSum = cirScores.reduce<number>((sum, s) => sum + s, 0);
  const cirScoreTotal = Number((cirRawSum / 5).toFixed(1)); // Base /5

  const frascatiScores = project.frascatiCriteria.map(f => f.score);
  const frascatiRawSum = frascatiScores.reduce<number>((sum, s) => sum + s, 0);
  const frascatiScoreTotal = Number((frascatiRawSum / 5).toFixed(1)); // Base /5

  const verrouScore = project.cirDimensions.find(d => d.key === 'verrou')?.score ?? 0;
  const incertitudeScore = project.cirDimensions.find(d => d.key === 'incertitude')?.score ?? 0;
  const etatArtScore = project.cirDimensions.find(d => d.key === 'etatDeLart')?.score ?? 0;
  const demarcheScore = project.cirDimensions.find(d => d.key === 'demarche')?.score ?? 0;

  let cirPotential: PotentialLevel = 'TRES_FAIBLE';
  if (verrouScore >= 3 && incertitudeScore >= 3 && demarcheScore >= 3 && etatArtScore >= 2 && cirScoreTotal >= 3.0) {
    cirPotential = criticalAlertCount > 2 ? 'MODERE' : 'FORT';
  } else if ((verrouScore >= 2 && incertitudeScore >= 2) || cirScoreTotal >= 2.5) {
    cirPotential = 'MODERE';
  } else if (cirScoreTotal >= 1.5 || project.missingInformation.length > 3) {
    cirPotential = 'A_APPROFONDIR';
  } else if (cirScoreTotal >= 0.8) {
    cirPotential = 'FAIBLE';
  } else {
    cirPotential = 'TRES_FAIBLE';
  }

  return { cirPotential, cirScoreTotal, frascatiScoreTotal };
}

export function generateDomainAwareMissingInfo(project: Project): MissingInfoItem[] {
  const profile = getDomainProfile(project.primaryDomain);
  const missing: MissingInfoItem[] = [];

  if (!project.knownStateOfTheArt || project.knownStateOfTheArt.length < 60) {
    missing.push({
      id: 'miss-art-1',
      category: 'ETAT_DE_LART',
      title: `État de l’art insuffisant (${profile.shortLabel})`,
      description: `L’état de l’art n’établit pas clairement pourquoi les solutions existantes (${profile.terminology.stateOfTheArtSources.slice(0, 2).join(', ')}) ne permettaient pas de résoudre le problème.`,
      impactOnAudit: 'Rejet CIR fréquent par l’expert MESR pour absence de démonstration de l’inaccessibilité des connaissances.',
      recommendedQuestion: `Quelles publications de référence, brevets ou solutions industrielles ont été analysés et pourquoi présentaient-ils un blocage pour ${project.name} ?`,
      expectedDeliverable: 'Note de synthèse bibliographique ou benchmark technique pré-projet daté.',
      resolved: false
    });
  }

  if (!project.difficultiesEncountered || project.difficultiesEncountered.length < 60) {
    missing.push({
      id: 'miss-verrou-1',
      category: 'VERROU',
      title: `Caractérisation insuffisante du verrou technique (${profile.shortLabel})`,
      description: `La difficulté ressemble à une contrainte de mise en œuvre plutôt qu’à une incertitude scientifique ou technique objective (${profile.terminology.typicalUncertainties[0] || 'incertitude'}).`,
      impactOnAudit: 'Risque majeur : l’expert requalifie le projet en simple ingénierie courante du domaine.',
      recommendedQuestion: `Quels phénomènes physiques, chimiques ou algorithmiques étaient imprévisibles au démarrage et qu’un ingénieur expérimenté du domaine ne pouvait anticiper ?`,
      expectedDeliverable: 'Définition formelle du verrou et des hypothèses testées.',
      resolved: false
    });
  }

  if (!project.experiments || project.experiments.length < 60) {
    missing.push({
      id: 'miss-exp-1',
      category: 'EXPERIMENTATION',
      title: `Absence de détail sur les protocoles et expérimentations (${profile.shortLabel})`,
      description: `Les travaux semblent avoir abouti sans traces d’expérimentations (${profile.terminology.typicalExperiments[0] || 'essais'}), d’échecs ou de protocoles comparatifs.`,
      impactOnAudit: 'Non-respect du critère de systématicité du Manuel de Frascati.',
      recommendedQuestion: 'Quelles approches ou hypothèses ont été testées puis abandonnées ? Quelles métriques ont été mesurées lors des campagnes d’essais ?',
      expectedDeliverable: 'Rapports d’essais intermédiaires, logs d’essais, cahiers de laboratoire.',
      resolved: false
    });
  }

  if (!project.quantitativeDataAvailable || project.quantitativeDataAvailable.length < 30) {
    missing.push({
      id: 'miss-res-1',
      category: 'RESULTATS',
      title: 'Résultats trop qualitatifs / Données chiffrées manquantes',
      description: `Les gains revendiqués ne sont pas chiffrés par rapport à un état initial mesuré (${profile.terminology.relevantMetrics.slice(0, 2).join(', ')}).`,
      impactOnAudit: 'L’administration fiscale demande des preuves tangibles du progrès des performances.',
      recommendedQuestion: 'Quelles étaient les valeurs chiffrées avant et quelles valeurs ont été obtenues après travaux ?',
      expectedDeliverable: 'Tableau comparatif de métriques avec protocole de mesure explicité.',
      resolved: false
    });
  }

  if (project.teamMembers.length === 0) {
    missing.push({
      id: 'miss-team-1',
      category: 'PERSONNEL',
      title: 'Affectation du personnel R&D non documentée',
      description: 'Aucun collaborateur (diplômes, temps consacré) n’est rattaché au projet.',
      impactOnAudit: 'Impossibilité de valoriser l’assiette de dépenses éligibles et de justifier le ratio chercheurs/techniciens.',
      recommendedQuestion: 'Qui a réalisé les travaux de recherche ? Quels sont leurs diplômes (Docteur, Ingénieur, Technicien) et leur temps en jours/hommes ?',
      expectedDeliverable: 'Fiches de temps signées (CRA) et copies des diplômes des intervenants.',
      resolved: false
    });
  }

  return missing;
}
