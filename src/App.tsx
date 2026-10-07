/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Company, Project } from './types';
import { INITIAL_COMPANIES, INITIAL_PROJECTS } from './data/mockData';
import { calculateAuditSynthesis } from './utils/analysisEngine';
import { Sidebar, ActiveTab } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './components/views/DashboardView';
import { CompaniesView } from './components/views/CompaniesView';
import { ProjectsView } from './components/views/ProjectsView';
import { CIRAnalysisView } from './components/views/CIRAnalysisView';
import { CIIAnalysisView } from './components/views/CIIAnalysisView';
import { MatrixView } from './components/views/MatrixView';
import { MissingInfoView } from './components/views/MissingInfoView';
import { SmartQuestionsView } from './components/views/SmartQuestionsView';
import { EvidencesView } from './components/views/EvidencesView';
import { SynthesisView } from './components/views/SynthesisView';
import { ReportExportView } from './components/views/ReportExportView';
import { NewProjectModal } from './components/modals/NewProjectModal';
import { DeleteProjectModal, DeleteCompanyModal } from './components/modals/DeleteModals';
import { CheckCircle2, X } from 'lucide-react';

export default function App() {
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(INITIAL_COMPANIES[0].id);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(INITIAL_PROJECTS[0].id);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Deletion modals state
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [companyToDelete, setCompanyToDelete] = useState<Company | null>(null);

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Active Company & Project
  const currentCompany = companies.find(c => c.id === selectedCompanyId) || companies[0];
  const currentProject = projects.find(p => p.id === selectedProjectId) || projects[0];

  // When changing project, also sync company if needed
  const handleSelectProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    const proj = projects.find(p => p.id === projectId);
    if (proj && proj.companyId !== selectedCompanyId) {
      setSelectedCompanyId(proj.companyId);
    }
  };

  // Company management
  const handleAddCompany = (newCompany: Company) => {
    setCompanies(prev => [newCompany, ...prev]);
    setSelectedCompanyId(newCompany.id);
  };

  const handleUpdateCompany = (updated: Company) => {
    setCompanies(prev => prev.map(c => c.id === updated.id ? updated : c));
  };

  // Project management
  const handleAddProject = (newProject: Project) => {
    setProjects(prev => [newProject, ...prev]);
    setSelectedProjectId(newProject.id);
    setSelectedCompanyId(newProject.companyId);
    setActiveTab('projects');
  };

  const handleUpdateProject = (updated: Project) => {
    setProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  // Safe Deletion Handlers
  const handleDeleteProject = (projectId: string) => {
    setProjects(prev => {
      const remaining = prev.filter(p => p.id !== projectId);
      if (selectedProjectId === projectId) {
        if (remaining.length > 0) {
          setSelectedProjectId(remaining[0].id);
          setSelectedCompanyId(remaining[0].companyId);
        } else {
          setSelectedProjectId('');
        }
      }
      return remaining;
    });

    setProjectToDelete(null);
    setToastMessage('Projet supprimé avec succès');
  };

  const handleDeleteCompany = (companyId: string) => {
    // 1. Delete company
    setCompanies(prev => {
      const remaining = prev.filter(c => c.id !== companyId);
      if (selectedCompanyId === companyId) {
        if (remaining.length > 0) {
          setSelectedCompanyId(remaining[0].id);
        } else {
          setSelectedCompanyId('');
        }
      }
      return remaining;
    });

    // 2. Cascade delete all projects belonging to this company to prevent orphaned references
    setProjects(prev => {
      const remaining = prev.filter(p => p.companyId !== companyId);
      const activeProj = prev.find(p => p.id === selectedProjectId);
      if (activeProj && activeProj.companyId === companyId) {
        if (remaining.length > 0) {
          setSelectedProjectId(remaining[0].id);
        } else {
          setSelectedProjectId('');
        }
      }
      return remaining;
    });

    setCompanyToDelete(null);
    setToastMessage('Entreprise supprimée avec succès');
  };

  // Calculate synthesis for current project
  const isPme = currentCompany ? ['MICRO', 'PETITE', 'MOYENNE'].includes(currentCompany.size) : true;
  const currentSynthesis = currentProject ? calculateAuditSynthesis(currentProject, isPme) : undefined;

  // Unresolved items count across active project
  const unresolvedMissingCount = currentProject 
    ? (currentProject.missingInformation.length > 0 
        ? currentProject.missingInformation.filter(m => !m.resolved).length 
        : currentSynthesis?.missingInfoCount || 0)
    : 0;

  const criticalAlertCount = currentSynthesis?.engineeringAlertCount || 0;

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        unresolvedMissingCount={unresolvedMissingCount}
        criticalAlertCount={criticalAlertCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <Header
          companies={companies}
          projects={projects}
          selectedCompanyId={selectedCompanyId}
          selectedProjectId={selectedProjectId}
          setSelectedCompanyId={setSelectedCompanyId}
          setSelectedProjectId={handleSelectProject}
          activeTab={activeTab}
          currentSynthesis={currentSynthesis}
          onNewProjectClick={() => setIsNewProjectModalOpen(true)}
          onToggleMobileMenu={() => setIsMobileSidebarOpen(prev => !prev)}
        />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                companies={companies}
                projects={projects}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={handleSelectProject}
                setActiveTab={setActiveTab}
                onNewProjectClick={() => setIsNewProjectModalOpen(true)}
                onRequestDeleteProject={(proj) => setProjectToDelete(proj)}
              />
            )}

            {activeTab === 'companies' && (
              <CompaniesView
                companies={companies}
                projects={projects}
                selectedCompanyId={selectedCompanyId}
                setSelectedCompanyId={setSelectedCompanyId}
                onAddCompany={handleAddCompany}
                onUpdateCompany={handleUpdateCompany}
                onRequestDeleteCompany={(comp) => setCompanyToDelete(comp)}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsView
                companies={companies}
                projects={projects}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={handleSelectProject}
                onUpdateProject={handleUpdateProject}
                onNewProjectClick={() => setIsNewProjectModalOpen(true)}
                setActiveTab={setActiveTab}
                onRequestDeleteProject={(proj) => setProjectToDelete(proj)}
              />
            )}

            {activeTab === 'cir' && currentProject && (
              <CIRAnalysisView
                project={currentProject}
                onUpdateProject={handleUpdateProject}
              />
            )}

            {activeTab === 'cii' && currentProject && currentCompany && (
              <CIIAnalysisView
                project={currentProject}
                company={currentCompany}
                onUpdateProject={handleUpdateProject}
              />
            )}

            {activeTab === 'matrix' && (
              <MatrixView
                companies={companies}
                projects={projects}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={handleSelectProject}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'missing' && currentProject && (
              <MissingInfoView
                project={currentProject}
                onUpdateProject={handleUpdateProject}
              />
            )}

            {activeTab === 'questions' && currentProject && (
              <SmartQuestionsView
                project={currentProject}
                onUpdateProject={handleUpdateProject}
              />
            )}

            {activeTab === 'evidences' && currentProject && (
              <EvidencesView
                project={currentProject}
                onUpdateProject={handleUpdateProject}
              />
            )}

            {activeTab === 'synthesis' && currentProject && currentCompany && (
              <SynthesisView
                project={currentProject}
                company={currentCompany}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'export' && currentProject && currentCompany && (
              <ReportExportView
                project={currentProject}
                company={currentCompany}
              />
            )}
          </div>
        </main>
      </div>

      {/* New Project Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        companies={companies}
        selectedCompanyId={selectedCompanyId}
        onAddProject={handleAddProject}
      />

      {/* Project Deletion Confirmation Modal */}
      <DeleteProjectModal
        isOpen={!!projectToDelete}
        project={projectToDelete}
        companyName={companies.find(c => c.id === projectToDelete?.companyId)?.name}
        onClose={() => setProjectToDelete(null)}
        onConfirm={handleDeleteProject}
      />

      {/* Company Deletion Confirmation Modal */}
      <DeleteCompanyModal
        isOpen={!!companyToDelete}
        company={companyToDelete}
        projectsCount={companyToDelete ? projects.filter(p => p.companyId === companyToDelete.id).length : 0}
        projectNames={companyToDelete ? projects.filter(p => p.companyId === companyToDelete.id).map(p => p.name) : []}
        onClose={() => setCompanyToDelete(null)}
        onConfirm={handleDeleteCompany}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white px-4 py-3 rounded-lg shadow-xl border border-slate-700 animate-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button 
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white ml-2 transition-colors"
            aria-label="Fermer la notification"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
