import React from 'react';
import { 
  LayoutDashboard, 
  Building2, 
  FolderKanban, 
  FlaskConical, 
  Sparkles, 
  Grid2X2, 
  FileText, 
  Paperclip, 
  Printer, 
  HelpCircle,
  AlertTriangle
} from 'lucide-react';

export type ActiveTab = 
  | 'dashboard' 
  | 'companies' 
  | 'projects' 
  | 'cir' 
  | 'cii' 
  | 'matrix' 
  | 'missing'
  | 'questions' 
  | 'evidences' 
  | 'synthesis' 
  | 'export';

interface SidebarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  unresolvedMissingCount: number;
  criticalAlertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  unresolvedMissingCount,
  criticalAlertCount
}) => {
  const menuItems = [
    { id: 'dashboard' as ActiveTab, label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'companies' as ActiveTab, label: 'Entreprises', icon: Building2 },
    { id: 'projects' as ActiveTab, label: 'Projets & Qualification', icon: FolderKanban },
    { id: 'cir' as ActiveTab, label: 'Analyse CIR & Frascati', icon: FlaskConical },
    { id: 'cii' as ActiveTab, label: 'Analyse CII (Innovation)', icon: Sparkles },
    { id: 'matrix' as ActiveTab, label: 'Matrice CIR / CII / Ing.', icon: Grid2X2 },
    { 
      id: 'missing' as ActiveTab, 
      label: 'Infos pour sécuriser', 
      icon: AlertTriangle,
      badge: unresolvedMissingCount > 0 ? unresolvedMissingCount : undefined,
      badgeColor: 'text-amber-700 bg-amber-50'
    },
    { id: 'questions' as ActiveTab, label: 'Questions intelligentes', icon: HelpCircle },
    { id: 'evidences' as ActiveTab, label: 'Éléments de preuve', icon: Paperclip },
    { id: 'synthesis' as ActiveTab, label: 'Synthèse & Recomm.', icon: FileText },
    { id: 'export' as ActiveTab, label: 'Rapport d’audit & Export', icon: Printer }
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col shrink-0 no-print select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-linear-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm tracking-tight shadow-md">
            IS
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
              <span>Inov</span><span className="text-blue-400">Score</span>
            </h1>
            <p className="text-[10px] text-slate-400 font-medium">Scoring CIR / CII sur base /5</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-2 pb-2 text-[10px] font-semibold text-slate-300 uppercase tracking-wider">
          Modules d’analyse
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-md transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5 truncate">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] font-semibold tabular-nums px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-blue-700 text-white' : item.badgeColor
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Notice / Footer */}
      <div className="p-3 border-t border-slate-800 text-[11px] text-slate-400">
        <div className="p-2.5 rounded bg-slate-800/60 border border-slate-700/50">
          <div className="font-medium text-slate-300 text-[10px] uppercase tracking-wider mb-1">
            Doctrine Fiscale
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Outil d’aide à la décision pour consultants et DAF. Non opposable à l’administration sans rescrit fiscal.
          </p>
        </div>
      </div>
    </aside>
  );
};
