import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  signOut,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { 
  auth, 
  db, 
  googleProvider, 
  syncUserProfile, 
  UserProfileData, 
  isUserAdmin,
  ADMIN_EMAILS 
} from '../lib/firebase';
import { Language } from '../types';

interface AuthContextType {
  user: FirebaseUser | null;
  userProfile: UserProfileData | null;
  isAdmin: boolean;
  loading: boolean;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, fullName: string, preferredLang?: Language) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  error: string | null;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  const fetchProfile = async (currentUser: FirebaseUser) => {
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      const snap = await getDoc(userDocRef);
      const isAdminUser = isUserAdmin(currentUser.email);

      if (snap.exists()) {
        const data = snap.data() as UserProfileData;
        setUserProfile({
          ...data,
          role: isAdminUser ? 'admin' : (data.role || 'citizen')
        });
      } else {
        await syncUserProfile(currentUser, {
          role: isAdminUser ? 'admin' : 'citizen'
        });
        setUserProfile({
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || (isAdminUser ? 'Chief Administrator' : 'Citizen'),
          photoURL: currentUser.photoURL || '',
          role: isAdminUser ? 'admin' : 'citizen'
        });
      }
    } catch (err) {
      console.warn('Could not load user profile from Firestore:', err);
      const isAdminUser = isUserAdmin(currentUser.email);
      setUserProfile({
        uid: currentUser.uid,
        email: currentUser.email || '',
        displayName: currentUser.displayName || (isAdminUser ? 'Chief Administrator' : 'Citizen'),
        photoURL: currentUser.photoURL || '',
        role: isAdminUser ? 'admin' : 'citizen'
      });
    }
  };

  useEffect(() => {
    // Check if user returned from Google Redirect flow
    getRedirectResult(auth)
      .then(async (result) => {
        if (result && result.user) {
          await syncUserProfile(result.user);
          await fetchProfile(result.user);
        }
      })
      .catch((err) => {
        console.warn('Redirect auth check notice:', err);
      });

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await fetchProfile(currentUser);
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshUserProfile = async () => {
    if (auth.currentUser) {
      await fetchProfile(auth.currentUser);
    }
  };

  const signInWithEmail = async (email: string, pass: string) => {
    setError(null);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), pass);
      await syncUserProfile(cred.user);
    } catch (err: any) {
      let friendlyMsg = 'Failed to sign in. Please check your credentials.';
      if (err.code === 'auth/network-request-failed') {
        friendlyMsg = 'Network connection to authentication service failed. If you are using an ad-blocker or embedded preview, please open the app in a new browser tab or check your internet connection.';
      } else if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        friendlyMsg = 'Invalid email or password. If you are new, please Sign Up first.';
      } else if (err.code === 'auth/too-many-requests') {
        friendlyMsg = 'Too many attempts. Access has been temporarily locked. Try again later or reset password.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMsg = 'Please enter a valid email address.';
      } else if (err.message) {
        friendlyMsg = err.message;
      }
      setError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, fullName: string, preferredLang: Language = 'en') => {
    setError(null);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), pass);
      if (fullName.trim()) {
        await updateProfile(cred.user, { displayName: fullName.trim() });
      }
      await syncUserProfile(cred.user, {
        displayName: fullName.trim(),
        preferredLanguage: preferredLang
      }, true);
    } catch (err: any) {
      let friendlyMsg = 'Failed to create account. Please try again.';
      if (err.code === 'auth/network-request-failed') {
        friendlyMsg = 'Network connection to authentication service failed. Please check your internet connection or disable ad-blockers.';
      } else if (err.code === 'auth/email-already-in-use') {
        friendlyMsg = 'This email is already registered. Please sign in instead.';
      } else if (err.code === 'auth/weak-password') {
        friendlyMsg = 'Password is too weak. Please use at least 6 characters with letters and numbers.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMsg = 'Please provide a valid email format (e.g., citizen@example.com).';
      } else if (err.message) {
        friendlyMsg = err.message;
      }
      setError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const cred = await signInWithPopup(auth, googleProvider);
      await syncUserProfile(cred.user);
      await fetchProfile(cred.user);
    } catch (err: any) {
      console.warn('Google Sign-in error details:', err);
      let friendlyMsg = 'Google sign-in was cancelled or encountered an error.';
      if (err.code === 'auth/network-request-failed') {
        friendlyMsg = 'Network request failed during Google Authentication. This typically occurs when third-party cookies or popups are restricted in an embedded preview window or blocked by an ad-blocker. Please open this app directly in a new browser tab using the button below, or sign in using email/password.';
      } else if (err.code === 'auth/popup-closed-by-user') {
        friendlyMsg = 'Google sign-in popup was closed before completing.';
      } else if (err.code === 'auth/popup-blocked') {
        try {
          // If popup is blocked by browser, attempt redirect method
          await signInWithRedirect(auth, googleProvider);
          return;
        } catch (redirectErr: any) {
          friendlyMsg = 'Sign-in popup was blocked by browser. Please enable popups or open the app in a dedicated tab.';
        }
      } else if (err.code === 'auth/cancelled-popup-request') {
        friendlyMsg = 'Another sign-in window was already open. Please try again.';
      } else if (err.code === 'auth/unauthorized-domain') {
        const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'current domain';
        friendlyMsg = `Firebase Auth Error (auth/unauthorized-domain): The domain "${currentHost}" is not listed in your Firebase project's Authorized Domains.`;
      } else if (err.message) {
        friendlyMsg = err.message;
      }
      setError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  const logout = async () => {
    setError(null);
    try {
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
    } catch (err: any) {
      setError(err.message || 'Failed to sign out.');
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email.trim());
    } catch (err: any) {
      let friendlyMsg = 'Could not send password reset email.';
      if (err.code === 'auth/user-not-found') {
        friendlyMsg = 'No registered account found with this email address.';
      } else if (err.code === 'auth/invalid-email') {
        friendlyMsg = 'Please enter a valid email address.';
      } else if (err.message) {
        friendlyMsg = err.message;
      }
      setError(friendlyMsg);
      throw new Error(friendlyMsg);
    }
  };

  const isAdmin = isUserAdmin(user?.email) || userProfile?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      userProfile,
      isAdmin,
      loading,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      logout,
      resetPassword,
      refreshUserProfile,
      error,
      clearError
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
