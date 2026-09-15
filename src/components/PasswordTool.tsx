import React, { useState } from 'react';
import { KeyRound, Check, Copy, HelpCircle, ShieldAlert, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface PasswordToolProps {
  language: Language;
  isHighContrast: boolean;
}

export const PasswordTool: React.FC<PasswordToolProps> = ({ language, isHighContrast }) => {
  const [testName, setTestName] = useState('RAMESH KUMAR');
  const [testYear, setTestYear] = useState('1990');
  const [copied, setCopied] = useState(false);

  const t = TRANSLATIONS[language];

  // Calculate generated password
  const cleanName = testName.trim().replace(/[^a-zA-Z]/g, '').toUpperCase();
  const cleanYear = testYear.trim().replace(/[^0-9]/g, '');
  const prefix = cleanName.slice(0, 4);
  const generatedPassword = prefix ? `${prefix}${cleanYear.slice(0, 4)}` : '----';

  const copyToClipboard = () => {
    if (generatedPassword && generatedPassword !== '----') {
      navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const sampleNames = [
    { name: "RAMESH KUMAR", year: "1990", result: "RAME1990", note: "Standard full name" },
    { name: "P. SURESH", year: "1985", result: "PSUR1985", note: "Initials without dot" },
    { name: "ANITA DEVI", year: "1994", result: "ANIT1994", note: "First 4 capital letters" },
    { name: "OM PATEL", year: "2002", result: "OM2002", note: "Short name (fewer than 4 letters)" }
  ];

  return (
    <div className={`rounded-xl border p-5 transition-all ${
      isHighContrast 
        ? 'bg-neutral-900 border-yellow-400 text-yellow-300' 
        : 'bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white border-blue-800 shadow-md'
    }`}>
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <KeyRound className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-lg text-white tracking-tight">
                {t.passwordDecoderTitle}
              </h3>
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> UIDAI Standard
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              {t.passwordDecoderDesc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-amber-200 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Case Sensitive: Always type in <strong>CAPITAL LETTERS</strong>.</span>
        </div>
      </div>

      {/* Interactive Inputs & Live Generator */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Full Name (As printed on Aadhaar):
          </label>
          <input
            id="password-tool-name-input"
            type="text"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="e.g. RAHUL SHARMA"
            className={`w-full px-3 py-2 text-sm rounded-lg border font-medium focus:ring-2 focus:outline-none ${
              isHighContrast 
                ? 'bg-black border-yellow-400 text-yellow-300' 
                : 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:ring-amber-400 focus:border-amber-400'
            }`}
          />
          <span className="text-[11px] text-slate-400 mt-1 block">
            Extracted Prefix: <strong className="text-amber-300 font-mono">{prefix || 'NONE'}</strong> (First 4 letters)
          </span>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-200 mb-1.5">
            Year of Birth (YYYY):
          </label>
          <input
            id="password-tool-year-input"
            type="text"
            maxLength={4}
            value={testYear}
            onChange={(e) => setTestYear(e.target.value)}
            placeholder="e.g. 1995"
            className={`w-full px-3 py-2 text-sm rounded-lg border font-medium focus:ring-2 focus:outline-none ${
              isHighContrast 
                ? 'bg-black border-yellow-400 text-yellow-300' 
                : 'bg-white/10 border-white/20 text-white placeholder-slate-400 focus:ring-amber-400 focus:border-amber-400'
            }`}
          />
          <span className="text-[11px] text-slate-400 mt-1 block">
            Extracted Year: <strong className="text-amber-300 font-mono">{cleanYear.slice(0, 4) || 'YYYY'}</strong>
          </span>
        </div>

        <div className="flex flex-col justify-between">
          <label className="block text-xs font-semibold text-emerald-300 mb-1.5">
            Generated e-Aadhaar PDF Password:
          </label>
          <div className="flex items-center gap-2">
            <div className={`flex-1 px-4 py-2 rounded-lg font-mono font-bold text-base sm:text-lg tracking-widest text-center border ${
              isHighContrast
                ? 'bg-yellow-400 text-black border-yellow-400'
                : 'bg-emerald-950/80 text-emerald-300 border-emerald-600/50 shadow-inner'
            }`}>
              {generatedPassword}
            </div>
            <button
              id="copy-generated-password-btn"
              onClick={copyToClipboard}
              disabled={generatedPassword === '----'}
              className={`p-2.5 rounded-lg border text-xs font-semibold flex items-center gap-1 transition ${
                copied 
                  ? 'bg-emerald-600 text-white border-emerald-500' 
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20'
              }`}
              title="Copy password to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <span className="text-[11px] text-slate-300 mt-1">
            {copied ? "Copied to clipboard!" : "Use this exact code to open the locked PDF"}
          </span>
        </div>
      </div>

      {/* Quick Example Scenarios */}
      <div className="mt-5 pt-4 border-t border-white/10">
        <div className="flex items-center gap-1.5 text-xs text-slate-300 font-semibold mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-amber-300" />
          <span>Quick Reference Examples:</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {sampleNames.map((ex, idx) => (
            <button
              key={idx}
              onClick={() => {
                setTestName(ex.name);
                setTestYear(ex.year);
              }}
              className="text-left p-2 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition group"
            >
              <div className="text-[11px] text-slate-300 font-medium truncate">{ex.name} ({ex.year})</div>
              <div className="font-mono text-xs font-bold text-amber-300 group-hover:text-amber-200">
                → {ex.result}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
