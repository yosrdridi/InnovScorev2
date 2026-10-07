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
  AlertTriangle,
  X
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
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

interface NavGroup {
  title: string;
  items: {
    id: ActiveTab;
    label: string;
    icon: React.ElementType;
    badge?: number;
    badgeColor?: string;
  }[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  unresolvedMissingCount,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const navGroups: NavGroup[] = [
    {
      title: 'Pilotage',
      items: [
        { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
        { id: 'companies', label: 'Entreprises', icon: Building2 },
        { id: 'projects', label: 'Projets & Qualification', icon: FolderKanban }
      ]
    },
    {
      title: 'Analyse',
      items: [
        { id: 'cir', label: 'Analyse CIR & Frascati', icon: FlaskConical },
        { id: 'cii', label: 'Analyse CII', icon: Sparkles },
        { id: 'matrix', label: 'Matrice CIR / CII / Ingénierie', icon: Grid2X2 }
      ]
    },
    {
      title: 'Sécurisation',
      items: [
        { 
          id: 'missing', 
          label: 'Informations à collecter', 
          icon: AlertTriangle,
          badge: unresolvedMissingCount > 0 ? unresolvedMissingCount : undefined,
          badgeColor: 'text-amber-300 bg-amber-950/80 border border-amber-800/60'
        },
        { id: 'questions', label: 'Questions intelligentes', icon: HelpCircle },
        { id: 'evidences', label: 'Éléments de preuve', icon: Paperclip }
      ]
    },
    {
      title: 'Restitution',
      items: [
        { id: 'synthesis', label: 'Synthèse & recommandations', icon: FileText },
        { id: 'export', label: 'Rapport d’audit & export', icon: Printer }
      ]
    }
  ];

  const handleItemClick = (id: ActiveTab) => {
    setActiveTab(id);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const sidebarContent = (
    <aside className="w-60 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col h-full shrink-0 select-none">
      {/* Brand Header */}
      <div className="h-14 px-4 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-sm ring-1 ring-blue-500/50">
            IS
          </div>
          <div className="leading-tight">
            <h1 className="text-[13px] font-bold tracking-tight text-white">
              InnovScore
            </h1>
            <p className="text-[10px] text-slate-400 font-normal">
              Audit CIR / CII assisté
            </p>
          </div>
        </div>

        {onCloseMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1 rounded-md"
            aria-label="Fermer le menu"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-2.5 py-3 space-y-4 overflow-y-auto">
        {navGroups.map((group) => (
          <div key={group.title} className="space-y-0.5">
            <div className="px-2 pb-1 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {group.title}
            </div>

            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 text-xs font-medium rounded-md transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`text-[10px] font-semibold tabular-nums px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-blue-700 text-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Compact Legal Notice Footer */}
      <div className="p-2.5 border-t border-slate-800 text-[10px] text-slate-400">
        <div className="px-2 py-1.5 rounded bg-slate-800/40 text-slate-400 leading-tight">
          <span className="font-semibold text-slate-300">Doctrine fiscale</span> : aide à l’audit technique non opposable sans rescrit.
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <div className="hidden lg:flex shrink-0 h-screen">
        {sidebarContent}
      </div>

      {/* Mobile / Tablet Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity" 
            onClick={onCloseMobile} 
          />
          <div className="relative z-10 h-full">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
