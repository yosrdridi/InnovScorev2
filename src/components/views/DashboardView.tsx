import React, { useState } from 'react';
import { Company, Project, AuditSynthesis } from '../../types';
import { calculateAuditSynthesis } from '../../utils/analysisEngine';
import { getDomainProfile } from '../../domains';
import { 
  FlaskConical, 
  Sparkles, 
  AlertTriangle, 
  Grid2X2,
  FileQuestion,
  FolderKanban,
  Plus,
  ArrowRight,
  MoreVertical,
  BookOpen,
  X,
  FileText,
  Paperclip
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
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false);
  const [openMenuProjectId, setOpenMenuProjectId] = useState<string | null>(null);

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
  const totalMissingInfo = projectSyntheses.reduce((sum, p) => sum + p.synthesis.missingInfoCount, 0);

  const getPositionBadge = (pos: string) => {
    switch (pos) {
      case 'CIR':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            Éligible CIR
          </span>
        );
      case 'CII':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>
            Éligible CII
          </span>
        );
      case 'INGENIERIE':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            Ingénierie classique
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span>
            À approfondir
          </span>
        );
    }
  };

  const getPotentialLabel = (potential: string) => {
    switch (potential) {
      case 'FORT': return 'Fort potentiel';
      case 'MODERE': return 'Potentiel modéré';
      case 'A_APPROFONDIR': return 'À approfondir';
      case 'FAIBLE': return 'Potentiel faible';
      default: return 'Très faible';
    }
  };

  const getConfidenceText = (conf: string) => {
    switch (conf) {
      case 'ELEVEE': return 'élevée';
      case 'MOYENNE': return 'moyenne';
      case 'FAIBLE': return 'faible';
      default: return 'à étayer';
    }
  };

  // Automated smart conclusion for consulting synthesis
  const getAutomatedConclusion = (proj: Project, synth: AuditSynthesis) => {
    if (synth.matrixPosition === 'CIR') {
      if (synth.missingInfoCount > 0) {
        return "Verrou technique identifié et démarche expérimentale documentée. État de l’art et preuves contemporaines à consolider.";
      }
      return "Verrou scientifique caractérisé et démarche expérimentale itérative étayée. Dossier conforme au Guide du CIR.";
    }
    if (synth.matrixPosition === 'CII') {
      return "Supériorité technique et ergonomique démontrée sur prototype marché (PME éligible). Aucun verrou R&D fondamental.";
    }
    if (synth.matrixPosition === 'INGENIERIE') {
      return "Attention : travaux relevant des règles de l’art courantes du domaine. Isoler impérativement un sous-module ou exclure.";
    }
    return "Diagnostic préliminaire : incertitudes et démarches à préciser avant arbitrage d'éligibilité CIR ou CII.";
  };

  return (
    <div className="space-y-6">
      {/* 5. Compact Hero Section */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">
            Tableau de bord CIR / CII
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Vue consolidée des projets analysés et des points à sécuriser.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('matrix')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5"
          >
            <Grid2X2 className="w-3.5 h-3.5 text-slate-500" />
            <span>Matrice décisionnelle</span>
          </button>
          <button
            onClick={onNewProjectClick}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md transition-colors shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouveau projet</span>
          </button>
        </div>
      </div>

      {/* 6. Redesigned KPI Cards: Number Dominant */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: Projets instruits */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums">
              {projects.length}
            </span>
            <FolderKanban className="w-4 h-4 text-slate-400" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">
              Projets analysés
            </div>
            <div className="text-[11px] text-slate-400">
              {companies.length} entreprise{companies.length > 1 ? 's' : ''}
            </div>
          </div>
        </div>

        {/* Card 2: Fort potentiel CIR */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-blue-700 tracking-tight tabular-nums">
              {cirStrongCount}
            </span>
            <FlaskConical className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">
              Fort potentiel CIR
            </div>
            <div className="text-[11px] text-slate-400">
              Verrous & Frascati documentés
            </div>
          </div>
        </div>

        {/* Card 3: Fort potentiel CII */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-purple-700 tracking-tight tabular-nums">
              {ciiStrongCount}
            </span>
            <Sparkles className="w-4 h-4 text-purple-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">
              Fort potentiel CII
            </div>
            <div className="text-[11px] text-slate-400">
              Innovation produit (PME)
            </div>
          </div>
        </div>

        {/* Card 4: Alertes Ingénierie */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-amber-700 tracking-tight tabular-nums">
              {engineeringAlertCount}
            </span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">
              Alertes ingénierie
            </div>
            <div className="text-[11px] text-slate-400">
              Risque de requalification
            </div>
          </div>
        </div>

        {/* Card 5: Informations à collecter */}
        <div className="bg-white border border-slate-200/90 rounded-lg p-4 shadow-xs flex flex-col justify-between h-[104px]">
          <div className="flex items-center justify-between">
            <span className="text-3xl font-extrabold text-orange-600 tracking-tight tabular-nums">
              {totalMissingInfo}
            </span>
            <FileQuestion className="w-4 h-4 text-orange-500" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-800">
              Infos à collecter
            </div>
            <div className="text-[11px] text-slate-400">
              Pour sécuriser les dossiers
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Projects List (Primary) + Compact Référentiel Card (Secondary) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* 7. Main Project List (2 Cols on lg) */}
        <div className="lg:col-span-2 space-y-3.5">
          <div className="flex items-center justify-between px-0.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Portefeuille des projets ({projectSyntheses.length})
            </h3>
            <button
              onClick={() => setActiveTab('projects')}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1"
            >
              <span>Gérer les dossiers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {projectSyntheses.map(({ project, company, synthesis }) => {
              const isSelected = project.id === selectedProjectId;
              const domain = getDomainProfile(project.primaryDomain);
              const isMenuOpen = openMenuProjectId === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  className={`bg-white border rounded-lg p-5 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'border-blue-500 ring-1 ring-blue-500 shadow-xs'
                      : 'border-slate-200/90 hover:border-slate-300 hover:shadow-xs'
                  }`}
                >
                  {/* Top Row: Meta info & Status Badge */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      {/* Quiet Unboxed Metadata */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className="font-semibold text-slate-800">{company?.name}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span className="text-slate-600">{domain.label}</span>
                        <span aria-hidden="true" className="text-slate-300">·</span>
                        <span>{project.year}</span>
                        {project.projectLead && (
                          <>
                            <span aria-hidden="true" className="text-slate-300">·</span>
                            <span className="text-slate-500">Resp. {project.projectLead}</span>
                          </>
                        )}
                      </div>

                      {/* Project Name */}
                      <h4 className="text-base font-bold text-slate-900 tracking-tight">
                        {project.name}
                      </h4>
                    </div>

                    <div className="shrink-0 flex items-center gap-2">
                      {getPositionBadge(synthesis.matrixPosition)}

                      {/* 3-dots Menu button */}
                      <div className="relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setOpenMenuProjectId(isMenuOpen ? null : project.id);
                          }}
                          className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          aria-label="Actions rapides pour ce projet"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>

                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                          <div 
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-0 top-full mt-1 w-48 bg-white border border-slate-200 rounded-md shadow-md py-1 z-30 text-xs"
                          >
                            <button
                              onClick={() => {
                                setSelectedProjectId(project.id);
                                setActiveTab('projects');
                                setOpenMenuProjectId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                            >
                              <FolderKanban className="w-3.5 h-3.5 text-slate-400" />
                              <span>Fiche de qualification</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProjectId(project.id);
                                setActiveTab('matrix');
                                setOpenMenuProjectId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                            >
                              <Grid2X2 className="w-3.5 h-3.5 text-slate-400" />
                              <span>Matrice décisionnelle</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProjectId(project.id);
                                setActiveTab('evidences');
                                setOpenMenuProjectId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                            >
                              <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                              <span>Pièces justificatives</span>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedProjectId(project.id);
                                setActiveTab('export');
                                setOpenMenuProjectId(null);
                              }}
                              className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                            >
                              <FileText className="w-3.5 h-3.5 text-slate-400" />
                              <span>Export du rapport</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Short Description */}
                  {project.generalDescription && (
                    <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
                      {project.generalDescription}
                    </p>
                  )}

                  {/* Scoring Row */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                    <div>
                      CIR : <strong className="text-blue-700 font-bold tabular-nums">{synthesis.cirScoreTotal.toFixed(1)} / 5</strong>
                      <span className="text-slate-400 font-normal ml-1">— {getPotentialLabel(synthesis.cirPotential)}</span>
                    </div>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <div>
                      CII : <strong className="text-purple-700 font-bold tabular-nums">{synthesis.ciiScoreTotal.toFixed(1)} / 5</strong>
                    </div>
                    <span aria-hidden="true" className="text-slate-300">·</span>
                    <div>
                      Confiance : <strong className="text-slate-800 font-semibold">{getConfidenceText(synthesis.confidence)}</strong>
                    </div>
                  </div>

                  {/* Automated Conclusion Callout */}
                  <div className="mt-3 p-2.5 rounded-md bg-slate-50 border border-slate-200/70 text-xs text-slate-700 leading-relaxed flex items-start gap-2">
                    <span className="text-slate-400 font-bold shrink-0">↳</span>
                    <span>{getAutomatedConclusion(project, synthesis)}</span>
                  </div>

                  {/* Clean, Limited Actions (Ouvrir l’audit + Voir la synthèse) */}
                  <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                    <span className="text-[11px] text-slate-400">
                      {project.teamMembers.length} intervenant{project.teamMembers.length > 1 ? 's' : ''} · {project.totalDaysSpent} j/h
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(project.id);
                          setActiveTab('synthesis');
                        }}
                        className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                      >
                        Voir la synthèse
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProjectId(project.id);
                          // Open CIR or CII depending on matrix position
                          if (synthesis.matrixPosition === 'CII') {
                            setActiveTab('cii');
                          } else {
                            setActiveTab('cir');
                          }
                        }}
                        className="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-xs flex items-center gap-1"
                      >
                        <span>Ouvrir l’audit</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 8. Compact "Référentiel CIR / CII" Card */}
        <div className="space-y-3.5">
          <div className="px-0.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Guide & Normes
            </h3>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-lg p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <h4 className="text-sm font-bold tracking-tight">
                Référentiel CIR / CII
              </h4>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              Normes du Ministère de la Recherche (MESR) et de l’OCDE (Manuel de Frascati) appliquées lors des contrôles.
            </p>

            {/* 3 Entries */}
            <div className="space-y-3 text-xs border-t border-slate-100 pt-3">
              <div className="space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center">1</span>
                  <span>CIR vs CII</span>
                </div>
                <p className="text-[11px] text-slate-500 pl-5 leading-relaxed">
                  CIR : Verrou mondial non résolu par l'état de l'art. CII : Supériorité des performances marché (PME).
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center">2</span>
                  <span>Critères Frascati</span>
                </div>
                <p className="text-[11px] text-slate-500 pl-5 leading-relaxed">
                  Nouveauté, créativité, incertitude, systématicité et transférabilité / reproductibilité.
                </p>
              </div>

              <div className="space-y-1">
                <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                  <span className="w-4 h-4 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold flex items-center justify-center">3</span>
                  <span>Ingénierie classique</span>
                </div>
                <p className="text-[11px] text-slate-500 pl-5 leading-relaxed">
                  Migrations, intégrations API ou paramétrages standards formellement exclus de l'assiette fiscale.
                </p>
              </div>
            </div>

            {/* Modal Trigger Button */}
            <div className="border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setIsMethodologyModalOpen(true)}
                className="w-full py-2 px-3 rounded-md bg-slate-50 hover:bg-slate-100 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 border border-slate-200/80"
              >
                <span>Voir la méthodologie</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Methodology Detail Modal / Drawer */}
      {isMethodologyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Référentiel Méthodologique CIR / CII
                  </h3>
                  <p className="text-xs text-slate-500">
                    Cadre doctrinal MESR et Manuel de Frascati (OCDE)
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsMethodologyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-600 leading-relaxed">
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center">1</span>
                  Arbitrage CIR vs CII (Article 244 quater B du CGI)
                </h4>
                <p>
                  <strong>Crédit Impôt Recherche (CIR) :</strong> Vise les opérations de R&D fondamentale, appliquée ou de développement expérimental. La condition sine qua non est l’existence d’un <em>verrou scientifique ou technique</em> que l’homme du métier ne pouvait surmonter à l’aide des connaissances accessibles au démarrage du projet.
                </p>
                <p>
                  <strong>Crédit Impôt Innovation (CII) :</strong> Réservé aux PME européennes. Concerne la phase de conception de prototypes ou d’installations pilotes de nouveaux produits. Le produit doit présenter des performances supérieures au marché sur le plan technique, des fonctionnalités, de l’ergonomie ou de l’écoconception.
                </p>
                <div className="p-2.5 bg-blue-50/70 border border-blue-200/70 rounded text-[11px] text-blue-900">
                  <strong>Règle d’étanchéité fiscale :</strong> Un même lot de travaux ou une dépense ne peut jamais cumuler CIR et CII. L’arbitrage doit être strict et exclusif.
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-800 text-xs font-bold flex items-center justify-center">2</span>
                  Les 5 critères fondamentaux du Manuel de Frascati (OCDE)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80">
                    <div className="font-semibold text-slate-800">1. Nouveauté</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Viser des connaissances nouvelles non accessibles publiquement.</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80">
                    <div className="font-semibold text-slate-800">2. Créativité</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Reposer sur des concepts originaux et non évidents pour le spécialiste.</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80">
                    <div className="font-semibold text-slate-800">3. Incertitude</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Issue technique non prédictible avec certitude à l’avance.</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80">
                    <div className="font-semibold text-slate-800">4. Systématicité</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Démarche expérimentale planifiée, budgétée et consignée.</div>
                  </div>
                  <div className="p-2.5 rounded bg-slate-50 border border-slate-200/80 sm:col-span-2">
                    <div className="font-semibold text-slate-800">5. Transférabilité & Reproductibilité</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Résultats pérennisés et formalisés dans le patrimoine intellectuel de l’entreprise.</div>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-4 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold flex items-center justify-center">3</span>
                  Exclusions formelles & Pratiques d’ingénierie courante
                </h4>
                <p>
                  L’administration fiscale et les experts du Ministère de la Recherche rejettent systématiquement :
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600 text-[11px]">
                  <li>L'intégration d’API standard, de librairies ou de frameworks du marché sans modification substantielle de leur coeur algorithmique.</li>
                  <li>Le refactoring de code, l'adaptation géométrique standard de pièces ou les migrations d'infrastructures.</li>
                  <li>Les démarches d'exécution industrielle courante et de mise en conformité réglementaire sans incertitude technique.</li>
                </ul>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 border-t border-slate-100 bg-slate-50 flex justify-end">
              <button
                onClick={() => setIsMethodologyModalOpen(false)}
                className="px-4 py-1.5 rounded-md bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
