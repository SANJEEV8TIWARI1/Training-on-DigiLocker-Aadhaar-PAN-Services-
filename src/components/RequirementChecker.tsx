import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  ExternalLink, 
  AlertTriangle, 
  Printer, 
  Sparkles, 
  FileText, 
  ShieldCheck, 
  CreditCard,
  Check,
  Circle
} from 'lucide-react';
import { Language } from '../types';
import { SERVICE_REQUIREMENTS } from '../data/checkerData';

interface RequirementCheckerProps {
  language: Language;
  isHighContrast: boolean;
}

export const RequirementChecker: React.FC<RequirementCheckerProps> = ({ isHighContrast }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(SERVICE_REQUIREMENTS[0].id);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const currentService = SERVICE_REQUIREMENTS.find(s => s.id === selectedServiceId) || SERVICE_REQUIREMENTS[0];

  const toggleCheck = (idKey: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [idKey]: !prev[idKey]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isHighContrast 
          ? 'bg-neutral-950 border-yellow-400 text-yellow-300' 
          : 'bg-gradient-to-r from-teal-900 via-slate-900 to-blue-950 text-white border-teal-800 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Smart Document Readiness Advisor</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Document Prerequisite & Eligibility Checker
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
              Don't get your application rejected! Select your desired service below to view the official document checklist, exact government fees, and estimated completion time.
            </p>
          </div>

          <button
            id="print-document-checklist-btn"
            onClick={handlePrint}
            className="px-4 py-2.5 rounded-lg bg-white/15 hover:bg-white/25 text-white border border-white/20 text-xs font-bold transition flex items-center gap-2"
            title="Print or Save Checklist"
          >
            <Printer className="w-4 h-4" />
            <span>Print Checklist</span>
          </button>
        </div>
      </div>

      {/* Service Selector Grid */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Select Citizen Service:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SERVICE_REQUIREMENTS.map((srv) => {
            const isSelected = srv.id === selectedServiceId;
            return (
              <button
                key={srv.id}
                onClick={() => {
                  setSelectedServiceId(srv.id);
                  setCheckedItems({});
                }}
                className={`p-3 rounded-xl border text-left transition flex flex-col justify-between ${
                  isSelected
                    ? isHighContrast
                      ? 'bg-yellow-400 text-black border-yellow-400 font-extrabold'
                      : 'bg-teal-800 text-white border-teal-800 shadow-sm'
                    : isHighContrast
                      ? 'bg-neutral-900 text-yellow-300 border-neutral-700'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="space-y-1">
                  <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {srv.serviceCategory.toUpperCase()}
                  </span>
                  <div className="text-xs font-bold leading-tight line-clamp-2 mt-1">
                    {srv.serviceName}
                  </div>
                </div>
                <div className={`text-[10px] mt-2 font-semibold ${isSelected ? 'text-teal-200' : 'text-slate-500'}`}>
                  Fee: {srv.fee}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Service Detailed Requirement Card */}
      <div className={`p-6 sm:p-8 rounded-2xl border space-y-6 ${
        isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        {/* Top Service Snapshot */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-teal-100 text-teal-800 border border-teal-200">
                {currentService.isOnlineAvailable ? "100% Online Self-Service" : "Visit Aadhaar Kendra"}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                Turnaround: <strong>{currentService.processingTime}</strong>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              {currentService.serviceName}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              {currentService.shortDesc}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Official Fee</span>
              <strong className="text-lg font-black text-emerald-700">{currentService.fee}</strong>
            </div>
            <a
              href={currentService.officialPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
            >
              <span>{currentService.officialPortalLabel}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Required Documents Interactive Checklist */}
        <div className="space-y-4">
          <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-teal-700" />
            <span>Official Required Documents (Check them off as you collect):</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentService.requiredDocuments.map((docGroup, gIdx) => (
              <div key={gIdx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{docGroup.category}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    docGroup.mandatory 
                      ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                      : 'bg-slate-200 text-slate-700'
                  }`}>
                    {docGroup.mandatory ? "Mandatory" : "Alternative Option"}
                  </span>
                </div>

                <div className="space-y-2 pt-1">
                  {docGroup.examples.map((item, itemIdx) => {
                    const itemKey = `${currentService.id}-doc-${gIdx}-${itemIdx}`;
                    const isChecked = !!checkedItems[itemKey];
                    return (
                      <button
                        key={itemIdx}
                        onClick={() => toggleCheck(itemKey)}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition flex items-start gap-2.5 ${
                          isChecked 
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-medium' 
                            : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div className={`mt-0.5 shrink-0 ${isChecked ? 'text-emerald-600' : 'text-slate-400'}`}>
                          {isChecked ? <Check className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                        </div>
                        <span className={isChecked ? "line-through text-slate-500" : ""}>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Step Breakdown */}
        <div className="space-y-3 pt-2">
          <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-700" />
            <span>Process Workflow Overview:</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2">
            {currentService.stepSummary.map((step, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <span className="font-bold text-blue-900 text-[10px] block">Step {idx + 1}</span>
                <p className="leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Caution & Rejection Advice */}
        {currentService.cautionPoints.length > 0 && (
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-2">
            <div className="font-bold flex items-center gap-1.5 text-amber-950">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Common Pitfalls & How to Avoid Application Rejection:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1">
              {currentService.cautionPoints.map((caution, cIdx) => (
                <li key={cIdx}>{caution}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
