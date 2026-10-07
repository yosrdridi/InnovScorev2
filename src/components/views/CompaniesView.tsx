import React, { useState } from 'react';
import { Company, Project } from '../../types';
import { 
  Building2, 
  Plus, 
  Users, 
  Calendar, 
  AlertCircle, 
  CheckCircle, 
  Briefcase, 
  FileSpreadsheet,
  MoreVertical,
  Trash2
} from 'lucide-react';

interface CompaniesViewProps {
  companies: Company[];
  projects: Project[];
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  onAddCompany: (company: Company) => void;
  onUpdateCompany: (company: Company) => void;
  onRequestDeleteCompany?: (company: Company) => void;
}

export const CompaniesView: React.FC<CompaniesViewProps> = ({
  companies,
  projects,
  selectedCompanyId,
  setSelectedCompanyId,
  onAddCompany,
  onUpdateCompany,
  onRequestDeleteCompany
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [openMenuCompanyId, setOpenMenuCompanyId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState<Partial<Company>>({
    name: '',
    siren: '',
    naf: '',
    size: 'PETITE',
    fiscalYearEnd: '31/12/2025',
    sector: '',
    rdTeamSize: 5,
    contactName: '',
    contactEmail: '',
    notes: ''
  });

  const handleOpenAdd = () => {
    setEditingCompany(null);
    setFormData({
      name: '',
      siren: '',
      naf: '72.19Z - Recherche-développement en autres sciences',
      size: 'PETITE',
      fiscalYearEnd: '31/12/2025',
      sector: '',
      rdTeamSize: 5,
      contactName: '',
      contactEmail: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (comp: Company) => {
    setEditingCompany(comp);
    setFormData({ ...comp });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.siren) return;

    if (editingCompany) {
      onUpdateCompany({
        ...editingCompany,
        ...formData
      } as Company);
    } else {
      const newCompany: Company = {
        id: `comp-${Date.now()}`,
        name: formData.name || 'Nouvelle Entreprise',
        siren: formData.siren || '',
        naf: formData.naf || '',
        size: formData.size || 'PETITE',
        fiscalYearEnd: formData.fiscalYearEnd || '31/12/2025',
        sector: formData.sector || '',
        rdTeamSize: Number(formData.rdTeamSize) || 0,
        contactName: formData.contactName || '',
        contactEmail: formData.contactEmail || '',
        notes: formData.notes || ''
      };
      onAddCompany(newCompany);
      setSelectedCompanyId(newCompany.id);
    }
    setIsModalOpen(false);
  };

  const isPme = (size: string) => ['MICRO', 'PETITE', 'MOYENNE'].includes(size);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Entreprises clientes et entités déclérantes
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Gérez les entreprises, vérifiez le critère PME pour le CII et rattachez les projets R&D / Innovation.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-md transition-colors shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter une entreprise</span>
        </button>
      </div>

      {/* Companies List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {companies.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-lg mx-auto space-y-4 shadow-xs col-span-full">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Aucune entreprise enregistrée</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Toutes les entreprises ont été supprimées. Créez une entreprise déclarante pour pouvoir instruire vos projets.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Créer une entreprise</span>
            </button>
          </div>
        ) : (
          companies.map((company) => {
          const compProjects = projects.filter(p => p.companyId === company.id);
          const isSelected = company.id === selectedCompanyId;
          const pmeStatus = isPme(company.size);

          return (
            <div
              key={company.id}
              onClick={() => setSelectedCompanyId(company.id)}
              className={`bg-white border rounded-lg p-5 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'border-blue-500 ring-1 ring-blue-500 shadow-xs'
                  : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                      {company.name}
                    </h3>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">
                      SIREN : {company.siren}
                    </div>
                  </div>

                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                    pmeStatus 
                      ? 'text-emerald-700 bg-emerald-50 border-emerald-200' 
                      : 'text-amber-800 bg-amber-50 border-amber-200'
                  }`}>
                    {company.size} {pmeStatus ? '(Éligible CII)' : '(Non-PME : Exclue CII)'}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-slate-600 my-4 border-t border-b border-slate-100 py-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Secteur :</span>
                    <span className="font-medium text-slate-800 text-right truncate max-w-[170px]">
                      {company.sector || 'Non renseigné'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Code NAF :</span>
                    <span className="font-mono text-slate-700 text-right truncate max-w-[170px]">
                      {company.naf}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Effectif R&D :</span>
                    <span className="font-semibold text-slate-800 tabular-nums">
                      {company.rdTeamSize} collaborateurs
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Clôture fiscale :</span>
                    <span className="text-slate-700 font-mono">
                      {company.fiscalYearEnd}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Contact :</span>
                    <span className="text-slate-700 truncate max-w-[170px]">
                      {company.contactName}
                    </span>
                  </div>
                </div>

                {company.notes && (
                  <p className="text-[11px] text-slate-500 italic line-clamp-2">
                    « {company.notes} »
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {compProjects.length} projet(s) instruit(s)
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpenEdit(company);
                    }}
                    className="text-xs text-slate-600 hover:text-slate-900 font-medium px-2 py-1 rounded hover:bg-slate-100"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCompanyId(company.id);
                    }}
                    className={`text-xs font-semibold px-2.5 py-1 rounded transition-colors ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isSelected ? 'Sélectionnée' : 'Sélectionner'}
                  </button>

                  {onRequestDeleteCompany && (
                    <div className="relative">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenMenuCompanyId(openMenuCompanyId === company.id ? null : company.id);
                        }}
                        className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        aria-label="Actions pour cette entreprise"
                        title="Actions"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>

                      {openMenuCompanyId === company.id && (
                        <div
                          onClick={(e) => e.stopPropagation()}
                          className="absolute right-0 bottom-full mb-1 w-48 bg-white border border-slate-200 rounded-md shadow-md py-1 z-30 text-xs"
                        >
                          <button
                            onClick={() => {
                              setOpenMenuCompanyId(null);
                              handleOpenEdit(company);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-slate-700 flex items-center gap-2"
                          >
                            <Building2 className="w-3.5 h-3.5 text-slate-400" />
                            <span>Modifier l'entreprise</span>
                          </button>
                          <div className="my-1 border-t border-slate-100"></div>
                          <button
                            onClick={() => {
                              setOpenMenuCompanyId(null);
                              onRequestDeleteCompany(company);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-red-50 text-red-600 flex items-center gap-2 font-medium transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-500" />
                            <span>Supprimer l’entreprise</span>
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })
      )}
      </div>

      {/* Legal Explanatory Note on PME and CII */}
      <div className="bg-slate-100/80 border border-slate-200 rounded-lg p-4 text-xs text-slate-600 space-y-1.5">
        <div className="font-semibold text-slate-900 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 text-blue-600" />
          Rappel réglementaire : Qualification PME au sens européen (CII)
        </div>
        <p className="leading-relaxed">
          Le <strong>Crédit Impôt Innovation (CII)</strong> est strictement réservé aux <strong>PME</strong> (effectif &lt; 250 personnes ET soit chiffre d’affaires &lt; 50 M€, soit total de bilan &lt; 43 M€). Si l’entreprise est détenue à plus de 25% par un groupe (ETI ou GE), ses seuils doivent être consolidés. Les ETI et Grandes Entreprises sont exclues du CII mais restent pleinement éligibles au <strong>CIR</strong>.
        </p>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                {editingCompany ? 'Modifier l’entreprise' : 'Nouvelle entreprise cliente'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Raison sociale *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ex : BioMedix Solutions SAS"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Numéro SIREN *</label>
                  <input
                    type="text"
                    required
                    value={formData.siren || ''}
                    onChange={(e) => setFormData({ ...formData, siren: e.target.value })}
                    placeholder="Ex : 812 345 678"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Catégorie d’entreprise *</label>
                  <select
                    value={formData.size || 'PETITE'}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="MICRO">Microentreprise (&lt; 10 salariés) - Éligible CII</option>
                    <option value="PETITE">Petite entreprise (&lt; 50 salariés) - Éligible CII</option>
                    <option value="MOYENNE">Moyenne entreprise (&lt; 250 salariés) - Éligible CII</option>
                    <option value="ETI">ETI (&gt; 250 salariés) - Exclue CII (CIR uniquement)</option>
                    <option value="GRANDE">Grande Entreprise - Exclue CII (CIR uniquement)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Code NAF / APE</label>
                  <input
                    type="text"
                    value={formData.naf || ''}
                    onChange={(e) => setFormData({ ...formData, naf: e.target.value })}
                    placeholder="Ex : 72.19Z"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Date de clôture fiscale</label>
                  <input
                    type="text"
                    value={formData.fiscalYearEnd || '31/12/2025'}
                    onChange={(e) => setFormData({ ...formData, fiscalYearEnd: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Secteur d’activité</label>
                <input
                  type="text"
                  value={formData.sector || ''}
                  onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                  placeholder="Ex : Biotech, Chimie des polymères, SaaS DeepTech..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Effectif affecté à la R&D</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.rdTeamSize ?? 1}
                    onChange={(e) => setFormData({ ...formData, rdTeamSize: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Contact référent / DAF</label>
                  <input
                    type="text"
                    value={formData.contactName || ''}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Nom du dirigeant ou DAF"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 text-slate-600 hover:text-slate-800 font-medium"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md shadow-xs"
                >
                  {editingCompany ? 'Enregistrer les modifications' : 'Créer l’entreprise'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
