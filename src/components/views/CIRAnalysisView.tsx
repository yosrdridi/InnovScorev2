import React, { useState } from 'react';
import { Project, CIRDimension, FrascatiCriterion, ScoreLevel } from '../../types';
import { detectEngineeringAlerts } from '../../utils/analysisEngine';
import { getDomainProfile } from '../../domains';
import { 
  FlaskConical, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldAlert, 
  Info, 
  HelpCircle, 
  BookOpen, 
  Sliders, 
  Lightbulb, 
  Sparkles,
  Save,
  Layers
} from 'lucide-react';

interface CIRAnalysisViewProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const CIRAnalysisView: React.FC<CIRAnalysisViewProps> = ({
  project,
  onUpdateProject
}) => {
  const [activeTab, setActiveTab] = useState<'dimensions' | 'frascati' | 'engineering'>('dimensions');

  // Local state for interactive editing
  const [cirDimensions, setCirDimensions] = useState<CIRDimension[]>(project.cirDimensions);
  const [frascatiCriteria, setFrascatiCriteria] = useState<FrascatiCriterion[]>(project.frascatiCriteria);

  const domainProfile = getDomainProfile(project.primaryDomain);

  // Sync on project change
  React.useEffect(() => {
    setCirDimensions(project.cirDimensions);
    setFrascatiCriteria(project.frascatiCriteria);
  }, [project.id]);

  const engineeringAlerts = detectEngineeringAlerts(project);

  const handleDimensionScoreChange = (dimKey: string, score: ScoreLevel) => {
    const updated = cirDimensions.map(d => d.key === dimKey ? { ...d, score } : d);
    setCirDimensions(updated);
    onUpdateProject({ ...project, cirDimensions: updated });
  };

  const handleDimensionTextChange = (dimKey: string, field: 'justification', value: string) => {
    const updated = cirDimensions.map(d => d.key === dimKey ? { ...d, [field]: value } : d);
    setCirDimensions(updated);
    onUpdateProject({ ...project, cirDimensions: updated });
  };

  const handleFrascatiScoreChange = (critId: string, score: ScoreLevel) => {
    const updated = frascatiCriteria.map(f => f.id === critId ? { ...f, score } : f);
    setFrascatiCriteria(updated);
    onUpdateProject({ ...project, frascatiCriteria: updated });
  };

  const totalDimensionScore = cirDimensions.reduce((sum, d) => sum + d.score, 0);
  const cirScoreOn5 = (totalDimensionScore / 5).toFixed(1);
  const totalFrascatiScore = frascatiCriteria.reduce((sum, f) => sum + f.score, 0);
  const frascatiScoreOn5 = (totalFrascatiScore / 5).toFixed(1);

  const getDimensionLabel = (dimKey: string, score: number) => {
    switch (dimKey) {
      case 'etatDeLart':
        if (score === 0) return '0/5 = Aucun état de l’art scientifique';
        if (score === 1) return '1/5 = Benchmark commercial ou documentation éditeur uniquement';
        if (score === 2) return '2/5 = Analyse partielle de brevets ou articles';
        if (score === 3) return '3/5 = État de l’art structuré identifiant les pratiques courantes';
        if (score === 4) return '4/5 = État de l’art solide démontrant les limites des connaissances accessibles';
        return '5/5 = État de l’art approfondi et incontestable (articles de recherche / brevets mondiaux)';
      case 'verrou':
        if (score === 0) return '0/5 = Problème courant d’ingénierie standard';
        if (score === 1) return '1/5 = Difficulté technique classique';
        if (score === 2) return '2/5 = Difficulté notable mais solutions connues dans le métier';
        if (score === 3) return '3/5 = Incertitude technique importante sans solution évidente';
        if (score === 4) return '4/5 = Verrou scientifique ou technique clairement caractérisé';
        return '5/5 = Verrou fondamental majeur non résolu dans la littérature scientifique';
      case 'incertitude':
        if (score === 0) return '0/5 = Résultat entièrement prévisible au démarrage';
        if (score === 1) return '1/5 = Adaptation directe des règles de l’art';
        if (score === 2) return '2/5 = Plusieurs voies envisageables sans défi théorique';
        if (score === 3) return '3/5 = Faisabilité incertaine nécessitant des tests';
        if (score === 4) return '4/5 = Impossibilité de déterminer la solution sans démarche expérimentale';
        return '5/5 = Incertitude scientifique ou technique majeure sur la faisabilité';
      case 'demarche':
        if (score === 0) return '0/5 = Développement direct ou mise en œuvre standard';
        if (score === 1) return '1/5 = Quelques essais empiriques informels';
        if (score === 2) return '2/5 = Plusieurs itérations sans formalisation stricte';
        if (score === 3) return '3/5 = Démarche expérimentale structurée avec hypothèses préalables';
        if (score === 4) return '4/5 = Démarche expérimentale rigoureuse documentée et traçable';
        return '5/5 = Démarche scientifique complète avec protocoles, impasses documentées et répétabilité';
      case 'connaissances':
        if (score === 0) return '0/5 = Aucune connaissance nouvelle générée';
        if (score === 1) return '1/5 = Simple retour d’expérience interne à l’équipe';
        if (score === 2) return '2/5 = Amélioration technique locale sans portée générale';
        if (score === 3) return '3/5 = Acquisition de connaissances nouvelles significatives pour l’entreprise';
        if (score === 4) return '4/5 = Connaissances nouvelles clairement identifiées et réutilisables';
        return '5/5 = Production de connaissances nouvelles substantielles dépassant l’état de l’art mondial';
      default:
        return `${score} / 5`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Engineering Alert Banner if alerts found */}
      {engineeringAlerts.length > 0 && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg shadow-xs space-y-2">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="text-xs font-bold text-amber-900 tracking-tight uppercase">
                  Avertissement : Pratiques courantes détectées ({domainProfile.shortLabel})
                </h4>
                <span className="text-[10px] text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded font-medium">
                  Analyse consultative
                </span>
              </div>
              <p className="text-xs font-medium text-amber-900 leading-relaxed">
                « Attention : les travaux décrits semblent relever principalement de pratiques courantes du domaine. Pour caractériser une éventuelle activité de R&D, il est nécessaire d’identifier les incertitudes scientifiques ou techniques qui ne pouvaient pas être levées à partir des connaissances accessibles, ainsi que la démarche expérimentale mise en œuvre pour les résoudre. »
              </p>
              <div className="text-[11px] text-amber-800 flex flex-wrap items-center gap-2 pt-1">
                <span>Pratiques / Mots-clés repérés :</span>
                {engineeringAlerts.map((a, i) => (
                  <span key={i} className="bg-amber-200/80 text-amber-950 px-1.5 py-0.5 rounded font-mono text-[10px]">
                    {a.keyword} ({a.category})
                  </span>
                ))}
              </div>
              <p className="text-[10px] text-amber-700 italic pt-0.5">
                * Note méthodologique : Cette alerte ne conclut jamais automatiquement à la non-éligibilité ; elle signale au consultant les points à étayer par des verrous spécifiques.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header & Tabs */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <FlaskConical className="w-4 h-4" />
            Évaluation de l’Éligibilité au Crédit Impôt Recherche
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Grille d’analyse R&D et Test des 5 critères Frascati
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>Projet : <strong className="text-slate-800">{project.name}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-semibold">
              Domaine : {domainProfile.label}
            </span>
            {(project.secondaryDisciplines || []).length > 0 && (
              <span className="text-[11px] text-slate-400">
                + {project.secondaryDisciplines.join(', ')}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right border-r border-slate-200 pr-4">
            <div className="text-[11px] text-slate-400">Score Global CIR</div>
            <div className="text-lg font-bold text-blue-700 tabular-nums">
              {cirScoreOn5} <span className="text-xs text-slate-400 font-normal">/ 5</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400">Score Frascati</div>
            <div className="text-lg font-bold text-slate-800 tabular-nums">
              {frascatiScoreOn5} <span className="text-xs text-slate-400 font-normal">/ 5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('dimensions')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'dimensions'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          A. Les 5 Dimensions CIR ({cirScoreOn5}/5)
        </button>
        <button
          onClick={() => setActiveTab('frascati')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'frascati'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          B. Test des 5 Critères Frascati (OCDE) ({frascatiScoreOn5}/5)
        </button>
        <button
          onClick={() => setActiveTab('engineering')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeTab === 'engineering'
              ? 'bg-slate-900 text-white'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          C. Pratiques courantes sectorielles ({engineeringAlerts.length} alerte{engineeringAlerts.length > 1 ? 's' : ''})
        </button>
      </div>

      {/* Tab A: The 5 Dimensions CIR */}
      {activeTab === 'dimensions' && (
        <div className="space-y-4">
          {cirDimensions.map((dim) => {
            return (
              <div key={dim.key} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {dim.title}
                    </h3>
                    <div className="text-xs text-blue-700 font-semibold mt-0.5">
                      {getDimensionLabel(dim.key, dim.score)}
                    </div>
                  </div>

                  {/* 0 to 5 Radio Selector */}
                  <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-md border border-slate-200">
                    {[0, 1, 2, 3, 4, 5].map((val) => (
                      <button
                        key={val}
                        onClick={() => handleDimensionScoreChange(dim.key, val as ScoreLevel)}
                        className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                          dim.score === val
                            ? 'bg-blue-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {val}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dimension Guides & Domain Specific Guidance */}
                <div className="text-xs text-slate-600 bg-slate-50/70 p-3 rounded border border-slate-100 space-y-1.5">
                  {dim.key === 'etatDeLart' && (
                    <>
                      <p>
                        <strong>Objectif universel MESR :</strong> Quelles connaissances accessibles existaient au démarrage du projet et pourquoi ne permettaient-elles pas de résoudre directement le problème rencontré ?
                      </p>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <strong>Sources d’état de l’art recommandées en {domainProfile.shortLabel} :</strong>{' '}
                        {domainProfile.terminology.stateOfTheArtSources.join(' · ')}
                      </div>
                    </>
                  )}
                  {dim.key === 'verrou' && (
                    <>
                      <p>
                        <strong>Différenciation clé :</strong> Distinguer le problème courant ou la difficulté d’intégration des règles de l’art du véritable verrou scientifique ou technique pour lequel aucune solution n’était connue.
                      </p>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <strong>Exemples de verrous typiques en {domainProfile.shortLabel} :</strong>{' '}
                        {domainProfile.terminology.typicalUncertainties.slice(0, 3).join(' ; ')}
                      </div>
                    </>
                  )}
                  {dim.key === 'incertitude' && (
                    <p>
                      <strong>Critère d’incertitude :</strong> Le résultat était-il prévisible ? L’application directe des connaissances permettait-elle de converger sans recourir à l’expérimentation ?
                    </p>
                  )}
                  {dim.key === 'demarche' && (
                    <>
                      <p>
                        <strong>Traces requises :</strong> Hypothèses formulées, prototypes d’essais, mesures étalons, simulations, échecs documentés et itérations formalisées.
                      </p>
                      <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                        <strong>Types d’expérimentations attendues en {domainProfile.shortLabel} :</strong>{' '}
                        {domainProfile.terminology.typicalExperiments.slice(0, 3).join(' ; ')}
                      </div>
                    </>
                  )}
                  {dim.key === 'connaissances' && (
                    <p>
                      <strong>Périmètre des connaissances :</strong> Les travaux ont-ils produit des connaissances transférables dépassant la simple réalisation ou livraison du produit ?
                    </p>
                  )}
                </div>

                {/* Justification Field */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Justification technique et argumentaire d’audit
                  </label>
                  <textarea
                    rows={2}
                    value={dim.justification}
                    onChange={(e) => handleDimensionTextChange(dim.key, 'justification', e.target.value)}
                    placeholder="Détailler précisément les éléments démontrant ce niveau de score..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>

                {/* Strengths & Weaknesses if any */}
                {(dim.favorablePoints.length > 0 || dim.unfavorablePoints.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1 text-xs">
                    {dim.favorablePoints.length > 0 && (
                      <div className="bg-emerald-50/60 border border-emerald-100 rounded p-2.5">
                        <div className="font-semibold text-emerald-800 text-[11px] mb-1 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Éléments favorables au dossier
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5 text-emerald-900 text-[11px]">
                          {dim.favorablePoints.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {dim.unfavorablePoints.length > 0 && (
                      <div className="bg-amber-50/60 border border-amber-100 rounded p-2.5">
                        <div className="font-semibold text-amber-900 text-[11px] mb-1 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
                          Points de vulnérabilité
                        </div>
                        <ul className="list-disc pl-4 space-y-0.5 text-amber-950 text-[11px]">
                          {dim.unfavorablePoints.map((pt, i) => (
                            <li key={i}>{pt}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Tab B: Frascati 5 Criteria */}
      {activeTab === 'frascati' && (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-900 space-y-1">
            <div className="font-bold flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-700" />
              Les 5 critères cumulatifs du Manuel de Frascati (OCDE)
            </div>
            <p className="leading-relaxed text-blue-800">
              Pour être qualifiée d’activité de Recherche et Développement (R&D) au sens fiscal et international, une opération doit satisfaire de manière cumulative aux 5 critères suivants : elle doit comporter un élément de nouveauté, de créativité, d’incertitude, être systématique, et transférable ou reproductible. Ce socle méthodologique est strictement identique pour tous les domaines scientifiques.
            </p>
          </div>

          <div className="space-y-4">
            {frascatiCriteria.map((crit) => {
              return (
                <div key={crit.id} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>{crit.name}</span>
                        <span className="text-xs text-slate-400 font-normal">
                          · Note : <strong className="text-slate-800">{crit.score}/5</strong>
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 italic">
                        {crit.definition}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-50 p-1 rounded-md border border-slate-200 shrink-0">
                      {[0, 1, 2, 3, 4, 5].map((val) => (
                        <button
                          key={val}
                          onClick={() => handleFrascatiScoreChange(crit.id, val as ScoreLevel)}
                          className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                            crit.score === val
                              ? 'bg-slate-900 text-white shadow-xs'
                              : 'text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {val}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-slate-50 p-3 rounded border border-slate-200/70">
                      <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Éléments du projet qui soutiennent ce critère
                      </div>
                      {crit.supportingElements.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1 text-slate-700">
                          {crit.supportingElements.map((el, i) => (
                            <li key={i}>{el}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400 italic">Aucun élément renseigné.</p>
                      )}
                    </div>

                    <div className="bg-slate-50 p-3 rounded border border-slate-200/70">
                      <div className="font-semibold text-slate-800 mb-1 flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                        Éléments qui le fragilisent / Informations manquantes
                      </div>
                      {crit.weakeningElements.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1 text-slate-700">
                          {crit.weakeningElements.map((el, i) => (
                            <li key={i}>{el}</li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-slate-400 italic">Aucune fragilité majeure détectée.</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab C: Sector-Specific Routine Activities Detection */}
      {activeTab === 'engineering' && (
        <div className="space-y-4">
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900">
                Détecteur de Pratiques Courantes ({domainProfile.label})
              </h3>
              <span className="text-xs text-slate-500 font-medium">
                Profil : {domainProfile.shortLabel}
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              L’administration fiscale rejette systématiquement les travaux réalisés dans les <strong>règles de l’art ou pratiques courantes</strong> du secteur, même s’ils ont représenté une charge financière ou technique lourde.
            </p>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-md overflow-hidden mt-3">
              {engineeringAlerts.length > 0 ? (
                engineeringAlerts.map((alert, idx) => (
                  <div key={idx} className="p-3.5 bg-white hover:bg-slate-50 flex items-start justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900">{alert.category}</span>
                        <span className="font-mono text-[10px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200">
                          Mot-clé détecté : « {alert.keyword} »
                        </span>
                      </div>
                      <p className="text-slate-600 leading-relaxed text-[11px]">
                        <strong>Recommandation du consultant :</strong> {alert.recommendation}
                      </p>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 border ${
                      alert.severity === 'CRITICAL'
                        ? 'text-red-700 bg-red-50 border-red-200'
                        : 'text-amber-700 bg-amber-50 border-amber-200'
                    }`}>
                      {alert.severity === 'CRITICAL' ? 'Exclusion recommandée' : 'Vigilance accrue'}
                    </span>
                  </div>
                ))
              ) : (
                <div className="p-6 text-center text-xs text-slate-500">
                  <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                  Aucune pratique courante critique détectée pour le domaine {domainProfile.shortLabel} dans la description actuelle.
                </div>
              )}
            </div>

            {/* List of routine activities monitored for this domain */}
            <div className="pt-3 border-t border-slate-100">
              <div className="text-[11px] font-semibold text-slate-700 mb-2">
                Pratiques courantes sous surveillance pour le profil {domainProfile.shortLabel} :
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                {domainProfile.routineActivities.map((act, i) => (
                  <div key={i} className="bg-slate-50 p-2 rounded border border-slate-100 text-slate-600">
                    <strong className="text-slate-800">{act.category}</strong> : « {act.keyword} »
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
