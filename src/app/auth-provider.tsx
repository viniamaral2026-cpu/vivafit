
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import { Skeleton } from '@/components/ui/skeleton';

// Define a mock user type that is compatible with Firebase's User
type MockUser = Pick<User, 'uid' | 'displayName' | 'email' | 'photoURL'>;

interface AuthContextType {
  user: MockUser | null;
  loading: boolean;
}

// Create a mock user for development
const mockUser: MockUser = {
  uid: 'mock-user-123',
  displayName: 'Usuário de Teste',
  email: 'teste@vivafit.com',
  photoURL: 'https://i.pravatar.cc/150?u=mock-user-123',
};


const AuthContext = createContext<AuthContextType>({ user: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user data
    setTimeout(() => {
      const sessionUser = typeof window !== 'undefined' && window.sessionStorage.getItem('vivafit-user');
      const isNewUser = typeof window !== 'undefined' && window.sessionStorage.getItem('vivafit-new-user');

      if (isNewUser) {
        // Don't set user, let onboarding handle it.
        // Or if you want to show user info during onboarding, you can parse and set it.
        // For this flow, we'll assume the user is "logged in" but needs onboarding.
         if(sessionUser) {
            setUser(JSON.parse(sessionUser));
         }
      } else if(sessionUser) {
        setUser(JSON.parse(sessionUser));
      } else {
        setUser(null); 
      }
      setLoading(false);
    }, 500); // Shorten delay
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
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
