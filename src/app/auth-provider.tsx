
"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import type { User } from '@supabase/supabase-js';
import { Skeleton } from '@/components/ui/skeleton';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

// Define a user type that is compatible with Supabase's User
export type AppUser = User & {
  subscription: 'Free' | 'Premium';
};

interface AuthContextType {
  user: AppUser | null;
  loading: boolean;
  isPremium: boolean;
}


const AuthContext = createContext<AuthContextType>({ user: null, loading: true, isPremium: false });

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();
  
  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        // Here you might fetch additional user profile data from your 'profiles' table
        const appUser: AppUser = {
          ...session.user,
          // This is a mock value. You should fetch this from your database.
          subscription: session.user.user_metadata?.subscription || 'Free',
        };
        setUser(appUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
           const appUser: AppUser = {
            ...session.user,
            subscription: session.user.user_metadata?.subscription || 'Free',
          };
          setUser(appUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const isPremium = user?.subscription === 'Premium';
  
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
