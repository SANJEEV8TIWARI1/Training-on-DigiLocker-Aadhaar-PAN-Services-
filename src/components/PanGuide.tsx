import React, { useState } from 'react';
import { 
  CreditCard, 
  CheckCircle, 
  ExternalLink, 
  AlertTriangle, 
  HelpCircle, 
  Layers, 
  ChevronRight,
  Sparkles,
  DollarSign,
  AlertOctagon,
  FileCheck2,
  Laptop,
  Printer
} from 'lucide-react';
import { Language, ActiveTab } from '../types';
import { SERVICE_GUIDES } from '../data/guideData';
import { TRANSLATIONS } from '../data/translations';

interface PanGuideProps {
  language: Language;
  isHighContrast: boolean;
  onNavigateTab: (tab: ActiveTab) => void;
}

export const PanGuide: React.FC<PanGuideProps> = ({ language, isHighContrast, onNavigateTab }) => {
  const [selectedGuideId, setSelectedGuideId] = useState<string>('pan-link-aadhaar');
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const guides = SERVICE_GUIDES.filter(g => g.category === 'pan');
  const currentGuide = guides.find(g => g.id === selectedGuideId) || guides[0];
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isHighContrast 
          ? 'bg-neutral-950 border-yellow-400 text-yellow-300' 
          : 'bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 text-white border-indigo-800 shadow-md'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Income Tax Department & Protean (NSDL) / UTIITSL</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              PAN Card Citizen Training & Linking Services
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
              Step-by-step assistance for linking PAN with Aadhaar (paying ₹1,000 challan), instant free e-PAN allotment in 10 minutes, and correcting name mismatches.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white border border-white/25 text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
              title="Print a printer-friendly version of this guide"
            >
              <Printer className="w-3.5 h-3.5 text-indigo-200" />
              <span>{t.printGuide}</span>
            </button>
            <a
              href="https://www.incometax.gov.in"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
            >
              <span>e-Filing Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => onNavigateTab('simulator')}
              className="px-4 py-2 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition flex items-center gap-1.5"
            >
              <Laptop className="w-3.5 h-3.5 text-amber-300" />
              <span>Simulate PAN Link</span>
            </button>
          </div>
        </div>
      </div>

      {/* Critical Highlight: PAN-Aadhaar Challan Head Guide */}
      <div className={`p-5 rounded-xl border ${
        isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-rose-50/70 border-rose-200 text-slate-900'
      }`}>
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-rose-600 text-white shrink-0 mt-0.5">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-rose-950">
              Crucial Notice: How to Pay the ₹1,000 Linking Challan Without Making Payment Errors
            </h4>
            <p className="text-xs text-rose-900 leading-relaxed">
              Thousands of citizens lose ₹1,000 every month by selecting the wrong tax head on e-Pay Tax. Follow this exact rule:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-medium pt-1">
              <div className="p-2.5 rounded bg-white border border-rose-200 shadow-2xs">
                <span className="text-slate-500 text-[11px] block">Major Tax Head:</span>
                <strong className="text-indigo-900">Income Tax (Other than Companies) - 0021</strong>
              </div>
              <div className="p-2.5 rounded bg-white border border-rose-200 shadow-2xs">
                <span className="text-slate-500 text-[11px] block">Assessment Year:</span>
                <strong className="text-emerald-900">CURRENT AY (e.g. 2024-25 / latest)</strong>
              </div>
              <div className="p-2.5 rounded bg-white border border-rose-200 shadow-2xs">
                <span className="text-slate-500 text-[11px] block">Minor Head (Type of Payment):</span>
                <strong className="text-rose-900">Fee for delay in linking (500)</strong>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 italic">
              * Note: After payment, wait 24 hours for bank clearance, then return to 'Link Aadhaar' to submit the final link request!
            </p>
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
                  : 'bg-indigo-800 text-white shadow-xs'
                : isHighContrast
                  ? 'text-yellow-300 hover:bg-neutral-800'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>{g.title.replace('How to ', '')}</span>
          </button>
        ))}
      </div>

      {/* Guide Metadata Info */}
      <div className={`p-4 rounded-xl border grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs ${
        isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-indigo-50/70 border-indigo-200 text-slate-800'
      }`}>
        <div>
          <span className="text-slate-500 font-semibold block">Official Fee:</span>
          <strong className="text-indigo-900 text-sm font-bold">{currentGuide.officialFee}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Estimated Processing Time:</span>
          <strong className="text-slate-900 text-sm font-bold">{currentGuide.estimatedTime}</strong>
        </div>
        <div>
          <span className="text-slate-500 font-semibold block">Official Portal:</span>
          <a href={currentGuide.officialPortal} target="_blank" rel="noreferrer" className="text-indigo-700 font-bold hover:underline flex items-center gap-1">
            {currentGuide.officialPortalName} <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Step by Step Flow */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-700" />
            <span>Step-by-Step Procedure</span>
          </h3>
          <span className="text-xs font-semibold text-slate-500">
            Step {activeStepIndex + 1} of {currentGuide.steps.length}
          </span>
        </div>

        {/* Step Indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {currentGuide.steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStepIndex(idx)}
              className={`p-3 rounded-xl border text-left transition flex items-center gap-2.5 ${
                activeStepIndex === idx
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black border-yellow-400 font-bold'
                    : 'bg-indigo-800 text-white border-indigo-800 shadow-sm'
                  : isHighContrast
                    ? 'bg-neutral-900 text-yellow-300 border-neutral-700'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                activeStepIndex === idx ? 'bg-white text-indigo-900' : 'bg-slate-200 text-slate-700'
              }`}>
                {step.stepNumber}
              </div>
              <span className="text-xs font-semibold truncate">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Card */}
        {(() => {
          const step = currentGuide.steps[activeStepIndex];
          return (
            <div className={`p-6 rounded-xl border space-y-5 transition-all ${
              isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
            }`}>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Step {step.stepNumber}
                </span>
                <h4 className="text-lg font-bold text-slate-900 mt-2">{step.title}</h4>
                <p className="text-sm text-slate-600 mt-1 leading-relaxed">{step.description}</p>
              </div>

              {step.subSteps && (
                <div className="space-y-1.5 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-700">
                  <span className="font-bold text-slate-900 block mb-1">Checklist for this step:</span>
                  {step.subSteps.map((sub, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              )}

              {step.importantNote && (
                <div className="p-3.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold">Important Tax Rule:</strong> {step.importantNote}
                  </div>
                </div>
              )}

              {step.sampleVisualData && (
                <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                    <span className="font-bold text-indigo-400 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5" />
                      {step.sampleVisualData.screenTitle || "Income Tax e-Filing Interface"}
                    </span>
                    {step.sampleVisualData.badge && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
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

              {/* Navigation Controls */}
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
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-800 hover:bg-indigo-900 text-white flex items-center gap-1.5 shadow-xs transition"
                  >
                    <span>{step.actionUrlText || "Open e-Filing Portal"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}

                {activeStepIndex < currentGuide.steps.length - 1 ? (
                  <button
                    onClick={() => setActiveStepIndex(prev => prev + 1)}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition"
                  >
                    Next Step →
                  </button>
                ) : (
                  <button
                    onClick={() => onNavigateTab('simulator')}
                    className="px-4 py-2 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white transition flex items-center gap-1"
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

      {/* Troubleshooting */}
      <div className={`p-6 rounded-xl border ${
        isHighContrast ? 'bg-neutral-900 border-yellow-400' : 'bg-white border-slate-200'
      }`}>
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 mb-4">
          <HelpCircle className="w-5 h-5 text-indigo-600" />
          <span>Troubleshooting: Fixing Demographic Mismatch & Payment Glitches</span>
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
