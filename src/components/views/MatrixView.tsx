import React, { useState } from 'react';
import { Project, Company } from '../../types';
import { calculateAuditSynthesis } from '../../utils/analysisEngine';
import { getDomainProfile } from '../../domains';
import { 
  Grid2X2, 
  FlaskConical, 
  Sparkles, 
  AlertTriangle, 
  HelpCircle, 
  Info,
  ArrowRight
} from 'lucide-react';
import { ActiveTab } from '../layout/Sidebar';

interface MatrixViewProps {
  companies: Company[];
  projects: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MatrixView: React.FC<MatrixViewProps> = ({
  companies,
  projects,
  selectedProjectId,
  setSelectedProjectId,
  setActiveTab
}) => {
  const [filterCompany, setFilterCompany] = useState<string>('ALL');

  // Compute coordinates for each project:
  // X: Innovation Produit & Différentiel Marché (0-10) -> Based on CII axes and prototype
  // Y: Profondeur R&D & Verrous Scientifiques (0-10) -> Based on CIR dimensions (verrou, incertitude, demarche)
  const evaluatedProjects = projects.map(proj => {
    const comp = companies.find(c => c.id === proj.companyId);
    const isPme = comp ? ['MICRO', 'PETITE', 'MOYENNE'].includes(comp.size) : true;
    const synth = calculateAuditSynthesis(proj, isPme);

    // Compute coordinate X (Innovation Produit CII sur base /5)
    const ciiScores = proj.ciiAnalysis.axes.map(a => a.innovationLevel);
    const ciiRawSum = ciiScores.reduce<number>((sum, s) => sum + s, 0);
    const protoBonus = proj.ciiAnalysis.prototypeStatus.hasPrototype ? 0.5 : 0;
    const xCoord = Math.min(5, Number(((ciiRawSum / 4) + protoBonus).toFixed(1)));

    // Compute coordinate Y (Profondeur R&D CIR sur base /5)
    const cirScores = proj.cirDimensions.map(d => d.score);
    const cirRawSum = cirScores.reduce<number>((sum, s) => sum + s, 0);
    const yCoord = Math.min(5, Number((cirRawSum / 5).toFixed(1)));

    return {
      project: proj,
      company: comp,
      synthesis: synth,
      x: xCoord,
      y: yCoord
    };
  });

  const visibleProjects = evaluatedProjects.filter(p => {
    return filterCompany === 'ALL' || p.project.companyId === filterCompany;
  });

  const activeProjectData = evaluatedProjects.find(p => p.project.id === selectedProjectId) || evaluatedProjects[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            <Grid2X2 className="w-4 h-4 text-blue-600" />
            Matrice de Positionnement Décisionnelle
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Cartographie CIR vs CII vs Ingénierie Classique
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualisez le positionnement objectif des projets selon la profondeur de verrou R&D et le différentiel d’innovation marché.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-xs text-slate-500 font-medium">Filtrer par entreprise :</label>
          <select
            value={filterCompany}
            onChange={(e) => setFilterCompany(e.target.value)}
            className="text-xs border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-800 focus:outline-hidden bg-white"
          >
            <option value="ALL">Toutes les entreprises ({projects.length} projets)</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Interactive 2D Quadrant + Sidebar Explanations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: 2D Matrix Canvas (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
            <span className="font-semibold text-slate-700">Axe Y : Profondeur R&D & Verrous (CIR) : 0 à 5</span>
            <span>Axe X : Différentiel marché & Prototype (CII) : 0 à 5 →</span>
          </div>

          {/* Matrix Diagram Container */}
          <div className="relative w-full aspect-4/3 bg-slate-50 border border-slate-300 rounded-lg overflow-hidden select-none">
            {/* Quadrant Backgrounds */}
            {/* Top-Left: Pure CIR (High R&D, low market prototype) */}
            <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-50/40 border-r border-b border-dashed border-slate-300 p-3">
              <div className="text-[11px] font-bold text-blue-900 flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5 text-blue-600" />
                CIR Potentiel (Recherche fondamentale / R&D amont)
              </div>
              <p className="text-[10px] text-blue-800/80 mt-0.5">
                Verrou avéré · Incertitude majeure · Démarche expérimentale
              </p>
            </div>

            {/* Top-Right: Double Éligibilité (High R&D + High Product Innovation) */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50/40 border-b border-dashed border-slate-300 p-3">
              <div className="text-[11px] font-bold text-indigo-900 flex items-center gap-1">
                <FlaskConical className="w-3.5 h-3.5 text-indigo-600" />
                CIR Prioritaire (avec prototype CII)
              </div>
              <p className="text-[10px] text-indigo-800/80 mt-0.5">
                R&D de rupture intégrée dans un produit supérieur au marché
              </p>
            </div>

            {/* Bottom-Left: Ingénierie Classique / À approfondir */}
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-amber-50/40 border-r border-dashed border-slate-300 p-3">
              <div className="text-[11px] font-bold text-amber-900 flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-700" />
                Ingénierie classique / À approfondir
              </div>
              <p className="text-[10px] text-amber-800/80 mt-0.5">
                Règles de l’art · Intégrations connues · Danger de redressement
              </p>
            </div>

            {/* Bottom-Right: Pure CII (Product Innovation without fundamental R&D barrier) */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-50/40 p-3">
              <div className="text-[11px] font-bold text-purple-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                CII Potentiel (Innovation Produit PME)
              </div>
              <p className="text-[10px] text-purple-800/80 mt-0.5">
                Supériorité technique ou ergonomique sur le marché sans verrou CIR
              </p>
            </div>

            {/* Axis Labels in center */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="w-full border-t border-slate-300"></div>
            </div>
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
              <div className="h-full border-l border-slate-300"></div>
            </div>

            {/* Plotting Project Points */}
            {visibleProjects.map(({ project, company, synthesis, x, y }) => {
              const isSelected = project.id === selectedProjectId;
              // Map x (0-5) to left (8% to 92%), y (0-5) to bottom (8% to 92%)
              const leftPercent = 8 + (x / 5) * 84;
              const bottomPercent = 8 + (y / 5) * 84;

              const getPointColor = () => {
                if (synthesis.matrixPosition === 'CIR') return 'bg-blue-600 ring-blue-300 text-white';
                if (synthesis.matrixPosition === 'CII') return 'bg-purple-600 ring-purple-300 text-white';
                if (synthesis.matrixPosition === 'INGENIERIE') return 'bg-amber-600 ring-amber-300 text-white';
                return 'bg-slate-600 ring-slate-300 text-white';
              };

              return (
                <div
                  key={project.id}
                  onClick={() => setSelectedProjectId(project.id)}
                  style={{ left: `${leftPercent}%`, bottom: `${bottomPercent}%` }}
                  className={`absolute -translate-x-1/2 translate-y-1/2 cursor-pointer group z-20 transition-all ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shadow-md ring-4 ${getPointColor()} ${
                    isSelected ? 'ring-slate-900' : ''
                  }`}>
                    {project.name.charAt(0)}
                  </div>

                  {/* Tooltip on hover / selected */}
                  <div className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 rounded bg-slate-900 text-white text-[10px] shadow-lg pointer-events-none transition-opacity ${
                    isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    <div className="font-bold truncate">{project.name}</div>
                    <div className="text-slate-400 text-[9px]">{company?.name}</div>
                    <div className="mt-1 pt-1 border-t border-slate-800 flex justify-between text-[9px]">
                      <span>R&D : {y}/5</span>
                      <span>Innovation : {x}/5</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span>CIR potentiel</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-purple-600"></span>
                <span>CII potentiel</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-600"></span>
                <span>Ingénierie classique</span>
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Cliquez sur un marqueur pour afficher l’analyse détaillée.
            </div>
          </div>
        </div>

        {/* Right: Focused Project Qualification Card (1 Col) */}
        {activeProjectData && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Projet focalisé
              </span>
              <h3 className="text-sm font-bold text-slate-900 mt-0.5">
                {activeProjectData.project.name}
              </h3>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-slate-500">
                <span>{activeProjectData.company?.name}</span>
                <span aria-hidden="true">·</span>
                <span className="bg-blue-50 text-blue-700 font-semibold px-1.5 py-0.2 rounded border border-blue-200 text-[10px]">
                  {getDomainProfile(activeProjectData.project.primaryDomain).shortLabel}
                </span>
                {(activeProjectData.project.secondaryDisciplines || []).length > 0 && (
                  <span className="text-[10px] text-slate-400 truncate">
                    + {activeProjectData.project.secondaryDisciplines[0]}
                  </span>
                )}
              </div>
            </div>

            {/* Position Summary */}
            <div className="bg-slate-50 border border-slate-200 rounded p-3 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-600">Verdict de la matrice :</span>
                <span className="font-bold text-xs text-slate-900">
                  {activeProjectData.synthesis.matrixPosition === 'CIR' && 'Éligibilité CIR Principale'}
                  {activeProjectData.synthesis.matrixPosition === 'CII' && 'Éligibilité CII Principale'}
                  {activeProjectData.synthesis.matrixPosition === 'INGENIERIE' && 'Alerte : Ingénierie Classique'}
                  {activeProjectData.synthesis.matrixPosition === 'APPROFONDIR' && 'Dossier à approfondir'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-medium text-slate-600">Indice de confiance :</span>
                <span className="font-bold text-slate-800">
                  {activeProjectData.synthesis.confidence}
                </span>
              </div>
            </div>

            {/* Explanatory Rules */}
            <div className="space-y-2 text-slate-600 text-[11px]">
              <div className="font-semibold text-slate-800 text-xs">
                Logique de décision appliquée :
              </div>
              {activeProjectData.synthesis.matrixPosition === 'CIR' && (
                <p className="leading-relaxed">
                  Le projet caractérise un <strong>verrou scientifique/technique</strong> que l’état de l’art accessible ne permettait pas de lever, validé par une démarche expérimentale itérative. <strong>Recommandation : Déclarer en CIR.</strong>
                </p>
              )}
              {activeProjectData.synthesis.matrixPosition === 'CII' && (
                <p className="leading-relaxed">
                  Le projet ne présente pas d’incertitude scientifique fondamentale, mais démontre des <strong>performances supérieures au marché</strong> sur un produit/prototype concret, et l’entreprise est une PME. <strong>Recommandation : Déclarer en CII.</strong>
                </p>
              )}
              {activeProjectData.synthesis.matrixPosition === 'INGENIERIE' && (
                <p className="leading-relaxed text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                  Attention : Les travaux décrits relèvent des <strong>règles de l’art</strong> (migration, refactoring, CMS, consommation d’API). Danger de redressement fiscal à 40% si déclaré en CIR sans isoler un verrou spécifique.
                </p>
              )}
            </div>

            {/* Quick Actions to jump to tabs */}
            <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
              <button
                onClick={() => setActiveTab('cir')}
                className="w-full flex items-center justify-between px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium rounded transition-colors text-xs"
              >
                <span>Consulter la grille CIR</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('cii')}
                className="w-full flex items-center justify-between px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 font-medium rounded transition-colors text-xs"
              >
                <span>Consulter la grille CII</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActiveTab('missing')}
                className="w-full flex items-center justify-between px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded transition-colors text-xs"
              >
                <span>Voir les pièces manquantes</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
