import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs,
  collection,
  query,
  orderBy,
  limit,
  deleteDoc,
  updateDoc,
  serverTimestamp,
  addDoc,
  getDocFromServer
} from 'firebase/firestore';

// Web app's Firebase configuration provided by the user
export const firebaseConfig = {
  apiKey: "AIzaSyCjFTrzlFiedHISTJwBFUuquPyuIZvnSGQ",
  authDomain: "training-digilocker-adhar-pan.firebaseapp.com",
  projectId: "training-digilocker-adhar-pan",
  storageBucket: "training-digilocker-adhar-pan.firebasestorage.app",
  messagingSenderId: "85269275389",
  appId: "1:85269275389:web:7122b5786bc6d256a55494",
  measurementId: "G-FCWDYG5B39"
};

export const ADMIN_EMAILS = [
  'sanjeevtiwari5530@gmail.com',
  'fyit268sanjeev@gmail.com',
  'admin@diginagrik.gov.in',
  'superadmin@diginagrik.gov.in'
];

export function isUserAdmin(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase().trim());
}

// Initialize primary Firebase App
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account'
});
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Secondary App instance for admin creating new user accounts without losing admin session
let secondaryAppInstance: any = null;
export function getSecondaryAuth() {
  if (!secondaryAppInstance) {
    // Check if named app already exists
    const existing = getApps().find(a => a.name === 'SecondaryAdminWorker');
    secondaryAppInstance = existing || initializeApp(firebaseConfig, 'SecondaryAdminWorker');
  }
  return getAuth(secondaryAppInstance);
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.warn('Firestore Error Context: ', JSON.stringify(errInfo));
  return errInfo;
}

export interface UserProfileData {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  phoneNumber?: string;
  preferredLanguage?: string;
  createdAt?: any;
  lastLoginAt?: any;
  role?: 'citizen' | 'admin' | 'supervisor';
  status?: 'active' | 'suspended' | 'pending';
  loginCount?: number;
  notes?: string;
  provider?: string;
  bookmarks?: string[];
  completedGuides?: string[];
}

export interface AuthAuditLog {
  id?: string;
  userId: string;
  email: string;
  displayName?: string;
  action: 'SIGN_IN' | 'SIGN_UP' | 'ADMIN_CREATED' | 'PASSWORD_RESET' | 'ROLE_CHANGE';
  provider: string;
  timestamp: any;
  status: 'SUCCESS' | 'FAILED';
  browser?: string;
  os?: string;
  deviceType?: 'Desktop' | 'Mobile' | 'Tablet';
  screenResolution?: string;
  timezone?: string;
  language?: string;
  userAgent?: string;
  metadata?: string;
}

/**
 * Parses client device, browser, OS, and localization environment
 */
export function getClientLoginMetadata() {
  if (typeof window === 'undefined') {
    return {
      browser: 'Unknown Browser',
      os: 'Unknown OS',
      deviceType: 'Desktop' as const,
      screenResolution: 'N/A',
      timezone: 'Asia/Kolkata',
      language: 'en',
      userAgent: 'Unknown'
    };
  }

  const ua = navigator.userAgent;
  let browser = 'Chrome';
  if (ua.includes('Edg/')) browser = 'Microsoft Edge';
  else if (ua.includes('Chrome/')) browser = 'Google Chrome';
  else if (ua.includes('Safari/') && !ua.includes('Chrome/')) browser = 'Apple Safari';
  else if (ua.includes('Firefox/')) browser = 'Mozilla Firefox';
  else if (ua.includes('MSIE ') || ua.includes('Trident/')) browser = 'Internet Explorer';
  else if (ua.includes('Opera') || ua.includes('OPR/')) browser = 'Opera';

  let os = 'Windows';
  if (ua.includes('Windows NT 10.0') || ua.includes('Windows NT 11.0')) os = 'Windows 10/11';
  else if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Android')) os = 'Android OS';
  else if (ua.includes('iPhone') || ua.includes('iPad') || ua.includes('iPod')) os = 'iOS';
  else if (ua.includes('Mac OS X')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('CrOS')) os = 'ChromeOS';

  const isMobile = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  const isTablet = /iPad|Android(?!.*Mobile)/i.test(ua);
  const deviceType: 'Desktop' | 'Mobile' | 'Tablet' = isTablet ? 'Tablet' : (isMobile ? 'Mobile' : 'Desktop');

  const screenResolution = `${window.screen?.width || window.innerWidth || 0}x${window.screen?.height || window.innerHeight || 0}`;
  let timezone = 'Asia/Kolkata';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Kolkata';
  } catch (e) {
    timezone = 'Asia/Kolkata';
  }
  const language = navigator.language || 'en-IN';

  return {
    browser,
    os,
    deviceType,
    screenResolution,
    timezone,
    language,
    userAgent: ua
  };
}

