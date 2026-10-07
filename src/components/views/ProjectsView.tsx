import React, { useState } from 'react';
import { Company, Project, ProjectTeamMember, DomainId } from '../../types';
import { ALL_DOMAINS, getDomainProfile } from '../../domains';
import { detectProjectDomain } from '../../core/domainDetector';
import { 
  FolderKanban, 
  Search, 
  Plus, 
  Save, 
  Calendar, 
  User, 
  Euro, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  HelpCircle,
  Layers,
  FlaskConical,
  Sparkles,
  Trash2,
  Cpu,
  Wrench,
  Zap,
  Dna,
  Pill,
  Atom,
  Factory,
  Sun,
  HeartPulse
} from 'lucide-react';
import { ActiveTab } from '../layout/Sidebar';

interface ProjectsViewProps {
  companies: Company[];
  projects: Project[];
  selectedProjectId: string;
  setSelectedProjectId: (id: string) => void;
  onUpdateProject: (project: Project) => void;
  onNewProjectClick: () => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  companies,
  projects,
  selectedProjectId,
  setSelectedProjectId,
  onUpdateProject,
  onNewProjectClick,
  setActiveTab
}) => {
  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];
  const [activeSubTab, setActiveSubTab] = useState<'identification' | 'qualification' | 'equipe'>('identification');
  const [searchTerm, setSearchTerm] = useState('');
  const [companyFilter, setCompanyFilter] = useState('ALL');
  const [isSavedMessage, setIsSavedMessage] = useState(false);
  const [newDisciplineInput, setNewDisciplineInput] = useState('');
  const [ignoredSuggestions, setIgnoredSuggestions] = useState<string[]>([]);

  // Editable form state mirror
  const [formProject, setFormProject] = useState<Project>(currentProject);

  // Sync when selected project changes
  React.useEffect(() => {
    if (currentProject) {
      setFormProject(currentProject);
    }
  }, [selectedProjectId, currentProject]);

  const handleFieldChange = (field: keyof Project, value: any) => {
    const updated = { ...formProject, [field]: value };
    setFormProject(updated);
  };

  const handleSave = () => {
    onUpdateProject(formProject);
    setIsSavedMessage(true);
    setTimeout(() => setIsSavedMessage(false), 2500);
  };

  const currentDomainProfile = getDomainProfile(formProject.primaryDomain || 'software');

  // AI Domain and Secondary Discipline Detection
  const aiDetection = detectProjectDomain(formProject);
  const suggestedDiscipline = aiDetection.suggestedAddition && !ignoredSuggestions.includes(aiDetection.suggestedAddition)
    ? aiDetection.suggestedAddition
    : null;

  const handleAcceptSuggestion = (discipline: string) => {
    const existing = formProject.secondaryDisciplines || [];
    if (!existing.includes(discipline)) {
      const updatedDisciplines = [...existing, discipline];
      handleFieldChange('secondaryDisciplines', updatedDisciplines);
    }
  };

  const handleToggleDiscipline = (disc: string) => {
    const existing = formProject.secondaryDisciplines || [];
    if (existing.includes(disc)) {
      handleFieldChange('secondaryDisciplines', existing.filter(d => d !== disc));
    } else {
      handleFieldChange('secondaryDisciplines', [...existing, disc]);
    }
  };

  const handleAddCustomDiscipline = () => {
    if (newDisciplineInput.trim()) {
      const existing = formProject.secondaryDisciplines || [];
      if (!existing.includes(newDisciplineInput.trim())) {
        handleFieldChange('secondaryDisciplines', [...existing, newDisciplineInput.trim()]);
      }
      setNewDisciplineInput('');
    }
  };

  // Team Member helpers
  const handleAddTeamMember = () => {
    const newMember: ProjectTeamMember = {
      id: `tm-${Date.now()}`,
      name: '',
      role: 'Ingénieur R&D',
      qualification: 'INGENIEUR',
      daysSpent: 30
    };
    const updatedMembers = [...formProject.teamMembers, newMember];
    const totalDays = updatedMembers.reduce((sum, m) => sum + m.daysSpent, 0);
    setFormProject({
      ...formProject,
      teamMembers: updatedMembers,
      totalDaysSpent: totalDays
    });
  };

  const handleUpdateTeamMember = (index: number, field: keyof ProjectTeamMember, value: any) => {
    const updatedMembers = [...formProject.teamMembers];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    const totalDays = updatedMembers.reduce((sum, m) => sum + Number(m.daysSpent || 0), 0);
    setFormProject({
      ...formProject,
      teamMembers: updatedMembers,
      totalDaysSpent: totalDays
    });
  };

  const handleRemoveTeamMember = (index: number) => {
    const updatedMembers = formProject.teamMembers.filter((_, i) => i !== index);
    const totalDays = updatedMembers.reduce((sum, m) => sum + Number(m.daysSpent || 0), 0);
    setFormProject({
      ...formProject,
      teamMembers: updatedMembers,
      totalDaysSpent: totalDays
    });
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.generalDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCompany = companyFilter === 'ALL' || p.companyId === companyFilter;
    return matchesSearch && matchesCompany;
  });

  return (
    <div className="space-y-6">
      {/* Top Selector & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un projet..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="text-xs border border-slate-300 rounded-md px-2.5 py-1.5 text-slate-700 focus:outline-hidden"
          >
            <option value="ALL">Toutes les entreprises ({projects.length})</option>
            {companies.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>

          <div className="text-xs text-slate-500 font-medium">
            Projet actif : <strong className="text-slate-900">{formProject.name}</strong>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isSavedMessage && (
            <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enregistré !
            </span>
          )}
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Enregistrer la fiche</span>
          </button>
          <button
            onClick={onNewProjectClick}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Nouveau projet</span>
          </button>
        </div>
      </div>

      {/* Main Content: Left Quick Switcher + Right Tabs Form */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Left: Project selector list */}
        <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
          <div className="p-3 border-b border-slate-100 bg-slate-50 text-xs font-semibold text-slate-700">
            Sélectionner un projet ({filteredProjects.length})
          </div>
          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {filteredProjects.map((p) => {
              const comp = companies.find(c => c.id === p.companyId);
              const isSelected = p.id === formProject.id;
              const profile = getDomainProfile(p.primaryDomain);
              const cirSum = p.cirDimensions.reduce((sum, d) => sum + d.score, 0);
              const cirScore = (cirSum / 5).toFixed(1);
              const ciiSum = p.ciiAnalysis.axes.reduce((sum, a) => sum + a.innovationLevel, 0);
              const ciiScore = (ciiSum / 4).toFixed(1);

              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProjectId(p.id)}
                  className={`w-full text-left p-3 transition-colors ${
                    isSelected ? 'bg-blue-50/80 border-l-4 border-blue-600' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="text-[11px] text-slate-500 font-medium truncate flex items-center justify-between">
                    <span>{comp?.name} · {p.year}</span>
                    <span className="text-[10px] text-slate-400 font-mono">Resp: {p.projectLead}</span>
                  </div>
                  <div className={`text-xs font-semibold mt-0.5 line-clamp-2 ${
                    isSelected ? 'text-blue-900' : 'text-slate-800'
                  }`}>
                    {p.name}
                  </div>
                  <div className="mt-1.5 flex items-center justify-between text-[10px]">
                    <span className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded font-medium truncate max-w-[100px] border border-slate-200">
                      {profile.shortLabel}
                    </span>
                    <span className="text-slate-500 font-medium tabular-nums">
                      CIR <strong className="text-blue-700">{cirScore}</strong>/5 · CII <strong className="text-purple-700">{ciiScore}</strong>/5
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Form Editor Tabs */}
        <div className="lg:col-span-3 space-y-4">
          {/* Sub Navigation */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveSubTab('identification')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeSubTab === 'identification'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                1. Identification générale & Technique
              </button>
              <button
                onClick={() => setActiveSubTab('qualification')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeSubTab === 'qualification'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                2. Questionnaire intelligent de qualification
              </button>
              <button
                onClick={() => setActiveSubTab('equipe')}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
                  activeSubTab === 'equipe'
                    ? 'bg-slate-900 text-white'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                3. Équipe & Valorisation ({formProject.teamMembers.length})
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button
                onClick={() => setActiveTab('cir')}
                className="text-blue-600 hover:text-blue-800 font-semibold"
              >
                Aller à l’Analyse CIR →
              </button>
            </div>
          </div>

          {/* Tab 1: Identification & Core Text */}
          {activeSubTab === 'identification' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Nom du projet *</label>
                  <input
                    type="text"
                    value={formProject.name}
                    onChange={(e) => handleFieldChange('name', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-medium text-slate-900"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Entreprise rattachée *</label>
                  <select
                    value={formProject.companyId}
                    onChange={(e) => handleFieldChange('companyId', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  >
                    {companies.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Étape 1 : Qualification du Domaine Scientifique & Multidisciplinarité */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                      §
                    </span>
                    <h4 className="font-bold text-slate-900 text-xs">
                      Qualification du domaine scientifique & Profil sectoriel
                    </h4>
                  </div>
                  <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {currentDomainProfile.shortLabel}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Domaine scientifique ou technique principal *
                    </label>
                    <select
                      value={formProject.primaryDomain || 'software'}
                      onChange={(e) => handleFieldChange('primaryDomain', e.target.value as DomainId)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-semibold text-slate-900 bg-white"
                    >
                      {ALL_DOMAINS.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-slate-500 mt-1 italic leading-relaxed">
                      {currentDomainProfile.description}
                    </p>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Disciplines secondaires (projet multidisciplinaire)
                    </label>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {currentDomainProfile.secondaryDisciplinesSuggestions.map(disc => {
                        const isSelected = (formProject.secondaryDisciplines || []).includes(disc);
                        return (
                          <button
                            type="button"
                            key={disc}
                            onClick={() => handleToggleDiscipline(disc)}
                            className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                              isSelected
                                ? 'bg-blue-600 text-white font-semibold'
                                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}{disc}
                          </button>
                        );
                      })}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={newDisciplineInput}
                        onChange={(e) => setNewDisciplineInput(e.target.value)}
                        placeholder="Autre discipline (ex: biomécanique, optique...)"
                        className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded bg-white focus:outline-hidden"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCustomDiscipline();
                          }
                        }}
                      />
                      <button
                        type="button"
                        onClick={handleAddCustomDiscipline}
                        className="px-2.5 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-semibold"
                      >
                        Ajouter
                      </button>
                    </div>

                    {(formProject.secondaryDisciplines || []).length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2 text-[10px] text-slate-500">
                        <span className="font-semibold text-slate-700">Sélectionnées :</span>
                        {formProject.secondaryDisciplines.map(d => (
                          <span key={d} className="bg-blue-50 text-blue-800 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                            {d}
                            <button
                              type="button"
                              onClick={() => handleToggleDiscipline(d)}
                              className="text-slate-400 hover:text-red-500 font-bold"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* AI Discipline Detection Suggestion Banner */}
                {suggestedDiscipline && (
                  <div className="mt-2 bg-blue-50/90 border border-blue-200 rounded-md p-2.5 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-blue-900">
                      <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
                      <span>
                        Une discipline complémentaire semble intervenir dans ce projet : <strong>« {suggestedDiscipline} »</strong>. Voulez-vous l’intégrer à l’analyse ?
                      </span>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => handleAcceptSuggestion(suggestedDiscipline)}
                        className="px-2.5 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded text-[11px] shadow-xs"
                      >
                        Intégrer à l’analyse
                      </button>
                      <button
                        type="button"
                        onClick={() => setIgnoredSuggestions([...ignoredSuggestions, suggestedDiscipline])}
                        className="px-2 py-1 text-slate-500 hover:text-slate-700 text-[11px]"
                      >
                        Ignorer
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Année analysée *</label>
                  <input
                    type="number"
                    value={formProject.year}
                    onChange={(e) => handleFieldChange('year', Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden tabular-nums font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Responsable projet</label>
                  <input
                    type="text"
                    value={formProject.projectLead}
                    onChange={(e) => handleFieldChange('projectLead', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date de début</label>
                  <input
                    type="date"
                    value={formProject.startDate}
                    onChange={(e) => handleFieldChange('startDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Date de fin</label>
                  <input
                    type="date"
                    value={formProject.endDate}
                    onChange={(e) => handleFieldChange('endDate', e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Description générale du projet
                </label>
                <textarea
                  rows={2}
                  value={formProject.generalDescription}
                  onChange={(e) => handleFieldChange('generalDescription', e.target.value)}
                  placeholder="Résumé exécutif synthétisant la finalité et le périmètre des travaux..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Contexte scientifique, industriel ou réglementaire
                  </label>
                  <textarea
                    rows={3}
                    value={formProject.context}
                    onChange={(e) => handleFieldChange('context', e.target.value)}
                    placeholder="Pourquoi ce projet a-t-il été initié ? Quelles étaient les limites de l’écosystème ?"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Objectifs techniques et fonctionnels
                  </label>
                  <textarea
                    rows={3}
                    value={formProject.objectives}
                    onChange={(e) => handleFieldChange('objectives', e.target.value)}
                    placeholder="Quelles cibles chiffrées devaient être atteintes (latence, rendement, précision) ?"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Technologies, protocoles et outils mobilisés (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formProject.technologiesUsed.join(', ')}
                  onChange={(e) => handleFieldChange('technologiesUsed', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
                  placeholder="Ex : C++ DSP, Kalman, PyTorch, STM32, Protocole MQTT..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    État de l’art connu au démarrage
                  </label>
                  <textarea
                    rows={3}
                    value={formProject.knownStateOfTheArt}
                    onChange={(e) => handleFieldChange('knownStateOfTheArt', e.target.value)}
                    placeholder="Publications, normes, brevets ou bibliothèques existantes..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Difficultés rencontrées / Incertitudes
                  </label>
                  <textarea
                    rows={3}
                    value={formProject.difficultiesEncountered}
                    onChange={(e) => handleFieldChange('difficultiesEncountered', e.target.value)}
                    placeholder="Qu’est-ce qui bloquait ? En quoi les connaissances accessibles ne permettaient pas de résoudre le problème ?"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Travaux réalisés & Démarche d’investigation
                  </label>
                  <textarea
                    rows={3}
                    value={formProject.workCarriedOut}
                    onChange={(e) => handleFieldChange('workCarriedOut', e.target.value)}
                    placeholder="Études, modélisations, conception des architectures, itérations..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Expérimentations, tests et bancs d’essais
                  </label>
                  <textarea
                    rows={3}
                    value={formProject.experiments}
                    onChange={(e) => handleFieldChange('experiments', e.target.value)}
                    placeholder="Campagnes de mesures, bancs de tests, cohortes, itérations d’échec..."
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Résultats obtenus & Nouvelles connaissances acquises
                </label>
                <textarea
                  rows={2}
                  value={formProject.results}
                  onChange={(e) => handleFieldChange('results', e.target.value)}
                  placeholder="Qu’a-t-on appris ? Les verrous ont-ils été levés ? Résultats chiffrés obtenus..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                />
              </div>
            </div>
          )}

          {/* Tab 2: Intelligent Qualification Questionnaire */}
          {activeSubTab === 'qualification' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-6 text-xs">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-sm font-bold text-slate-900">
                  Questionnaire méthodique de qualification R&D / Innovation
                </h3>
                <p className="text-slate-500 text-[11px] mt-0.5">
                  Ce formulaire structure les faits techniques afin d’éliminer les formulations subjectives et préparer l’audit fiscal.
                </p>
              </div>

              {/* Section A: Contexte et objectif */}
              <div className="space-y-3">
                <div className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-5 h-5 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold">A</span>
                  <span>Contexte et objectif du projet</span>
                </div>

                <div className="space-y-3 pl-7">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      1. Quel problème l’équipe cherchait-elle précisément à résoudre ?
                    </label>
                    <textarea
                      rows={2}
                      value={formProject.problemToSolve}
                      onChange={(e) => handleFieldChange('problemToSolve', e.target.value)}
                      placeholder="Identifier le problème scientifique, technique ou d’usage..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      2. Pourquoi les solutions existantes sur le marché ou dans la littérature n’étaient-elles pas suffisantes ?
                    </label>
                    <textarea
                      rows={2}
                      value={formProject.whyExistingSolutionsInsufficient}
                      onChange={(e) => handleFieldChange('whyExistingSolutionsInsufficient', e.target.value)}
                      placeholder="Expliquer les limites concrètes des alternatives déjà disponibles..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      3. Quel était le niveau de connaissance disponible au démarrage du projet ?
                    </label>
                    <textarea
                      rows={2}
                      value={formProject.knowledgeLevelAtStart}
                      onChange={(e) => handleFieldChange('knowledgeLevelAtStart', e.target.value)}
                      placeholder="Qu’est-ce qui était maîtrisé et qu’est-ce qui demeurait inconnu ?"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section B: Difficultés rencontrées */}
              <div className="space-y-3 pt-2">
                <div className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-5 h-5 rounded bg-amber-100 text-amber-800 flex items-center justify-center text-[10px] font-bold">B</span>
                  <span>Difficultés techniques et incertitudes</span>
                </div>

                <div className="space-y-3 pl-7">
                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">
                        Certaines difficultés pouvaient-elles être résolues par les règles de l’art ?
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Si oui, ces travaux relèvent de l’ingénierie classique et doivent être exclus du CIR.
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formProject.canBeSolvedByStandardKnowledge}
                        onChange={(e) => handleFieldChange('canBeSolvedByStandardKnowledge', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {formProject.canBeSolvedByStandardKnowledge ? 'Oui (Ingénierie)' : 'Non (Verrou)'}
                      </span>
                    </label>
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      4. Existait-il une incertitude quant à la faisabilité du projet ?
                    </label>
                    <textarea
                      rows={2}
                      value={formProject.feasibilityUncertainty}
                      onChange={(e) => handleFieldChange('feasibilityUncertainty', e.target.value)}
                      placeholder="Était-il possible de prédire le résultat ? Quels paramètres étaient mal maîtrisés ?"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Section C: Travaux réalisés */}
              <div className="space-y-3 pt-2">
                <div className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-5 h-5 rounded bg-purple-100 text-purple-700 flex items-center justify-center text-[10px] font-bold">C</span>
                  <span>Hypothèses, démarches expérimentales et données quantitatives</span>
                </div>

                <div className="space-y-3 pl-7">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      5. Quelles hypothèses scientifiques ou techniques ont été formulées ?
                    </label>
                    <textarea
                      rows={2}
                      value={formProject.hypothesesFormulated}
                      onChange={(e) => handleFieldChange('hypothesesFormulated', e.target.value)}
                      placeholder="Ex : Hypothèse 1 : un filtrage stochastique permet de décorréler le signal..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">
                      6. Données quantitatives disponibles pour illustrer les travaux
                    </label>
                    <textarea
                      rows={2}
                      value={formProject.quantitativeDataAvailable}
                      onChange={(e) => handleFieldChange('quantitativeDataAvailable', e.target.value)}
                      placeholder="Données chiffrées : taux d’erreur, SNR, gain de temps, mesures expérimentales..."
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono text-[11px]"
                    />
                  </div>
                </div>
              </div>

              {/* Section D: Résultats */}
              <div className="space-y-3 pt-2">
                <div className="font-semibold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-1.5">
                  <span className="w-5 h-5 rounded bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold">D</span>
                  <span>Acquisition de connaissances & Reproductibilité</span>
                </div>

                <div className="space-y-3 pl-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        7. Nouvelles connaissances acquises
                      </label>
                      <textarea
                        rows={2}
                        value={formProject.newKnowledgeAcquired}
                        onChange={(e) => handleFieldChange('newKnowledgeAcquired', e.target.value)}
                        placeholder="Quelles connaissances dépassent la simple réalisation du produit ?"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                    <div>
                      <label className="block font-medium text-slate-700 mb-1">
                        8. Verrous restant ouverts pour l’exercice suivant
                      </label>
                      <textarea
                        rows={2}
                        value={formProject.unresolvedBarriers}
                        onChange={(e) => handleFieldChange('unresolvedBarriers', e.target.value)}
                        placeholder="Quelles questions scientifiques ou techniques n’ont pas encore trouvé de réponse ?"
                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 p-3 rounded-md flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-slate-800">
                        Les résultats sont-ils reproductibles et documentés ?
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Critère fondamental du Manuel de Frascati (Transférabilité / Reproductibilité).
                      </div>
                    </div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formProject.reproducibleResults}
                        onChange={(e) => handleFieldChange('reproducibleResults', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span className="text-xs font-medium text-slate-700">
                        {formProject.reproducibleResults ? 'Oui (Validé)' : 'Non'}
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Equipe & Valorisation */}
          {activeSubTab === 'equipe' && (
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-5 text-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Personnel de recherche et valorisation du temps passé
                  </h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">
                    L’assiette du CIR repose à 80% sur les salaires des chercheurs et techniciens de recherche (taux horaire et temps passé).
                  </p>
                </div>

                <button
                  onClick={handleAddTeamMember}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Ajouter un collaborateur</span>
                </button>
              </div>

              {/* Members Table */}
              <div className="border border-slate-200 rounded-md overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Nom & Prénom</th>
                      <th className="py-2.5 px-3">Rôle sur le projet</th>
                      <th className="py-2.5 px-3">Qualification</th>
                      <th className="py-2.5 px-3 text-right">Temps consacré (Jours)</th>
                      <th className="py-2.5 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {formProject.teamMembers.map((member, idx) => (
                      <tr key={member.id} className="hover:bg-slate-50/60">
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={member.name}
                            onChange={(e) => handleUpdateTeamMember(idx, 'name', e.target.value)}
                            placeholder="Nom du chercheur / ingénieur"
                            className="w-full px-2 py-1 border border-slate-200 rounded focus:border-blue-500 focus:outline-hidden"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <input
                            type="text"
                            value={member.role}
                            onChange={(e) => handleUpdateTeamMember(idx, 'role', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-200 rounded focus:border-blue-500 focus:outline-hidden"
                          />
                        </td>
                        <td className="py-2 px-3">
                          <select
                            value={member.qualification}
                            onChange={(e) => handleUpdateTeamMember(idx, 'qualification', e.target.value)}
                            className="w-full px-2 py-1 border border-slate-200 rounded focus:border-blue-500 focus:outline-hidden font-medium"
                          >
                            <option value="DOCTEUR">Docteur / PhD (Jeune docteur bonifié CIR)</option>
                            <option value="INGENIEUR">Ingénieur diplômé (Titre CTI ou Master 2)</option>
                            <option value="TECHNICIEN">Technicien de recherche</option>
                            <option value="AUTRE">Autre (attention : justification requise)</option>
                          </select>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <input
                            type="number"
                            min="0"
                            value={member.daysSpent}
                            onChange={(e) => handleUpdateTeamMember(idx, 'daysSpent', Number(e.target.value))}
                            className="w-20 px-2 py-1 border border-slate-200 rounded focus:border-blue-500 focus:outline-hidden text-right font-mono"
                          />
                        </td>
                        <td className="py-2 px-3 text-center">
                          <button
                            onClick={() => handleRemoveTeamMember(idx)}
                            className="text-slate-400 hover:text-red-600 p-1 rounded"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                    {formProject.teamMembers.length === 0 && (
                      <tr>
                        <td colSpan={5} className="py-6 text-center text-slate-400">
                          Aucun collaborateur rattaché pour le moment. Cliquez sur « Ajouter un collaborateur ».
                        </td>
                      </tr>
                    )}
                  </tbody>
                  <tfoot className="bg-slate-50 border-t border-slate-200 font-semibold text-slate-800">
                    <tr>
                      <td colSpan={3} className="py-2.5 px-3">
                        Total temps alloué au projet :
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-blue-700 font-bold">
                        {formProject.totalDaysSpent} jours
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              {/* Budget Estimation */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Budget R&D prévisionnel engagé (€)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formProject.estimatedBudget}
                      onChange={(e) => handleFieldChange('estimatedBudget', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono tabular-nums"
                    />
                    <Euro className="w-4 h-4 text-slate-400 absolute right-3 top-2.5" />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Assiette prévisionnelle des dépenses éligibles (salaires chargés, dotations aux amortissements, etc.)
                  </p>
                </div>

                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-slate-600 text-[11px] space-y-1">
                  <div className="font-semibold text-slate-800">
                    Règle fiscale sur le temps passé (CRA) :
                  </div>
                  <p>
                    L’administration fiscale exige la tenue contemporaine de relevés de temps signés (feuilles de temps ou CRA mensuels). Les forfaits déclaratifs a posteriori sont systématiquement rejetés lors d’un contrôle.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
