import React, { useState, useEffect } from 'react';
import { Project, Company, CIIAnalysis, ScoreLevel } from '../../types';
import { getDomainProfile } from '../../domains';
import { 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle, 
  Layers, 
  Target, 
  Cpu, 
  Compass, 
  Leaf, 
  Box,
  Save,
  Tag
} from 'lucide-react';

interface CIIAnalysisViewProps {
  project: Project;
  company: Company;
  onUpdateProject: (updated: Project) => void;
}

export const CIIAnalysisView: React.FC<CIIAnalysisViewProps> = ({
  project,
  company,
  onUpdateProject
}) => {
  const isPme = ['MICRO', 'PETITE', 'MOYENNE'].includes(company.size);
  const [ciiData, setCiiData] = useState<CIIAnalysis>(project.ciiAnalysis);
  const [isSavedMessage, setIsSavedMessage] = useState(false);

  const domainProfile = getDomainProfile(project.primaryDomain || 'software');

  useEffect(() => {
    setCiiData(project.ciiAnalysis);
  }, [project.id]);

  const handleCiiChange = (field: keyof CIIAnalysis, value: any) => {
    const updated = { ...ciiData, [field]: value };
    setCiiData(updated);
    onUpdateProject({ ...project, ciiAnalysis: updated });
  };

  const handleAxisChange = (axisName: string, field: string, value: any) => {
    const updatedAxes = ciiData.axes.map(a => {
      if (a.axis === axisName) {
        return { ...a, [field]: value };
      }
      return a;
    });
    const rawSum = updatedAxes.reduce((sum, a) => sum + a.innovationLevel, 0);
    const totalScore = Number((rawSum / 4).toFixed(1)); // Base /5
    const updated = { ...ciiData, axes: updatedAxes, overallScore: totalScore };
    setCiiData(updated);
    onUpdateProject({ ...project, ciiAnalysis: updated });
  };

  const handleAppendSuggestionToAxis = (axisName: string, suggestion: string) => {
    const currentAxis = ciiData.axes.find(a => a.axis === axisName);
    if (!currentAxis) return;
    const newPerformance = currentAxis.productPerformance
      ? `${currentAxis.productPerformance} ; ${suggestion}`
      : suggestion;
    handleAxisChange(axisName, 'productPerformance', newPerformance);
  };

  const handlePrototypeChange = (field: string, value: any) => {
    const updatedPrototype = { ...ciiData.prototypeStatus, [field]: value };
    const updated = { ...ciiData, prototypeStatus: updatedPrototype };
    setCiiData(updated);
    onUpdateProject({ ...project, ciiAnalysis: updated });
  };

  const getAxisIcon = (axis: string) => {
    switch (axis) {
      case 'performancesTechniques': return Cpu;
      case 'fonctionnalites': return Target;
      case 'ergonomie': return Compass;
      case 'ecoconception': return Leaf;
      default: return Sparkles;
    }
  };

  const getAxisSuggestions = (axisKey: string): string[] => {
    if (!domainProfile.ciiMetricsSuggestions) return [];
    switch (axisKey) {
      case 'performancesTechniques': return domainProfile.ciiMetricsSuggestions.technical || [];
      case 'fonctionnalites': return domainProfile.ciiMetricsSuggestions.functional || [];
      case 'ergonomie': return domainProfile.ciiMetricsSuggestions.ergonomic || [];
      case 'ecoconception': return domainProfile.ciiMetricsSuggestions.ecoDesign || [];
      default: return [];
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Warning regarding PME eligibility */}
      {!isPme && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg shadow-xs">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-red-900 tracking-tight uppercase">
                Inéligibilité légale au Crédit Impôt Innovation (CII)
              </h4>
              <p className="text-xs text-red-800 leading-relaxed">
                L’entreprise <strong>{company.name}</strong> a le statut <strong>{company.size}</strong>. Selon l’article 244 quater B du CGI, le CII est <strong>strictement réservé aux PME au sens communautaire</strong> (&lt; 250 salariés et CA &lt; 50 M€). Les dépenses d’innovation de ce projet ne pourront pas faire l’objet d’une déclaration CII (seul le CIR reste accessible si les critères R&D sont remplis).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            Évaluation Indépendante du Crédit Impôt Innovation (CII)
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Grille d’analyse Innovation Produit (4 Axes & Prototype)
          </h2>
          <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>Projet : <strong className="text-slate-800">{project.name}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="bg-purple-50 text-purple-700 font-semibold px-2 py-0.5 rounded border border-purple-200 text-[11px]">
              Domaine : {domainProfile.shortLabel}
            </span>
            <span aria-hidden="true">·</span>
            <span>Entreprise : {company.name} ({company.size})</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right border-r border-slate-200 pr-4">
            <div className="text-[11px] text-slate-400">Score Global CII</div>
            <div className="text-lg font-bold text-purple-700 tabular-nums">
              {ciiData.overallScore.toFixed(1)} <span className="text-xs text-slate-400 font-normal">/ 5</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-[11px] text-slate-400">Statut PME</div>
            <div className={`text-xs font-bold ${isPme ? 'text-emerald-700' : 'text-red-700'}`}>
              {isPme ? 'Conforme PME' : 'Non éligible'}
            </div>
          </div>
        </div>
      </div>

      {/* Part 1: Définition du Produit Nouveau */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            1. Caractérisation du Produit Nouveau
          </h3>
          <p className="text-slate-500 text-[11px]">
            Le CII s’applique exclusivement à la conception d’un produit nouveau (bien corporel ou incorporel) se distinguant des produits concurrents.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nom commercial du produit</label>
            <input
              type="text"
              value={ciiData.productName}
              onChange={(e) => handleCiiChange('productName', e.target.value)}
              placeholder="Ex : SmartPack Pro 2025"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-purple-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nature du produit</label>
            <select
              value={ciiData.productType}
              onChange={(e) => handleCiiChange('productType', e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-purple-500 focus:outline-hidden"
            >
              <option value="MATERIEL">Bien matériel (équipement, machine, pièce)</option>
              <option value="IMMATERIEL">Bien immatériel (logiciel nouveau mis sur le marché)</option>
              <option value="MIXTE">Mixte (système cyber-physique / matériel + logiciel)</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Cible / Marché de référence</label>
            <input
              type="text"
              value={ciiData.referenceMarket}
              onChange={(e) => handleCiiChange('referenceMarket', e.target.value)}
              placeholder="Ex : Marché européen du fret pharmaceutique"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-purple-500 focus:outline-hidden"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Produits concurrents identifiés sur le marché de référence
          </label>
          <textarea
            rows={2}
            value={ciiData.competitorProducts}
            onChange={(e) => handleCiiChange('competitorProducts', e.target.value)}
            placeholder="Ex : ThermoSafe Pro, Sopavex Active... Citez au moins 2 à 3 alternatives commerciales connues."
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-purple-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Part 2: Les 4 Axes d'Innovation Produit */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              2. Les 4 Axes d’Amélioration Supérieure (Critères Légaux CII)
            </h3>
            <p className="text-xs text-slate-500">
              Le produit doit apporter des performances supérieures non disponibles chez la concurrence sur au moins un des 4 axes.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Profil : {domainProfile.label}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ciiData.axes.map((axis) => {
            const Icon = getAxisIcon(axis.axis);
            const suggestions = getAxisSuggestions(axis.axis);

            return (
              <div key={axis.axis} className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded bg-purple-50 text-purple-700 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-xs">{axis.title}</h4>
                      <div className="text-[11px] text-purple-700 font-semibold">
                        Niveau d’innovation : {axis.innovationLevel} / 5
                      </div>
                    </div>
                  </div>

                  {/* Level selector 0 to 5 */}
                  <div className="flex items-center gap-1 bg-slate-50 p-1 rounded border border-slate-200">
                    {[0, 1, 2, 3, 4, 5].map((lvl) => (
                      <button
                        key={lvl}
                        onClick={() => handleAxisChange(axis.axis, 'innovationLevel', lvl as ScoreLevel)}
                        className={`w-6 h-6 rounded text-xs font-bold transition-all ${
                          axis.innovationLevel === lvl
                            ? 'bg-purple-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {lvl}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Suggestions for this axis from domain profile */}
                {suggestions.length > 0 && (
                  <div className="bg-purple-50/60 border border-purple-100 p-2 rounded space-y-1">
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-purple-900">
                      <Tag className="w-3 h-3 text-purple-600" />
                      <span>Exemples de métriques pour {domainProfile.shortLabel} :</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {suggestions.map((sugg, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => handleAppendSuggestionToAxis(axis.axis, sugg)}
                          className="text-[10px] bg-white hover:bg-purple-100 text-purple-800 border border-purple-200 px-1.5 py-0.5 rounded transition-colors"
                          title="Cliquer pour insérer"
                        >
                          + {sugg}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Performance du produit développé :
                    </label>
                    <input
                      type="text"
                      value={axis.productPerformance}
                      onChange={(e) => handleAxisChange(axis.axis, 'productPerformance', e.target.value)}
                      placeholder="Ex : Maintien 98h à +35°C..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-purple-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Performance des produits concurrents sur le marché :
                    </label>
                    <input
                      type="text"
                      value={axis.competitorsPerformance}
                      onChange={(e) => handleAxisChange(axis.axis, 'competitorsPerformance', e.target.value)}
                      placeholder="Ex : Maintien max 72h chez les concurrents..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-purple-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Différence constatée / Gain supérieur :
                    </label>
                    <input
                      type="text"
                      value={axis.differential}
                      onChange={(e) => handleAxisChange(axis.axis, 'differential', e.target.value)}
                      placeholder="Ex : +36% de durée de conservation..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-purple-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">
                      Preuves / Éléments justificatifs disponibles :
                    </label>
                    <input
                      type="text"
                      value={axis.evidenceAvailable}
                      onChange={(e) => handleAxisChange(axis.axis, 'evidenceAvailable', e.target.value)}
                      placeholder="Ex : Rapport d’essais comparatifs, benchmark technique..."
                      className="w-full px-2.5 py-1.5 border border-slate-300 rounded focus:border-purple-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3: Prototype ou Installation Pilote */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900">
            3. Statut du Prototype ou de l’Installation Pilote
          </h3>
          <p className="text-slate-500 text-[11px]">
            Condition obligatoire du CII : les dépenses éligibles cessent dès que le prototype est validé ou dès le démarrage de la phase de production/commercialisation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Typologie de prototype / livrable
            </label>
            <select
              value={ciiData.prototypeStatus.prototypeType}
              onChange={(e) => {
                const type = e.target.value as any;
                handlePrototypeChange('prototypeType', type);
                handlePrototypeChange('hasPrototype', type !== 'AUCUN');
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-purple-500 focus:outline-hidden font-medium"
            >
              <option value="PROTOTYPE">Prototype physique fonctionnel</option>
              <option value="PILOTE">Installation pilote industrielle</option>
              <option value="MVP">MVP logiciel (Minimum Viable Product)</option>
              <option value="DEMONSTRATEUR">Démonstrateur technologique</option>
              <option value="AUCUN">Aucun prototype à ce stade</option>
            </select>
          </div>

          <div className="flex flex-col justify-center space-y-2 pt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ciiData.prototypeStatus.userTestingDone}
                onChange={(e) => handlePrototypeChange('userTestingDone', e.target.checked)}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-slate-700">Tests utilisateurs / essais en conditions réelles réalisés</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={ciiData.prototypeStatus.readyForMarket}
                onChange={(e) => handlePrototypeChange('readyForMarket', e.target.checked)}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-slate-700 font-semibold text-amber-900">
                Produit déjà prêt pour la commercialisation (Arrêt de l’assiette CII)
              </span>
            </label>
          </div>
        </div>

        <div>
          <label className="block font-semibold text-slate-700 mb-1">
            Description détaillée du prototype et des essais de validation
          </label>
          <textarea
            rows={2}
            value={ciiData.prototypeStatus.description}
            onChange={(e) => handlePrototypeChange('description', e.target.value)}
            placeholder="Détailler les composants du prototype, les phases d’assemblage, les tests subis et son état d’avancement..."
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-purple-500 focus:outline-hidden"
          />
        </div>
      </div>
    </div>
  );
};
