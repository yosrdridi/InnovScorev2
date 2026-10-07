import React, { useState, useEffect } from 'react';
import { Project, Company } from '../../types';
import { AlertTriangle, Trash2, X, FolderKanban, Building2 } from 'lucide-react';

/* -------------------------------------------------------------------------- */
/*                          DELETE PROJECT MODAL                              */
/* -------------------------------------------------------------------------- */

interface DeleteProjectModalProps {
  isOpen: boolean;
  project: Project | null;
  companyName?: string;
  onClose: () => void;
  onConfirm: (projectId: string) => void;
}

export const DeleteProjectModal: React.FC<DeleteProjectModalProps> = ({
  isOpen,
  project,
  companyName,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden text-slate-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-project-title"
      >
        {/* Header with warning icon */}
        <div className="p-6 pb-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 id="delete-project-title" className="text-base font-bold text-slate-900 leading-snug">
                Supprimer ce projet ?
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Cette action supprimera définitivement le projet ainsi que ses analyses CIR/CII, réponses, éléments de preuve, scores et synthèses associées.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
              aria-label="Fermer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Project Details Box */}
          <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs space-y-1.5">
            <div className="flex items-center gap-2 text-slate-500">
              <FolderKanban className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-semibold text-slate-800 truncate">{project.name}</span>
            </div>
            {companyName && (
              <div className="text-[11px] text-slate-500 pl-5">
                Entreprise : <span className="font-medium text-slate-700">{companyName}</span> ({project.year})
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
          >
            Annuler
          </button>
          <button
            type="button"
            onClick={() => onConfirm(project.id)}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-colors shadow-xs"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Supprimer définitivement</span>
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*                          DELETE COMPANY MODAL                              */
/* -------------------------------------------------------------------------- */

interface DeleteCompanyModalProps {
  isOpen: boolean;
  company: Company | null;
  projectsCount: number;
  projectNames: string[];
  onClose: () => void;
  onConfirm: (companyId: string) => void;
}

export const DeleteCompanyModal: React.FC<DeleteCompanyModalProps> = ({
  isOpen,
  company,
  projectsCount,
  projectNames,
  onClose,
  onConfirm
}) => {
  const [step, setStep] = useState<1 | 2>(1);

  // Reset step whenever modal re-opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);

  if (!isOpen || !company) return null;

  const hasProjects = projectsCount > 0;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden text-slate-900 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-company-title"
      >
        {/* Step 1: Initial check & warning */}
        {step === 1 && (
          <div>
            <div className="p-6 pb-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 id="delete-company-title" className="text-base font-bold text-slate-900 leading-snug">
                    Supprimer l’entreprise « {company.name} » ?
                  </h3>
                  
                  {hasProjects ? (
                    <div className="mt-2 space-y-2 text-xs">
                      <p className="font-semibold text-red-700 bg-red-50 border border-red-200 rounded p-2.5 leading-relaxed">
                        Cette entreprise contient {projectsCount} projet(s).<br />
                        La suppression de l’entreprise entraînera également la suppression de tous les projets et analyses associés.
                      </p>
                      <p className="text-slate-500">
                        Tous les dossiers d'audit, pièces justificatives et synthèses rattachés seront définitivement perdus.
                      </p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                      Cette entreprise ne contient actuellement aucun projet rattaché. Sa fiche et ses coordonnées seront supprimées.
                    </p>
                  )}
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Company & Projects list overview */}
              <div className="mt-4 p-3 bg-slate-50 border border-slate-200/80 rounded-lg text-xs space-y-2">
                <div className="flex items-center justify-between text-slate-700">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{company.name}</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">SIREN : {company.siren}</span>
                </div>

                {hasProjects && (
                  <div className="border-t border-slate-200 pt-2">
                    <div className="text-[11px] font-semibold text-slate-600 mb-1">
                      Projet(s) concerné(s) qui seront supprimé(s) ({projectsCount}) :
                    </div>
                    <ul className="space-y-1 max-h-28 overflow-y-auto pl-1">
                      {projectNames.map((name, i) => (
                        <li key={i} className="text-[11px] text-slate-600 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                          <span className="truncate">{name}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
              >
                Annuler
              </button>

              {hasProjects ? (
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-colors shadow-xs"
                >
                  <span>Continuer vers la confirmation</span>
                  <span aria-hidden="true">→</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onConfirm(company.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-colors shadow-xs"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Supprimer définitivement</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Second confirmation specifically required if projects exist */}
        {step === 2 && hasProjects && (
          <div>
            <div className="p-6 pb-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center shrink-0 text-white">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-800 uppercase tracking-wide mb-1">
                    Deuxième confirmation requise
                  </div>
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    Confirmer la suppression irréversible
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Vous êtes sur le point de supprimer définitivement <strong className="text-slate-900">{company.name}</strong> ainsi que <strong className="text-red-700 font-semibold">{projectsCount} projet(s)</strong> et l'intégralité de leurs analyses CIR / CII.
                  </p>
                  <p className="text-xs text-red-600 font-medium mt-2">
                    Cette opération ne peut pas être annulée.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md transition-colors"
                  aria-label="Fermer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Footer buttons */}
            <div className="px-6 py-4 bg-slate-50/80 border-t border-slate-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Revenir en arrière
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-100 transition-colors shadow-2xs"
                >
                  Annuler
                </button>
                <button
                  type="button"
                  onClick={() => onConfirm(company.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded-md transition-colors shadow-xs focus:ring-2 focus:ring-red-500 focus:outline-hidden"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Supprimer l’entreprise et ses {projectsCount} projet(s)</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
