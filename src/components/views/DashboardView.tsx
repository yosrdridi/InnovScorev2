import React from 'react';
import { Company, Project, AuditSynthesis } from '../../types';
import { calculateAuditSynthesis } from '../../utils/analysisEngine';
import { getDomainProfile } from '../../domains';
import { 
  FlaskConical, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  ShieldCheck, 
  Grid2X2,
  FileQuestion,
  TrendingUp,
  FolderKanban
} from 'lucide-react';
import { ActiveTab } from '../layout/Sidebar';

interface DashboardViewProps {
  companies: Company[];
  projects: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onNewProjectClick: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  companies,
  projects,
  selectedProjectId,
  setSelectedProjectId,
  setActiveTab,
  onNewProjectClick
}) => {
  // Compute syntheses for all projects
  const projectSyntheses = projects.map(proj => {
    const comp = companies.find(c => c.id === proj.companyId);
    const isPme = comp ? ['MICRO', 'PETITE', 'MOYENNE'].includes(comp.size) : true;
    return {
      project: proj,
      company: comp,
      synthesis: calculateAuditSynthesis(proj, isPme)
    };
  });

  const cirStrongCount = projectSyntheses.filter(p => p.synthesis.cirPotential === 'FORT').length;
  const ciiStrongCount = projectSyntheses.filter(p => p.synthesis.ciiPotential === 'FORT').length;
  const engineeringAlertCount = projectSyntheses.filter(p => p.synthesis.matrixPosition === 'INGENIERIE').length;
  const toDeepenCount = projectSyntheses.filter(p => p.synthesis.matrixPosition === 'APPROFONDIR').length;
  const totalMissingInfo = projectSyntheses.reduce((sum, p) => sum + p.synthesis.missingInfoCount, 0);

  const getPositionBadge = (pos: string) => {
    switch (pos) {
      case 'CIR':
        return <span className="text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[11px] font-semibold">CIR potentiel</span>;
      case 'CII':
        return <span className="text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-[11px] font-semibold">CII potentiel</span>;
      case 'INGENIERIE':
        return <span className="text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-semibold">Ingénierie classique</span>;
      default:
        return <span className="text-slate-700 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-[11px] font-semibold">À approfondir</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Disclaimer */}
      <div className="bg-slate-900 text-white rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-1">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Audit Fiscale & Éligibilité R&D / Innovation
          </div>
          <h2 className="text-lg font-bold tracking-tight text-white">
            Tableau de bord d’évaluation préliminaire CIR / CII
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Plateforme d’aide à la décision pour structurer l’argumentaire technique, détecter les activités d’ingénierie classique non éligibles et sécuriser les preuves avant déclaration ou rescrit.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium rounded-md border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Grid2X2 className="w-3.5 h-3.5" />
            <span>Matrice décisionnelle</span>
          </button>
          <button
            onClick={onNewProjectClick}
            className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md transition-colors shadow-xs"
          >
            Nouveau projet
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span>Projets instruits</span>
            <FolderKanban className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {projects.length}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Sur {companies.length} entreprise(s)
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span>Fort potentiel CIR</span>
            <FlaskConical className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-bold text-blue-700 tabular-nums">
            {cirStrongCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Verrous & Frascati documentés
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span>Fort potentiel CII</span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-purple-700 tabular-nums">
            {ciiStrongCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Innovation produit (PME)
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span>Alertes Ingénierie</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-700 tabular-nums">
            {engineeringAlertCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Risque de requalification
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-medium mb-1.5">
            <span>Infos à collecter</span>
            <FileQuestion className="w-4 h-4 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-orange-700 tabular-nums">
            {totalMissingInfo}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">
            Pour sécuriser les dossiers
          </div>
        </div>
      </div>

      {/* Main Grid: Projects Breakdown & Audit Readiness */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Project Cards (2 cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
              Projets récents et positionnement fiscal
            </h3>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              <span>Voir tous les projets</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projectSyntheses.map(({ project, company, synthesis }) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`bg-white border rounded-lg p-4 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 ring-1 ring-blue-500 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-medium text-slate-700">{company?.name}</span>
                        <span aria-hidden="true">·</span>
                        <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[10px] font-semibold border border-slate-200">
                          {getDomainProfile(project.primaryDomain).shortLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>Année {project.year}</span>
                        <span aria-hidden="true">·</span>
                        <span>{project.projectLead}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">
                        {project.name}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                        {project.generalDescription}
                      </p>
                    </div>

                    <div className="shrink-0 flex flex-col items-end gap-1.5">
                      {getPositionBadge(synthesis.matrixPosition)}
                      <div className="text-[11px] text-slate-400 tabular-nums">
                        Confiance : <strong className="text-slate-600">{synthesis.confidence}</strong>
                      </div>
                    </div>
                  </div>

                  {/* Indicators Footer */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
                    <div className="flex items-center gap-4">
                      <span>
                        Score CIR : <strong className="text-slate-800 tabular-nums">{synthesis.cirScoreTotal.toFixed(1)} / 5</strong>
                      </span>
                      <span>
                        Critères Frascati : <strong className="text-slate-800 tabular-nums">{synthesis.frascatiScoreTotal.toFixed(1)} / 5</strong>
                      </span>
                      <span>
                        Score CII : <strong className="text-slate-800 tabular-nums">{synthesis.ciiScoreTotal.toFixed(1)} / 5</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(project.id);
                          setActiveTab('cir');
                        }}
                        className="text-[11px] font-medium text-slate-700 hover:text-blue-600 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
                      >
                        Analyse CIR
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(project.id);
                          setActiveTab('cii');
                        }}
                        className="text-[11px] font-medium text-slate-700 hover:text-purple-600 px-2 py-1 rounded bg-slate-100 hover:bg-slate-200"
                      >
                        Analyse CII
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(project.id);
                          setActiveTab('synthesis');
                        }}
                        className="text-[11px] font-medium text-blue-600 hover:text-blue-700 px-2 py-1 rounded bg-blue-50 hover:bg-blue-100"
                      >
                        Synthèse
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Methodological Principles & Defense Checklist */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-900 tracking-tight">
            Méthodologie d’audit ministériel (MESR / DGE)
          </h3>

          <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3.5 text-xs text-slate-600">
            <div>
              <div className="font-semibold text-slate-900 mb-1">
                1. Différence R&D (CIR) vs Innovation (CII)
              </div>
              <p className="leading-relaxed text-slate-600">
                Le <strong>CIR</strong> valide la levée d’un verrou scientifique ou technique non résolu par l’état de l’art mondial. Le <strong>CII</strong> valide la supériorité des performances d’un produit par rapport à la concurrence (réservé aux PME).
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="font-semibold text-slate-900 mb-1">
                2. Les 5 critères Frascati (OCDE)
              </div>
              <ul className="space-y-1 text-slate-600 pl-4 list-disc">
                <li><strong>Nouveauté</strong> : Vise des connaissances nouvelles.</li>
                <li><strong>Créativité</strong> : Concepts non évidents.</li>
                <li><strong>Incertitude</strong> : Résultat non prédictible.</li>
                <li><strong>Systématicité</strong> : Démarche planifiée.</li>
                <li><strong>Transférabilité</strong> : Résultats reproductibles.</li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <div className="font-semibold text-slate-900 mb-1">
                3. Alerte rouge : Ingénierie classique
              </div>
              <p className="leading-relaxed text-slate-600">
                La migration d’infrastructure, le refactoring, les intégrations d’API standards ou le paramétrage sont formellement rejetés par les experts du Ministère de la Recherche.
              </p>
            </div>

            <div className="border-t border-slate-100 pt-3 bg-amber-50/50 p-2.5 rounded border-amber-100">
              <div className="font-semibold text-amber-900 mb-1 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Conseil pour le consultant
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Ne jamais baser un dossier uniquement sur un score statistique. Les experts exigent des pièces de preuves datées contemporaines des travaux (rapports d’essais, tickets Git, cahiers de labo).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