/**
 * Log sign-in or sign-up event for admin audit and all logins data viewing
 */
export async function logAuthActivity(
  userId: string,
  email: string,
  action: 'SIGN_IN' | 'SIGN_UP' | 'ADMIN_CREATED' | 'PASSWORD_RESET' | 'ROLE_CHANGE',
  provider: string = 'password',
  displayName?: string,
  metadata?: string,
  customClientMeta?: Partial<ReturnType<typeof getClientLoginMetadata>>
) {
  try {
    const clientMeta = { ...getClientLoginMetadata(), ...customClientMeta };
    const logsRef = collection(db, 'auth_audit_logs');
    await addDoc(logsRef, {
      userId,
      email,
      displayName: displayName || 'Citizen User',
      action,
      provider,
      timestamp: serverTimestamp(),
      status: 'SUCCESS',
      browser: clientMeta.browser || 'Google Chrome',
      os: clientMeta.os || 'Windows',
      deviceType: clientMeta.deviceType || 'Desktop',
      screenResolution: clientMeta.screenResolution || '1920x1080',
      timezone: clientMeta.timezone || 'Asia/Kolkata',
      language: clientMeta.language || 'en',
      userAgent: clientMeta.userAgent || '',
      metadata: metadata || ''
    });
  } catch (err) {
    console.warn('Audit log write skipped:', err);
  }
}

/**
 * Saves or updates user profile in Firestore
 */
export async function syncUserProfile(
  user: FirebaseUser, 
  additionalData: Partial<UserProfileData> = {},
  isNewSignUp: boolean = false
) {
  if (!user) return null;
  const userRef = doc(db, 'users', user.uid);
  const isAdmin = isUserAdmin(user.email);
  
  try {
    const userDoc = await getDoc(userRef);
    const providerId = user.providerData?.[0]?.providerId || 'password';

    if (!userDoc.exists()) {
      const initialProfile: UserProfileData = {
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || additionalData.displayName || (isAdmin ? 'Chief Administrator' : 'Citizen User'),
        photoURL: user.photoURL || '',
        preferredLanguage: additionalData.preferredLanguage || 'en',
        role: isAdmin ? 'admin' : (additionalData.role || 'citizen'),
        status: 'active',
        provider: providerId,
        loginCount: 1,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
        bookmarks: [],
        completedGuides: [],
        ...additionalData
      };
      await setDoc(userRef, initialProfile, { merge: true });

      // Log sign-up event
      await logAuthActivity(
        user.uid, 
        user.email || '', 
        isNewSignUp ? 'SIGN_UP' : 'SIGN_IN', 
        providerId, 
        initialProfile.displayName
      );
    } else {
      const existingData = userDoc.data() as UserProfileData;
      const currentCount = existingData.loginCount || 1;
      
      const updateData: Partial<UserProfileData> = {
        uid: user.uid,
        email: user.email || existingData.email,
        displayName: user.displayName || additionalData.displayName || existingData.displayName,
        photoURL: user.photoURL || existingData.photoURL || '',
        lastLoginAt: serverTimestamp(),
        loginCount: currentCount + 1,
        role: isAdmin ? 'admin' : (existingData.role || 'citizen'),
        provider: providerId,
        ...additionalData
      };
      await setDoc(userRef, updateData, { merge: true });

      // Log sign-in event
      await logAuthActivity(
        user.uid,
        user.email || '',
        'SIGN_IN',
        providerId,
        updateData.displayName
      );
    }
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `users/${user.uid}`);
  }
}

/**
 * Fetch all users (Admin only)
 */
