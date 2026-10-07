import React from 'react';
import { Company, Project, AuditSynthesis } from '../../types';
import { Plus, Menu } from 'lucide-react';
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
  onToggleMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  companies,
  projects,
  selectedCompanyId,
  selectedProjectId,
  setSelectedCompanyId,
  setSelectedProjectId,
  currentSynthesis,
  onNewProjectClick,
  onToggleMobileMenu
}) => {
  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];
  const companyProjects = projects.filter(p => p.companyId === currentCompany?.id);
  const currentProject = projects.find(p => p.id === selectedProjectId) || companyProjects[0] || projects[0];

  const getConfidenceLabel = (conf?: string) => {
    switch (conf) {
      case 'ELEVEE': return 'Confiance élevée';
      case 'MOYENNE': return 'Confiance moyenne';
      case 'FAIBLE': return 'Confiance faible';
      default: return 'Confiance à évaluer';
    }
  };

  const getConfidenceClasses = (conf?: string) => {
    switch (conf) {
      case 'ELEVEE':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200/70';
      case 'MOYENNE':
        return 'text-blue-700 bg-blue-50 border-blue-200/70';
      default:
        return 'text-amber-700 bg-amber-50 border-amber-200/70';
    }
  };

  return (
    <header className="h-14 bg-white border-b border-slate-200/90 px-4 lg:px-6 flex items-center justify-between shrink-0 no-print">
      {/* Left: Hamburger (mobile) + "Entreprise > Projet" */}
      <div className="flex items-center gap-3 min-w-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden text-slate-500 hover:text-slate-800 p-1 rounded-md"
            aria-label="Ouvrir le menu de navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center gap-1.5 text-xs text-slate-600 truncate">
          {/* Entreprise selector */}
          <select
            value={currentCompany?.id || ''}
            onChange={(e) => {
              const newCompId = e.target.value;
              setSelectedCompanyId(newCompId);
              const firstProj = projects.find(p => p.companyId === newCompId);
              if (firstProj) setSelectedProjectId(firstProj.id);
            }}
            className="bg-transparent font-medium text-slate-600 hover:text-slate-900 focus:outline-hidden cursor-pointer max-w-[160px] sm:max-w-[220px] truncate"
            title="Sélectionner l'entreprise"
          >
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <span className="text-slate-300 font-light select-none px-0.5">&gt;</span>

          {/* Projet selector */}
          <select
            value={currentProject?.id || ''}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="bg-transparent font-semibold text-slate-900 hover:text-blue-600 focus:outline-hidden cursor-pointer max-w-[180px] sm:max-w-[260px] truncate"
            title="Sélectionner le projet actif"
          >
            {companyProjects.length > 0 ? (
              companyProjects.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))
            ) : (
              <option disabled>Aucun projet</option>
            )}
          </select>
        </div>
      </div>

      {/* Right: Badges sobres (CIR, CII, Confiance) + Bouton Nouveau projet */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {currentSynthesis && currentProject && (
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* CIR Badge */}
            <div 
              title={`Potentiel CIR : ${currentSynthesis.cirPotential}`}
              className="px-2 sm:px-2.5 py-1 rounded-md bg-slate-50 text-slate-800 border border-slate-200/80 text-[11px] font-medium tabular-nums flex items-center gap-1"
            >
              <span className="text-slate-500 font-normal">CIR</span>
              <strong className="text-blue-700 font-bold">{currentSynthesis.cirScoreTotal.toFixed(1)}</strong>
              <span className="text-slate-400 font-normal text-[10px]">/ 5</span>
            </div>

            {/* CII Badge */}
            <div 
              title={`Potentiel CII : ${currentSynthesis.ciiPotential}`}
              className="px-2 sm:px-2.5 py-1 rounded-md bg-slate-50 text-slate-800 border border-slate-200/80 text-[11px] font-medium tabular-nums flex items-center gap-1"
            >
              <span className="text-slate-500 font-normal">CII</span>
              <strong className="text-purple-700 font-bold">{currentSynthesis.ciiScoreTotal.toFixed(1)}</strong>
              <span className="text-slate-400 font-normal text-[10px]">/ 5</span>
            </div>

            {/* Confiance Badge (hidden on mobile if screen too narrow) */}
            <div className={`hidden md:inline-flex px-2 sm:px-2.5 py-1 rounded-md border text-[11px] font-medium ${getConfidenceClasses(currentSynthesis.confidence)}`}>
              {getConfidenceLabel(currentSynthesis.confidence)}
            </div>
          </div>
        )}

        <button
          onClick={onNewProjectClick}
          className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition-colors shadow-xs shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Nouveau projet</span>
          <span className="sm:hidden">Nouveau</span>
        </button>
      </div>
    </header>
  );
};
