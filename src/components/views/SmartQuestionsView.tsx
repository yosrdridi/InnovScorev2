import React, { useState, useEffect } from 'react';
import { Project, SmartQuestionInteraction } from '../../types';
import { getDomainProfile } from '../../domains';
import { 
  HelpCircle, 
  Send, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  MessageSquare, 
  FileCheck, 
  RefreshCw,
  Lightbulb,
  Copy,
  AlertCircle,
  Tag,
  FlaskConical,
  Gauge
} from 'lucide-react';

interface SmartQuestionsViewProps {
  project: Project;
  onUpdateProject: (updated: Project) => void;
}

const DOMAIN_DEFAULT_CLAIMS: Record<string, string[]> = {
  software: [
    "Nous avons développé une nouvelle architecture algorithmique pour améliorer les performances.",
    "Nous avons créé un pipeline de traitement de données temps réel hautement scalable.",
    "Nous avons implémenté un modèle d'IA pour optimiser les prédictions en production."
  ],
  mechanical: [
    "Nous avons allégé le composant structurel tout en augmentant sa résistance en fatigue.",
    "Nous avons optimisé la géométrie aérodynamique pour réduire les turbulences sous fortes contraintes.",
    "Nous avons conçu un système articulé résistant à l'usure tribologique et aux vibrations."
  ],
  electronics: [
    "Nous avons conçu une carte électronique ultra-basse consommation fonctionnant en environnement bruité.",
    "Nous avons développé une architecture radiofréquence garantissant l'intégrité du signal et la CEM.",
    "Nous avons optimisé la dissipation thermique et les contraintes temps réel du microcontrôleur."
  ],
  biotech: [
    "Nous avons augmenté le rendement d'expression d'une protéine recombinante par génie génétique.",
    "Nous avons mis au point un milieu de culture cellulaire innovant pour accélérer la prolifération.",
    "Nous avons développé un protocole de purification réduisant la dégradation enzymatique."
  ],
  pharma: [
    "Nous avons formulé une nano-émulsion pour stabiliser le principe actif et réguler sa cinétique de libération.",
    "Nous avons levé un verrou de solubilité pour optimiser la biodisponibilité de la molécule.",
    "Nous avons développé un procédé de lyophilisation préservant l'intégrité de la structure macromoléculaire."
  ],
  chemistry: [
    "Nous avons synthétisé un polymère biosourcé avec des propriétés thermomécaniques supérieures aux plastiques pétrosourcés.",
    "Nous avons mis au point un système catalytique réduisant la formation de sous-produits réactionnels indésirables.",
    "Nous avons formulé un revêtement anticorrosion auto-réparant testé en brouillard salin."
  ],
  industrialProcesses: [
    "Nous avons opéré le transfert d'échelle (scale-up) pilote vers industriel tout en maintenant le rendement thermique.",
    "Nous avons réduit l'encrassement des échangeurs thermiques sous flux diphasique continu.",
    "Nous avons maîtrisé les pertes de charge et la cinétique de mélange dans un réacteur continu."
  ],
  energy: [
    "Nous avons optimisé le rendement de conversion énergétique et ralenti la dégradation des électrodes.",
    "Nous avons conçu une architecture de gestion thermique de batterie pour éviter l'emballement.",
    "Nous avons développé un matériau de capture carbone présentant une capacité d'adsorption accrue."
  ],
  medicalDevices: [
    "Nous avons conçu un capteur biomédical ambulatoire mesurant des signaux faibles sans artéfacts de mouvement.",
    "Nous avons développé un implant biocompatible répondant aux contraintes de stérilisation et de tenue mécanique.",
    "Nous avons miniaturisé un dispositif de diagnostic rapide respectant l'isolation électrique médicale."
  ],
  generic: [
    "Nous avons développé une méthode expérimentale pour surmonter les limites des modèles théoriques actuels.",
    "Nous avons caractérisé un phénomène multiphysique non linéaire pour lever un verrou de faisabilité.",
    "Nous have mis au point un banc de mesures étalonné pour valider la reproductibilité des résultats."
  ]
};

