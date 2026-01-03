
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname, useRouter } from 'next/navigation';

// Define a mock user type that is compatible with Firebase's User
export type MockUser = Pick<User, 'uid' | 'displayName' | 'email' | 'photoURL'> & {
  subscription: 'Free' | 'Premium';
};

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
  isPremium: boolean;
}


const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isPremium: false });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      const sessionUserStr = typeof window !== 'undefined' ? window.sessionStorage.getItem('vivafit-user') : null;
      
      if (sessionUserStr) {
        const sessionUser = JSON.parse(sessionUserStr);
         // Ensure subscription status is part of the user object, default to 'Free' if not present
        if (!sessionUser.subscription) {
            sessionUser.subscription = 'Free';
        }
        setUser(sessionUser);
      } else {
        setUser(null); 
      }
      setLoading(false);
    }, 500);
  }, []);

  const isPremium = user?.subscription === 'Premium';

  useEffect(() => {
    if (!loading) {
      // Redirect non-premium users from premium-only pages
      if (pathname === '/premium' && !isPremium) {
        router.push('/subscribe');
      }
    }
  }, [loading, isPremium, pathname, router]);

  
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
    isPremium,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
