import React, { useState } from 'react';
import { Project, Company } from '../../types';
import { calculateAuditSynthesis } from '../../utils/analysisEngine';
import { getDomainProfile } from '../../domains';
import { 
  Printer, 
  Download, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Building, 
  Calendar,
  Layers,
  FlaskConical,
  Sparkles
} from 'lucide-react';

interface ReportExportViewProps {
  project: Project;
  company: Company;
}

export const ReportExportView: React.FC<ReportExportViewProps> = ({
  project,
  company
}) => {
  const isPme = ['MICRO', 'PETITE', 'MOYENNE'].includes(company.size);
  const synthesis = calculateAuditSynthesis(project, isPme);
  const domainProfile = getDomainProfile(project.primaryDomain || 'software');
  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      company,
      project,
      synthesis,
      domainProfile: {
        id: domainProfile.id,
        label: domainProfile.label,
        shortLabel: domainProfile.shortLabel
      },
      exportedAt: new Date().toISOString()
    }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `AUDIT-CIR-CII-${project.name.replace(/\s+/g, '_')}-${project.year}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const generateMarkdownReport = () => {
    return `# RAPPORT DE QUALIFICATION FISCALE PRÉLIMINAIRE CIR / CII
**Entreprise :** ${company.name} (SIREN : ${company.siren})
**Projet :** ${project.name}
**Année Fiscale :** ${project.year}
**Domaine Principal :** ${domainProfile.label}
**Disciplines Secondaires :** ${(project.secondaryDisciplines || []).join(', ') || 'Aucune'}
**Date du diagnostic :** ${new Date().toLocaleDateString('fr-FR')}

---

## 1. SYNTHÈSE EXÉCUTIVE D'ÉLIGIBILITÉ
- **Potentiel CIR :** ${synthesis.cirPotential} (Score 5 dimensions : ${synthesis.cirScoreTotal.toFixed(1)}/5 | Frascati : ${synthesis.frascatiScoreTotal.toFixed(1)}/5)
- **Potentiel CII :** ${synthesis.ciiPotential} (Score 4 axes : ${synthesis.ciiScoreTotal.toFixed(1)}/5 | Statut PME : ${isPme ? 'Conforme' : 'NON ÉLIGIBLE'})
- **Positionnement Recommandé :** ${synthesis.matrixPosition}
- **Niveau de Confiance de l'Audit :** ${synthesis.confidence}

---

## 2. QUALIFICATION DE LA R&D (CRITÈRES CIR & MANUEL DE FRASCATI)
### A. Domaine Scientifique & Contexte
Domaine principal : ${domainProfile.label}
Disciplines associées : ${(project.secondaryDisciplines || []).join(', ') || 'Non spécifié'}

### B. État de l'art (${project.cirDimensions[0]?.score}/5)
${project.knownStateOfTheArt || 'Non documenté'}

### C. Verrou Scientifique ou Technique (${project.cirDimensions[1]?.score}/5)
${project.difficultiesEncountered || 'Non documenté'}

### D. Démarche Expérimentale (${project.cirDimensions[3]?.score}/5)
${project.experiments || 'Non documenté'}

### E. Résultats et Nouvelles Connaissances (${project.cirDimensions[4]?.score}/5)
${project.results || 'Non documenté'}

---

## 3. ÉLÉMENTS DE PREUVE & PIÈCES JUSTIFICATIVES
${project.evidences.map(e => `- [${e.reliability}] **${e.title}** (${e.type}) - ${e.date} : "${e.associatedClaim}"`).join('\n')}

---

## 4. ACTIONS RECOMMANDÉES PAR LE CONSULTANT
${synthesis.recommendations.map(r => `- ${r}`).join('\n')}

