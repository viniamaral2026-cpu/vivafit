"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { Skeleton } from '@/components/ui/skeleton';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  // This function will be used by layouts to check onboarding status when needed
  checkOnboardingStatus: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, checkOnboardingStatus: async () => false });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // This function is now exposed via context, so layouts can call it.
  // This prevents calling Firestore on every single route change from the provider.
  const checkOnboardingStatus = async (): Promise<boolean> => {
    if (!auth.currentUser) return false;
    const userDocRef = doc(db, "users", auth.currentUser.uid);
    try {
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() && userDoc.data().onboardingComplete;
    } catch (error) {
        console.error("Failed to fetch user onboarding status:", error);
        // This can happen if user is offline or firestore rules deny access.
        // Treat as not onboarded to be safe.
        return false;
    }
  };


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setUser(user);
      // We no longer check onboarding status here to prevent race conditions.
      // Layouts are now responsible for this check.
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
    checkOnboardingStatus
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
