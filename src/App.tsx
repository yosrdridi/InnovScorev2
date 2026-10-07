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

export default function App() {
  const [companies, setCompanies] = useState<Company[]>(INITIAL_COMPANIES);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>(INITIAL_COMPANIES[0].id);
  const [selectedProjectId, setSelectedProjectId] = useState<string>(INITIAL_PROJECTS[0].id);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState(false);

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
        />

        {/* Viewport Content */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'dashboard' && (
              <DashboardView
                companies={companies}
                projects={projects}
                selectedProjectId={selectedProjectId}
                setSelectedProjectId={handleSelectProject}
                setActiveTab={setActiveTab}
                onNewProjectClick={() => setIsNewProjectModalOpen(true)}
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
    </div>
  );
}
