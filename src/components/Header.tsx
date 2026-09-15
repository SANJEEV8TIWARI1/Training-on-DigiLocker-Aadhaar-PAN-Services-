import React, { useState } from 'react';
import { ActiveTab, Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { useAuth } from '../context/AuthContext';
import { 
  FileText, 
  ShieldCheck, 
  CreditCard, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  Award, 
  Laptop, 
  Menu, 
  X, 
  Globe, 
  PhoneCall, 
  SunMedium, 
  Moon,
  Sparkles,
  ExternalLink,
  User,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSizeLevel: number;
  setFontSizeLevel: (fn: (prev: number) => number) => void;
  isHighContrast: boolean;
  setIsHighContrast: (fn: (prev: boolean) => boolean) => void;
  onOpenSearch: () => void;
  onOpenProfile: () => void;
  onOpenAdminPortal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  fontSizeLevel,
  setFontSizeLevel,
  isHighContrast,
  setIsHighContrast,
  onOpenSearch,
  onOpenProfile,
  onOpenAdminPortal
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();
  const t = TRANSLATIONS[language];

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: t.navHome, icon: <FileText className="w-4 h-4" /> },
    { id: 'portals', label: t.navPortals, icon: <ExternalLink className="w-4 h-4 text-cyan-500" />, badge: "Govt Links" },
    { id: 'digilocker', label: t.navDigiLocker, icon: <FileText className="w-4 h-4 text-blue-500" />, badge: "Free" },
    { id: 'aadhaar', label: t.navAadhaar, icon: <ShieldCheck className="w-4 h-4 text-emerald-500" /> },
    { id: 'pan', label: t.navPan, icon: <CreditCard className="w-4 h-4 text-indigo-500" /> },
    { id: 'simulator', label: t.navSimulator, icon: <Laptop className="w-4 h-4 text-amber-500" />, badge: "Practice" },
    { id: 'checker', label: t.navChecker, icon: <CheckCircle2 className="w-4 h-4 text-teal-500" /> },
    { id: 'faq', label: t.navFaq, icon: <HelpCircle className="w-4 h-4 text-sky-500" /> },
    { id: 'quiz', label: t.navQuiz, icon: <Award className="w-4 h-4 text-amber-600" /> },
  ];

  return (
    <header className={`w-full shadow-md sticky top-0 z-50 transition-colors ${
      isHighContrast ? 'bg-black text-yellow-300 border-b-2 border-yellow-400' : 'bg-white text-slate-900 border-b border-slate-200'
    }`}>
      {/* Top Tricolor Accent Line */}
      <div className="h-1.5 w-full flex">
        <div className="w-1/3 bg-amber-500" />
        <div className="w-1/3 bg-white" />
        <div className="w-1/3 bg-emerald-600" />
      </div>

      {/* Accessibility & Government Identity Bar */}
      <div className={`px-4 sm:px-6 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 border-b ${
        isHighContrast ? 'bg-neutral-900 border-neutral-700 text-yellow-300' : 'bg-slate-900 text-slate-200 border-slate-800'
      }`}>
        <div className="flex items-center gap-3">
          <span className="font-semibold tracking-wide flex items-center gap-1.5 text-slate-100">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            {t.govtTagline}
          </span>
          <span className="hidden md:inline text-slate-400">|</span>
          <span className="hidden md:flex items-center gap-2 text-amber-300 font-medium">
            <PhoneCall className="w-3.5 h-3.5" />
            <span>UIDAI: <strong>1947</strong> • IT/PAN: <strong>1800 180 1961</strong> • Cyber Fraud: <strong>1930</strong></span>
          </span>
        </div>

        {/* Controls: Font Size, High Contrast, Language */}
        <div className="flex items-center gap-3">
          {/* Font Resizer */}
          <div className="flex items-center bg-slate-800/80 rounded px-1 py-0.5 border border-slate-700">
            <button 
              id="font-decrease-btn"
              onClick={() => setFontSizeLevel(prev => Math.max(prev - 1, -1))}
              className={`px-1.5 py-0.5 font-bold hover:text-white transition ${fontSizeLevel === -1 ? 'text-amber-400' : 'text-slate-300'}`}
              title="Decrease Font Size"
              aria-label="Decrease Font Size"
            >
              A-
            </button>
            <button 
              id="font-reset-btn"
              onClick={() => setFontSizeLevel(() => 0)}
              className={`px-1.5 py-0.5 font-bold hover:text-white transition ${fontSizeLevel === 0 ? 'text-amber-400' : 'text-slate-300'}`}
              title="Standard Font Size"
              aria-label="Standard Font Size"
            >
              A
            </button>
            <button 
              id="font-increase-btn"
              onClick={() => setFontSizeLevel(prev => Math.min(prev + 1, 2))}
              className={`px-1.5 py-0.5 font-bold hover:text-white transition ${fontSizeLevel >= 1 ? 'text-amber-400' : 'text-slate-300'}`}
              title="Increase Font Size"
              aria-label="Increase Font Size"
            >
              A+
            </button>
          </div>

          {/* High Contrast Toggle */}
          <button
            id="high-contrast-toggle-btn"
            onClick={() => setIsHighContrast(prev => !prev)}
            className="flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800/80 border border-slate-700 hover:bg-slate-700 text-slate-200 transition"
            title="Toggle High Contrast Mode"
            aria-label="Toggle High Contrast Mode"
          >
            {isHighContrast ? <SunMedium className="w-3.5 h-3.5 text-yellow-300" /> : <Moon className="w-3.5 h-3.5 text-slate-300" />}
            <span className="hidden sm:inline text-[11px]">{isHighContrast ? 'Standard' : 'Contrast'}</span>
          </button>

          {/* Language Selector */}
          <div className="flex items-center gap-1.5 bg-slate-800/90 rounded px-2 py-0.5 border border-slate-700">
            <Globe className="w-3.5 h-3.5 text-amber-400" />
            <select
              id="language-select-dropdown"
              value={language}
              onChange={(e) => setLanguage(e.target.value as Language)}
              className="bg-transparent text-slate-100 text-xs font-medium focus:outline-none cursor-pointer"
              aria-label="Select Language"
            >
              <option value="en" className="bg-slate-800 text-white">English</option>
              <option value="hi" className="bg-slate-800 text-white">हिन्दी (Hindi)</option>
              <option value="bn" className="bg-slate-800 text-white">বাংলা (Bengali)</option>
              <option value="ta" className="bg-slate-800 text-white">தமிழ் (Tamil)</option>
              <option value="te" className="bg-slate-800 text-white">తెలుగు (Telugu)</option>
              <option value="mr" className="bg-slate-800 text-white">मराठी (Marathi)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Emblem & Logo */}
        <button 
          id="brand-home-logo-btn"
          onClick={() => setActiveTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none group"
        >
          <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 flex items-center justify-center text-white shadow-sm border border-blue-600/30 group-hover:scale-105 transition-transform">
            <div className="flex flex-col items-center justify-center leading-none">
              <span className="text-[10px] font-black text-amber-300 tracking-wider">INDIA</span>
              <span className="text-base font-extrabold tracking-tight">eDoc</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className={`font-bold text-base sm:text-lg leading-tight tracking-tight ${
                isHighContrast ? 'text-yellow-300' : 'text-slate-900'
              }`}>
                {t.portalName}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                <Sparkles className="w-2.5 h-2.5" /> Citizen Guide
              </span>
            </div>
            <p className={`text-xs ${isHighContrast ? 'text-yellow-100' : 'text-slate-500'} font-medium`}>
              {t.portalSubtitle}
            </p>
          </div>
        </button>

        {/* Global Search Button & Desktop Nav Actions */}
        <div className="flex items-center gap-2">
          <button
            id="quick-search-trigger-btn"
            onClick={onOpenSearch}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium border transition ${
              isHighContrast 
                ? 'bg-neutral-800 border-yellow-400 text-yellow-300 hover:bg-neutral-700' 
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300'
            }`}
            title="Search guides and FAQs"
            aria-label="Search guides and FAQs"
          >
            <Search className="w-4 h-4 text-blue-600" />
            <span className="hidden md:inline">{t.searchPlaceholder.slice(0, 32)}...</span>
            <span className="inline md:hidden">Search</span>
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-200 text-slate-400 shadow-2xs">
              /
            </kbd>
          </button>

          {/* Citizen User Profile Badge & Sign Out */}
          {user && (
            <div className="flex items-center gap-1.5">
              {isAdmin && onOpenAdminPortal && (
                <button
                  id="admin-portal-header-btn"
                  onClick={onOpenAdminPortal}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-950 text-red-300 hover:bg-red-900 border border-red-800 text-xs font-bold transition cursor-pointer shadow-2xs"
                  title="Open Admin Command Center"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="hidden sm:inline">Admin Portal</span>
                </button>
              )}

              <button
                id="user-profile-header-btn"
                onClick={onOpenProfile}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  isHighContrast
                    ? 'bg-neutral-800 border-yellow-400 text-yellow-300 hover:bg-neutral-700'
                    : 'bg-orange-50/80 border-orange-200 text-slate-800 hover:bg-orange-100 hover:border-orange-300 shadow-2xs'
                }`}
                title="View Citizen Profile & Training Records"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Citizen'}
                    className="w-5 h-5 rounded-full object-cover border border-orange-400"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-[10px]">
                    {(user.displayName || user.email || 'C')[0].toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:inline font-semibold max-w-[100px] truncate">
                  {user.displayName || user.email?.split('@')[0] || 'Citizen'}
                </span>
              </button>

              <button
                id="header-logout-btn"
                onClick={logout}
                className={`p-2 rounded-lg border transition text-xs ${
                  isHighContrast
                    ? 'border-yellow-400 text-yellow-300 hover:bg-red-900/50'
                    : 'border-slate-200 text-slate-500 hover:text-red-600 hover:bg-red-50 hover:border-red-200'
                }`}
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setIsMobileMenuOpen(prev => !prev)}
            className={`md:hidden p-2 rounded-lg border ${
              isHighContrast ? 'border-yellow-400 text-yellow-300' : 'border-slate-200 text-slate-700'
            }`}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Desktop Navigation Tabs */}
      <nav className={`hidden md:block border-t ${
        isHighContrast ? 'border-neutral-800 bg-neutral-950' : 'border-slate-100 bg-slate-50/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center space-x-1 lg:space-x-2 py-1 overflow-x-auto scrollbar-none">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <li key={item.id}>
                  <button
                    id={`nav-tab-${item.id}`}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all whitespace-nowrap relative ${
                      isActive
                        ? isHighContrast
                          ? 'bg-yellow-400 text-black shadow-sm font-bold'
                          : 'bg-blue-800 text-white shadow-xs'
                        : isHighContrast
                          ? 'text-yellow-300 hover:bg-neutral-800'
                          : 'text-slate-700 hover:text-blue-900 hover:bg-slate-200/70'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${
                        isActive 
                          ? 'bg-white/20 text-white' 
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className={`md:hidden border-t px-4 pt-2 pb-4 space-y-1 ${
          isHighContrast ? 'bg-black border-yellow-400' : 'bg-slate-50 border-slate-200'
        }`}>
          {user && (
            <div className="p-3 mb-2 rounded-xl bg-slate-900 text-white flex items-center justify-between border border-slate-800">
              <div className="flex items-center gap-2.5">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Citizen'}
                    className="w-8 h-8 rounded-full object-cover border border-orange-400"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs">
                    {(user.displayName || user.email || 'C')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold">{user.displayName || 'Citizen User'}</p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[160px]">{user.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {isAdmin && onOpenAdminPortal && (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenAdminPortal();
                    }}
                    className="p-1.5 rounded-lg bg-red-900 text-amber-300 text-xs font-bold border border-red-700"
                  >
                    Admin
                  </button>
                )}
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenProfile();
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-200 text-xs font-medium hover:bg-slate-700"
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    logout();
                  }}
                  className="p-1.5 rounded-lg bg-red-950/80 text-red-300 border border-red-800/60"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-tab-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? isHighContrast
                      ? 'bg-yellow-400 text-black font-bold'
                      : 'bg-blue-800 text-white'
                    : isHighContrast
                      ? 'text-yellow-300 hover:bg-neutral-800'
                      : 'text-slate-700 hover:bg-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-2 border-t border-slate-200 mt-2 text-xs text-slate-500 space-y-1">
            <p className="font-semibold text-slate-700">Citizen Helpline Directory:</p>
            <p>Aadhaar: 1947 | PAN: 1800 180 1961 | Cyber: 1930</p>
          </div>
        </div>
      )}
    </header>
  );
};
