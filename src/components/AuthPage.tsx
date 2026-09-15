import React, { useState } from 'react';
import { 
  Shield, 
  Lock, 
  Mail, 
  User as UserIcon, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  PhoneCall, 
  BookOpen, 
  Award, 
  FileText,
  KeyRound,
  ShieldAlert,
  ShieldCheck,
  Zap,
  ExternalLink,
  Info,
  HelpCircle,
  Copy,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface AuthPageProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ currentLanguage, onLanguageChange }) => {
  const { 
    signInWithEmail, 
    signUpWithEmail, 
    signInWithGoogle, 
    resetPassword, 
    error: authError, 
    clearError 
  } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup' | 'admin' | 'forgot'>('signin');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccessMessage, setResetSuccessMessage] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const currentHostname = typeof window !== 'undefined' ? window.location.hostname : '';
  const firebaseSettingsUrl = 'https://console.firebase.google.com/project/training-digilocker-adhar-pan/authentication/settings';

  const copyDomain = () => {
    if (currentHostname) {
      navigator.clipboard.writeText(currentHostname);
      setCopiedDomain(true);
      setTimeout(() => setCopiedDomain(false), 3000);
    }
  };

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  const t = TRANSLATIONS[currentLanguage] || TRANSLATIONS.en;

  const languages: { code: Language; label: string; native: string }[] = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
    { code: 'bn', label: 'Bengali', native: 'বাংলা' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
  ];

  // Quick fill Admin credentials
  const fillAdminCredentials = () => {
    setEmail('sanjeevtiwari5530@gmail.com');
    setPassword('S@njeev9833');
    setLocalError(null);
    clearError();
  };

  // Quick fill Citizen Demo credentials
  const fillCitizenCredentials = () => {
    setEmail('citizen.demo@diginagrik.gov.in');
    setPassword('Citizen@2026');
    setFullName('Rajesh Sharma');
    setLocalError(null);
    clearError();
  };

  const handleOpenStandalone = () => {
    window.open(window.location.href, '_blank', 'noopener,noreferrer');
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password) {
      setLocalError('Please enter both your registered email and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signInWithEmail(email, password);
    } catch (err: any) {
      // Error handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!fullName.trim()) {
      setLocalError('Please provide your full name as per official ID.');
      return;
    }
    if (!email.trim()) {
      setLocalError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setLocalError('Password must be at least 6 characters in length.');
      return;
    }
    if (!agreeTerms) {
      setLocalError('Please confirm understanding of the citizen portal usage policies.');
      return;
    }

    setIsSubmitting(true);
    try {
      await signUpWithEmail(email, password, fullName, currentLanguage);
    } catch (err: any) {
      // Error handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLocalError(null);
    clearError();
    setIsSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: any) {
      // Error handled in AuthContext
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);
    clearError();
    setResetSuccessMessage(null);

    if (!email.trim()) {
      setLocalError('Please enter your email address to receive reset instructions.');
      return;
    }

    setIsSubmitting(true);
    try {
      await resetPassword(email);
      setResetSuccessMessage(`A password reset link has been dispatched to ${email}. Check your inbox and spam folders.`);
    } catch (err: any) {
      // Handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const displayedError = localError || authError;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col justify-between selection:bg-orange-500 selection:text-white">
      {/* Top Government Tricolor Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600 shadow-sm" />

      {/* Header with Language Selector & Emblem Title */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 via-amber-500 to-emerald-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-orange-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold tracking-wider uppercase bg-orange-950 text-orange-400 border border-orange-800/60 px-2 py-0.5 rounded">
                  Citizen Gateway
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Firebase Auth & Firestore</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {t.portalName}
              </h1>
            </div>
          </div>

          {/* Admin Switcher & Language Selector */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setMode('admin');
                fillAdminCredentials();
              }}
              className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 border border-red-800/80 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal Login</span>
            </button>

            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" />
              <select
                value={currentLanguage}
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                className="bg-slate-800 border border-slate-700 text-slate-200 text-xs font-medium rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-orange-500 focus:outline-none cursor-pointer"
              >
                {languages.map((l) => (
                  <option key={l.code} value={l.code}>
                    {l.native} ({l.label})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Authentication Card Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Educational & Value Proposition */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital India Citizen Empowerment Platform</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Learn, Verify, and Master Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-300">Government Documents</span>
          </h2>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Create your personalized citizen account or sign in to track your learning progress, test procedures in our zero-risk practice labs, and save critical identity document guidance.
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400 shrink-0">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Full Service Walkthroughs</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">DigiLocker, e-Aadhaar, and PAN Card step-by-step verified procedures.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Interactive Practice Labs</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Simulate OTP flows & document linking before official submissions.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 shrink-0">
                <FileText className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Document Checkers</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Verify fees, mandatory proofs, and password formats instantly.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-start gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Fraud Defense Guides</h4>
                <p className="text-[11px] text-slate-400 mt-0.5">Protect yourself against fake caller scams and phishing URLs.</p>
              </div>
            </div>
          </div>

          {/* Official Citizen Helpline Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-800/90 to-slate-800/40 border border-slate-700 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-slate-200">National Emergency Helplines</p>
                <p className="text-[11px] text-slate-400">UIDAI: <strong className="text-white">1947</strong> • Income Tax: <strong className="text-white">1800 180 1961</strong> • Cyber: <strong className="text-white">1930</strong></p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Authentication Card */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-full max-w-md bg-slate-800/90 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
            
            {/* Top Glow Accent */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            {/* Mode Switcher Tabs */}
            <div className="flex bg-slate-900/90 p-1 rounded-xl border border-slate-700 mb-6 gap-1">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setLocalError(null);
                  clearError();
                  setResetSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Citizen Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setLocalError(null);
                  clearError();
                  setResetSuccessMessage(null);
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-orange-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Citizen Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('admin');
                  fillAdminCredentials();
                }}
                className={`px-3 py-2 text-xs font-bold rounded-lg transition-all ${
                  mode === 'admin'
                    ? 'bg-red-700 text-white shadow-md'
                    : 'text-red-400 hover:text-red-300'
                }`}
              >
                Admin
              </button>
            </div>

            {/* Embedded Iframe Pro-Tip Notice */}
            {isInIframe && (
              <div className="mb-4 p-2.5 rounded-xl bg-blue-950/60 border border-blue-800/60 text-blue-200 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400 shrink-0" />
                  <span className="text-[11px] leading-tight">
                    For Google Sign-In with full popup access, open the app in a dedicated browser tab.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleOpenStandalone}
                  className="px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold shrink-0 flex items-center gap-1 cursor-pointer transition shadow-xs"
                >
                  <span>Open Tab</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* Admin Preset Banner if Admin Mode */}
            {mode === 'admin' && (
              <div className="mb-5 p-3.5 bg-red-950/80 border border-red-800 rounded-xl text-red-200 text-xs">
                <div className="flex items-center justify-between font-bold text-amber-300 mb-1">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    Administrator Command Access
                  </span>
                  <button
                    type="button"
                    onClick={fillAdminCredentials}
                    className="text-[10px] bg-red-900/80 hover:bg-red-800 text-amber-300 px-2 py-0.5 rounded border border-red-700 flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3 h-3" />
                    <span>Auto-Fill Admin</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-300">
                  Authorized access for <strong className="text-white">sanjeevtiwari5530@gmail.com</strong> to inspect, manage, and enroll users.
                </p>
              </div>
            )}

            {/* Error Message Box with Actionable Recovery */}
            {displayedError && (
              <div className="mb-5 p-3.5 bg-red-950/90 border border-red-800/90 rounded-xl text-red-200 text-xs space-y-3 animate-fadeIn">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <div className="flex-1 text-[11px] leading-relaxed">{displayedError}</div>
                </div>

                {/* If error is UNAUTHORIZED DOMAIN */}
                {displayedError.toLowerCase().includes('unauthorized-domain') && (
                  <div className="p-3 bg-slate-900/90 rounded-lg border border-amber-500/40 text-slate-200 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-amber-300 font-bold text-xs">
                      <Globe className="w-3.5 h-3.5" />
                      <span>How to Authorize This Domain in Firebase:</span>
                    </div>

                    <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded border border-slate-700">
                      <code className="text-[11px] text-emerald-400 font-mono break-all select-all">
                        {currentHostname || 'your-current-app-domain.run.app'}
                      </code>
                      <button
                        type="button"
                        onClick={copyDomain}
                        className="px-2.5 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[10px] font-bold shrink-0 flex items-center gap-1 cursor-pointer transition shadow-xs"
                      >
                        {copiedDomain ? (
                          <>
                            <Check className="w-3 h-3 text-white" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Domain</span>
                          </>
                        )}
                      </button>
                    </div>

                    <ol className="list-decimal pl-4 text-[10.5px] text-slate-300 space-y-1">
                      <li>
                        Open <a href={firebaseSettingsUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline font-semibold inline-flex items-center gap-0.5">Firebase Console Settings <ExternalLink className="w-2.5 h-2.5" /></a>
                      </li>
                      <li>Scroll down to <strong>Authorized domains</strong> and click <strong>Add domain</strong></li>
                      <li>Paste the domain above, click <strong>Save</strong>, then retry Google Sign-In!</li>
                    </ol>

                    <div className="pt-1 flex items-center gap-2">
                      <a
                        href={firebaseSettingsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-[10px] font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                      >
                        <span>Open Firebase Settings</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <button
                        type="button"
                        onClick={fillCitizenCredentials}
                        className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-md text-[10px] font-semibold flex items-center gap-1 cursor-pointer transition"
                      >
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>Sign In with Demo Account Instead</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* If error is related to network, popup, or iframe */}
                {(displayedError.toLowerCase().includes('network') || 
                  displayedError.toLowerCase().includes('popup') || 
                  displayedError.toLowerCase().includes('ad-blocker')) && 
                  !displayedError.toLowerCase().includes('unauthorized-domain') && (
                  <div className="pt-2 border-t border-red-800/60 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOpenStandalone}
                      className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded-lg text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shadow-xs transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in Dedicated Tab</span>
                    </button>
                    {mode !== 'admin' && (
                      <button
                        type="button"
                        onClick={fillCitizenCredentials}
                        className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer transition"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-400" />
                        <span>Use Quick Demo Citizen Login</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Reset Success Message */}
            {resetSuccessMessage && (
              <div className="mb-5 p-3.5 bg-emerald-950/80 border border-emerald-800/80 rounded-xl text-emerald-200 text-xs flex items-start gap-2.5 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div className="flex-1">{resetSuccessMessage}</div>
              </div>
            )}

            {/* Sign In & Admin Form */}
            {(mode === 'signin' || mode === 'admin') && (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    {mode === 'admin' ? 'Administrator Email Address' : 'Citizen Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder={mode === 'admin' ? 'sanjeevtiwari5530@gmail.com' : 'citizen@example.com'}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setLocalError(null);
                        clearError();
                      }}
                      className="text-[11px] text-orange-400 hover:text-orange-300 font-medium transition"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 rounded-xl font-bold text-xs shadow-lg transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 ${
                    mode === 'admin'
                      ? 'bg-gradient-to-r from-red-600 to-amber-700 hover:from-red-700 hover:to-amber-800 text-white shadow-red-600/20'
                      : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-500/20'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{mode === 'admin' ? 'Authenticate as Administrator' : 'Sign In to Training Portal'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {mode === 'signup' && (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Full Name (As per Official ID)
                  </label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g., Ramesh Kumar"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="citizen@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Create Secure Password (Min 6 chars)
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={6}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-10 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-400 hover:text-slate-200"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-900 text-orange-500 focus:ring-orange-500"
                  />
                  <label htmlFor="terms" className="text-[11px] text-slate-300 leading-tight">
                    I agree to use this portal for official document education, tutorials, and practice simulations.
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Register Citizen Account</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Forgot Password Form */}
            {mode === 'forgot' && (
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="p-3 bg-amber-950/40 border border-amber-800/40 rounded-xl text-amber-300 text-xs flex items-start gap-2">
                  <KeyRound className="w-4 h-4 shrink-0 mt-0.5" />
                  <div>
                    Enter the email registered with your citizen account to receive an official reset verification link.
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Registered Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      placeholder="citizen@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-lg shadow-orange-600/20 transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <span>Send Password Reset Email</span>
                  )}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('signin');
                      setLocalError(null);
                      clearError();
                    }}
                    className="text-xs text-slate-400 hover:text-white transition"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            )}

            {/* Divider */}
            {mode !== 'forgot' && (
              <div className="my-5 flex items-center gap-3">
                <div className="flex-1 h-px bg-slate-700" />
                <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  {mode === 'admin' ? 'Or Admin Google Sign-In' : 'Or Instant Access With Google'}
                </span>
                <div className="flex-1 h-px bg-slate-700" />
              </div>
            )}

            {/* Google Sign In Button */}
            {mode !== 'forgot' && (
              <button
                type="button"
                id="google-signin-btn"
                onClick={handleGoogleSignIn}
                disabled={isSubmitting}
                className="w-full py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-950 border border-slate-700 hover:border-slate-500 text-slate-100 text-xs font-bold transition-all duration-200 flex items-center justify-center gap-3 cursor-pointer shadow-md hover:shadow-lg disabled:opacity-50 group active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <svg className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                    <span>
                      {mode === 'admin' 
                        ? 'Authenticate Admin via Google' 
                        : (mode === 'signup' ? 'Sign Up with Google Account' : 'Continue with Google Account')
                      }
                    </span>
                  </>
                )}
              </button>
            )}

            {/* Quick Demo Fill Bar for Instant Testing */}
            {mode !== 'forgot' && (
              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2 text-[11px]">
                <span className="text-slate-400 font-medium">1-Click Quick Fill:</span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={fillCitizenCredentials}
                    className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded border border-slate-700 font-semibold transition cursor-pointer"
                  >
                    Demo Citizen
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setMode('admin');
                      fillAdminCredentials();
                    }}
                    className="px-2 py-1 bg-red-950 hover:bg-red-900 text-red-300 rounded border border-red-800 font-semibold transition cursor-pointer"
                  >
                    Super Admin
                  </button>
                </div>
              </div>
            )}

            {/* Troubleshooting info toggle */}
            <div className="mt-3 text-center">
              <button
                type="button"
                onClick={() => setShowTroubleshooting(!showTroubleshooting)}
                className="text-[10px] text-slate-400 hover:text-slate-200 transition inline-flex items-center gap-1 cursor-pointer"
              >
                <HelpCircle className="w-3 h-3" />
                <span>Need help with Google Sign-In or Network errors?</span>
              </button>

              {showTroubleshooting && (
                <div className="mt-2 p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-left text-[11px] text-slate-300 space-y-2 animate-fadeIn">
                  <p className="font-bold text-amber-300 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5" />
                    Google Auth & Network Tips:
                  </p>
                  <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[10px]">
                    <li>
                      <strong>Embedded Preview:</strong> If you are inside an iframe preview, click <button type="button" onClick={handleOpenStandalone} className="text-blue-400 underline font-semibold">Open Tab</button> to allow browser popups.
                    </li>
                    <li>
                      <strong>Ad-Blockers:</strong> Extensions like uBlock or Brave Shields may block Google OAuth endpoints. Whitelist this domain.
                    </li>
                    <li>
                      <strong>Direct Login:</strong> You can also use Email & Password or the 1-Click Quick Fill buttons above.
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Security Note */}
            <div className="mt-5 pt-3 border-t border-slate-700/60 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Protected by Firebase Authentication & 256-bit SSL</span>
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 px-4 py-4 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>{t.officialDisclaimer}</span>
          <span className="text-slate-400 font-medium">Digital India Initiative • Citizen Training</span>
        </div>
      </footer>
    </div>
  );
};
