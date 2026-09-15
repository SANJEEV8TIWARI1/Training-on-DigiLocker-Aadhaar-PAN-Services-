import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  Send, 
  PhoneCall, 
  Mail, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Clock, 
  MessageSquare,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Language, SupportTicket } from '../types';
import { FAQ_DATA, OFFICIAL_HELPLINES } from '../data/faqData';

interface FaqSupportProps {
  language: Language;
  isHighContrast: boolean;
}

export const FaqSupport: React.FC<FaqSupportProps> = ({ isHighContrast }) => {
  const [faqSearch, setFaqSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'digilocker' | 'aadhaar' | 'pan' | 'general'>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(FAQ_DATA[0].id);

  // Form State
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [service, setService] = useState('Aadhaar Services');
  const [issueCategory, setIssueCategory] = useState('Password / Download Issue');
  const [description, setDescription] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<SupportTicket | null>(null);
  const [ticketHistory, setTicketHistory] = useState<SupportTicket[]>([]);

  // Filter FAQs
  const filteredFaqs = FAQ_DATA.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = faqSearch.trim() === '' || 
      item.question.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(faqSearch.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobile || !description) return;

    // Generate auto-guidance based on selected issue
    let advice = "Your query has been logged in the citizen assistance portal.";
    if (issueCategory.includes("Password")) {
      advice = "For e-Aadhaar PDF password, remember the standard UIDAI formula: FIRST 4 LETTERS OF YOUR NAME IN CAPS + 4 DIGITS OF YOUR BIRTH YEAR (e.g., RAME1990).";
    } else if (issueCategory.includes("Mismatch") || issueCategory.includes("Linking")) {
      advice = "For PAN-Aadhaar linking, ensure the ₹1,000 challan was paid under Minor Head 500. If demographic mismatch exists, correct Name/DOB in PAN or Aadhaar before submitting linking.";
    } else if (issueCategory.includes("Mobile")) {
      advice = "UIDAI mandates physical presence for mobile number updates. Please visit your nearest Aadhaar Seva Kendra (ASK) or post office with ₹50 fee.";
    }

    const newTicket: SupportTicket = {
      ticketId: `CITIZEN-REF-${Math.floor(100000 + Math.random() * 900000)}`,
      fullName,
      mobile,
      service,
      issueCategory,
      description,
      status: 'Received',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: 'short' }),
      autoGuidance: advice
    };

    setSubmittedTicket(newTicket);
    setTicketHistory(prev => [newTicket, ...prev]);

    // Reset Form
    setDescription('');
  };

  return (
    <div className="space-y-10">
      {/* Header Banner */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isHighContrast 
          ? 'bg-neutral-950 border-yellow-400 text-yellow-300' 
          : 'bg-gradient-to-r from-sky-900 via-blue-900 to-slate-900 text-white border-sky-800 shadow-md'
      }`}>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-sky-500/20 text-sky-300 border border-sky-400/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Citizen Help Desk & FAQs</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions & Citizen Support
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 max-w-2xl">
            Get instant solutions to common document errors, password queries, and linking issues, or submit a request for automated citizen guidance.
          </p>
        </div>
      </div>

      {/* Official Toll-Free Directory Cards */}
      <div>
        <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
          <PhoneCall className="w-4 h-4 text-blue-700" />
          <span>Official 24x7 Statutory Helplines:</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {OFFICIAL_HELPLINES.map((hl, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border flex flex-col justify-between space-y-3 ${
                isHighContrast ? 'bg-neutral-900 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-2xs'
              }`}
            >
              <div>
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                  {hl.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">{hl.name}</h4>
                <a
                  href={`tel:${hl.number.replace(/[^0-9]/g, '')}`}
                  className="text-base font-black text-blue-700 hover:text-blue-900 block mt-1"
                >
                  {hl.number}
                </a>
              </div>
              <div className="text-[11px] text-slate-500 space-y-1 pt-2 border-t border-slate-100">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                  <span>{hl.hours}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Mail className="w-3 h-3 text-slate-400 shrink-0" />
                  <span className="truncate">{hl.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Searchable FAQ Accordion Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-sky-700" />
            <span>Search Common Solutions</span>
          </h3>

          {/* Search FAQ */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              id="faq-search-input"
              type="text"
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
              placeholder="Search by keyword (e.g. PDF password, PIN)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'digilocker', label: 'DigiLocker' },
            { id: 'aadhaar', label: 'Aadhaar (UIDAI)' },
            { id: 'pan', label: 'PAN Card & Linking' },
            { id: 'general', label: 'Security & Safety' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                activeCategory === cat.id
                  ? isHighContrast
                    ? 'bg-yellow-400 text-black font-extrabold'
                    : 'bg-sky-800 text-white shadow-2xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-500">
              No matching questions found for "{faqSearch}". Try searching with terms like "password", "OTP", "challan", or "marksheet".
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className={`rounded-xl border transition-all ${
                    isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-2xs'
                  }`}
                >
                  <button
                    onClick={() => setExpandedFaqId(isExpanded ? null : faq.id)}
                    className="w-full p-4 text-left flex items-start justify-between gap-4 font-bold text-sm text-slate-900 hover:text-sky-800 transition"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-extrabold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                        Q
                      </span>
                      <span>{faq.question}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="w-4 h-4 shrink-0 text-slate-400" /> : <ChevronDown className="w-4 h-4 shrink-0 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-700 leading-relaxed border-t border-slate-100 space-y-3">
                      <p>{faq.answer}</p>
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {faq.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Citizen Assistance Request & Ticket Generator Form */}
      <div className={`p-6 sm:p-8 rounded-2xl border ${
        isHighContrast ? 'bg-neutral-950 border-yellow-400 text-yellow-300' : 'bg-white border-slate-200 shadow-sm'
      }`}>
        <div className="space-y-1 mb-6">
          <div className="flex items-center gap-2 text-sky-700 font-bold text-xs uppercase tracking-wider">
            <MessageSquare className="w-4 h-4" />
            <span>Citizen Assistance Ticket Desk</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Submit an Issue for Instant Automated Guidance
          </h3>
          <p className="text-xs text-slate-500">
            Experiencing trouble with DigiLocker, e-Aadhaar, or PAN linking? Describe your issue below to receive instant contextual advice and a reference ticket number.
          </p>
        </div>

        <form onSubmit={handleSupportSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Citizen Full Name *
              </label>
              <input
                id="support-fullname-input"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Ramesh Kumar"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Contact Mobile Number *
              </label>
              <input
                id="support-mobile-input"
                type="tel"
                required
                maxLength={10}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit mobile number"
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Service Category *
              </label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="DigiLocker Services">DigiLocker Services</option>
                <option value="Aadhaar Services">Aadhaar (UIDAI) Services</option>
                <option value="PAN Card Services">PAN Card Services</option>
                <option value="PAN-Aadhaar Linking">PAN - Aadhaar Linking</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Specific Issue Type *
              </label>
              <select
                value={issueCategory}
                onChange={(e) => setIssueCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium"
              >
                <option value="Password / Download Issue">Password / Download Issue</option>
                <option value="Demographic Mismatch (Name/DOB)">Demographic Mismatch (Name/DOB)</option>
                <option value="Mobile Number Update Query">Mobile Number Update Query</option>
                <option value="₹1000 Challan Payment Glitch">₹1000 Challan Payment Glitch</option>
                <option value="Document Not Found in DigiLocker">Document Not Found in DigiLocker</option>
                <option value="Other Assistance Request">Other Assistance Request</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Describe the error message or issue you encountered *
            </label>
            <textarea
              id="support-description-input"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. My e-Aadhaar PDF is showing incorrect password when I type my name, or PAN linking shows demographic mismatch..."
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 bg-slate-50 font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <button
            id="support-submit-btn"
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-sky-800 hover:bg-sky-900 text-white font-bold text-xs shadow-md transition flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Generate Assistance Guidance & Reference Ticket</span>
          </button>
        </form>

        {/* Real-time Ticket Feedback Card */}
        {submittedTicket && (
          <div className="mt-6 p-5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span className="font-extrabold text-sm">Assistance Request Logged!</span>
              </div>
              <span className="font-mono text-xs font-bold bg-white px-2.5 py-1 rounded border border-emerald-300 text-emerald-900">
                {submittedTicket.ticketId}
              </span>
            </div>

            <div className="p-3 bg-white rounded-lg border border-emerald-200 text-xs space-y-1">
              <strong className="text-slate-900 block">Instant Expert Guidance:</strong>
              <p className="text-slate-700 leading-relaxed">{submittedTicket.autoGuidance}</p>
            </div>

            <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
              <span>Applicant: <strong>{submittedTicket.fullName}</strong> ({submittedTicket.mobile})</span>
              <span>Category: <strong>{submittedTicket.issueCategory}</strong></span>
              <span>Logged at: {submittedTicket.timestamp}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
