import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Activity, 
  Users, 
  Monitor, 
  Key, 
  ArrowRight, 
  RefreshCw, 
  Clock, 
  Sparkles, 
  ExternalLink,
  Lock,
  Calendar,
  Smartphone,
  Tablet,
  Eye,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  UserProfileData, 
  AuthAuditLog, 
  getAllUsers, 
  getAuthAuditLogs, 
  isUserAdmin,
  db
} from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { ActiveTab } from '../types';

interface AdminLiveHomeWidgetProps {
  onOpenAdminPortal: () => void;
  onNavigateTab?: (tab: ActiveTab) => void;
  isHighContrast: boolean;
}

export const AdminLiveHomeWidget: React.FC<AdminLiveHomeWidgetProps> = ({
  onOpenAdminPortal,
  isHighContrast
}) => {
  const { user, isAdmin } = useAuth();
  const [logs, setLogs] = useState<AuthAuditLog[]>([]);
  const [users, setUsers] = useState<UserProfileData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const loadLiveData = async () => {
    setIsRefreshing(true);
    try {
      const [fetchedUsers, fetchedLogs] = await Promise.all([
        getAllUsers(),
        getAuthAuditLogs(25)
      ]);
      setUsers(fetchedUsers);
      setLogs(fetchedLogs);
    } catch (err) {
      console.warn('Could not load live admin preview widget:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadLiveData();

      // Setup real-time listener for live widget
      const logsRef = collection(db, 'auth_audit_logs');
      const q = query(logsRef, orderBy('timestamp', 'desc'), limit(25));
      const unsubscribeLogs = onSnapshot(q, (snapshot) => {
        const liveLogs = snapshot.docs.map(d => ({
          id: d.id,
          ...(d.data() as Omit<AuthAuditLog, 'id'>)
        }));
        if (liveLogs.length > 0) {
          setLogs(liveLogs);
        }
      }, (err) => {
        console.warn('Widget logs listener error:', err);
      });

      const usersRef = collection(db, 'users');
      const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
        const liveUsers = snapshot.docs.map(d => ({
          uid: d.id,
          ...(d.data() as Omit<UserProfileData, 'uid'>)
        }));
        if (liveUsers.length > 0) {
          setUsers(liveUsers);
        }
      }, (err) => {
        console.warn('Widget users listener error:', err);
      });

      return () => {
        unsubscribeLogs();
        unsubscribeUsers();
      };
    }
  }, [isAdmin]);

  if (!isAdmin) {
    return null;
  }

  // Helper timestamp parsing
  const getMillis = (timestamp: any): number => {
    if (!timestamp) return 0;
    if (typeof timestamp.toMillis === 'function') return timestamp.toMillis();
    if (typeof timestamp.toDate === 'function') return timestamp.toDate().getTime();
    if (timestamp.seconds) return timestamp.seconds * 1000;
    if (typeof timestamp === 'number') return timestamp;
    if (typeof timestamp === 'string') {
      const parsed = Date.parse(timestamp);
      return isNaN(parsed) ? 0 : parsed;
    }
    return 0;
  };

  const getRelativeTime = (timestamp: any) => {
    const ms = getMillis(timestamp);
    if (!ms) return 'Just now';
    const diffSeconds = Math.floor((Date.now() - ms) / 1000);
    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    return new Date(ms).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  const formatISTTime = (timestamp: any) => {
    const ms = getMillis(timestamp);
    if (!ms) return 'N/A';
    return new Date(ms).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // Metrics
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;
  const loginsToday = logs.filter(l => (now - getMillis(l.timestamp)) <= oneDay).length;
  const uniqueCitizensCount = users.length;
  const recentLogins = logs.slice(0, 5);

  return (
    <div className={`rounded-2xl border transition-all overflow-hidden shadow-xl ${
      isHighContrast
        ? 'bg-neutral-950 border-yellow-400 text-yellow-300'
        : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Top Banner Stripe */}
      <div className="h-1.5 w-full bg-gradient-to-r from-red-600 via-amber-500 to-orange-500" />

      <div className="p-5 sm:p-6 space-y-5">
        {/* Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-red-950 text-red-300 border border-red-800 px-2 py-0.5 rounded">
                  Admin Real-Time Dashboard
                </span>
                <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Sync Active
                </span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                Who Logged In Recently • Citizen Authentication Monitor
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadLiveData}
              disabled={isRefreshing}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              title="Refresh Recent Logins Feed"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={onOpenAdminPortal}
              className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <span>Full Admin Portal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Quick KPI Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Activity className="w-3.5 h-3.5 text-orange-400" />
              Total Logins
            </span>
            <p className="text-xl font-extrabold text-white mt-1">{logs.length > 0 ? logs.length : '...'}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              Registered Citizens
            </span>
            <p className="text-xl font-extrabold text-emerald-400 mt-1">{uniqueCitizensCount > 0 ? uniqueCitizensCount : '...'}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-400" />
              Logins (Past 24h)
            </span>
            <p className="text-xl font-extrabold text-blue-400 mt-1">{loginsToday}</p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80">
            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-amber-400" />
              Root Admin Account
            </span>
            <p className="text-xs font-semibold text-slate-300 mt-1.5 truncate" title={user?.email || ''}>
              {user?.email}
            </p>
          </div>
        </div>

        {/* Recent Citizen Logins List (Live Feed) */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="font-semibold text-slate-300">Latest 5 Citizen Login Sessions</span>
            <span>Showing live from Firestore</span>
          </div>

          <div className="space-y-2">
            {isLoading ? (
              <div className="py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                <RefreshCw className="w-5 h-5 text-orange-400 animate-spin" />
                <span>Loading latest login logs...</span>
              </div>
            ) : recentLogins.length === 0 ? (
              <div className="py-6 text-center text-slate-500 text-xs bg-slate-950/50 rounded-xl border border-slate-800">
                No recent logins recorded yet.
              </div>
            ) : (
              recentLogins.map((log, idx) => {
                const isRoot = isUserAdmin(log.email);
                const isMobile = log.deviceType === 'Mobile';
                const isTablet = log.deviceType === 'Tablet';

                return (
                  <div
                    key={log.id || idx}
                    className="p-3 rounded-xl bg-slate-950/90 border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-slate-700 transition"
                  >
                    {/* Citizen User Info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-500 text-white flex items-center justify-center font-bold text-xs shrink-0">
                        {(log.displayName || log.email || 'U')[0].toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white truncate">
                            {log.displayName || 'Citizen User'}
                          </span>
                          {isRoot && (
                            <span className="px-1 py-0.2 rounded text-[8px] font-extrabold bg-red-950 text-red-300 border border-red-800">
                              ADMIN
                            </span>
                          )}
                          <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {log.action || 'SIGN_IN'}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate">
                          {log.email}
                        </p>
                      </div>
                    </div>

                    {/* Device & Location & Time */}
                    <div className="flex items-center gap-4 text-xs text-slate-400 shrink-0 self-end sm:self-auto">
                      <div className="flex items-center gap-1.5">
                        {isMobile ? (
                          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
                        ) : isTablet ? (
                          <Tablet className="w-3.5 h-3.5 text-purple-400" />
                        ) : (
                          <Monitor className="w-3.5 h-3.5 text-emerald-400" />
                        )}
                        <span className="text-[11px] text-slate-300">{log.os || 'Windows'} • {log.browser || 'Chrome'}</span>
                      </div>

                      <div className="text-right">
                        <span className="text-[11px] text-orange-400 font-medium block">
                          {getRelativeTime(log.timestamp)}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {formatISTTime(log.timestamp)} IST
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-400 border-t border-slate-800/80">
          <span className="flex items-center gap-1.5 text-slate-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Complete audit trails, device analytics & CSV exports are in the <strong>Admin Portal</strong>.</span>
          </span>

          <button
            onClick={onOpenAdminPortal}
            className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>View All Logins & Citizen Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