export async function getAllUsers(): Promise<UserProfileData[]> {
  try {
    const usersRef = collection(db, 'users');
    const q = query(usersRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({
      uid: d.id,
      ...(d.data() as Omit<UserProfileData, 'uid'>)
    }));
  } catch (error) {
    // Fallback if query without order by is needed
    try {
      const usersRef = collection(db, 'users');
      const snapshot = await getDocs(usersRef);
      return snapshot.docs.map(d => ({
        uid: d.id,
        ...(d.data() as Omit<UserProfileData, 'uid'>)
      }));
    } catch (e2) {
      handleFirestoreError(e2, OperationType.LIST, 'users');
      return [];
    }
  }
}

/**
 * Fetch all login records & audit logs (Admin only)
 */
export async function getAuthAuditLogs(maxLimit: number = 300): Promise<AuthAuditLog[]> {
  try {
    const logsRef = collection(db, 'auth_audit_logs');
    const q = query(logsRef, orderBy('timestamp', 'desc'), limit(maxLimit));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(d => ({
      id: d.id,
      ...(d.data() as Omit<AuthAuditLog, 'id'>)
    }));
  } catch (error) {
    try {
      const logsRef = collection(db, 'auth_audit_logs');
      const snapshot = await getDocs(logsRef);
      const docs = snapshot.docs.map(d => ({
        id: d.id,
        ...(d.data() as Omit<AuthAuditLog, 'id'>)
      }));
      // Sort client-side by timestamp descending
      return docs.sort((a, b) => {
        const timeA = a.timestamp?.toMillis ? a.timestamp.toMillis() : (a.timestamp?.seconds ? a.timestamp.seconds * 1000 : 0);
        const timeB = b.timestamp?.toMillis ? b.timestamp.toMillis() : (b.timestamp?.seconds ? b.timestamp.seconds * 1000 : 0);
        return timeB - timeA;
      });
    } catch (e2) {
      handleFirestoreError(e2, OperationType.LIST, 'auth_audit_logs');
      return [];
    }
  }
}

/**
 * Admin creates a new citizen or user account
 */
export async function adminCreateUser(params: {
  fullName: string;
  email: string;
  password: string;
  role?: 'citizen' | 'admin' | 'supervisor';
  preferredLanguage?: string;
  notes?: string;
}) {
  const secondaryAuth = getSecondaryAuth();
  
  // 1. Create user in Firebase Auth using isolated secondary auth instance
  const cred = await createUserWithEmailAndPassword(secondaryAuth, params.email.trim(), params.password);
  const newUser = cred.user;

  // 2. Set display name
  if (params.fullName.trim()) {
    await updateProfile(newUser, { displayName: params.fullName.trim() });
  }

  // 3. Store in Firestore users collection
  const userRef = doc(db, 'users', newUser.uid);
  const profileData: UserProfileData = {
    uid: newUser.uid,
    email: params.email.trim(),
    displayName: params.fullName.trim(),
    preferredLanguage: params.preferredLanguage || 'en',
    role: params.role || 'citizen',
    status: 'active',
    provider: 'password',
    loginCount: 0,
    notes: params.notes || 'Created via Admin Portal',
    createdAt: serverTimestamp(),
    lastLoginAt: null,
    bookmarks: [],
    completedGuides: []
  };

  await setDoc(userRef, profileData);

  // 4. Log admin audit entry
  await logAuthActivity(
    newUser.uid,
    params.email.trim(),
    'ADMIN_CREATED',
    'admin-portal',
    params.fullName.trim(),
    `Created by Administrator (${auth.currentUser?.email || 'admin'}) with role: ${params.role || 'citizen'}`
  );

  // 5. Sign out secondary auth worker so it's clean for future creations
  await signOut(secondaryAuth);

  return profileData;
}

/**
 * Admin updates a user's role or details
 */
export async function adminUpdateUser(
  userId: string, 
  data: Partial<UserProfileData>
) {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp()
  });

  if (data.role) {
    await logAuthActivity(
      userId,
      data.email || 'user',
      'ROLE_CHANGE',
      'admin-portal',
      data.displayName,
      `Role changed to ${data.role}`
    );
  }
}

/**
 * Admin deletes a user record from Firestore
 */
export async function adminDeleteUser(userId: string, email: string) {
  const userRef = doc(db, 'users', userId);
  await deleteDoc(userRef);
  
  await logAuthActivity(
    userId,
    email,
    'ROLE_CHANGE',
    'admin-portal',
    '',
    `Account removed from portal by Admin (${auth.currentUser?.email || 'admin'})`
  );
}

// Test initial connection
export async function checkFirebaseConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Firebase client in offline fallback mode.");
    }
  }
}
