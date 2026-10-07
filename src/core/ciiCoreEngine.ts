import { Project, PotentialLevel } from '../types';

export function evaluateCiiPotential(project: Project, isPme: boolean): {
  ciiPotential: PotentialLevel;
  ciiScoreTotal: number;
} {
  const ciiScores = project.ciiAnalysis.axes.map(a => a.innovationLevel);
  const ciiRawSum = ciiScores.reduce<number>((sum, s) => sum + s, 0);
  const ciiScoreTotal = Number((ciiRawSum / 4).toFixed(1)); // Base /5 (moyenne des 4 axes)

  const hasPrototype = project.ciiAnalysis.prototypeStatus.hasPrototype && project.ciiAnalysis.prototypeStatus.prototypeType !== 'AUCUN';
  const highestCiiAxis = Math.max(...ciiScores, 0);

  let ciiPotential: PotentialLevel = 'TRES_FAIBLE';
  if (!isPme) {
    ciiPotential = 'TRES_FAIBLE'; // Non-PME are legally excluded from CII under French tax law (CGI art. 244 quater B)
  } else if (hasPrototype && highestCiiAxis >= 3 && ciiScoreTotal >= 2.5) {
    ciiPotential = 'FORT';
  } else if (hasPrototype && highestCiiAxis >= 2 && ciiScoreTotal >= 1.5) {
    ciiPotential = 'MODERE';
  } else if (highestCiiAxis >= 2 || project.ciiAnalysis.axes.some(a => (a.differential || '').length > 20)) {
    ciiPotential = 'A_APPROFONDIR';
  } else if (ciiScoreTotal >= 0.8) {
    ciiPotential = 'FAIBLE';
  } else {
    ciiPotential = 'TRES_FAIBLE';
  }

  return { ciiPotential, ciiScoreTotal };
}
