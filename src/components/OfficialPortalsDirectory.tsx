import React, { useState, useMemo } from 'react';
import { 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Check, 
  Globe, 
  Fingerprint, 
  CreditCard, 
  FolderLock, 
  Compass, 
  Info,
  Clock,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { OFFICIAL_PORTALS_DATA } from '../data/officialPortalsData';
import { OfficialPortalItem } from '../types';

interface OfficialPortalsDirectoryProps {
  onNavigateToTab?: (tab: string) => void;
}

export const OfficialPortalsDirectory: React.FC<OfficialPortalsDirectoryProps> = ({ 
  onNavigateToTab 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'aadhaar' | 'pan' | 'digilocker' | 'other'>('all');
  const [selectedBadge, setSelectedBadge] = useState<string>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredPortals = useMemo(() => {
    return OFFICIAL_PORTALS_DATA.filter((portal) => {
      const matchesCategory = selectedCategory === 'all' || portal.category === selectedCategory;
      const matchesBadge = selectedBadge === 'all' || portal.badgeType === selectedBadge;
      
      const searchLower = searchTerm.toLowerCase().trim();
      const matchesSearch = !searchLower || (
        portal.serviceName.toLowerCase().includes(searchLower) ||
        portal.department.toLowerCase().includes(searchLower) ||
        portal.description.toLowerCase().includes(searchLower) ||
        portal.url.toLowerCase().includes(searchLower) ||
        portal.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );

      return matchesCategory && matchesBadge && matchesSearch;
    });
  }, [searchTerm, selectedCategory, selectedBadge]);

  const handleCopyLink = (portal: OfficialPortalItem) => {
    navigator.clipboard.writeText(portal.url);
    setCopiedId(portal.id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'aadhaar':
        return <Fingerprint className="w-5 h-5 text-blue-700" />;
      case 'pan':
        return <CreditCard className="w-5 h-5 text-indigo-700" />;
      case 'digilocker':
        return <FolderLock className="w-5 h-5 text-emerald-700" />;
      default:
        return <Globe className="w-5 h-5 text-slate-700" />;
    }
  };

  const getBadgeStyle = (badge: string) => {
    switch (badge) {
      case 'Free':
      case 'Instant':
        return 'bg-emerald-50 text-emerald-800 border-emerald-300';
      case 'OTP Required':
        return 'bg-blue-50 text-blue-800 border-blue-300';
      case 'Paid Service':
        return 'bg-amber-50 text-amber-900 border-amber-300';
      case 'In-Person':
        return 'bg-purple-50 text-purple-800 border-purple-300';
      default:
        return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div id="official-portals-directory" className="space-y-8 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-2xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden border border-blue-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3 border border-blue-400/30">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            Verified Government Services Directory
          </div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-white mb-3">
            Official Aadhaar, PAN & DigiLocker Portal Directory
          </h1>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Direct, verified hyperlinks to authentic Government of India portals. Use these official links to download e-Aadhaar, link PAN with Aadhaar, check live statuses, and access your DigiLocker documents securely.
          </p>

          {/* Quick High-Priority Action Badges */}
          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/bl-link-aadhaar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <CreditCard className="w-3.5 h-3.5" />
              Link PAN-Aadhaar
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
            <a
              href="https://myaadhaar.uidai.gov.in/gen-ae-id/download-aadhaar"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <Fingerprint className="w-3.5 h-3.5" />
              Download e-Aadhaar
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
            <a
              href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/link-aadhaar-status"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700"
            >
              Check PAN Link Status
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
            <a
              href="https://eportal.incometax.gov.in/iec/foservices/#/pre-login/instant-e-pan/getNewEPan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-medium transition-colors shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Instant Free e-PAN (10 Mins)
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>
        </div>
      </div>

      {/* Cyber Safety Warning Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 md:p-5 flex flex-col md:flex-row items-start gap-4 text-amber-900 shadow-sm">
        <div className="p-2.5 rounded-lg bg-amber-100 text-amber-800 shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-1 text-sm">
          <h3 className="font-semibold text-amber-950 flex items-center gap-2">
            Safety Checklist: Spotting Legitimate Government Portals
          </h3>
          <p className="text-amber-800/90 leading-relaxed text-xs md:text-sm">
            Always verify that the browser address bar ends in <strong className="font-bold text-amber-950">.gov.in</strong> or <strong className="font-bold text-amber-950">.nic.in</strong> (e.g. <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono text-xs">uidai.gov.in</code>, <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono text-xs">incometax.gov.in</code>, <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950 font-mono text-xs">digilocker.gov.in</code>). Beware of phishing domains ending in <code className="text-red-700 line-through">.com</code>, <code className="text-red-700 line-through">.org</code>, or <code className="text-red-700 line-through">.online</code> claiming to provide Aadhaar or PAN services.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 md:p-5 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by service name, keyword (e.g. 'download', 'challan', 'pvc', 'verify', 'link')..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-slate-50/50 focus:bg-white"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
          <span className="text-xs font-semibold text-slate-600 mr-1 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-slate-400" />
            Category:
          </span>
          {[
            { id: 'all', label: 'All Services' },
            { id: 'aadhaar', label: 'Aadhaar / UIDAI' },
            { id: 'pan', label: 'PAN & Taxes' },
            { id: 'digilocker', label: 'DigiLocker' },
            { id: 'other', label: 'Parivahan / Transport' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results Count & Portal Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 px-1">
          <span>Showing <strong className="text-slate-900 font-semibold">{filteredPortals.length}</strong> official service portals</span>
          {searchTerm && (
            <span>Filtered for query &ldquo;<span className="text-blue-700">{searchTerm}</span>&rdquo;</span>
          )}
        </div>

        {filteredPortals.length === 0 ? (
          <div className="bg-white rounded-xl border border-dashed border-slate-300 p-12 text-center space-y-3">
            <Info className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="font-semibold text-slate-700">No official portals found matching your search</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try adjusting your search terms or clearing category filters to view all verified government portals.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedBadge('all');
              }}
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-700 hover:underline pt-1"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredPortals.map((portal) => (
              <div
                key={portal.id}
                id={`portal-card-${portal.id}`}
                className="bg-white rounded-xl border border-slate-200 hover:border-blue-400 p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  {/* Category, Icon & Badges */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-blue-50 transition-colors">
                        {getCategoryIcon(portal.category)}
                      </div>
                      <div>
                        <span className="text-[11px] font-medium text-slate-500 uppercase tracking-wider block">
                          {portal.department}
                        </span>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-snug">
                          {portal.serviceName}
                        </h3>
                      </div>
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border shrink-0 ${getBadgeStyle(portal.badgeType)}`}>
                      {portal.badgeType}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {portal.description}
                  </p>

                  {/* Requirements & Fees */}
                  <div className="bg-slate-50 rounded-lg p-3 space-y-1.5 text-[11px] border border-slate-100">
                    <div className="flex items-start gap-1.5 text-slate-700">
                      <strong className="font-semibold text-slate-900 shrink-0">Prerequisites:</strong>
                      <span className="text-slate-600 line-clamp-2">{portal.requirements}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <strong className="font-semibold text-slate-900 shrink-0">Official Fee:</strong>
                      <span className="font-medium text-emerald-800">{portal.feeInfo}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-[11px] text-slate-500 font-mono truncate max-w-[200px]" title={portal.url}>
                    <Globe className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{new URL(portal.url).hostname}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopyLink(portal)}
                      title="Copy URL"
                      className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600 text-xs transition-colors inline-flex items-center gap-1"
                    >
                      {copiedId === portal.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-[10px] text-emerald-600 font-medium hidden sm:inline">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span className="text-[10px] hidden sm:inline">Copy</span>
                        </>
                      )}
                    </button>

                    <a
                      href={portal.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white text-xs font-semibold shadow-sm hover:shadow transition-all group/btn"
                    >
                      <span>Open Official Portal</span>
                      <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Official Helplines & Statutory Information Banner */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 space-y-4">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
          Official Statutory Toll-Free Citizen Helplines
        </h3>
        <p className="text-xs text-slate-300">
          If you encounter issues accessing services or need immediate grievance redressal, contact the dedicated statutory authorities:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block">Aadhaar Helpline</span>
            <div className="text-base font-bold text-white">1947</div>
            <p className="text-[11px] text-slate-400">help@uidai.gov.in (24x7 Toll-Free)</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Income Tax (e-Filing)</span>
            <div className="text-base font-bold text-white">1800 180 1961</div>
            <p className="text-[11px] text-slate-400">080-46122000 (Mon-Sat 8am-10pm)</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">DigiLocker Support</span>
            <div className="text-base font-bold text-white">support@digilocker.gov.in</div>
            <p className="text-[11px] text-slate-400">support.digitallocker.gov.in</p>
          </div>

          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-3.5 space-y-1">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">National Cyber Fraud</span>
            <div className="text-base font-bold text-white">1930</div>
            <p className="text-[11px] text-slate-400">cybercrime.gov.in (24x7 Helpline)</p>
          </div>
        </div>
      </div>
    </div>
  );
};
