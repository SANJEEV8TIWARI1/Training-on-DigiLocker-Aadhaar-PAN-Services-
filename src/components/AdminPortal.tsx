import React, { useState, useEffect, useMemo } from 'react';
import { 
  Shield, 
  Users, 
  UserPlus, 
  Activity, 
  Search, 
  Filter, 
  RefreshCw, 
  Mail, 
  Key, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Trash2, 
  Edit3, 
  Eye, 
  Download, 
  LogOut, 
  ArrowLeft, 
  Globe, 
  FileSpreadsheet, 
  ShieldCheck,
  Monitor,
  Smartphone,
  Tablet,
  TrendingUp,
  Info,
  X,
  Lock,
  Layers,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  UserProfileData, 
  AuthAuditLog, 
  getAllUsers, 
  getAuthAuditLogs, 
  adminCreateUser, 
  adminUpdateUser, 
  adminDeleteUser,
  ADMIN_EMAILS,
  isUserAdmin,
  db
} from '../lib/firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { Language } from '../types';

interface AdminPortalProps {
  onBackToCitizenPortal: () => void;
  language: Language;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToCitizenPortal }) => {
  const { user, isAdmin, logout, resetPassword } = useAuth();

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'logins' | 'users' | 'add_user' | 'audit_logs'>('logins');
  
  // Data lists
  const [usersList, setUsersList] = useState<UserProfileData[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuthAuditLog[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Citizen Directory Filter States
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // All Logins Data Filter States
  const [loginsSearch, setLoginsSearch] = useState<string>('');
  const [loginsDateRange, setLoginsDateRange] = useState<'all' | 'today' | '7d' | '30d'>('all');
  const [loginsProviderFilter, setLoginsProviderFilter] = useState<string>('all');
  const [loginsActionFilter, setLoginsActionFilter] = useState<string>('all');
  const [loginsDeviceFilter, setLoginsDeviceFilter] = useState<string>('all');
  
  // Inspected Login Session State
  const [inspectedSession, setInspectedSession] = useState<AuthAuditLog | null>(null);

  // Notification banner
  const [feedbackMessage, setFeedbackMessage] = useState<{ type: 'success' | 'error' | 'info'; text: string } | null>(null);

  // New User Form State
  const [newFullName, setNewFullName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newRole, setNewRole] = useState<'citizen' | 'admin' | 'supervisor'>('citizen');
  const [newLang, setNewLang] = useState<string>('en');
  const [newNotes, setNewNotes] = useState('');
  const [isSubmittingNewUser, setIsSubmittingNewUser] = useState(false);

  // Selected User Modal / Edit State
  const [selectedUser, setSelectedUser] = useState<UserProfileData | null>(null);
  const [isEditingUser, setIsEditingUser] = useState<boolean>(false);
  const [editRole, setEditRole] = useState<'citizen' | 'admin' | 'supervisor'>('citizen');
  const [editStatus, setEditStatus] = useState<'active' | 'suspended' | 'pending'>('active');
  const [editNotes, setEditNotes] = useState<string>('');
  const [isSavingEdit, setIsSavingEdit] = useState<boolean>(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [users, logs] = await Promise.all([
        getAllUsers(),
        getAuthAuditLogs(500)
      ]);
      setUsersList(users);
      setAuditLogs(logs);
    } catch (err: any) {
      setFeedbackMessage({ type: 'error', text: err.message || 'Failed to load administrative records.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAdmin) return;

    // Initial fetch
    loadData();

    // Set up real-time listener for instant login & sign-up updates
    const logsRef = collection(db, 'auth_audit_logs');
    const q = query(logsRef, orderBy('timestamp', 'desc'), limit(500));
    
    const unsubscribeLogs = onSnapshot(q, (snapshot) => {
      const liveLogs = snapshot.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<AuthAuditLog, 'id'>)
      }));
      if (liveLogs.length > 0) {
        setAuditLogs(liveLogs);
      }
    }, (error) => {
      console.warn('Real-time audit log listener warning:', error);
    });

    const usersRef = collection(db, 'users');
    const unsubscribeUsers = onSnapshot(usersRef, (snapshot) => {
      const liveUsers = snapshot.docs.map(d => ({
        uid: d.id,
        ...(d.data() as Omit<UserProfileData, 'uid'>)
      }));
      if (liveUsers.length > 0) {
        setUsersList(liveUsers);
      }
    }, (error) => {
      console.warn('Real-time users listener warning:', error);
    });

    return () => {
      unsubscribeLogs();
      unsubscribeUsers();
    };
  }, [isAdmin]);

  const showNotification = (type: 'success' | 'error' | 'info', text: string) => {
    setFeedbackMessage({ type, text });
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 5000);
  };

  // Helper to get timestamp in milliseconds
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

  // Format relative time (e.g., "5m ago", "2h ago")
  const getRelativeTime = (timestamp: any) => {
    const ms = getMillis(timestamp);
    if (!ms) return 'Recent';
    const diffSeconds = Math.floor((Date.now() - ms) / 1000);
    if (diffSeconds < 60) return 'Just now';
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    if (diffSeconds < 604800) return `${Math.floor(diffSeconds / 86400)}d ago`;
    return new Date(ms).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
  };

  // Format full date time in Indian Standard Time (IST) & Local
  const formatFullDateTime = (timestamp: any) => {
    const ms = getMillis(timestamp);
    if (!ms) return 'N/A';
    const d = new Date(ms);
    return d.toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  // All Logins List Filter Logic
  const filteredLogins = useMemo(() => {
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const sevenDays = 7 * oneDay;
    const thirtyDays = 30 * oneDay;

    return auditLogs.filter(log => {
      // Date filter
      const logMs = getMillis(log.timestamp);
      if (loginsDateRange === 'today' && (now - logMs > oneDay)) return false;
      if (loginsDateRange === '7d' && (now - logMs > sevenDays)) return false;
      if (loginsDateRange === '30d' && (now - logMs > thirtyDays)) return false;

      // Provider filter
      if (loginsProviderFilter !== 'all') {
        const prov = (log.provider || '').toLowerCase();
        if (loginsProviderFilter === 'google.com' && !prov.includes('google')) return false;
        if (loginsProviderFilter === 'password' && !prov.includes('password')) return false;
        if (loginsProviderFilter === 'admin-portal' && !prov.includes('admin')) return false;
      }

      // Action filter
      if (loginsActionFilter !== 'all' && log.action !== loginsActionFilter) return false;

      // Device filter
      if (loginsDeviceFilter !== 'all') {
        const dev = log.deviceType || 'Desktop';
        if (dev !== loginsDeviceFilter) return false;
      }

      // Search Query
      if (loginsSearch.trim()) {
        const q = loginsSearch.toLowerCase();
        const email = (log.email || '').toLowerCase();
        const name = (log.displayName || '').toLowerCase();
        const uid = (log.userId || '').toLowerCase();
        const browser = (log.browser || '').toLowerCase();
        const os = (log.os || '').toLowerCase();
        const tz = (log.timezone || '').toLowerCase();
        const meta = (log.metadata || '').toLowerCase();

        return email.includes(q) || name.includes(q) || uid.includes(q) || 
               browser.includes(q) || os.includes(q) || tz.includes(q) || meta.includes(q);
      }

      return true;
    });
  }, [auditLogs, loginsDateRange, loginsProviderFilter, loginsActionFilter, loginsDeviceFilter, loginsSearch]);

  // Logins Analytics Metrics
  const loginStats = useMemo(() => {
    const totalRecorded = auditLogs.length;
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    
    const loginsToday = auditLogs.filter(l => (now - getMillis(l.timestamp)) <= oneDay).length;
    const uniqueUsersToday = new Set(
      auditLogs.filter(l => (now - getMillis(l.timestamp)) <= oneDay).map(l => l.email)
    ).size;

    let googleCount = 0;
    let passwordCount = 0;
    let desktopCount = 0;
    let mobileCount = 0;

    auditLogs.forEach(l => {
      const p = (l.provider || '').toLowerCase();
      if (p.includes('google')) googleCount++;
      else if (p.includes('password')) passwordCount++;

      const d = (l.deviceType || 'Desktop');
      if (d === 'Mobile' || d === 'Tablet') mobileCount++;
      else desktopCount++;
    });

    // 7-day trend calculation
    const daysData: { label: string; count: number; dateStr: string }[] = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now - i * oneDay);
      const dateKey = d.toISOString().slice(0, 10);
      const dayLabel = d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric' });
      const count = auditLogs.filter(l => {
        const ms = getMillis(l.timestamp);
        if (!ms) return false;
        return new Date(ms).toISOString().slice(0, 10) === dateKey;
      }).length;
      daysData.push({ label: dayLabel, count, dateStr: dateKey });
    }

    const maxDayCount = Math.max(...daysData.map(d => d.count), 1);

    return {
      totalRecorded,
      loginsToday,
      uniqueUsersToday,
      googleCount,
      passwordCount,
      desktopCount,
      mobileCount,
      daysData,
      maxDayCount
    };
  }, [auditLogs]);

  // Handle Admin User Creation
  const handleCreateNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFullName.trim() || !newEmail.trim() || !newPassword) {
      showNotification('error', 'Please fill in all mandatory fields (Name, Email, Password).');
      return;
    }
    if (newPassword.length < 6) {
      showNotification('error', 'Password must be at least 6 characters in length.');
      return;
    }

    setIsSubmittingNewUser(true);
    try {
      await adminCreateUser({
        fullName: newFullName.trim(),
        email: newEmail.trim(),
        password: newPassword,
        role: newRole,
        preferredLanguage: newLang,
        notes: newNotes.trim()
      });

      showNotification('success', `Citizen account for ${newEmail} created and enrolled successfully.`);
      // Reset form
      setNewFullName('');
      setNewEmail('');
      setNewPassword('');
      setNewNotes('');
      setNewRole('citizen');
      
      // Reload list and switch to users tab
      await loadData();
      setActiveTab('users');
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to create user account.');
    } finally {
      setIsSubmittingNewUser(false);
    }
  };

  // Handle User Edit Save
  const handleSaveUserChanges = async () => {
    if (!selectedUser) return;
    setIsSavingEdit(true);
    try {
      await adminUpdateUser(selectedUser.uid, {
        role: editRole,
        status: editStatus,
        notes: editNotes
      });
      showNotification('success', `User record for ${selectedUser.email} has been updated.`);
      setIsEditingUser(false);
      setSelectedUser(null);
      await loadData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to save changes.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Handle Send Password Reset
  const handleSendResetEmail = async (targetEmail: string) => {
    try {
      await resetPassword(targetEmail);
      showNotification('success', `Official password reset link dispatched to ${targetEmail}.`);
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to send password reset email.');
    }
  };

  // Handle User Delete
  const handleDeleteUser = async (u: UserProfileData) => {
    if (isUserAdmin(u.email)) {
      showNotification('error', 'Root Administrator accounts cannot be deleted.');
      return;
    }
    const confirmDelete = window.confirm(`Are you sure you want to remove ${u.displayName || u.email} from the citizen database?`);
    if (!confirmDelete) return;

    try {
      await adminDeleteUser(u.uid, u.email);
      showNotification('success', `Citizen record ${u.email} has been removed.`);
      if (selectedUser?.uid === u.uid) {
        setSelectedUser(null);
      }
      await loadData();
    } catch (err: any) {
      showNotification('error', err.message || 'Failed to delete user.');
    }
  };

  // Export Logins Data to CSV
  const handleExportLoginsCSV = () => {
    if (filteredLogins.length === 0) {
      showNotification('info', 'No login records available to export.');
      return;
    }

    const headers = [
      'Log ID',
      'Citizen Name',
      'Email Address',
      'User UID',
      'Action Type',
      'Auth Provider',
      'Date & Time (IST)',
      'Timestamp (ISO)',
      'Device Type',
      'Operating System',
      'Web Browser',
      'Screen Resolution',
      'Timezone',
      'Status',
      'Metadata / Notes'
    ];

    const rows = filteredLogins.map(l => {
      const ms = getMillis(l.timestamp);
      const iso = ms ? new Date(ms).toISOString() : 'N/A';
      const istStr = formatFullDateTime(l.timestamp);
      return [
        `"${l.id || ''}"`,
        `"${(l.displayName || 'Citizen User').replace(/"/g, '""')}"`,
        `"${(l.email || '').replace(/"/g, '""')}"`,
        `"${l.userId || ''}"`,
        `"${l.action || 'SIGN_IN'}"`,
        `"${l.provider || 'password'}"`,
        `"${istStr}"`,
        `"${iso}"`,
        `"${l.deviceType || 'Desktop'}"`,
        `"${l.os || 'Windows'}"`,
        `"${l.browser || 'Google Chrome'}"`,
        `"${l.screenResolution || 'N/A'}"`,
        `"${l.timezone || 'Asia/Kolkata'}"`,
        `"${l.status || 'SUCCESS'}"`,
        `"${(l.metadata || '').replace(/"/g, '""')}"`
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `all_citizen_logins_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', `Exported ${filteredLogins.length} login records successfully.`);
  };

  // Export Citizen Users to CSV
  const handleExportUsersCSV = () => {
    if (usersList.length === 0) {
      showNotification('info', 'No user records available to export.');
      return;
    }

    const headers = ['UID', 'Full Name', 'Email', 'Role', 'Status', 'Provider', 'Logins', 'Language', 'Created At'];
    const rows = usersList.map(u => [
      `"${u.uid}"`,
      `"${u.displayName || 'Citizen'}"`,
      `"${u.email}"`,
      `"${u.role || 'citizen'}"`,
      `"${u.status || 'active'}"`,
      `"${u.provider || 'password'}"`,
      u.loginCount || 1,
      `"${u.preferredLanguage || 'en'}"`,
      `"${u.createdAt ? (u.createdAt.toDate ? u.createdAt.toDate().toISOString() : 'N/A') : 'N/A'}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `citizen_registry_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('success', 'Citizen user registry exported successfully as CSV.');
  };

  // Filtered Users List
  const filteredUsers = usersList.filter(u => {
    const matchesSearch = 
      (u.displayName || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.uid.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.notes || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === 'all' || (u.role || 'citizen') === roleFilter;
    const matchesStatus = statusFilter === 'all' || (u.status || 'active') === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate quick metrics
  const totalUsers = usersList.length;
  const adminCount = usersList.filter(u => u.role === 'admin' || isUserAdmin(u.email)).length;
  const activeCount = usersList.filter(u => (u.status || 'active') === 'active').length;
  const totalLogins = usersList.reduce((acc, curr) => acc + (curr.loginCount || 1), 0);

  // Selected user specific login history
  const selectedUserLogins = useMemo(() => {
    if (!selectedUser) return [];
    return auditLogs.filter(l => l.userId === selectedUser.uid || l.email === selectedUser.email);
  }, [selectedUser, auditLogs]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-orange-500 selection:text-white">
      {/* Top Government Tricolor Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-emerald-600 shadow-sm" />

      {/* Admin Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md px-4 sm:px-8 py-3.5 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 p-0.5 shadow-md flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold tracking-wider uppercase bg-red-950 text-red-400 border border-red-800/80 px-2 py-0.5 rounded">
                  Super Admin Command Center
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">• Live Cloud Logins Sync</span>
              </div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                Citizen Identity & Auth Management Portal
              </h1>
            </div>
          </div>

          {/* Top Actions & Profile */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={onBackToCitizenPortal}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
              <span>Back to Citizen Portal</span>
            </button>

            <div className="h-6 w-px bg-slate-800 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">{user?.email}</span>
            </div>

            <button
              onClick={logout}
              className="p-2 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-850 text-xs transition flex items-center gap-1 cursor-pointer"
              title="Sign Out of Admin Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Feedback Banner */}
      {feedbackMessage && (
        <div className={`px-4 py-2.5 text-xs font-semibold flex items-center justify-between border-b animate-fadeIn ${
          feedbackMessage.type === 'success' ? 'bg-emerald-950/90 text-emerald-200 border-emerald-800' :
          feedbackMessage.type === 'error' ? 'bg-red-950/90 text-red-200 border-red-800' :
          'bg-blue-950/90 text-blue-200 border-blue-800'
        }`}>
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            {feedbackMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            {feedbackMessage.type === 'error' && <AlertTriangle className="w-4 h-4 text-red-400" />}
            {feedbackMessage.type === 'info' && <Shield className="w-4 h-4 text-blue-400" />}
            <span>{feedbackMessage.text}</span>
          </div>
        </div>
      )}

      {/* Main Admin Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-6 space-y-6">
        
        {/* KPI Metrics Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Total Logins Recorded</span>
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-400">
                <Activity className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white mt-2">{loginStats.totalRecorded || totalLogins}</p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">{loginStats.loginsToday} today</span> • {loginStats.uniqueUsersToday} active users
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Registered Citizens</span>
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white mt-2">{totalUsers}</p>
            <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
              <span className="text-emerald-400 font-bold">{activeCount} active</span> accounts enrolled
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Device Platform Ratio</span>
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                <Monitor className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white mt-2">
              {loginStats.totalRecorded > 0 
                ? `${Math.round((loginStats.desktopCount / loginStats.totalRecorded) * 100)}% Desktop`
                : '100% Desktop'}
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              {loginStats.desktopCount} Desktop • {loginStats.mobileCount} Mobile/Tablet
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">Auth Method Distribution</span>
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
                <Key className="w-4 h-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white mt-2">
              {loginStats.googleCount} Google • {loginStats.passwordCount} Pass
            </p>
            <p className="text-[11px] text-slate-400 mt-1 truncate">
              Root Super Admin: {ADMIN_EMAILS[0]}
            </p>
          </div>
        </div>

        {/* Navigation Tabs Bar & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            
            {/* FEATURE: All Citizen Logins Data Tab */}
            <button
              onClick={() => setActiveTab('logins')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'logins'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Activity className="w-4 h-4 text-amber-300" />
              <span>All Citizen Logins Data</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-black/40 text-amber-200 font-extrabold">
                {auditLogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Citizen Directory ({filteredUsers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('add_user')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'add_user'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <UserPlus className="w-4 h-4 text-emerald-400" />
              <span>Enroll New Citizen (Admin Sign-Up)</span>
            </button>

            <button
              onClick={() => setActiveTab('audit_logs')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer ${
                activeTab === 'audit_logs'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Security Event Stream</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {activeTab === 'logins' ? (
              <button
                onClick={handleExportLoginsCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Export Logins Data as CSV"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Logins CSV</span>
              </button>
            ) : (
              <button
                onClick={handleExportUsersCSV}
                className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                title="Export Citizen Registry as CSV"
              >
                <Download className="w-3.5 h-3.5 text-amber-400" />
                <span>Export Directory CSV</span>
              </button>
            )}

            <button
              onClick={loadData}
              disabled={isLoading}
              className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 text-xs transition cursor-pointer disabled:opacity-50"
              title="Refresh Firestore Data"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-orange-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* TAB 1: ALL LOGINS DATA & SESSIONS (NEW COMPREHENSIVE FEATURE) */}
        {activeTab === 'logins' && (
          <div className="space-y-5">
            
            {/* Visual 7-Day Logins Activity Chart Strip */}
            <div className="bg-slate-900/90 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-orange-400" />
                    <span>Citizen Logins Frequency (Past 7 Days)</span>
                  </h3>
                  <p className="text-xs text-slate-400">Daily breakdown of citizen sign-in sessions and verifications.</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <span className="w-2.5 h-2.5 rounded-sm bg-orange-500" />
                    <span>Logins Count</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-amber-400 font-semibold">{loginStats.loginsToday} today</span>
                </div>
              </div>

              {/* Bar Chart */}
              <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end pt-4 pb-2 h-36 border-b border-slate-800/80">
                {loginStats.daysData.map((day, idx) => {
                  const heightPercent = Math.max(12, Math.round((day.count / loginStats.maxDayCount) * 100));
                  const isToday = idx === 6;
                  return (
                    <div key={day.dateStr} className="flex flex-col items-center h-full justify-end group">
                      <span className="text-[11px] font-bold text-slate-300 mb-1.5 opacity-80 group-hover:opacity-100 transition">
                        {day.count}
                      </span>
                      <div className="w-full max-w-[48px] bg-slate-950 rounded-t-lg overflow-hidden flex items-end h-24 p-0.5 border border-slate-800">
                        <div 
                          style={{ height: `${heightPercent}%` }}
                          className={`w-full rounded-t transition-all duration-500 ${
                            isToday 
                              ? 'bg-gradient-to-t from-orange-600 to-amber-400' 
                              : 'bg-gradient-to-t from-slate-700 to-orange-500/80 group-hover:from-orange-600 group-hover:to-orange-400'
                          }`}
                        />
                      </div>
                      <span className={`text-[10px] mt-2 font-medium truncate ${
                        isToday ? 'text-orange-400 font-bold' : 'text-slate-400'
                      }`}>
                        {isToday ? 'Today' : day.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Quick Summary Pill Row */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2 pt-1">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-blue-400" />
                    <span>Timezone: <strong>Asia/Kolkata (IST)</strong></span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Auth Verification: <strong>100% SSL & Firestore Guarded</strong></span>
                  </span>
                </div>
                <span>Showing <strong>{filteredLogins.length}</strong> of <strong>{auditLogs.length}</strong> total logins</span>
              </div>
            </div>

            {/* Comprehensive Search & Filter Controls */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 space-y-3">
              <div className="flex flex-col lg:flex-row gap-3 items-center justify-between">
                
                {/* Search Bar */}
                <div className="relative w-full lg:w-96">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search by Citizen Name, Email, UID, Browser, OS, Timezone..."
                    value={loginsSearch}
                    onChange={(e) => setLoginsSearch(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                  />
                  {loginsSearch && (
                    <button
                      onClick={() => setLoginsSearch('')}
                      className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Filter Dropdowns Strip */}
                <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
                  
                  {/* Date Filter */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={loginsDateRange}
                      onChange={(e) => setLoginsDateRange(e.target.value as any)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="all">All Dates</option>
                      <option value="today">Today (24h)</option>
                      <option value="7d">Past 7 Days</option>
                      <option value="30d">Past 30 Days</option>
                    </select>
                  </div>

                  {/* Provider Filter */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Key className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={loginsProviderFilter}
                      onChange={(e) => setLoginsProviderFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="all">All Auth Methods</option>
                      <option value="password">Email / Password</option>
                      <option value="google.com">Google OAuth</option>
                      <option value="admin-portal">Admin Provisioned</option>
                    </select>
                  </div>

                  {/* Action Filter */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Activity className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={loginsActionFilter}
                      onChange={(e) => setLoginsActionFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="all">All Actions</option>
                      <option value="SIGN_IN">Sign In (SIGN_IN)</option>
                      <option value="SIGN_UP">Sign Up (SIGN_UP)</option>
                      <option value="ADMIN_CREATED">Admin Created</option>
                    </select>
                  </div>

                  {/* Device Filter */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Monitor className="w-3.5 h-3.5 text-slate-500" />
                    <select
                      value={loginsDeviceFilter}
                      onChange={(e) => setLoginsDeviceFilter(e.target.value)}
                      className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                    >
                      <option value="all">All Devices</option>
                      <option value="Desktop">Desktop / Laptop</option>
                      <option value="Mobile">Mobile Smartphone</option>
                      <option value="Tablet">Tablet</option>
                    </select>
                  </div>

                </div>
              </div>
            </div>

            {/* Detailed Logins Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/90 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-3.5 px-4">Citizen User</th>
                      <th className="py-3.5 px-4">Action</th>
                      <th className="py-3.5 px-4">Auth Provider</th>
                      <th className="py-3.5 px-4">Date & Time (IST)</th>
                      <th className="py-3.5 px-4">Device & OS</th>
                      <th className="py-3.5 px-4">Browser</th>
                      <th className="py-3.5 px-4">Region / Timezone</th>
                      <th className="py-3.5 px-4 text-right">Inspect Session</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {filteredLogins.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-12 text-slate-400">
                          {isLoading ? (
                            <div className="flex flex-col items-center gap-2">
                              <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
                              <span>Loading citizen logins dataset...</span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Activity className="w-8 h-8 text-slate-600 mx-auto" />
                              <p className="font-semibold text-slate-300">No login records found matching selected filters.</p>
                              <p className="text-[11px] text-slate-500">Try resetting search or date filters.</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredLogins.map((log, idx) => {
                        const isRootAdmin = isUserAdmin(log.email);
                        const isMobile = log.deviceType === 'Mobile';
                        const isTablet = log.deviceType === 'Tablet';

                        return (
                          <tr key={log.id || idx} className="hover:bg-slate-850/60 transition group">
                            
                            {/* Citizen User */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold text-[11px] shrink-0">
                                  {(log.displayName || log.email || 'U')[0].toUpperCase()}
                                </div>
                                <div className="min-w-0">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-white truncate">{log.displayName || 'Citizen User'}</span>
                                    {isRootAdmin && (
                                      <span className="px-1 py-0.2 rounded text-[8px] font-extrabold bg-red-950 text-red-300 border border-red-800">
                                        ADMIN
                                      </span>
                                    )}
                                  </div>
                                  <p 
                                    onClick={() => setLoginsSearch(log.email)}
                                    title="Click to filter by this citizen"
                                    className="text-[11px] text-slate-400 hover:text-orange-400 cursor-pointer truncate"
                                  >
                                    {log.email}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Action Type */}
                            <td className="py-3 px-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${
                                log.action === 'SIGN_IN'
                                  ? 'bg-emerald-950/90 text-emerald-300 border-emerald-800'
                                  : log.action === 'SIGN_UP'
                                  ? 'bg-blue-950/90 text-blue-300 border-blue-800'
                                  : log.action === 'ADMIN_CREATED'
                                  ? 'bg-amber-950/90 text-amber-300 border-amber-800'
                                  : 'bg-purple-950/90 text-purple-300 border-purple-800'
                              }`}>
                                {log.action === 'SIGN_IN' && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                                {log.action === 'SIGN_UP' && <Sparkles className="w-3 h-3 text-blue-400" />}
                                {log.action === 'ADMIN_CREATED' && <UserPlus className="w-3 h-3 text-amber-400" />}
                                <span>{log.action}</span>
                              </span>
                            </td>

                            {/* Provider */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1.5">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
                                  (log.provider || '').includes('google')
                                    ? 'bg-red-950/70 text-red-300 border border-red-800/80'
                                    : 'bg-slate-800 text-slate-300 border border-slate-700'
                                }`}>
                                  {(log.provider || '').includes('google') ? 'Google OAuth' : 'Password'}
                                </span>
                              </div>
                            </td>

                            {/* Date & Time with Relative */}
                            <td className="py-3 px-4">
                              <div className="space-y-0.5">
                                <div className="text-slate-200 font-medium text-[11px]">
                                  {formatFullDateTime(log.timestamp)}
                                </div>
                                <div className="text-[10px] text-orange-400/90 font-mono">
                                  {getRelativeTime(log.timestamp)}
                                </div>
                              </div>
                            </td>

                            {/* Device & OS */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1.5">
                                {isMobile ? (
                                  <Smartphone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                                ) : isTablet ? (
                                  <Tablet className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                                ) : (
                                  <Monitor className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                                )}
                                <div className="text-[11px] text-slate-300">
                                  <span>{log.os || 'Windows'}</span>
                                  {log.screenResolution && log.screenResolution !== 'N/A' && (
                                    <span className="text-[9px] text-slate-500 block font-mono">
                                      {log.screenResolution}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Browser */}
                            <td className="py-3 px-4">
                              <span className="text-slate-300 text-[11px] font-medium bg-slate-950 px-2 py-0.5 rounded border border-slate-850">
                                {log.browser || 'Google Chrome'}
                              </span>
                            </td>

                            {/* Timezone / Region */}
                            <td className="py-3 px-4 text-slate-400 text-[11px] font-mono">
                              <span className="truncate block max-w-[120px]">
                                {log.timezone || 'Asia/Kolkata'}
                              </span>
                            </td>

                            {/* Inspect Action */}
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setInspectedSession(log)}
                                className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition inline-flex items-center gap-1 cursor-pointer"
                                title="Inspect Login Session Forensics"
                              >
                                <Eye className="w-3.5 h-3.5 text-amber-400" />
                                <span>Inspect</span>
                              </button>
                            </td>

                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: USERS LIST & MANAGEMENT */}
        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search & Filter Bar */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row gap-3 items-center justify-between">
              <div className="relative w-full md:w-96">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by Name, Email, UID, or Notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Filter className="w-3.5 h-3.5 text-slate-500" />
                  <span>Role:</span>
                  <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                  >
                    <option value="all">All Roles</option>
                    <option value="citizen">Citizen</option>
                    <option value="admin">Administrator</option>
                    <option value="supervisor">Supervisor</option>
                  </select>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span>Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg px-2.5 py-1.5 focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Users Directory Table */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider">
                      <th className="py-3 px-4">Citizen Profile</th>
                      <th className="py-3 px-4">Role & Access</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4">Provider</th>
                      <th className="py-3 px-4">Total Logins</th>
                      <th className="py-3 px-4">Enrolled Date</th>
                      <th className="py-3 px-4 text-right">Admin Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {filteredUsers.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-12 text-slate-400">
                          {isLoading ? (
                            <div className="flex flex-col items-center gap-2">
                              <RefreshCw className="w-6 h-6 animate-spin text-orange-500" />
                              <span>Loading citizen directory from Firestore...</span>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <Users className="w-8 h-8 text-slate-600 mx-auto" />
                              <p className="font-semibold text-slate-300">No citizen records found matching your filters.</p>
                              <p className="text-[11px] text-slate-500">Try adjusting your search criteria or enroll a new citizen.</p>
                            </div>
                          )}
                        </td>
                      </tr>
                    ) : (
                      filteredUsers.map((u) => {
                        const isSuperAdmin = isUserAdmin(u.email);
                        return (
                          <tr key={u.uid} className="hover:bg-slate-850/50 transition">
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-3">
                                {u.photoURL ? (
                                  <img 
                                    src={u.photoURL} 
                                    alt="" 
                                    className="w-8 h-8 rounded-full object-cover border border-slate-700" 
                                    referrerPolicy="no-referrer"
                                  />
                                ) : (
                                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500 to-amber-600 text-white flex items-center justify-center font-bold text-xs">
                                    {(u.displayName || u.email || 'C')[0].toUpperCase()}
                                  </div>
                                )}
                                <div>
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-bold text-white">{u.displayName || 'Citizen User'}</span>
                                    {isSuperAdmin && (
                                      <span className="px-1.5 py-0.5 rounded text-[9px] font-extrabold bg-red-950 text-red-300 border border-red-800">
                                        ROOT
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-slate-400 flex items-center gap-1">
                                    <Mail className="w-3 h-3 text-slate-500" />
                                    <span>{u.email}</span>
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border uppercase ${
                                isSuperAdmin || u.role === 'admin'
                                  ? 'bg-purple-950/80 text-purple-300 border-purple-800'
                                  : u.role === 'supervisor'
                                  ? 'bg-blue-950/80 text-blue-300 border-blue-800'
                                  : 'bg-slate-800 text-slate-300 border-slate-700'
                              }`}>
                                {isSuperAdmin ? 'Administrator' : (u.role || 'Citizen')}
                              </span>
                            </td>

                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                (u.status || 'active') === 'active'
                                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                  : 'bg-red-950 text-red-300 border border-red-800'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  (u.status || 'active') === 'active' ? 'bg-emerald-400' : 'bg-red-400'
                                }`} />
                                <span>{(u.status || 'active').toUpperCase()}</span>
                              </span>
                            </td>

                            <td className="py-3.5 px-4 font-mono text-[11px] text-slate-400 uppercase">
                              {u.provider === 'google.com' ? 'Google' : 'Password'}
                            </td>

                            <td className="py-3.5 px-4 text-slate-300 font-semibold">
                              <button
                                onClick={() => {
                                  setLoginsSearch(u.email);
                                  setActiveTab('logins');
                                }}
                                className="hover:text-orange-400 underline decoration-dotted cursor-pointer"
                                title="Click to view this citizen's full login records"
                              >
                                {u.loginCount || 1} logins
                              </button>
                            </td>

                            <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                              {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : 'Recent'}
                            </td>

                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => {
                                    setSelectedUser(u);
                                    setEditRole((u.role as any) || 'citizen');
                                    setEditStatus((u.status as any) || 'active');
                                    setEditNotes(u.notes || '');
                                    setIsEditingUser(true);
                                  }}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition cursor-pointer"
                                  title="View & Edit Citizen Profile and Login History"
                                >
                                  <Edit3 className="w-3.5 h-3.5 text-amber-400" />
                                </button>

                                <button
                                  onClick={() => handleSendResetEmail(u.email)}
                                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 transition cursor-pointer"
                                  title="Send Password Reset Email"
                                >
                                  <Key className="w-3.5 h-3.5 text-blue-400" />
                                </button>

                                {!isSuperAdmin && (
                                  <button
                                    onClick={() => handleDeleteUser(u)}
                                    className="p-1.5 rounded-lg bg-red-950/60 hover:bg-red-900 text-red-300 border border-red-850 transition cursor-pointer"
                                    title="Delete User Record"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADD NEW CITIZEN / ENROLL FROM ADMIN */}
        {activeTab === 'add_user' && (
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                <UserPlus className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">Enroll New Citizen Account</h3>
                <p className="text-xs text-slate-400">Directly create and provision a citizen account into Firebase Authentication & Firestore.</p>
              </div>
            </div>

            <form onSubmit={handleCreateNewUser} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Citizen Full Name (As on Official ID) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Rajesh Sharma"
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Citizen Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="rajesh.sharma@example.com"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Initial Password (Min 6 chars) *
                </label>
                <input
                  type="text"
                  required
                  minLength={6}
                  placeholder="e.g., SecurePass2026"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                />
                <p className="text-[11px] text-slate-500 mt-1">The citizen can use this password to log in or reset it via their email.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Assigned Role
                  </label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                  >
                    <option value="citizen">Citizen (Standard Training Access)</option>
                    <option value="supervisor">Supervisor (Regional Helpdesk)</option>
                    <option value="admin">Administrator (Command Access)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Preferred Language
                  </label>
                  <select
                    value={newLang}
                    onChange={(e) => setNewLang(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="bn">বাংলা (Bengali)</option>
                    <option value="ta">தமிழ் (Tamil)</option>
                    <option value="te">తెలుగు (Telugu)</option>
                    <option value="mr">मराठी (Marathi)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Administrative Remarks / Enrollment Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional internal remarks (e.g., Enrolled via CSC Center New Delhi)"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:ring-2 focus:ring-orange-500 outline-none"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('users')}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingNewUser}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/20 transition flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingNewUser ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <UserPlus className="w-4 h-4" />
                      <span>Create & Enroll Citizen</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 4: SECURITY EVENT STREAM */}
        {activeTab === 'audit_logs' && (
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-sm font-bold text-white">System Security & Operations Audit Stream</h3>
                <p className="text-xs text-slate-400">Chronological history of security transactions, admin changes, and credential workflows.</p>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-800">
                Live Audit Logs ({auditLogs.length})
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider">
                    <th className="py-3 px-4">Event Type</th>
                    <th className="py-3 px-4">Citizen / User</th>
                    <th className="py-3 px-4">Auth Method</th>
                    <th className="py-3 px-4">Timestamp (IST)</th>
                    <th className="py-3 px-4">Platform & Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-[11px]">
                  {auditLogs.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-8 text-slate-400">
                        No audit events recorded yet. New sign-ins and sign-ups will populate in real time.
                      </td>
                    </tr>
                  ) : (
                    auditLogs.map((log, idx) => (
                      <tr key={log.id || idx} className="hover:bg-slate-850/50 transition">
                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            log.action === 'SIGN_IN' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                            log.action === 'SIGN_UP' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                            log.action === 'ADMIN_CREATED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                            'bg-purple-950 text-purple-300 border border-purple-800'
                          }`}>
                            {log.action}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-200">
                          <strong>{log.displayName || 'User'}</strong> ({log.email})
                        </td>
                        <td className="py-3 px-4 text-slate-400 uppercase">
                          {log.provider}
                        </td>
                        <td className="py-3 px-4 text-slate-400">
                          {formatFullDateTime(log.timestamp)}
                        </td>
                        <td className="py-3 px-4 text-slate-300 truncate max-w-xs font-sans text-xs">
                          {log.browser ? `${log.browser} on ${log.os}` : log.metadata || 'Standard authentication verified'}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* INSPECT LOGIN SESSION MODAL */}
      {inspectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative text-slate-100 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Login Session Forensics</h3>
                  <p className="text-xs text-slate-400 font-mono">{inspectedSession.id || 'Live Active Session'}</p>
                </div>
              </div>
              <button
                onClick={() => setInspectedSession(null)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Session Info Grid */}
            <div className="space-y-3 bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Citizen Name:</span>
                <span className="font-bold text-white">{inspectedSession.displayName || 'Citizen User'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Email Address:</span>
                <span className="font-mono text-orange-300">{inspectedSession.email}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Citizen User UID:</span>
                <span className="font-mono text-slate-400 truncate max-w-[200px]">{inspectedSession.userId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Login Timestamp:</span>
                <span className="font-bold text-slate-200">{formatFullDateTime(inspectedSession.timestamp)}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Auth Method / Provider:</span>
                <span className="uppercase font-mono font-bold text-amber-400">{inspectedSession.provider}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Device Platform:</span>
                <span className="text-slate-200 font-semibold">{inspectedSession.deviceType || 'Desktop'} ({inspectedSession.os || 'Windows'})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Web Browser:</span>
                <span className="text-slate-200 font-semibold">{inspectedSession.browser || 'Google Chrome'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-850">
                <span className="text-slate-400">Screen Resolution:</span>
                <span className="font-mono text-slate-300">{inspectedSession.screenResolution || '1920x1080'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Timezone / Location:</span>
                <span className="font-mono text-slate-300">{inspectedSession.timezone || 'Asia/Kolkata'}</span>
              </div>
            </div>

            {inspectedSession.userAgent && (
              <div>
                <span className="text-[11px] font-semibold text-slate-400 block mb-1">Raw User-Agent String:</span>
                <p className="bg-slate-950 p-2.5 rounded-lg border border-slate-850 text-[10px] font-mono text-slate-400 break-all">
                  {inspectedSession.userAgent}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setLoginsSearch(inspectedSession.email);
                  setInspectedSession(null);
                  setActiveTab('logins');
                }}
                className="px-3.5 py-2 rounded-xl bg-orange-600/20 hover:bg-orange-600 text-orange-300 hover:text-white border border-orange-500/30 text-xs font-semibold transition"
              >
                Filter All Logins for this Citizen
              </button>

              <button
                type="button"
                onClick={() => setInspectedSession(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition"
              >
                Close Forensics
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT / VIEW CITIZEN MODAL (WITH CITIZEN'S SPECIFIC LOGIN LOGS) */}
      {isEditingUser && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-fadeIn">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-orange-500/10 text-orange-400">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Manage Citizen Profile & History</h3>
                  <p className="text-xs text-slate-400">{selectedUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setIsEditingUser(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-3.5 rounded-xl border border-slate-850 text-xs">
                <div>
                  <span className="text-slate-400 block">UID</span>
                  <span className="font-mono text-[10px] text-slate-300 truncate block">{selectedUser.uid}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Logins</span>
                  <span className="font-bold text-amber-400">{selectedUser.loginCount || 1} logins recorded</span>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block">Enrolled Date</span>
                  <span className="text-slate-300">{selectedUser.createdAt?.toDate ? selectedUser.createdAt.toDate().toLocaleDateString() : 'Active'}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Citizen Access Role
                </label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                >
                  <option value="citizen">Citizen (Training & Practice Labs)</option>
                  <option value="supervisor">Supervisor (Helpdesk Reviewer)</option>
                  <option value="admin">Administrator (Full Command Access)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Account Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer"
                >
                  <option value="active">Active (Full Portal Access)</option>
                  <option value="suspended">Suspended (Access Revoked)</option>
                  <option value="pending">Pending (Awaiting Document Verification)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Internal Administrative Remarks
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  placeholder="Record administrative audit notes or special instructions..."
                />
              </div>

              {/* Citizen's Specific Login Session Stream */}
              <div className="pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5 text-orange-400" />
                    <span>Recent Login Sessions for {selectedUser.displayName || 'Citizen'} ({selectedUserLogins.length})</span>
                  </span>
                  <button
                    onClick={() => {
                      setLoginsSearch(selectedUser.email);
                      setIsEditingUser(false);
                      setActiveTab('logins');
                    }}
                    className="text-[11px] text-orange-400 hover:underline"
                  >
                    View in All Logins
                  </button>
                </div>

                <div className="bg-slate-950 rounded-xl border border-slate-850 p-2 max-h-40 overflow-y-auto space-y-1.5">
                  {selectedUserLogins.length === 0 ? (
                    <p className="text-[11px] text-slate-500 text-center py-3">No individual session records logged yet.</p>
                  ) : (
                    selectedUserLogins.map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-900 border border-slate-800 text-[11px]">
                        <div className="flex items-center gap-2">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                            {item.action}
                          </span>
                          <span className="text-slate-300 font-medium">{item.browser || 'Chrome'} on {item.os || 'Windows'}</span>
                        </div>
                        <span className="text-slate-400 font-mono text-[10px]">{formatFullDateTime(item.timestamp)}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={() => handleSendResetEmail(selectedUser.email)}
                className="px-3.5 py-2 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800 text-xs font-semibold transition flex items-center gap-1.5 cursor-pointer"
              >
                <Key className="w-3.5 h-3.5" />
                <span>Send Password Reset</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditingUser(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveUserChanges}
                  disabled={isSavingEdit}
                  className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                >
                  {isSavingEdit ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 px-4 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Digital India Citizen Identity Service • Super Admin Authorized Session</span>
          <span className="text-slate-400 font-mono text-[11px]">ADMIN UID: {user?.uid}</span>
        </div>
      </footer>
    </div>
  );
};