export const SmartQuestionsView: React.FC<SmartQuestionsViewProps> = ({
  project,
  onUpdateProject
}) => {
  const domainProfile = getDomainProfile(project.primaryDomain || 'software');
  const domainQuestions = domainProfile.followUpQuestions && domainProfile.followUpQuestions.length > 0
    ? domainProfile.followUpQuestions
    : [
        {
          id: 1,
          question: "Quelle performance ou exigence était insuffisante avec les solutions connues du domaine ?",
          subtext: "Identifiez la métrique de blocage précise dans l'état de l'art.",
          placeholder: "Ex : La précision ou la latence ne permettait pas de répondre au problème...",
          extractKey: "Métrique de blocage initiale",
          typicalImpassesExample: "Blocage systématique dès que la cadence augmentait."
        },
        {
          id: 2,
          question: "Quelle était la valeur mesurée de cette performance avant vos travaux ?",
          subtext: "Fournissez la référence de départ constatée dans l'état des connaissances.",
          placeholder: "Ex : Valeur observée de départ...",
          extractKey: "Valeur de référence pré-projet",
          typicalImpassesExample: "Plafond technique infranchissable avec les approches du marché."
        },
        {
          id: 3,
          question: "Quel objectif quantifié précis cherchiez-vous à atteindre ?",
          subtext: "La cible technique requise jugée impossible à prédire sans recherche.",
          placeholder: "Ex : Cible chiffrée visée...",
          extractKey: "Cible technique visée",
          typicalImpassesExample: "Dépasser la limite théorique admise."
        },
        {
          id: 4,
          question: "Pourquoi les connaissances accessibles et la littérature ne permettaient-elles pas d'y parvenir ?",
          subtext: "Caractérisez le verrou scientifique ou technique fondamental.",
          placeholder: "Ex : Les modèles établis ne s'appliquent pas...",
          extractKey: "Nature du verrou scientifique/technique",
          typicalImpassesExample: "Divergence entre la théorie et la réalité expérimentale."
        },
        {
          id: 5,
          question: "Quelles hypothèses et voies avez-vous testées puis abandonnées (itérations d'échecs) ?",
          subtext: "Les protocoles d'essais infructueux et les impasses démontrent le caractère incertain.",
          placeholder: "Ex : Nous avons d'abord testé..., puis...",
          extractKey: "Itérations et impasses documentées",
          typicalImpassesExample: "Abandon d'une première voie suite à des ruptures répétées."
        },
        {
          id: 6,
          question: "Quels résultats concrets, quantitatifs et reproductibles avez-vous obtenus ?",
          subtext: "Données finales mesurées et comparées à la référence de départ.",
          placeholder: "Ex : Résultats chiffrés finaux...",
          extractKey: "Preuves et résultats chiffrés",
          typicalImpassesExample: "Gains mesurés et validés sur plusieurs séries d'essais."
        }
      ];

  const defaultClaims = DOMAIN_DEFAULT_CLAIMS[project.primaryDomain] || DOMAIN_DEFAULT_CLAIMS.generic;

  const [initialClaim, setInitialClaim] = useState(defaultClaims[0]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Initialize answers from project data if already present
  const [answers, setAnswers] = useState<Record<number, string>>(() => {
    const initial: Record<number, string> = {};
    if (project.problemToSolve) initial[0] = project.problemToSolve;
    if (project.whyExistingSolutionsInsufficient) initial[1] = project.whyExistingSolutionsInsufficient;
    if (project.objectives) initial[2] = project.objectives;
    if (project.difficultiesEncountered) initial[3] = project.difficultiesEncountered;
    if (project.hypothesesFormulated || project.experiments) initial[4] = project.hypothesesFormulated || project.experiments;
    if (project.quantitativeDataAvailable || project.results) initial[5] = project.quantitativeDataAvailable || project.results;
    return initial;
  });

  const [currentInput, setCurrentInput] = useState(answers[0] || '');
  const [isInjectingDone, setIsInjectingDone] = useState(false);

  // Sync when project changes
  useEffect(() => {
    const claims = DOMAIN_DEFAULT_CLAIMS[project.primaryDomain] || DOMAIN_DEFAULT_CLAIMS.generic;
    setInitialClaim(claims[0]);
    const initAnswers: Record<number, string> = {};
    if (project.problemToSolve) initAnswers[0] = project.problemToSolve;
    if (project.whyExistingSolutionsInsufficient) initAnswers[1] = project.whyExistingSolutionsInsufficient;
    if (project.objectives) initAnswers[2] = project.objectives;
    if (project.difficultiesEncountered) initAnswers[3] = project.difficultiesEncountered;
    if (project.hypothesesFormulated || project.experiments) initAnswers[4] = project.hypothesesFormulated || project.experiments;
    if (project.quantitativeDataAvailable || project.results) initAnswers[5] = project.quantitativeDataAvailable || project.results;
    setAnswers(initAnswers);
    setCurrentStepIndex(0);
    setCurrentInput(initAnswers[0] || '');
  }, [project.id, project.primaryDomain]);

  const activeStep = domainQuestions[currentStepIndex] || domainQuestions[0];

  const handleNextStep = () => {
    const updatedAnswers = { ...answers, [currentStepIndex]: currentInput };
    setAnswers(updatedAnswers);

    if (currentStepIndex < domainQuestions.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setCurrentInput(updatedAnswers[nextIndex] || '');
    }
  };

  const handleSelectStep = (idx: number) => {
    // Save current before switching
    setAnswers(prev => ({ ...prev, [currentStepIndex]: currentInput }));
    setCurrentStepIndex(idx);
    setCurrentInput(answers[idx] || '');
  };

  const handleAppendSnippet = (snippet: string) => {
    setCurrentInput(prev => prev ? `${prev} ; ${snippet}` : snippet);
  };

  const handleInjectIntoProject = () => {
    // Inject the structured interview into project fields
    const updated: Project = {
      ...project,
      problemToSolve: answers[0] || project.problemToSolve,
      whyExistingSolutionsInsufficient: answers[1] || project.whyExistingSolutionsInsufficient,
      objectives: answers[2] || project.objectives,
      difficultiesEncountered: answers[3] || project.difficultiesEncountered,
      hypothesesFormulated: answers[4] || project.hypothesesFormulated,
      experiments: answers[4] ? `${project.experiments}\n\nItérations & impasses : ${answers[4]}`.trim() : project.experiments,
      results: answers[5] ? `${project.results}\n\nDonnées mesurées : ${answers[5]}`.trim() : project.results,
      quantitativeDataAvailable: answers[5] || project.quantitativeDataAvailable,
      lastUpdated: new Date().toISOString().slice(0, 10)
    };

    onUpdateProject(updated);
    setIsInjectingDone(true);
    setTimeout(() => setIsInjectingDone(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">
            <HelpCircle className="w-4 h-4" />
            Entretien Dynamique & Déconstruction Marketing · {domainProfile.shortLabel}
          </div>
          <h2 className="text-base font-bold text-slate-900 tracking-tight">
            Système de questions intelligentes adaptées au secteur {domainProfile.label}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Ce moteur applique les exigences Frascati/MESR au vocabulaire et aux réalités techniques de votre secteur.
          </p>
        </div>

        <button
          onClick={handleInjectIntoProject}
          disabled={Object.keys(answers).length < 2}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs font-semibold px-4 py-2 rounded-md transition-colors shadow-xs shrink-0"
        >
          <FileCheck className="w-4 h-4" />
          <span>{isInjectingDone ? 'Faits intégrés au dossier !' : 'Intégrer les faits au projet'}</span>
        </button>
      </div>

      {/* Domain Claim Selector & Input */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <label className="font-semibold text-slate-800">
            Affirmation préliminaire de l’équipe ({domainProfile.shortLabel}) :
          </label>
          <span className="text-[11px] text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 font-semibold">
            Formulation à déconstruire
          </span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            value={initialClaim}
            onChange={(e) => setInitialClaim(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden font-medium text-slate-900 bg-slate-50 text-xs"
          />
        </div>

        {/* Quick Click Claims */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
          <span className="text-slate-400 font-medium">Exemples typiques en {domainProfile.shortLabel} :</span>
          {defaultClaims.map((claim, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setInitialClaim(claim)}
              className="text-left bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded transition-colors truncate max-w-xs"
              title={claim}
            >
              « {claim} »
            </button>
          ))}
        </div>
      </div>

      {/* Domain Context & Terminology Helper Box */}
      <div className="bg-blue-50/70 border border-blue-200 rounded-lg p-4 space-y-3 text-xs">
        <div className="flex items-center justify-between border-b border-blue-200/80 pb-2">
          <div className="flex items-center gap-2 font-bold text-blue-900">
            <Sparkles className="w-4 h-4 text-blue-700" />
            <span>Repères terminologiques sectoriels : {domainProfile.label}</span>
          </div>
          <span className="text-[11px] text-blue-700 font-medium">
            Cliquez pour insérer dans votre réponse
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-[11px]">
          {/* Uncertainties */}
          <div className="bg-white/80 p-2.5 rounded border border-blue-100 space-y-1">
            <div className="font-semibold text-blue-950 flex items-center gap-1">
              <AlertCircle className="w-3 h-3 text-amber-600" />
              Incertitudes / Verrous typiques
            </div>
            <div className="space-y-1 pt-1">
              {domainProfile.terminology.typicalUncertainties.slice(0, 3).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAppendSnippet(item)}
                  className="w-full text-left text-slate-700 hover:text-blue-700 hover:bg-blue-50 p-1 rounded text-[10px] leading-tight transition-colors line-clamp-2"
                  title="Cliquer pour insérer"
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          {/* Experiments */}
          <div className="bg-white/80 p-2.5 rounded border border-blue-100 space-y-1">
            <div className="font-semibold text-blue-950 flex items-center gap-1">
              <FlaskConical className="w-3 h-3 text-blue-600" />
              Expérimentations & Essais attendus
            </div>
            <div className="space-y-1 pt-1">
              {domainProfile.terminology.typicalExperiments.slice(0, 3).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAppendSnippet(item)}
                  className="w-full text-left text-slate-700 hover:text-blue-700 hover:bg-blue-50 p-1 rounded text-[10px] leading-tight transition-colors line-clamp-2"
                  title="Cliquer pour insérer"
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-white/80 p-2.5 rounded border border-blue-100 space-y-1">
            <div className="font-semibold text-blue-950 flex items-center gap-1">
              <Gauge className="w-3 h-3 text-emerald-600" />
              Métriques de référence
            </div>
            <div className="space-y-1 pt-1">
              {domainProfile.terminology.relevantMetrics.slice(0, 4).map((item, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleAppendSnippet(item)}
                  className="w-full text-left text-slate-700 hover:text-blue-700 hover:bg-blue-50 p-1 rounded text-[10px] leading-tight transition-colors truncate"
                  title="Cliquer pour insérer"
                >
                  + {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Step-by-Step Question Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Sequence List (1 Col) */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-xs space-y-2">
          <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
            Étapes de relance méthodique ({domainQuestions.length})
          </div>
          <div className="space-y-1">
            {domainQuestions.map((step, idx) => {
              const isCurrent = currentStepIndex === idx;
              const hasAnswer = Boolean(answers[idx]);

              return (
                <button
                  key={step.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`w-full text-left p-2.5 rounded-md text-xs transition-colors flex items-start gap-2.5 ${
                    isCurrent
                      ? 'bg-blue-600 text-white font-semibold shadow-xs'
                      : hasAnswer
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-100 hover:bg-emerald-100'
                      : 'hover:bg-slate-100 text-slate-600'
                  }`}
                >
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                    isCurrent
                      ? 'bg-white text-blue-700'
                      : hasAnswer
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {step.id}
                  </span>
                  <div className="truncate min-w-0">
                    <div className="truncate">{step.question}</div>
                    <div className={`text-[10px] truncate ${isCurrent ? 'text-blue-100' : 'text-slate-400'}`}>
                      {step.extractKey}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Active Question & Probing Interface (2 Cols) */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6 shadow-xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-2">
              <span className="font-semibold text-blue-600 uppercase tracking-wider">
                Question {activeStep.id} sur {domainQuestions.length} · {domainProfile.shortLabel}
              </span>
              <span>{activeStep.extractKey}</span>
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 text-base">
                {activeStep.question}
              </h3>
              <p className="text-xs text-slate-500 italic">
                {activeStep.subtext}
              </p>
              {activeStep.typicalImpassesExample && (
                <div className="text-[11px] text-amber-900 bg-amber-50/80 p-2 rounded border border-amber-200/60 mt-2">
                  <strong>Exemple d’impasse ou de fait typique :</strong> « {activeStep.typicalImpassesExample} »
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Réponse factuelle de l’équipe R&D / Technique :
              </label>
              <textarea
                rows={4}
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={activeStep.placeholder}
                className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:border-blue-500 focus:outline-hidden leading-relaxed"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                if (currentStepIndex > 0) handleSelectStep(currentStepIndex - 1);
              }}
              disabled={currentStepIndex === 0}
              className="text-xs text-slate-600 hover:text-slate-900 disabled:opacity-30 font-medium"
            >
              ← Question précédente
            </button>

            <button
              onClick={handleNextStep}
              className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              <span>{currentStepIndex === domainQuestions.length - 1 ? 'Enregistrer cette réponse' : 'Valider & Question suivante'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Extracted Facts Board */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Faits concrets collectés ({Object.keys(answers).length}/{domainQuestions.length})
          </h4>
          <span className="text-[11px] text-slate-400">
            Prêts pour le classeur justificatif CIR / CII ({domainProfile.shortLabel})
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {domainQuestions.map((step, idx) => (
            <div key={step.id} className="bg-slate-50 border border-slate-200 rounded p-3 space-y-1">
              <div className="font-bold text-[11px] text-slate-700">
                {step.id}. {step.extractKey}
              </div>
              <p className="text-slate-600 text-[11px] line-clamp-3 leading-relaxed">
                {answers[idx] || <span className="text-slate-400 italic">En attente de réponse...</span>}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
