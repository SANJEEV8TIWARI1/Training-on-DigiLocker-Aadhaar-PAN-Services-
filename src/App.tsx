import React, { useState, useEffect } from 'react';
import { ActiveTab, Language } from './types';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AuthPage } from './components/AuthPage';
import { AdminPortal } from './components/AdminPortal';
import { UserProfileModal } from './components/UserProfileModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { DigiLockerGuide } from './components/DigiLockerGuide';
import { AadhaarGuide } from './components/AadhaarGuide';
import { PanGuide } from './components/PanGuide';
import { PracticeSimulator } from './components/PracticeSimulator';
import { RequirementChecker } from './components/RequirementChecker';
import { FaqSupport } from './components/FaqSupport';
import { CitizenQuiz } from './components/CitizenQuiz';
import { OfficialPortalsDirectory } from './components/OfficialPortalsDirectory';
import { SERVICE_GUIDES } from './data/guideData';
import { FAQ_DATA } from './data/faqData';
import { OFFICIAL_PORTALS_DATA } from './data/officialPortalsData';
import { Search, X, ArrowRight, Sparkles, Shield, Loader2 } from 'lucide-react';

function CitizenPortalApp() {
  const { user, isAdmin, loading } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [language, setLanguage] = useState<Language>('en');
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(0);
  const [isHighContrast, setIsHighContrast] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [modalSearchText, setModalSearchText] = useState<string>('');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isAdminViewOpen, setIsAdminViewOpen] = useState<boolean>(false);

  // If user is admin and logs in for the first time in this session, open admin portal view
  useEffect(() => {
    if (isAdmin) {
      setIsAdminViewOpen(true);
    }
  }, [isAdmin]);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Keyboard shortcut '/' to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchModalOpen && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      } else if (e.key === 'Escape' && isSearchModalOpen) {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchModalOpen]);

  // Font size multiplier class
  const getFontSizeClass = () => {
    if (fontSizeLevel === -1) return 'text-sm';
    if (fontSizeLevel === 1) return 'text-base';
    if (fontSizeLevel === 2) return 'text-lg';
    return '';
  };

  // Search Results for Global Modal
  const modalSearchResults = modalSearchText.trim() === '' ? [] : [
    ...OFFICIAL_PORTALS_DATA.filter(p =>
      p.serviceName.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      p.department.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      p.description.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      p.tags.some(tag => tag.toLowerCase().includes(modalSearchText.toLowerCase()))
    ).map(p => ({
      id: p.id,
      tab: 'portals' as ActiveTab,
      title: `${p.serviceName} (Official Link)`,
      desc: `${p.department} • ${p.description}`,
      badge: 'OFFICIAL PORTAL'
    })),
    ...SERVICE_GUIDES.filter(g => 
      g.title.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      g.summary.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      g.steps.some(s => s.title.toLowerCase().includes(modalSearchText.toLowerCase()) || s.description.toLowerCase().includes(modalSearchText.toLowerCase()))
    ).map(g => ({
      id: g.id,
      tab: g.category as ActiveTab,
      title: g.title,
      desc: g.summary,
      badge: g.category.toUpperCase()
    })),
    ...FAQ_DATA.filter(f => 
      f.question.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      f.answer.toLowerCase().includes(modalSearchText.toLowerCase()) ||
      f.tags.some(tag => tag.toLowerCase().includes(modalSearchText.toLowerCase()))
    ).map(f => ({
      id: f.id,
      tab: 'faq' as ActiveTab,
      title: f.question,
      desc: f.answer.slice(0, 120) + '...',
      badge: `FAQ (${f.category.toUpperCase()})`
    }))
  ];

  // Loading state while checking Firebase Auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white px-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-orange-500 via-amber-500 to-emerald-600 p-0.5 shadow-xl mb-4 animate-bounce">
          <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
            <Shield className="w-7 h-7 text-orange-400" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-300">
          <Loader2 className="w-4 h-4 text-orange-400 animate-spin" />
          <span>Verifying Citizen Authentication Session...</span>
        </div>
      </div>
    );
  }

  // Auth Wall: If user is not signed in, show Auth Page before seeing home page
  if (!user) {
    return <AuthPage currentLanguage={language} onLanguageChange={setLanguage} />;
  }

  // Admin View: If admin is logged in and Admin View is toggled on
  if (isAdmin && isAdminViewOpen) {
    return (
      <AdminPortal
        onBackToCitizenPortal={() => setIsAdminViewOpen(false)}
        language={language}
      />
    );
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors ${
      isHighContrast ? 'bg-black text-yellow-300' : 'bg-slate-50 text-slate-900'
    } ${getFontSizeClass()}`}>
      
      {/* Header with Navigation & Accessibility Bar */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        language={language}
        setLanguage={setLanguage}
        fontSizeLevel={fontSizeLevel}
        setFontSizeLevel={setFontSizeLevel}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        onOpenSearch={() => setIsSearchModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenAdminPortal={() => setIsAdminViewOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'home' && (
          <HomeHero
            language={language}
            isHighContrast={isHighContrast}
            onNavigateTab={setActiveTab}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onOpenAdminPortal={() => setIsAdminViewOpen(true)}
          />
        )}

        {activeTab === 'portals' && (
          <OfficialPortalsDirectory
            onNavigateToTab={setActiveTab}
          />
        )}

        {activeTab === 'digilocker' && (
          <DigiLockerGuide
            language={language}
            isHighContrast={isHighContrast}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'aadhaar' && (
          <AadhaarGuide
            language={language}
            isHighContrast={isHighContrast}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'pan' && (
          <PanGuide
            language={language}
            isHighContrast={isHighContrast}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'simulator' && (
          <PracticeSimulator
            language={language}
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'checker' && (
          <RequirementChecker
            language={language}
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'faq' && (
          <FaqSupport
            language={language}
            isHighContrast={isHighContrast}
          />
        )}

        {activeTab === 'quiz' && (
          <CitizenQuiz
            language={language}
            isHighContrast={isHighContrast}
          />
        )}
      </main>

      {/* Global Quick Search Modal */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4">
          <div className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden ${
            isHighContrast ? 'bg-black border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            <div className="p-4 border-b border-slate-200 flex items-center gap-3">
              <Search className="w-5 h-5 text-blue-600 shrink-0" />
              <input
                id="global-modal-search-input"
                type="text"
                autoFocus
                value={modalSearchText}
                onChange={(e) => setModalSearchText(e.target.value)}
                placeholder="Search tutorials, fees, error fixes, or e-Aadhaar passwords..."
                className="w-full text-sm font-medium focus:outline-none bg-transparent"
              />
              <button
                onClick={() => setIsSearchModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 font-bold"
                title="Close Search Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto divide-y divide-slate-100 p-2">
              {modalSearchText.trim() === '' ? (
                <div className="p-6 text-center text-xs text-slate-500 space-y-2">
                  <div className="flex items-center justify-center gap-1 text-slate-400 font-semibold">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Popular Search Queries:</span>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    {["Link PAN with Aadhaar", "e-Aadhaar password", "Fetch Marksheet in DigiLocker", "Address Update Fee", "Mobile Number Update"].map((term, i) => (
                      <button
                        key={i}
                        onClick={() => setModalSearchText(term)}
                        className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              ) : modalSearchResults.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  No matching guides or FAQs found for "{modalSearchText}".
                </div>
              ) : (
                modalSearchResults.map((res, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setActiveTab(res.tab);
                      setIsSearchModalOpen(false);
                      setModalSearchText('');
                    }}
                    className="w-full p-3.5 text-left hover:bg-blue-50/70 rounded-xl transition flex items-start justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                          {res.badge}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-700">
                          {res.title}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 line-clamp-1">{res.desc}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-blue-600 shrink-0 mt-1" />
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Citizen User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        language={language}
      />

      {/* Official Government Aesthetic Footer */}
      <Footer
        language={language}
        isHighContrast={isHighContrast}
        onNavigateTab={setActiveTab}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CitizenPortalApp />
    </AuthProvider>
  );
}
