"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isOnboardingComplete: boolean | null; // This will now be managed by layouts
  checkOnboardingStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isOnboardingComplete: null, checkOnboardingStatus: async () => false });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean | null>(null);


  const checkOnboardingStatus = async (): Promise<boolean> => {
    if (!auth.currentUser) return false;
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    try {
        const userDoc = await getDoc(userDocRef);
        const isComplete = userDoc.exists() && userDoc.data().onboardingComplete;
        setIsOnboardingComplete(isComplete);
        return isComplete;
    } catch (error) {
        console.error("Failed to fetch user onboarding status:", error);
        setIsOnboardingComplete(false);
        return false;
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setUser(user);
      if (user) {
        // We still check it here once to set an initial state, but layouts will re-check.
        await checkOnboardingStatus();
      } else {
        setIsOnboardingComplete(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  if (loading) {
      return (
        <div className="flex flex-col min-h-screen">
          <header className="sticky top-0 z-50 w-full border-b h-16 flex items-center px-4"><Skeleton className="w-24 h-8" /></header>
          <main className="flex-1 p-8">
            <div className="space-y-4">
              <Skeleton className="h-12 w-1/2" />
              <Skeleton className="h-6 w-3/4" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
                  <Skeleton className="h-40" />
                  <Skeleton className="h-40" />
                  <Skeleton className="h-40" />
              </div>
            </div>
          </main>
        </div>
      )
  }

  const value = {
    user,
    loading,
    isOnboardingComplete,
    checkOnboardingStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
