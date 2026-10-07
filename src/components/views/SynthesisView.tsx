import React from 'react';
import { Project, Company } from '../../types';
import { calculateAuditSynthesis } from '../../utils/analysisEngine';
import { getDomainProfile } from '../../domains';
import { 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  AlertOctagon, 
  Flame, 
  Scale, 
  Clock,
  Printer,
  Sparkles,
  Layers
} from 'lucide-react';
import { ActiveTab } from '../layout/Sidebar';

interface SynthesisViewProps {
  project: Project;
  company: Company;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SynthesisView: React.FC<SynthesisViewProps> = ({
  project,
  company,
  setActiveTab
}) => {
  const isPme = ['MICRO', 'PETITE', 'MOYENNE'].includes(company.size);
  const synthesis = calculateAuditSynthesis(project, isPme);
  const domainProfile = getDomainProfile(project.primaryDomain || 'software');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            <Scale className="w-4 h-4 text-blue-600" />
            Audit de Conformité & Risque Fiscal · {domainProfile.shortLabel}
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Synthèse argumentée et recommandations pour le consultant
          </h2>
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-0.5">
            <span>Projet : <strong className="text-slate-800">{project.name}</strong></span>
            <span aria-hidden="true">·</span>
            <span className="bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded border border-blue-200 text-[11px]">
              Domaine : {domainProfile.label}
            </span>
            {(project.secondaryDisciplines || []).length > 0 && (
              <span className="text-[11px] text-slate-400">
                (+ {project.secondaryDisciplines.join(', ')})
              </span>
            )}
            <span aria-hidden="true">·</span>
            <span>Entreprise : {company.name} ({company.size})</span>
          </div>
        </div>

        <button
          onClick={() => setActiveTab('export')}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors shrink-0"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Accéder au rapport complet</span>
        </button>
      </div>

      {/* Synthesis Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-1.5">
          <div className="text-xs text-slate-500 font-medium">Positionnement Stratégique</div>
          <div className="text-base font-bold text-slate-900">
            {synthesis.matrixPosition === 'CIR' && 'Éligible CIR (R&D)'}
            {synthesis.matrixPosition === 'CII' && 'Éligible CII (Innovation)'}
            {synthesis.matrixPosition === 'INGENIERIE' && 'Requalification Ingénierie'}
            {synthesis.matrixPosition === 'APPROFONDIR' && 'Informations à approfondir'}
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Basé sur les critères Frascati & l’état de l’art {domainProfile.shortLabel}.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-1.5">
          <div className="text-xs text-slate-500 font-medium">Score Global CIR (sur 5)</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-700 tabular-nums">
              {synthesis.cirScoreTotal.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-normal">/ 5</span>
            <span className="text-[11px] text-slate-500 ml-1">
              (Frascati : {synthesis.frascatiScoreTotal.toFixed(1)}/5)
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Potentiel CIR : <strong className="text-blue-800">{synthesis.cirPotential}</strong>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-1.5">
          <div className="text-xs text-slate-500 font-medium">Score Global CII (sur 5)</div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-purple-700 tabular-nums">
              {synthesis.ciiScoreTotal.toFixed(1)}
            </span>
            <span className="text-xs text-slate-400 font-normal">/ 5</span>
            <span className="text-[11px] text-slate-500 ml-1">
              {isPme ? '(PME éligible)' : '(Non éligible - ETI/GE)'}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Potentiel CII : <strong className="text-purple-800">{synthesis.ciiPotential}</strong>
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-1.5">
          <div className="text-xs text-slate-500 font-medium">Niveau de Confiance Fiscale</div>
          <div className="flex items-center gap-2">
            <span className={`text-base font-bold ${
              synthesis.confidence === 'ELEVEE' ? 'text-emerald-700' :
              synthesis.confidence === 'MOYENNE' ? 'text-blue-700' : 'text-amber-700'
            }`}>
              {synthesis.confidence}
            </span>
            <span className="text-xs text-slate-400">
              ({project.evidences.length} preuve{project.evidences.length > 1 ? 's' : ''})
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Assiette : <strong>{project.estimatedBudget.toLocaleString('fr-FR')} €</strong> ({project.totalDaysSpent} j/h)
          </p>
        </div>
      </div>

      {/* Two Column: Points Forts vs Points de Vulnérabilité */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        {/* Points forts */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-emerald-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Éléments favorables au dossier de justification
          </h3>

          <div className="space-y-2">
            {synthesis.keyAuditStrengths.length > 0 ? (
              synthesis.keyAuditStrengths.map((str, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-emerald-50/50 p-2.5 rounded border border-emerald-100 text-emerald-950">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span className="leading-relaxed">{str}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">Aucun point fort significatif identifié.</p>
            )}
          </div>
        </div>

        {/* Vulnérabilités */}
        <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
          <h3 className="text-sm font-bold text-amber-900 flex items-center gap-2 border-b border-slate-100 pb-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Points de vulnérabilité & Risques de redressement
          </h3>

          <div className="space-y-2">
            {synthesis.keyAuditWeaknesses.length > 0 ? (
              synthesis.keyAuditWeaknesses.map((weak, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-amber-50/50 p-2.5 rounded border border-amber-100 text-amber-950">
                  <span className="text-amber-600 font-bold shrink-0">⚠</span>
                  <span className="leading-relaxed">{weak}</span>
                </div>
              ))
            ) : (
              <p className="text-slate-400 italic">Aucune vulnérabilité majeure identifiée.</p>
            )}
          </div>
        </div>
      </div>

      {/* Plan d'action & Recommandations stratégiques */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
        <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
          Plan d'action opérationnel recommandé pour l’équipe
        </h3>

        <div className="space-y-3">
          {synthesis.recommendations.map((rec, idx) => (
            <div key={idx} className="p-3 bg-slate-50 rounded-md border border-slate-200 flex items-start gap-3">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div className="space-y-1">
                <p className="font-medium text-slate-800 leading-relaxed">
                  {rec}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Besoin d’approfondir les données manquantes ?
          </span>
          <button
            onClick={() => setActiveTab('missing')}
            className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <span>Consulter les pièces manquantes ({synthesis.missingInfoCount})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
