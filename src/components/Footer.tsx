import React from 'react';
import { Shield, PhoneCall, ExternalLink, HelpCircle, FileCheck, Lock, Globe } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface FooterProps {
  language: Language;
  isHighContrast: boolean;
  onNavigateTab: (tab: any) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, isHighContrast, onNavigateTab }) => {
  const t = TRANSLATIONS[language];

  return (
    <footer className={`mt-16 border-t ${
      isHighContrast ? 'bg-black text-yellow-300 border-yellow-400' : 'bg-slate-900 text-slate-200 border-slate-800'
    }`}>
      {/* Helpline Alert Banner */}
      <div className={`border-b ${isHighContrast ? 'bg-neutral-900 border-neutral-700' : 'bg-slate-950 border-slate-800'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <PhoneCall className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">24x7 Government Citizen Helplines (Toll-Free)</h4>
                <p className="text-xs text-slate-400">Official assistance directly from authorized statutory authorities</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-semibold">
              <a 
                href="tel:1947" 
                id="footer-call-uidai-btn"
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition flex items-center gap-1.5"
              >
                <span>UIDAI Aadhaar:</span> <strong className="text-white text-sm">1947</strong>
              </a>
              <a 
                href="tel:18001801961" 
                id="footer-call-incometax-btn"
                className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 border border-slate-700 transition flex items-center gap-1.5"
              >
                <span>Income Tax / PAN:</span> <strong className="text-white text-sm">1800 180 1961</strong>
              </a>
              <a 
                href="tel:1930" 
                id="footer-call-cyber-btn"
                className="px-3 py-1.5 rounded bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 transition flex items-center gap-1.5"
              >
                <span>Cyber Fraud Helpline:</span> <strong className="text-white text-sm">1930</strong>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Purpose */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
                GOI
              </div>
              <span className="font-bold text-base text-white">Digital Citizen Training</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Empowering citizens across India to safely access, verify, and link essential digital identification and educational documents without falling prey to unauthorized middlemen or cyber fraud.
            </p>
            <div className="pt-2 flex items-center gap-2 text-emerald-400 text-xs font-medium">
              <Shield className="w-4 h-4" />
              <span>IT Act 2000 & Rule 9A Verified</span>
            </div>
          </div>

          {/* Quick Tutorials */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Step-by-Step Guides</span>
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('digilocker')} className="hover:text-amber-300 transition text-left">
                  • Create DigiLocker & Set 6-Digit PIN
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('digilocker')} className="hover:text-amber-300 transition text-left">
                  • Fetch Driving License & RC in DigiLocker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('aadhaar')} className="hover:text-amber-300 transition text-left">
                  • Download e-Aadhaar & PDF Password Format
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('aadhaar')} className="hover:text-amber-300 transition text-left">
                  • Update Address Online in myAadhaar
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('pan')} className="hover:text-amber-300 transition text-left">
                  • Link PAN with Aadhaar (₹1000 Challan Head 500)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('pan')} className="hover:text-amber-300 transition text-left">
                  • Get Instant Free e-PAN in 10 Minutes
                </button>
              </li>
            </ul>
          </div>

          {/* Interactive Tools */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Citizen Assistance Tools</span>
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigateTab('simulator')} className="hover:text-amber-300 transition text-left">
                  • Practice Lab: Mock Document Fetching
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('checker')} className="hover:text-amber-300 transition text-left">
                  • Document Prerequisite & Eligibility Checker
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('faq')} className="hover:text-amber-300 transition text-left">
                  • Ask a Question / Create Help Desk Ticket
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('quiz')} className="hover:text-amber-300 transition text-left">
                  • Digital Safety Quiz & Certificate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigateTab('aadhaar')} className="hover:text-amber-300 transition text-left">
                  • e-Aadhaar Password Decoder Tool
                </button>
              </li>
            </ul>
          </div>

          {/* Verified Official Portals */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Government Portals</span>
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="https://www.digilocker.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  DigiLocker Official Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://myaadhaar.uidai.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  UIDAI myAadhaar Portal <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://www.incometax.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  Income Tax e-Filing (PAN) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://parivahan.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  mParivahan (Driving License & RC) <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://cybercrime.gov.in" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                  National Cyber Crime Reporting <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Citizen Safety Notice */}
        <div className="mt-8 pt-6 border-t border-slate-800 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <p>
            <strong className="text-slate-300">Statutory Notice & Educational Disclaimer:</strong> {t.officialDisclaimer} This training website is an open-access public resource created to provide clear instructions and reduce reliance on predatory cyber cafes. No private biometric data or Aadhaar OTPs are stored on this application.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-500">
            <span>© 2026 Digital Citizen Training & Assistance Initiative • India</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> SSL 256-Bit Standard</span>
              <span className="flex items-center gap-1"><Globe className="w-3 h-3" /> Digital India Aligned</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
