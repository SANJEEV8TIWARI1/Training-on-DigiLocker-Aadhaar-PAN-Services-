import React, { useState } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Laptop, 
  CheckCircle2, 
  HelpCircle, 
  Award, 
  ArrowRight, 
  Search, 
  Sparkles, 
  Lock, 
  FileBadge2, 
  PhoneCall, 
  ExternalLink,
  Info,
  Check
} from 'lucide-react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { SERVICE_GUIDES } from '../data/guideData';
import { FAQ_DATA } from '../data/faqData';
import { PasswordTool } from './PasswordTool';
import { AdminLiveHomeWidget } from './AdminLiveHomeWidget';
import { useAuth } from '../context/AuthContext';

interface HomeHeroProps {
  language: Language;
  isHighContrast: boolean;
  onNavigateTab: (tab: ActiveTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onOpenAdminPortal?: () => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({
  language,
  isHighContrast,
  onNavigateTab,
  searchQuery,
  setSearchQuery,
  onOpenAdminPortal
}) => {
  const { isAdmin } = useAuth();
  const t = TRANSLATIONS[language];
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'digilocker' | 'aadhaar' | 'pan'>('all');

  // Search matching across guides and FAQs
  const searchResults = searchQuery.trim() === '' ? [] : [
    ...SERVICE_GUIDES.filter(g => 
      g.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.steps.some(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.description.toLowerCase().includes(searchQuery.toLowerCase()))
    ).map(g => ({
      type: 'guide' as const,
      id: g.id,
      tab: g.category as ActiveTab,
      title: g.title,
      desc: g.summary,
      badge: g.category.toUpperCase()
    })),
    ...FAQ_DATA.filter(f => 
      f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    ).map(f => ({
      type: 'faq' as const,
      id: f.id,
      tab: 'faq' as ActiveTab,
      title: f.question,
      desc: f.answer.slice(0, 140) + '...',
      badge: `FAQ: ${f.category.toUpperCase()}`
    }))
  ];

  return (
    <div className="space-y-10">
      {/* Top Hero Section */}
      <div className={`relative overflow-hidden rounded-2xl border transition-all ${
        isHighContrast 
          ? 'bg-neutral-950 border-yellow-400 text-yellow-300' 
          : 'bg-gradient-to-b from-blue-900 via-blue-950 to-slate-900 text-white border-blue-900 shadow-lg'
      }`}>
        {/* Background Subtle Geometric Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <div className="relative max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase bg-blue-500/20 text-amber-300 border border-blue-400/30 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Digital India Citizen Literacy & Assistance</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            {t.heroHeading}
          </h2>

          {/* Subheading */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            {t.heroSubheading}
          </p>

          {/* Global Search Bar */}
          <div className="max-w-2xl mx-auto relative pt-2">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                id="homepage-main-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className={`w-full pl-12 pr-10 py-3.5 rounded-xl text-sm font-medium border shadow-md focus:outline-none transition ${
                  isHighContrast
                    ? 'bg-black border-yellow-400 text-yellow-300 focus:ring-2 focus:ring-yellow-400 placeholder-yellow-600'
                    : 'bg-white text-slate-900 border-slate-200 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 text-xs text-slate-400 hover:text-slate-600 p-1 rounded font-bold"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Live Search Instant Dropdown Results */}
            {searchResults.length > 0 && (
              <div className={`absolute left-0 right-0 top-full mt-2 rounded-xl border shadow-xl z-30 max-h-96 overflow-y-auto text-left divide-y ${
                isHighContrast 
                  ? 'bg-black border-yellow-400 divide-neutral-800 text-yellow-300' 
                  : 'bg-white border-slate-200 divide-slate-100 text-slate-900'
              }`}>
                <div className="px-4 py-2 text-xs font-bold text-slate-400 bg-slate-50 flex items-center justify-between">
                  <span>Found {searchResults.length} relevant guides and answers</span>
                  <span className="text-[10px] text-slate-400">Click to open</span>
                </div>
                {searchResults.slice(0, 6).map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onNavigateTab(item.tab);
                      setSearchQuery('');
                    }}
                    className={`w-full p-4 text-left transition flex items-start justify-between gap-3 ${
                      isHighContrast ? 'hover:bg-neutral-900' : 'hover:bg-blue-50/70'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                          {item.badge}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 hover:text-blue-700">
                          {item.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{item.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            {isAdmin && onOpenAdminPortal && (
              <button
                id="hero-admin-portal-shortcut-btn"
                onClick={onOpenAdminPortal}
                className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white shadow-md transition flex items-center gap-2 border border-red-500/80 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>Open Admin Portal & Logins Data</span>
              </button>
            )}
            <button
              id="hero-explore-tutorials-btn"
              onClick={() => onNavigateTab('digilocker')}
              className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm transition flex items-center gap-2"
            >
              <span>{t.startLearning}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              id="hero-try-simulator-btn"
              onClick={() => onNavigateTab('simulator')}
              className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-blue-700 hover:bg-blue-600 text-white border border-blue-500 shadow-sm transition flex items-center gap-2"
            >
              <Laptop className="w-4 h-4 text-amber-300" />
              <span>{t.trySimulator}</span>
            </button>
            <button
              id="hero-check-requirements-btn"
              onClick={() => onNavigateTab('checker')}
              className="px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 shadow-sm transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{t.checkRequirements}</span>
            </button>
          </div>
        </div>

        {/* Security & Official Advisory Strip */}
        <div className="border-t border-white/10 bg-black/30 px-6 py-3 text-xs text-slate-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2 text-amber-300 font-semibold">
            <Lock className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{t.safetyBanner}</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <span>✓ IT Act 2000 Recognized</span>
            <span>✓ Zero Broker Fees</span>
            <span>✓ Official Portals Only</span>
          </div>
        </div>
      </div>

      {/* Admin Real-Time Logins Monitor Widget (Visible to Administrators on Home Page) */}
      {isAdmin && onOpenAdminPortal && (
        <AdminLiveHomeWidget
          onOpenAdminPortal={onOpenAdminPortal}
          onNavigateTab={onNavigateTab}
          isHighContrast={isHighContrast}
        />
      )}

      {/* Core 3 Pillar Service Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-xl font-bold tracking-tight ${isHighContrast ? 'text-yellow-300' : 'text-slate-900'}`}>
              {t.quickServices}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Select a service below for comprehensive step-by-step walkthroughs and error solutions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* DigiLocker Card */}
          <div className={`rounded-xl border p-6 flex flex-col justify-between transition-all hover:shadow-md ${
            isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-lg border border-blue-200">
                  DL
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                  Free • 100% Legal
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">DigiLocker Wallet</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t.digilockerDesc}
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Account Setup & 6-Digit PIN</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Fetch Driving License & Vehicle RC</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>CBSE Class X / XII Marksheets</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                id="card-digilocker-guide-btn"
                onClick={() => onNavigateTab('digilocker')}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-blue-800 hover:bg-blue-900 text-white transition text-center shadow-xs"
              >
                {t.viewGuide}
              </button>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="p-2 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                title="Try DigiLocker Simulator"
              >
                <Laptop className="w-4 h-4 text-blue-700" />
              </button>
            </div>
          </div>

          {/* Aadhaar Card */}
          <div className={`rounded-xl border p-6 flex flex-col justify-between transition-all hover:shadow-md ${
            isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black text-lg border border-emerald-200">
                  UID
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-300">
                  UIDAI myAadhaar
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">Aadhaar Services</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t.aadhaarDesc}
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Download e-Aadhaar & Password Guide</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Online Address Update (₹50 Fee)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Lock/Unlock Biometrics & VID</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                id="card-aadhaar-guide-btn"
                onClick={() => onNavigateTab('aadhaar')}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-emerald-800 hover:bg-emerald-900 text-white transition text-center shadow-xs"
              >
                {t.viewGuide}
              </button>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="p-2 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                title="Try e-Aadhaar Simulator"
              >
                <Laptop className="w-4 h-4 text-emerald-700" />
              </button>
            </div>
          </div>

          {/* PAN Card Card */}
          <div className={`rounded-xl border p-6 flex flex-col justify-between transition-all hover:shadow-md ${
            isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-black text-lg border border-indigo-200">
                  PAN
                </div>
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                  Income Tax Dept
                </span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900">PAN Card & Linking</h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {t.panDesc}
                </p>
              </div>
              <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Link PAN with Aadhaar (₹1000 Challan)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Free Instant e-PAN in 10 Mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Demographic Mismatch Corrections</span>
                </div>
              </div>
            </div>

            <div className="pt-6 mt-4 border-t border-slate-100 flex items-center gap-2">
              <button
                id="card-pan-guide-btn"
                onClick={() => onNavigateTab('pan')}
                className="flex-1 py-2 rounded-lg text-xs font-bold bg-indigo-800 hover:bg-indigo-900 text-white transition text-center shadow-xs"
              >
                {t.viewGuide}
              </button>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="p-2 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 transition"
                title="Try PAN-Aadhaar Simulator"
              >
                <Laptop className="w-4 h-4 text-indigo-700" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Direct Government Portals Quick Access Launchpad */}
      <div className={`p-6 rounded-2xl border ${
        isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-white border-blue-200 text-slate-900 shadow-md'
      }`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-1">
              <ExternalLink className="w-4 h-4 text-blue-600" />
              <span>Direct Government Access Hub</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Original Verified Service Portals (UIDAI & Income Tax)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Access real-world government services directly through official encrypted portals (<code className="font-mono text-blue-700">.gov.in</code>).
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('portals')}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold transition shadow-xs shrink-0 self-start sm:self-center"
          >
            <span>View All 15+ Official Portals</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Link PAN with Aadhaar */}
          <a
            href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all bg-slate-50/70 hover:bg-white flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800">
                  Income Tax Dept
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 transition" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition">
                Link PAN with Aadhaar
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Submit your official PAN-Aadhaar linkage request with ₹1000 challan reference.
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-blue-700 flex items-center gap-1 group-hover:underline">
              Open e-Filing Portal &rarr;
            </span>
          </a>

          {/* Download e-Aadhaar */}
          <a
            href="https://myaadhaar.uidai.gov.in/gen-ae-id/download-aadhaar"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-slate-50/70 hover:bg-white flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  UIDAI (myAadhaar)
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 transition" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition">
                Download e-Aadhaar Card
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Download authentic digital PDF copy using Aadhaar number and registered mobile OTP.
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-emerald-700 flex items-center gap-1 group-hover:underline">
              Open myAadhaar &rarr;
            </span>
          </a>

          {/* Check PAN Link Status */}
          <a
            href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-indigo-500 hover:shadow-md transition-all bg-slate-50/70 hover:bg-white flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  Status Check
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 transition" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700 transition">
                Check PAN Link Status
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Instant check to verify if your PAN is already linked and operative.
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-indigo-700 flex items-center gap-1 group-hover:underline">
              Check Status Online &rarr;
            </span>
          </a>

          {/* Instant Free e-PAN */}
          <a
            href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan/getNewEPan"
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-xl border border-slate-200 hover:border-amber-500 hover:shadow-md transition-all bg-slate-50/70 hover:bg-white flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  100% Free
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-600 transition" />
              </div>
              <h4 className="text-sm font-bold text-slate-900 group-hover:text-amber-700 transition">
                Instant e-PAN Allotment
              </h4>
              <p className="text-xs text-slate-500 line-clamp-2">
                Paperless PAN allotment in 10 minutes via Aadhaar e-KYC for new applicants.
              </p>
            </div>
            <span className="mt-3 text-[11px] font-semibold text-amber-800 flex items-center gap-1 group-hover:underline">
              Apply Free e-PAN &rarr;
            </span>
          </a>
        </div>
      </div>

      {/* Interactive Feature: Password Generator Tool */}
      <PasswordTool language={language} isHighContrast={isHighContrast} />

      {/* Practice Sandbox & Prerequisite Checker Spotlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className={`p-6 rounded-xl border flex flex-col justify-between ${
          isHighContrast ? 'bg-neutral-900 border-yellow-400' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
              <Laptop className="w-4 h-4" />
              <span>Interactive Training Sandbox</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">Practice Simulator Lab</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hesitant to apply on the live government portal? Use our zero-risk practice lab to simulate fetching marksheets in DigiLocker, downloading e-Aadhaar, and submitting a PAN-Aadhaar linkage request.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('simulator')}
            className="mt-5 py-2.5 px-4 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Launch Practice Simulator</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className={`p-6 rounded-xl border flex flex-col justify-between ${
          isHighContrast ? 'bg-neutral-900 border-yellow-400' : 'bg-slate-50 border-slate-200'
        }`}>
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>Document Readiness Advisor</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900">Prerequisite & Eligibility Checker</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find out exactly what documents you need, the official government fees, and estimated delivery times before visiting an Aadhaar Kendra or applying online.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('checker')}
            className="mt-5 py-2.5 px-4 rounded-lg bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
          >
            <span>Check Document Requirements</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Citizen Safety Principles */}
      <div className={`p-6 rounded-xl border ${
        isHighContrast ? 'bg-black border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 text-slate-900'
      }`}>
        <div className="flex items-center gap-2 text-blue-700 font-bold text-xs uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>Citizen Rights & Safety Best Practices</span>
        </div>
        <h4 className="text-lg font-bold text-slate-900 mb-4">
          Four Golden Rules for Handling Digital Government IDs
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-blue-900">1. Legal Parity (Rule 9A)</div>
            <p className="text-slate-600">
              DigiLocker issued certificates are legally equivalent to original physical papers under IT Act 2000. Authorities cannot insist on paper if you present DigiLocker.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-rose-900">2. Never Share OTPs</div>
            <p className="text-slate-600">
              Neither UIDAI nor Income Tax officials ever call asking for OTPs or PINs. Never share OTP with cyber cafes or strangers.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-emerald-900">3. Official Pricing</div>
            <p className="text-slate-600">
              DigiLocker & Instant e-PAN are 100% FREE. Aadhaar address update is only ₹50. Do not pay ₹300-₹500 to unauthorized agents.
            </p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 space-y-1.5">
            <div className="font-bold text-indigo-900">4. Masked Aadhaar Safety</div>
            <p className="text-slate-600">
              Use 'Masked Aadhaar' (showing only XXXX-XXXX-1234) for hotel check-ins and travel to safeguard your privacy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
