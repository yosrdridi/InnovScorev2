import React from 'react';
import { Company, Project, AuditSynthesis } from '../../types';
import { ChevronRight, PlusCircle, Building, FolderKanban, ShieldCheck, AlertCircle } from 'lucide-react';
import { ActiveTab } from './Sidebar';

interface HeaderProps {
  companies: Company[];
  projects: Project[];
  selectedCompanyId: string;
  selectedProjectId: string;
  setSelectedCompanyId: (id: string) => void;
  setSelectedProjectId: (id: string) => void;
  activeTab: ActiveTab;
  currentSynthesis?: AuditSynthesis;
  onNewProjectClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  companies,
  projects,
  selectedCompanyId,
  selectedProjectId,
  setSelectedCompanyId,
  setSelectedProjectId,
  activeTab,
  currentSynthesis,
  onNewProjectClick
}) => {
  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];
  const companyProjects = projects.filter(p => p.companyId === currentCompany?.id);
  const currentProject = projects.find(p => p.id === selectedProjectId) || companyProjects[0] || projects[0];

  const getTabLabel = (tab: ActiveTab) => {
    switch (tab) {
      case 'dashboard': return 'Tableau de bord';
      case 'companies': return 'Gestion des entreprises';
      case 'projects': return 'Dossier de qualification projet';
      case 'cir': return 'Grille d’analyse CIR & Critères Frascati';
      case 'cii': return 'Grille d’analyse CII (Crédit Impôt Innovation)';
      case 'matrix': return 'Matrice décisionnelle CIR / CII / Ingénierie';
      case 'missing': return 'Informations requises pour sécuriser l’audit';
      case 'questions': return 'Questions d’approfondissement intelligentes';
      case 'evidences': return 'Registre des pièces justificatives';
      case 'synthesis': return 'Synthèse stratégique & Recommandations';
      case 'export': return 'Export du rapport d’audit';
      default: return '';
    }
  };

  const getPotentialBadge = (potential?: string) => {
    switch (potential) {
      case 'FORT':
        return <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-emerald-200">Fort</span>;
      case 'MODERE':
        return <span className="text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-blue-200">Modéré</span>;
      case 'A_APPROFONDIR':
        return <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-amber-200">À approfondir</span>;
      case 'FAIBLE':
        return <span className="text-orange-700 bg-orange-50 px-2 py-0.5 rounded text-[11px] font-semibold border border-orange-200">Faible</span>;
      default:
        return <span className="text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px] font-semibold border border-slate-200">Très faible</span>;
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between shrink-0 no-print">
      {/* Left Breadcrumb & Context */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="flex items-center gap-1 font-medium text-slate-700">
            <Building className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={currentCompany?.id || ''}
              onChange={(e) => {
                const newCompId = e.target.value;
                setSelectedCompanyId(newCompId);
                const firstProj = projects.find(p => p.companyId === newCompId);
                if (firstProj) setSelectedProjectId(firstProj.id);
              }}
              className="bg-transparent font-semibold text-slate-800 hover:text-blue-600 focus:outline-hidden cursor-pointer"
            >
              {companies.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </span>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

          <span className="flex items-center gap-1 font-medium text-slate-700 max-w-[240px] truncate">
            <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={currentProject?.id || ''}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="bg-transparent font-medium text-slate-800 hover:text-blue-600 focus:outline-hidden cursor-pointer max-w-[200px] truncate"
            >
              {companyProjects.length > 0 ? (
                companyProjects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))
              ) : (
                <option disabled>Aucun projet</option>
              )}
            </select>
          </span>

          <ChevronRight className="w-3.5 h-3.5 text-slate-300" />

          <span className="text-slate-600 font-medium">
            {getTabLabel(activeTab)}
          </span>
        </div>
      </div>

      {/* Right Quick Status & Actions */}
      <div className="flex items-center gap-4 shrink-0">
        {currentSynthesis && currentProject && (
          <div className="hidden lg:flex items-center gap-3 text-xs text-slate-500 border-r border-slate-200 pr-4">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">Score CIR :</span>
              <span className="font-bold text-blue-700 tabular-nums">{currentSynthesis.cirScoreTotal.toFixed(1)}/5</span>
              {getPotentialBadge(currentSynthesis.cirPotential)}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">Score CII :</span>
              <span className="font-bold text-purple-700 tabular-nums">{currentSynthesis.ciiScoreTotal.toFixed(1)}/5</span>
              {getPotentialBadge(currentSynthesis.ciiPotential)}
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-slate-500 text-[11px]">Confiance :</span>
              <span className="text-slate-700 font-medium">{currentSynthesis.confidence}</span>
            </div>
          </div>
        )}

        <button
          onClick={onNewProjectClick}
          className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-colors shadow-xs"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Nouveau projet</span>
        </button>
      </div>
    </header>
  );
};
