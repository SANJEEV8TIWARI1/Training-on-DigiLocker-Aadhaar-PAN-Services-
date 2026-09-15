import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle, 
  ExternalLink, 
  AlertTriangle, 
  HelpCircle, 
  Smartphone, 
  KeyRound, 
  ShieldCheck, 
  Layers, 
  QrCode, 
  Cloud,
  ChevronRight,
  Sparkles,
  Laptop,
  Printer
} from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { SERVICE_GUIDES } from '../data/guideData';
import { TRANSLATIONS } from '../data/translations';

interface DigiLockerGuideProps {
  language: Language;
  isHighContrast: boolean;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const DigiLockerGuide: React.FC<DigiLockerGuideProps> = ({ language, isHighContrast, onNavigateTab }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('digilocker-account-creation');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const guides = SERVICE_GUIDES.filter(g => g.category === 'digilocker');
  const currentGuide = guides.find(g => g.id === selectedGuideId) || guides[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isHighContrast 
          ? 'bg-neutral-950 border-yellow-400 text-yellow-300' 
          : 'bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white border-blue-800 shadow-md'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-amber-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ministry of Electronics & IT (MeitY) Authorized</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              DigiLocker Citizen Training & Master Guide
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
              Learn how to eliminate physical paperwork by securing your verified digital certificates (Mark sheets, Driving License, RC, PAN, Insurance) in your official government wallet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white border border-white/25 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              title="Print a printer-friendly version of this guide"
            >
              <Printer className="w-3.5 h-3.5 text-amber-300" />
              <span>{t.printGuide}</span>
            </button>
            <a
              href="https://www.digilocker.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Open Official DigiLocker</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onNavigateTab('simulator')}
              className="px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Laptop className="w-3.5 h-3.5 text-amber-300" />
              <span>Try Sandbox Simulator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Guide Switcher Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {guides.map((g) => (
          <button
            key={g.id}
            onClick={() => {
              setSelectedGuideId(g.id);
              setActiveStepIndex(0);
            }}
            className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition flex items-center gap-2 ${
              selectedGuideId === g.id
                ? isHighContrast
                  ? 'bg-yellow-400 text-black font-extrabold'
                  : 'bg-blue-800 text-white shadow-xs'
                : isHighContrast
                  ? 'text-yellow-300 hover:bg-neutral-800'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>{g.title.replace('How to ', '')}</span>
          </button>
        ))}
      </div>

      {/* Guide Metadata Card */}
      <div className={`p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs ${
        isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-blue-50/70 border-blue-200 text-slate-800'
      }`}>
        <div>
          <span className="text-slate-500 font-semibold block">Official Fee:</span>
          <strong className="text-emerald-700 text-sm font-bold">{currentGuide.officialFee}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Estimated Time:</span>
          <strong className="text-blue-900 text-sm font-bold">{currentGuide.estimatedTime}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Official Platform:</span>
          <a href={currentGuide.officialPortal} target="_blank" rel="noreferrer" className="text-blue-700 font-bold hover:underline flex items-center gap-1">
            {currentGuide.officialPortalName} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Prerequisites Checklist */}
      <div className={`p-5 rounded-xl border ${
        isHighContrast ? 'bg-neutral-900 border-yellow-400' : 'bg-white border-slate-200'
      }`}>
        <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Prerequisites Checklist (Have these ready before starting):</span>
        </h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
          {currentGuide.prerequisites.map((prereq, idx) => (
            <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{prereq}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Step by Step Interactive Flow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-700" />
            <span>Interactive Step-by-Step Walkthrough</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Step {activeStepIndex + 1} of {currentGuide.steps.length}
          </span>
        </div>

        {/* Step Navigation Pill Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentGuide.steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                activeStepIndex === idx
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black border-yellow-400 font-bold'
                    : 'bg-blue-800 text-white border-blue-800 shadow-sm'
                  : isHighContrast
                    ? 'bg-neutral-900 text-yellow-300 border-neutral-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                activeStepIndex === idx ? 'bg-white text-blue-900' : 'bg-slate-200 text-slate-700'
              }`}>
                {step.stepNumber}
              </div>
              <span className="text-xs font-semibold truncate">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Detailed Card */}
        {(() => {
          const step = currentGuide.steps[activeStepIndex];
          return (
            <div className={`p-6 rounded-xl border space-y-5 transition-all ${
              isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                    Step {step.stepNumber}
                  </span>
                  <h4 className="text-lg font-bold text-slate-900 mt-2">{step.title}</h4>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{step.description}</p>
                </div>
              </div>

              {/* Sub-steps if any */}
              {step.subSteps && (
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block mb-1">Action items for this step:</span>
                  {step.subSteps.map((sub, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Important Callout Note */}
              {step.importantNote && (
                <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Important:</strong> {step.importantNote}
                  </div>
                </div>
              )}

              {/* Visual Interactive Screen Simulation */}
              {step.sampleVisualData && (
                <div className="mt-4 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="font-bold text-amber-400 flex items-center gap-1.5">
                      <Smartphone className="w-3.5 h-3.5" />
                      {step.sampleVisualData.screenTitle || "Official Screen Interface Preview"}
                    </span>
                    {step.sampleVisualData.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        {step.sampleVisualData.badge}
                      </span>
                    )}
                  </div>

                  {step.sampleVisualData.fields && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      {step.sampleVisualData.fields.map((f, fi) => (
                        <div key={fi} className="space-y-1">
                          <label className="text-[11px] font-semibold text-slate-300">{f.label}</label>
                          <div className="px-3 py-2 rounded bg-slate-800 border border-slate-700 text-xs text-slate-200 font-mono">
                            {f.value || f.placeholder}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {step.sampleVisualData.tips && (
                    <div className="pt-2 text-xs text-slate-300 space-y-1">
                      {step.sampleVisualData.tips.map((tip, ti) => (
                        <p key={ti} className="text-emerald-300">✓ {tip}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <button
                  disabled={activeStepIndex === 0}
                  onClick={() => setActiveStepIndex(prev => prev - 1)}
                  className="px-4 py-2 rounded-lg text-xs font-bold border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:pointer-events-none transition"
                >
                  ← Previous Step
                </button>

                {step.actionUrl && (
                  <a
                    href={step.actionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-blue-800 hover:bg-blue-900 text-white flex items-center gap-1.5 shadow-xs transition"
                  >
                    <span>{step.actionUrlText || "Open in Official Portal"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {activeStepIndex < currentGuide.steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStepIndex(prev => prev + 1)}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigateTab('simulator')}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition flex items-center gap-1"
                  >
                    <Laptop className="w-3.5 h-3.5" />
                    <span>Practice in Simulator</span>
                  </button>
                )}
              </div>
            </div>
          );
        })()}
      </div>

      {/* Troubleshooting Common Issues Accordion */}
      <div className={`p-6 rounded-xl border ${
        isHighContrast ? 'bg-neutral-900 border-yellow-400' : 'bg-white border-slate-200'
      }`}>
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-amber-600" />
          <span>Troubleshooting: Solutions to Common DigiLocker Errors</span>
        </h3>

        <div className="space-y-3">
          {currentGuide.troubleshootingTips.map((tip, idx) => (
            <div key={idx} className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <h5 className="text-xs font-bold text-rose-900 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Issue: {tip.issue}</span>
              </h5>
              <p className="text-xs text-slate-700 leading-relaxed pl-5">
                <strong className="text-emerald-800">Resolution:</strong> {tip.solution}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