*Avertissement légal : Ce document constitue une analyse préparatoire méthodologique et ne saurait se substituer à une position formelle de l'administration fiscale (rescrit fiscal).*
`;
  };

  const handleCopyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdownReport());
    setCopiedSuccess(true);
    setTimeout(() => setCopiedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Action Bar (Hidden on print) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            <FileText className="w-4 h-4 text-blue-600" />
            Livrable de Consultation & Dossier Justificatif
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Synthèse d’éligibilité & Rapport d’audit imprimable
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Dossier argumenté conforme à la structure du Guide du CIR du Ministère de la Recherche (MESR).
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={handleCopyMarkdown}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedSuccess ? 'Markdown copié !' : 'Copier (Markdown)'}</span>
          </button>
          <button
            onClick={handleDownloadJson}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimer / Export PDF</span>
          </button>
        </div>
      </div>

      {/* Official Report Document */}
      <div className="bg-white border border-slate-300 rounded-lg p-8 md:p-12 shadow-sm max-w-4xl mx-auto space-y-8 text-slate-900 text-xs print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b-2 border-slate-900 pb-6 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-slate-700 mb-1">
              RÉPUBLIQUE FRANÇAISE · AUDIT CIR / CII
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">
              DOSSIER D’ANALYSE D’ÉLIGIBILITÉ
            </h1>
            <p className="text-sm font-semibold text-blue-700 mt-1">
              Projet : {project.name}
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-2 py-0.5 rounded">
                Domaine principal : {domainProfile.label}
              </span>
              {(project.secondaryDisciplines || []).length > 0 && (
                <span className="bg-slate-100 text-slate-700 text-[10px] font-medium px-2 py-0.5 rounded">
                  Disciplines : {project.secondaryDisciplines.join(', ')}
                </span>
              )}
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded p-4 text-right text-xs space-y-1">
            <div className="font-bold text-slate-900">{company.name}</div>
            <div className="text-slate-500 font-mono">SIREN : {company.siren}</div>
            <div className="text-slate-500">Catégorie : <strong>{company.size}</strong></div>
            <div className="text-slate-500">Année fiscale : <strong>{project.year}</strong></div>
          </div>
        </div>

        {/* Section 1: Executive Verdict */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            1. Synthèse Exécutive et Positionnement Fiscal
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="border border-slate-200 rounded p-3 bg-slate-50">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Potentiel CIR</div>
              <div className="text-sm font-bold text-blue-800 mt-1">{synthesis.cirPotential}</div>
              <div className="text-[11px] text-slate-500 tabular-nums">Score : {synthesis.cirScoreTotal.toFixed(1)} / 5</div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-slate-50">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Potentiel CII</div>
              <div className="text-sm font-bold text-purple-800 mt-1">{synthesis.ciiPotential}</div>
              <div className="text-[11px] text-slate-500 tabular-nums">Score : {synthesis.ciiScoreTotal.toFixed(1)} / 5</div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-slate-50">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Verdict Matrice</div>
              <div className="text-sm font-bold text-slate-900 mt-1">
                {synthesis.matrixPosition === 'CIR' && 'Éligible CIR'}
                {synthesis.matrixPosition === 'CII' && 'Éligible CII'}
                {synthesis.matrixPosition === 'INGENIERIE' && 'Ingénierie classique'}
                {synthesis.matrixPosition === 'APPROFONDIR' && 'À approfondir'}
              </div>
              <div className="text-[11px] text-slate-500">Avis d'expert</div>
            </div>

            <div className="border border-slate-200 rounded p-3 bg-slate-50">
              <div className="text-[10px] text-slate-500 uppercase font-semibold">Indice de Confiance</div>
              <div className="text-sm font-bold text-slate-800 mt-1">{synthesis.confidence}</div>
              <div className="text-[11px] text-slate-500">{project.evidences.length} preuve(s)</div>
            </div>
          </div>
        </div>

        {/* Section 2: Technical Description */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            2. Argumentaire Scientifique & Technique (Guide du CIR MESR)
          </h2>

          <div className="space-y-4 leading-relaxed text-slate-700">
            <div>
              <div className="font-bold text-slate-900 text-xs mb-1">
                2.1. Contexte et Objectifs du Projet :
              </div>
              <p className="bg-slate-50/70 p-3 rounded border border-slate-200">
                {project.context || project.generalDescription || 'Non renseigné'}
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 text-xs mb-1 flex items-center justify-between">
                <span>2.2. État de l’Art et Limites des Connaissances Accessibles :</span>
                <span className="text-blue-700 font-bold">{project.cirDimensions[0]?.score}/5</span>
              </div>
              <p className="bg-slate-50/70 p-3 rounded border border-slate-200">
                {project.knownStateOfTheArt || 'Aucun état de l’art renseigné à ce stade.'}
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 text-xs mb-1 flex items-center justify-between">
                <span>2.3. Verrous Scientifiques ou Techniques et Incertitudes :</span>
                <span className="text-blue-700 font-bold">{project.cirDimensions[1]?.score}/5</span>
              </div>
              <p className="bg-slate-50/70 p-3 rounded border border-slate-200">
                {project.difficultiesEncountered || 'Aucun verrou caractérisé.'}
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 text-xs mb-1 flex items-center justify-between">
                <span>2.4. Démarche Expérimentale, Hypothèses et Protocoles :</span>
                <span className="text-blue-700 font-bold">{project.cirDimensions[3]?.score}/5</span>
              </div>
              <p className="bg-slate-50/70 p-3 rounded border border-slate-200">
                {project.experiments || 'Aucune démarche expérimentale documentée.'}
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-900 text-xs mb-1 flex items-center justify-between">
                <span>2.5. Résultats et Nouvelles Connaissances Acquises :</span>
                <span className="text-blue-700 font-bold">{project.cirDimensions[4]?.score}/5</span>
              </div>
              <p className="bg-slate-50/70 p-3 rounded border border-slate-200">
                {project.results || 'Résultats non documentés.'}
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Frascati Criteria */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            3. Grille des 5 Critères du Manuel de Frascati (OCDE)
          </h2>

          <div className="border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">Critère Frascati</th>
                  <th className="py-2 px-3">Définition légale</th>
                  <th className="py-2 px-3 text-right">Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {project.frascatiCriteria.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2 px-3 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2 px-3 text-slate-600 text-[11px]">{c.definition}</td>
                    <td className="py-2 px-3 text-right font-bold text-slate-800">{c.score} / 5</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Evidence Repository */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            4. Registre des Pièces Justificatives (Force Probante)
          </h2>

          <div className="border border-slate-200 rounded-md overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 font-semibold text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">Pièce</th>
                  <th className="py-2 px-3">Type</th>
                  <th className="py-2 px-3">Affirmation soutenue</th>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3 text-right">Niveau</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {project.evidences.map((ev) => (
                  <tr key={ev.id}>
                    <td className="py-2 px-3 font-semibold text-slate-900">{ev.title}</td>
                    <td className="py-2 px-3 text-slate-500">{ev.type}</td>
                    <td className="py-2 px-3 text-slate-600 truncate max-w-xs">{ev.associatedClaim}</td>
                    <td className="py-2 px-3 text-slate-500 font-mono">{ev.date}</td>
                    <td className="py-2 px-3 text-right font-semibold text-slate-700">{ev.reliability}</td>
                  </tr>
                ))}
                {project.evidences.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center text-slate-400">
                      Aucune pièce justificative archivée pour ce projet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 5: Strategic Recommendations */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            5. Recommandations Tactiques pour le Consultant & le DAF
          </h2>

          <div className="space-y-2">
            {synthesis.recommendations.map((rec, i) => (
              <div key={i} className="flex items-start gap-2 bg-slate-50 p-3 rounded border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <p className="text-slate-800 leading-relaxed">{rec}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-200 text-[10px] text-slate-400 italic text-center">
            Rapport généré par AuditCIR-CII · Conforme à l’Instruction Fiscale BOI-BIC-RICI-10-10 et au Manuel de Frascati de l'OCDE.
          </div>
        </div>
      </div>
    </div>
  );
};
