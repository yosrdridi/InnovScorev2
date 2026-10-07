import { Project, EngineeringAlert, AuditSynthesis, PotentialLevel, ConfidenceLevel, MatrixPosition, MissingInfoItem } from '../types';
import { detectDomainRoutineActivities, evaluateCirPotential, generateDomainAwareMissingInfo } from '../core/cirCoreEngine';
import { evaluateCiiPotential } from '../core/ciiCoreEngine';
import { getDomainProfile } from '../domains';

export function detectEngineeringAlerts(project: Project): EngineeringAlert[] {
  return detectDomainRoutineActivities(project);
}

export function calculateAuditSynthesis(project: Project, isPme: boolean = true): AuditSynthesis {
  const engineeringAlerts = detectEngineeringAlerts(project);
  const criticalAlerts = engineeringAlerts.filter(a => a.severity === 'CRITICAL').length;

  const { cirPotential, cirScoreTotal, frascatiScoreTotal } = evaluateCirPotential(project, criticalAlerts);
  const { ciiPotential, ciiScoreTotal } = evaluateCiiPotential(project, isPme);

  const verrouScore = project.cirDimensions.find(d => d.key === 'verrou')?.score ?? 0;
  const incertitudeScore = project.cirDimensions.find(d => d.key === 'incertitude')?.score ?? 0;
  const etatArtScore = project.cirDimensions.find(d => d.key === 'etatDeLart')?.score ?? 0;
  const demarcheScore = project.cirDimensions.find(d => d.key === 'demarche')?.score ?? 0;
  const hasPrototype = project.ciiAnalysis.prototypeStatus.hasPrototype && project.ciiAnalysis.prototypeStatus.prototypeType !== 'AUCUN';

  // Matrix Position (CIR vs CII vs Ingénierie vs Approfondir)
  let matrixPosition: MatrixPosition = 'APPROFONDIR';

  if (cirPotential === 'FORT' || (cirPotential === 'MODERE' && verrouScore >= 3)) {
    matrixPosition = 'CIR';
  } else if (isPme && (ciiPotential === 'FORT' || (ciiPotential === 'MODERE' && hasPrototype))) {
    matrixPosition = 'CII';
  } else if (criticalAlerts >= 1 && verrouScore <= 1 && incertitudeScore <= 1) {
    matrixPosition = 'INGENIERIE';
  } else {
    matrixPosition = 'APPROFONDIR';
  }

  // Confidence Calculation
  let completenessScore = 0;
  if ((project.generalDescription || '').length > 80) completenessScore++;
  if ((project.knownStateOfTheArt || '').length > 60) completenessScore++;
  if ((project.difficultiesEncountered || '').length > 60) completenessScore++;
  if ((project.workCarriedOut || '').length > 80) completenessScore++;
  if ((project.experiments || '').length > 60) completenessScore++;
  if ((project.results || '').length > 50) completenessScore++;
  if (project.teamMembers && project.teamMembers.length > 0) completenessScore++;
  if (project.evidences && project.evidences.length >= 2) completenessScore += 2;
  if (project.evidences && project.evidences.some(e => e.reliability === 'SOLIDE')) completenessScore++;

  let confidence: ConfidenceLevel = 'FAIBLE';
  if (completenessScore >= 8) {
    confidence = 'ELEVEE';
  } else if (completenessScore >= 5) {
    confidence = 'MOYENNE';
  } else {
    confidence = 'FAIBLE';
  }

  const profile = getDomainProfile(project.primaryDomain);

  // Strengths & Weaknesses for Consultant / DAF
  const keyAuditStrengths: string[] = [];
  const keyAuditWeaknesses: string[] = [];
  const recommendations: string[] = [];

  if (etatArtScore >= 3) {
    keyAuditStrengths.push(`État de l’art structuré en ${profile.shortLabel} identifiant les limites des connaissances accessibles.`);
  } else {
    keyAuditWeaknesses.push(`État de l’art en ${profile.shortLabel} incomplet ou focalisé sur le marché plutôt que sur la littérature technique.`);
  }

  if (verrouScore >= 3) {
    keyAuditStrengths.push('Verrou scientifique/technique bien différencié d’une difficulté courante du métier.');
  } else {
    keyAuditWeaknesses.push('Risque de requalification : les difficultés semblent surmontables par les règles de l’art du domaine.');
  }

  if (demarcheScore >= 3) {
    keyAuditStrengths.push('Démarche expérimentale itérative étayée par des protocoles d’essais et des échecs documentés.');
  } else {
    keyAuditWeaknesses.push('Démarche perçue comme une exécution directe sans formulation explicite d’hypothèses préalables.');
  }

  if (project.reproducibleResults) {
    keyAuditStrengths.push('Résultats reproductibles et pérennisés dans la base de connaissances de l’entreprise.');
  }
  
  if (project.evidences && project.evidences.filter(e => e.reliability === 'SOLIDE').length > 0) {
    keyAuditStrengths.push(`Présence de ${project.evidences.filter(e => e.reliability === 'SOLIDE').length} pièce(s) de preuve à force probante élevée (horodatées/mesurées).`);
  } else {
    keyAuditWeaknesses.push('Absence de pièces justificatives contemporaines (comptes-rendus d’essais, logs, cahiers de labo).');
  }

  if (criticalAlerts > 0) {
    keyAuditWeaknesses.push(`Détection de ${criticalAlerts} terme(s) relevant de pratiques courantes de l’ingénierie en ${profile.shortLabel}.`);
  }

  // Recommendations
  if (!isPme && ciiPotential !== 'TRES_FAIBLE') {
    recommendations.push('Avertissement : L’entreprise n’ayant pas le statut PME au sens européen, le dispositif CII est légalement inaccessible.');
  }
  if (cirPotential === 'FORT' || cirPotential === 'MODERE') {
    recommendations.push('Constituer dès à présent le classeur d’audit justificatif (Guide du CIR - Ministère de la Recherche).');
    recommendations.push('Isoler rigoureusement les heures des ingénieurs/docteurs consacrées aux expérimentations (exclure les tâches de maintenance et d’exploitation).');
  }
  if (matrixPosition === 'INGENIERIE') {
    recommendations.push('Revoir le périmètre du projet : isoler uniquement un sous-module présentant une réelle incertitude scientifique ou technique.');
    recommendations.push('Si aucun verrou ne peut être étayé, ne pas déclarer au CIR afin d’éviter un redressement fiscal avec pénalités.');
  }
  if (matrixPosition === 'CII' && isPme) {
    recommendations.push('Documenter la grille comparative marché démontrant la supériorité technique ou ergonomique par rapport aux concurrents directs.');
    recommendations.push('Vérifier que les dépenses retenues correspondent strictement à la phase de conception du prototype (avant la phase d’industrialisation).');
  }

  const solidEvidences = (project.evidences || []).filter(e => e.reliability === 'SOLIDE').length;
  const modEvidences = (project.evidences || []).filter(e => e.reliability === 'MODEREE').length;
  const evidenceStrengthAverage = solidEvidences >= 2 ? 'SOLIDE' : (solidEvidences + modEvidences > 0 ? 'MODEREE' : 'FAIBLE');

  return {
    cirPotential,
    ciiPotential,
    confidence,
    matrixPosition,
    cirScoreTotal,
    frascatiScoreTotal,
    ciiScoreTotal,
    engineeringAlertCount: engineeringAlerts.length,
    missingInfoCount: (project.missingInformation || []).filter(m => !m.resolved).length,
    evidenceStrengthAverage,
    keyAuditStrengths,
    keyAuditWeaknesses,
    recommendations
  };
}

export function generateMissingInfoChecklist(project: Project): MissingInfoItem[] {
  return generateDomainAwareMissingInfo(project);
}
