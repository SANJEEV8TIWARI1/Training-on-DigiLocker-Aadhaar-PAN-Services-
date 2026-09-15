import React from 'react';
import { 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  LogOut, 
  X, 
  CheckCircle,
  ExternalLink,
  Award,
  BookMarked,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Language } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose, language }) => {
  const { user, userProfile, isAdmin, logout } = useAuth();

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-fadeIn">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-slate-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'User'} 
              className="w-14 h-14 rounded-full border-2 border-orange-500 object-cover shadow-md" 
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-xl font-bold shadow-md">
              {(user.displayName || user.email || 'U')[0].toUpperCase()}
            </div>
          )}

          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold text-white leading-tight">
                {user.displayName || (isAdmin ? 'Root Administrator' : 'Citizen User')}
              </h3>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                isAdmin 
                  ? 'bg-red-950 text-red-300 border border-red-800' 
                  : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
              }`}>
                {isAdmin ? 'Super Admin' : 'Verified Citizen'}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
            <div className="inline-flex items-center gap-1 text-[11px] text-orange-400 mt-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAdmin ? 'Full Administrative Command' : 'Citizen Learning Account'}</span>
            </div>
          </div>
        </div>

        {/* Info Grid */}
        <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800 text-xs">
          <div className="flex items-center justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-slate-500" />
              Email Verification
            </span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5" />
              {user.emailVerified ? 'Verified' : 'Active Session'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-slate-500" />
              Auth Provider
            </span>
            <span className="font-semibold text-slate-200 uppercase">
              {user.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email/Password'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-slate-850">
            <span className="text-slate-400 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-slate-500" />
              Portal Access Level
            </span>
            <span className="font-semibold text-amber-300">
              {isAdmin ? 'System Administrator' : 'Full Citizen Training Access'}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="text-slate-400 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-slate-500" />
              User UID
            </span>
            <span className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">
              {user.uid}
            </span>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-4 p-3 bg-blue-950/40 border border-blue-900/40 rounded-xl text-[11px] text-blue-300 flex items-start gap-2">
          <Shield className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            {isAdmin 
              ? 'Administrator privileges allow auditing logins, managing user status, and provisioning new citizen accounts.' 
              : 'Your citizen training account stores simulator progress and preferences. No biometric data or Aadhaar OTPs are retained.'}
          </span>
        </div>

        {/* Actions */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => {
              logout();
              onClose();
            }}
            className="flex-1 py-2.5 px-4 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 font-bold text-xs transition flex items-center justify-center gap-2 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
          
          <button
            onClick={onClose}
            className="py-2.5 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
