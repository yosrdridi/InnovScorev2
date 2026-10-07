import React, { useState, useEffect } from 'react';
import { Project, EvidenceItem } from '../../types';
import { getDomainProfile } from '../../domains';
import { 
  Paperclip, 
  Plus, 
  ShieldCheck, 
  FileText, 
  GitBranch, 
  FlaskConical, 
  CheckCircle2, 
  AlertTriangle, 
  Calendar, 
  User, 
  Trash2,
  ExternalLink,
  Sparkles,
  BookmarkCheck
} from 'lucide-react';

interface EvidencesViewProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

export const EvidencesView: React.FC<EvidencesViewProps> = ({
  project,
  onUpdateProject
}) => {
  const [evidences, setEvidences] = useState<EvidenceItem[]>(project.evidences || []);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState<string>('ALL');

  const domainProfile = getDomainProfile(project.primaryDomain || 'software');

  useEffect(() => {
    setEvidences(project.evidences || []);
  }, [project.id]);

  // Form State
  const [formData, setFormData] = useState<Partial<EvidenceItem>>({
    title: '',
    type: 'RAPPORT_ESSAIS',
    date: new Date().toISOString().slice(0, 10),
    author: '',
    associatedClaim: '',
    reliability: 'SOLIDE',
    urlOrRef: '',
    comments: ''
  });

  const handleOpenModalWithTemplate = (title: string, claimSuggestion: string, type: EvidenceItem['type'] = 'RAPPORT_ESSAIS') => {
    setFormData({
      title,
      type,
      date: new Date().toISOString().slice(0, 10),
      author: project.projectLead || 'Équipe R&D',
      associatedClaim: claimSuggestion,
      reliability: 'SOLIDE',
      urlOrRef: '',
      comments: `Preuve type recommandée pour le domaine ${domainProfile.shortLabel}.`
    });
    setIsModalOpen(true);
  };

  const handleAddEvidence = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.associatedClaim) return;

    const newEvidence: EvidenceItem = {
      id: `ev-${Date.now()}`,
      projectId: project.id,
      title: formData.title || '',
      type: formData.type || 'DOCUMENTATION_TECHNIQUE',
      date: formData.date || new Date().toISOString().slice(0, 10),
      author: formData.author || 'Équipe R&D',
      associatedClaim: formData.associatedClaim || '',
      reliability: formData.reliability || 'SOLIDE',
      urlOrRef: formData.urlOrRef || '',
      comments: formData.comments || ''
    };

    const updated = [newEvidence, ...evidences];
    setEvidences(updated);
    onUpdateProject({ ...project, evidences: updated });
    setIsModalOpen(false);
    setFormData({
      title: '',
      type: 'RAPPORT_ESSAIS',
      date: new Date().toISOString().slice(0, 10),
      author: '',
      associatedClaim: '',
      reliability: 'SOLIDE',
      urlOrRef: '',
      comments: ''
    });
  };

  const handleDeleteEvidence = (id: string) => {
    const updated = evidences.filter(e => e.id !== id);
    setEvidences(updated);
    onUpdateProject({ ...project, evidences: updated });
  };

  const filteredEvidences = evidences.filter(e => {
    return typeFilter === 'ALL' || e.type === typeFilter;
  });

  const solidCount = evidences.filter(e => e.reliability === 'SOLIDE').length;
  const modCount = evidences.filter(e => e.reliability === 'MODEREE').length;
  const weakCount = evidences.filter(e => e.reliability === 'FAIBLE').length;

  const getTypeLabel = (type: EvidenceItem['type']) => {
    switch (type) {
      case 'DOCUMENTATION_TECHNIQUE': return 'Documentation technique';
      case 'RAPPORT_ESSAIS': return 'Rapport d’essais / mesures';
      case 'BENCHMARK': return 'Benchmark comparatif';
      case 'PUBLICATION_SCIENTIFIQUE': return 'Publication scientifique / Brevet';
      case 'JIRA_GIT': return 'Tickets Jira / Commits Git';
      case 'PROTOTYPE': return 'Photos / Maquette / Prototype';
      case 'CAHIER_LABO': return 'Cahier de laboratoire (ELN)';
      case 'COMPTE_RENDU_REUNION': return 'Compte-rendu de R&D daté';
      case 'FEUILLES_TEMPS': return 'Feuilles de temps signées (CRA)';
      case 'PLANS_CAO': return 'Plans CAO & Tolérancement';
      case 'DONNEES_BRUTES_MESURES': return 'Données brutes de métrologie / logs';
      case 'ANALYSES_PHYSICO_CHIMIQUES': return 'Analyses physico-chimiques / RMN / RX';
      case 'PROTOCOLE_BIOLOGIQUE': return 'Protocole biologique & culture';
      case 'RAPPORT_ACV': return 'Rapport d’analyse cycle de vie (ACV)';
      case 'HOMOLOGATION_NORMES': return 'Certificat de conformité / essais normés';
      default: return type;
    }
  };

  const getReliabilityBadge = (rel: EvidenceItem['reliability']) => {
    switch (rel) {
      case 'SOLIDE':
        return <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded text-[10px] font-bold">Solide (Horodaté / Tiers)</span>;
      case 'MODEREE':
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 px-2 py-0.5 rounded text-[10px] font-bold">Modérée (Interne daté)</span>;
      default:
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[10px] font-bold">Faible (Déclaratif)</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            <Paperclip className="w-4 h-4 text-blue-600" />
            Force Probante & Traçabilité Contemporaine · {domainProfile.shortLabel}
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Registre des éléments de preuve et pièces justificatives
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Projet : <strong className="text-slate-800">{project.name}</strong> · {evidences.length} pièce(s) répertoriée(s)
          </p>
        </div>

        <button
          onClick={() => {
            setFormData({
              title: '',
              type: 'RAPPORT_ESSAIS',
              date: new Date().toISOString().slice(0, 10),
              author: project.projectLead || 'Équipe R&D',
              associatedClaim: '',
              reliability: 'SOLIDE',
              urlOrRef: '',
              comments: ''
            });
            setIsModalOpen(true);
          }}
          className="flex items-center gap-1.5 px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-md shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter une pièce de preuve</span>
        </button>
      </div>

      {/* Domain Evidence Guidance Banner */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <BookmarkCheck className="w-4 h-4 text-blue-600" />
            <span>Pièces de preuve fortement recommandées en {domainProfile.label} :</span>
          </div>
          <span className="text-[11px] text-slate-500">
            Cliquez pour créer directement la pièce dans le registre
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {domainProfile.terminology.expectedEvidenceTypes.map((evidenceSuggestion, idx) => (
            <div
              key={idx}
              className="bg-white p-2.5 rounded border border-slate-200 hover:border-blue-300 transition-colors flex items-start justify-between gap-2 shadow-2xs"
            >
              <div className="space-y-0.5 min-w-0">
                <div className="font-semibold text-slate-800 text-[11px] leading-tight">
                  {evidenceSuggestion}
                </div>
                <div className="text-[10px] text-slate-400">
                  Attendu lors des contrôles fiscaux MESR
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleOpenModalWithTemplate(
                  evidenceSuggestion,
                  `Justification contemporaine des expérimentations en ${domainProfile.shortLabel}`,
                  idx === 0 ? 'RAPPORT_ESSAIS' : idx === 1 ? 'DONNEES_BRUTES_MESURES' : 'DOCUMENTATION_TECHNIQUE'
                )}
                className="shrink-0 text-[10px] font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2 py-1 rounded transition-colors"
                title="Pré-remplir et enregistrer"
              >
                + Ajouter
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quality of Evidence Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-medium mb-1">Total pièces inventoriées</div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">{evidences.length}</div>
          <div className="text-[11px] text-slate-400 mt-0.5">Classeur d’audit fiscal</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-medium mb-1">Preuves solides</div>
          <div className="text-2xl font-bold text-emerald-700 tabular-nums">{solidCount}</div>
          <div className="text-[11px] text-emerald-600 mt-0.5">Rapports mesurés, tiers, logs</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-medium mb-1">Preuves modérées</div>
          <div className="text-2xl font-bold text-blue-700 tabular-nums">{modCount}</div>
          <div className="text-[11px] text-blue-600 mt-0.5">Notes internes datées</div>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs">
          <div className="text-slate-500 text-xs font-medium mb-1">Preuves faibles</div>
          <div className="text-2xl font-bold text-amber-700 tabular-nums">{weakCount}</div>
          <div className="text-[11px] text-amber-600 mt-0.5">Déclaratifs non consolidés</div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 font-medium">Filtrer par type :</span>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1 text-slate-800 bg-white focus:outline-hidden text-xs"
          >
            <option value="ALL">Tous les types ({evidences.length})</option>
            <option value="RAPPORT_ESSAIS">Rapports d’essais / mesures</option>
            <option value="PUBLICATION_SCIENTIFIQUE">Publications scientifiques / brevets</option>
            <option value="DONNEES_BRUTES_MESURES">Données brutes de métrologie</option>
            <option value="CAHIER_LABO">Cahier de laboratoire (ELN)</option>
            <option value="PLANS_CAO">Plans CAO / tolérancement</option>
            <option value="ANALYSES_PHYSICO_CHIMIQUES">Analyses physico-chimiques</option>
            <option value="PROTOCOLE_BIOLOGIQUE">Protocoles biologiques</option>
            <option value="JIRA_GIT">Tickets Jira & Git</option>
            <option value="BENCHMARK">Benchmarks</option>
            <option value="DOCUMENTATION_TECHNIQUE">Documentation technique</option>
            <option value="FEUILLES_TEMPS">Feuilles de temps (CRA)</option>
            <option value="HOMOLOGATION_NORMES">Homologation & normes</option>
          </select>
        </div>

        <div className="text-slate-400 text-[11px]">
          Conforme à la doctrine ministérielle (articles R. 45 B-1 et suivants du LPF)
        </div>
      </div>

      {/* Evidence Table */}
      <div className="bg-white border border-slate-200 rounded-lg overflow-hidden shadow-xs">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 font-semibold text-slate-600">
            <tr>
              <th className="py-3 px-4">Titre du document & Référence</th>
              <th className="py-3 px-4">Affirmation clé soutenue</th>
              <th className="py-3 px-4">Type</th>
              <th className="py-3 px-4">Date & Auteur</th>
              <th className="py-3 px-4">Force probante</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredEvidences.length > 0 ? (
              filteredEvidences.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900">{item.title}</div>
                    {item.urlOrRef && (
                      <div className="text-[11px] text-slate-500 font-mono flex items-center gap-1 mt-0.5">
                        <ExternalLink className="w-3 h-3 text-slate-400" />
                        <span>{item.urlOrRef}</span>
                      </div>
                    )}
                    {item.comments && (
                      <div className="text-[11px] text-slate-500 italic mt-0.5">{item.comments}</div>
                    )}
                  </td>
                  <td className="py-3 px-4 text-slate-700 max-w-xs">
                    <span className="font-medium text-slate-900">« {item.associatedClaim} »</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200">
                      {getTypeLabel(item.type)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 text-[11px]">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-slate-400" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <User className="w-3 h-3 text-slate-400" />
                      <span>{item.author}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    {getReliabilityBadge(item.reliability)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => handleDeleteEvidence(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                      title="Supprimer la pièce"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-400">
                  <FileText className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                  Aucune pièce de preuve ne correspond aux filtres sélectionnés.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Add Evidence */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl border border-slate-200 max-w-lg w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Enregistrer une pièce justificative ({domainProfile.shortLabel})
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEvidence} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Titre de la pièce / Libellé *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ex : Rapport d’essais comparatifs de traction et fatigue"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Typologie de document *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as EvidenceItem['type'] })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="RAPPORT_ESSAIS">Rapport d’essais / mesures</option>
                    <option value="PUBLICATION_SCIENTIFIQUE">Publication scientifique / Brevet</option>
                    <option value="DONNEES_BRUTES_MESURES">Données brutes de métrologie</option>
                    <option value="CAHIER_LABO">Cahier de laboratoire (ELN)</option>
                    <option value="PLANS_CAO">Plans CAO / tolérancement</option>
                    <option value="ANALYSES_PHYSICO_CHIMIQUES">Analyses physico-chimiques</option>
                    <option value="PROTOCOLE_BIOLOGIQUE">Protocoles biologiques</option>
                    <option value="JIRA_GIT">Tickets Jira & Git</option>
                    <option value="BENCHMARK">Benchmark comparatif</option>
                    <option value="DOCUMENTATION_TECHNIQUE">Documentation technique</option>
                    <option value="FEUILLES_TEMPS">Feuilles de temps (CRA)</option>
                    <option value="HOMOLOGATION_NORMES">Homologation & normes</option>
                  </select>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">Force probante *</label>
                  <select
                    value={formData.reliability}
                    onChange={(e) => setFormData({ ...formData, reliability: e.target.value as EvidenceItem['reliability'] })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  >
                    <option value="SOLIDE">Solide (Horodaté, tiers, mesurable)</option>
                    <option value="MODEREE">Modérée (Document interne daté)</option>
                    <option value="FAIBLE">Faible (Déclaratif non étayé)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Affirmation clé soutenue par ce document *</label>
                <input
                  type="text"
                  required
                  value={formData.associatedClaim}
                  onChange={(e) => setFormData({ ...formData, associatedClaim: e.target.value })}
                  placeholder="Ex : Gain de +8.4 dB de SNR et latence < 10 ms prouvés"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Date d’émission / Horodatage</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Auteur / Responsable de la mesure</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Ex : Dr. Vasseur / Laboratoire certifié"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Référence d’archivage / Lien réseau interne</label>
                <input
                  type="text"
                  value={formData.urlOrRef}
                  onChange={(e) => setFormData({ ...formData, urlOrRef: e.target.value })}
                  placeholder="Ex : REF-DOC-2025-09-ESSAIS.pdf ou chemin serveur"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Commentaires et portée pour le contrôleur</label>
                <textarea
                  rows={2}
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  placeholder="Préciser en quoi ce document est irréfutable en cas d’audit..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden"
                />
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
                  Enregistrer la pièce
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
