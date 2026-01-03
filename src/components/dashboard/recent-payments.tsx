
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "../ui/skeleton";

type Profile = {
    id: string;
    full_name: string;
    email: string;
    subscription: 'Free' | 'Premium';
    raw_user_meta_data?: {
        avatar_url?: string;
    }
}

export function RecentPayments() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchRecentUsers = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(5);
        
        if (error) {
            console.error("Error fetching recent users", error);
        } else {
            setUsers(data as Profile[]);
        }
        setLoading(false);
    }
    fetchRecentUsers();
  }, [supabase]);

  if (loading) {
      return (
          <div className="space-y-8">
              {Array.from({length: 5}).map((_, index) => (
                  <div className="flex items-center" key={index}>
                      <Skeleton className="h-9 w-9 rounded-full" />
                      <div className="ml-4 space-y-1">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-4 w-16 ml-auto" />
                  </div>
              ))}
          </div>
      )
  }

  return (
    <div className="space-y-8">
      {users.map((user) => (
        <div className="flex items-center" key={user.id}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.raw_user_meta_data?.avatar_url} alt="Avatar" />
            <AvatarFallback>{user.full_name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{user.full_name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
          <div className={`ml-auto font-medium ${user.subscription === 'Premium' ? 'text-green-600' : ''}`}>
            {user.subscription === 'Premium' ? "+R$9.99" : "Grátis"}
          </div>
        </div>
      ))}
    </div>
  );
}
