import React, { useState } from 'react';
import { Company, Project, DomainId } from '../../types';
import { ALL_DOMAINS, getDomainProfile } from '../../domains';
import { Sparkles, Plus, X } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  companies: Company[];
  selectedCompanyId: string;
  onAddProject: (project: Project) => void;
}

export const NewProjectModal: React.FC<NewProjectModalProps> = ({
  isOpen,
  onClose,
  companies,
  selectedCompanyId,
  onAddProject
}) => {
  const [name, setName] = useState('');
  const [companyId, setCompanyId] = useState(selectedCompanyId || companies[0]?.id || '');
  const [year, setYear] = useState(2025);
  const [lead, setLead] = useState('');
  const [description, setDescription] = useState('');
  const [primaryDomain, setPrimaryDomain] = useState<DomainId>('software');
  const [secondaryDisciplines, setSecondaryDisciplines] = useState<string[]>([]);
  const [newDisciplineInput, setNewDisciplineInput] = useState('');

  if (!isOpen) return null;

  const currentDomainProfile = getDomainProfile(primaryDomain);

  const handleToggleDiscipline = (disc: string) => {
    if (secondaryDisciplines.includes(disc)) {
      setSecondaryDisciplines(secondaryDisciplines.filter(d => d !== disc));
    } else {
      setSecondaryDisciplines([...secondaryDisciplines, disc]);
    }
  };

  const handleAddCustomDiscipline = () => {
    if (newDisciplineInput.trim() && !secondaryDisciplines.includes(newDisciplineInput.trim())) {
      setSecondaryDisciplines([...secondaryDisciplines, newDisciplineInput.trim()]);
      setNewDisciplineInput('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newProject: Project = {
      id: `proj-${Date.now()}`,
      companyId: companyId || companies[0]?.id,
      name,
      year: Number(year),
      projectLead: lead || 'Responsable R&D',
      startDate: `${year}-01-01`,
      endDate: `${year}-12-31`,
      primaryDomain,
      secondaryDisciplines,
      generalDescription: description,
      context: '',
      objectives: '',
      technologiesUsed: [],
      knownStateOfTheArt: '',
      difficultiesEncountered: '',
      workCarriedOut: '',
      experiments: '',
      results: '',
      problemToSolve: '',
      whyExistingSolutionsInsufficient: '',
      knowledgeLevelAtStart: '',
      canBeSolvedByStandardKnowledge: false,
      feasibilityUncertainty: '',
      hypothesesFormulated: '',
      quantitativeDataAvailable: '',
      newKnowledgeAcquired: '',
      reproducibleResults: true,
      unresolvedBarriers: '',
      teamMembers: [],
      totalDaysSpent: 0,
      estimatedBudget: 50000,
      cirDimensions: [
        {
          key: 'etatDeLart',
          title: 'État de l’art',
          score: 1,
          justification: `Recherche bibliographique et analyse des solutions antérieures en ${currentDomainProfile.shortLabel}.`,
          favorablePoints: [],
          unfavorablePoints: [],
          missingElements: ['Recherche bibliographique']
        },
        {
          key: 'verrou',
          title: 'Verrou scientifique ou technique',
          score: 1,
          justification: `Caractérisation des incertitudes techniques en ${currentDomainProfile.shortLabel}.`,
          favorablePoints: [],
          unfavorablePoints: [],
          missingElements: ['Définition de l’incertitude']
        },
        {
          key: 'incertitude',
          title: 'Incertitude',
          score: 1,
          justification: 'À évaluer.',
          favorablePoints: [],
          unfavorablePoints: [],
          missingElements: []
        },
        {
          key: 'demarche',
          title: 'Démarche expérimentale',
          score: 1,
          justification: `Protocoles d’essais et campagnes de tests prévus en ${currentDomainProfile.shortLabel}.`,
          favorablePoints: [],
          unfavorablePoints: [],
          missingElements: ['Protocoles d’essais']
        },
        {
          key: 'connaissances',
          title: 'Production de connaissances nouvelles',
          score: 1,
          justification: 'À préciser.',
          favorablePoints: [],
          unfavorablePoints: [],
          missingElements: []
        }
      ],
      frascatiCriteria: [
        { id: 'nouveaute', name: 'Nouveauté', definition: 'Acquisition de connaissances nouvelles.', score: 1, supportingElements: [], weakeningElements: [], missingInformation: [] },
        { id: 'creativite', name: 'Créativité', definition: 'Concepts ou hypothèses originaux.', score: 1, supportingElements: [], weakeningElements: [], missingInformation: [] },
        { id: 'incertitude', name: 'Incertitude', definition: 'Incertitude sur la faisabilité.', score: 1, supportingElements: [], weakeningElements: [], missingInformation: [] },
        { id: 'systematicite', name: 'Systématicité', definition: 'Démarche organisée et planifiée.', score: 1, supportingElements: [], weakeningElements: [], missingInformation: [] },
        { id: 'transferabilite', name: 'Transférabilité', definition: 'Résultats reproductibles.', score: 1, supportingElements: [], weakeningElements: [], missingInformation: [] }
      ],
      ciiAnalysis: {
        isPmeEligible: true,
        productName: name,
        productType: 'MIXTE',
        targetAudience: '',
        referenceMarket: '',
        competitorProducts: '',
        axes: [
          { axis: 'performancesTechniques', title: 'Performances techniques', productPerformance: '', competitorsPerformance: '', differential: '', evidenceAvailable: '', innovationLevel: 1 },
          { axis: 'fonctionnalites', title: 'Fonctionnalités', productPerformance: '', competitorsPerformance: '', differential: '', evidenceAvailable: '', innovationLevel: 1 },
          { axis: 'ergonomie', title: 'Ergonomie', productPerformance: '', competitorsPerformance: '', differential: '', evidenceAvailable: '', innovationLevel: 1 },
          { axis: 'ecoconception', title: 'Écoconception', productPerformance: '', competitorsPerformance: '', differential: '', evidenceAvailable: '', innovationLevel: 0 }
        ],
        prototypeStatus: {
          hasPrototype: false,
          prototypeType: 'AUCUN',
          description: '',
          userTestingDone: false,
          readyForMarket: false
        },
        overallScore: 3,
        potential: 'FAIBLE',
        justification: `Nouveau projet en cours d’initialisation (${currentDomainProfile.shortLabel}).`
      },
      evidences: [],
      missingInformation: [],
      smartInterviews: [],
      lastUpdated: new Date().toISOString().slice(0, 10)
    };

    onAddProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Initialiser un nouveau projet d’analyse
            </h3>
            <p className="text-[11px] text-slate-500">
              Sélectionnez le domaine scientifique et les disciplines associées.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-sm"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-medium text-slate-700 mb-1">Intitulé du projet *</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex : Conception d’une prothèse bionique ultra-légère"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Entreprise *</label>
              <select
                value={companyId}
                onChange={(e) => setCompanyId(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
              >
                {companies.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Année fiscale analysée *</label>
              <input
                type="number"
                required
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono"
              />
            </div>
          </div>

          {/* Domaine scientifique principal */}
          <div>
            <label className="block font-semibold text-slate-900 mb-1">
              Domaine scientifique ou technique principal *
            </label>
            <select
              value={primaryDomain}
              onChange={(e) => {
                const newDom = e.target.value as DomainId;
                setPrimaryDomain(newDom);
                // reset secondary disciplines to empty or suggested defaults
                setSecondaryDisciplines([]);
              }}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-medium text-slate-900 bg-slate-50"
            >
              {ALL_DOMAINS.map(d => (
                <option key={d.id} value={d.id}>
                  {d.label}
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1 italic">
              {currentDomainProfile.description}
            </p>
          </div>

          {/* Disciplines secondaires (Multidisciplinaire) */}
          <div>
            <label className="block font-medium text-slate-700 mb-1">
              Disciplines secondaires (projet multidisciplinaire)
            </label>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {currentDomainProfile.secondaryDisciplinesSuggestions.map(disc => {
                const isSelected = secondaryDisciplines.includes(disc);
                return (
                  <button
                    type="button"
                    key={disc}
                    onClick={() => handleToggleDiscipline(disc)}
                    className={`text-[10px] px-2 py-0.5 rounded transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {isSelected ? '✓ ' : '+ '}{disc}
                  </button>
                );
              })}
            </div>

            {/* Custom discipline input */}
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={newDisciplineInput}
                onChange={(e) => setNewDisciplineInput(e.target.value)}
                placeholder="Autre discipline (ex: biomécanique, optique...)"
                className="flex-1 px-2.5 py-1 text-xs border border-slate-300 rounded-md focus:outline-hidden"
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
                className="px-2 py-1 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-medium"
              >
                Ajouter
              </button>
            </div>

            {secondaryDisciplines.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1.5 text-[10px] text-slate-500">
                <span className="font-semibold text-slate-700">Sélectionnées :</span>
                {secondaryDisciplines.map(d => (
                  <span key={d} className="bg-blue-50 text-blue-700 px-1.5 py-0.2 rounded border border-blue-200 flex items-center gap-1">
                    {d}
                    <button type="button" onClick={() => handleToggleDiscipline(d)} className="hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Responsable technique ou scientifique</label>
            <input
              type="text"
              value={lead}
              onChange={(e) => setLead(e.target.value)}
              placeholder="Ex : Dr. Thomas Vasseur"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-medium text-slate-700 mb-1">Description préliminaire</label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Quelques lignes résumant l’ambition et les verrous du projet..."
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-600 hover:text-slate-800 font-medium"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-xs"
            >
              Créer et instruire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

