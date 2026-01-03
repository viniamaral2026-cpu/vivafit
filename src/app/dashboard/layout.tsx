"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    Newspaper, 
    Dumbbell, 
    Bot, 
    Utensils, 
    Star, 
    Smartphone, 
    LogOut, 
    Gem,
    Info,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { Logo } from "@/components/icons/logo";
import { useAuth } from "../auth-provider";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (authLoading) return; 

    if (!user) {
      router.push('/auth');
      return;
    }

  }, [authLoading, router, user]);

  const handleSignOut = async () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('vivafit-user');
    }
    toast({
      title: "Você saiu!",
      description: "Esperamos te ver novamente em breve.",
    });
    router.push("/");
    // A soft reload might be needed if the provider doesn't update across layouts
    setTimeout(() => window.location.reload(), 500);
  };

  const menuItems = [
    { href: "/journal", label: "Diário", icon: Newspaper },
    { href: "/recipes", label: "Alimentação", icon: Utensils },
    { href: "/workouts", label: "Treinos", icon: Dumbbell },
    { href: "/premium", label: "Premium Hub", icon: Star, isPremium: true },
    { href: "/ai-coach", label: "AI Coach", icon: Bot },
    { href: "/devices", label: "Dispositivos", icon: Smartphone },
  ];
  
  if (authLoading || !user) {
    return (
       <div className="flex min-h-screen bg-background">
        <div className="hidden md:block md:w-64 border-r p-4">
            <div className="p-4 mb-4">
                <Skeleton className="h-14 w-14 rounded-lg" />
            </div>
            <div className="space-y-1 p-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
            </div>
            <div className="p-2 mt-auto">
                 <Skeleton className="h-20 w-full" />
                 <Skeleton className="h-10 w-full mt-4" />
            </div>
        </div>
        <div className="flex-1">
           <header className="flex h-16 items-center justify-between border-b bg-background px-4 sticky top-0 z-40">
              <Skeleton className="h-10 w-10 md:hidden"/>
              <div className="ml-auto flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
           </header>
           <main className="flex-1 overflow-auto bg-background p-4 md:p-6">
                <div className="flex flex-col items-center justify-center h-full">
                    <div className="relative w-64 h-64">
                         <Skeleton className="w-64 h-64 rounded-full"/>
                    </div>
                    <div className="mt-8">
                        <Skeleton className="h-4 w-48"/>
                    </div>
                    <div className="fixed bottom-8 w-full max-w-md p-4">
                        <Skeleton className="h-24 w-full rounded-xl"/>
                    </div>
                </div>
           </main>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4">
          <Card className="shadow-md">
            <Link href="/journal" className="block p-2">
              <Logo className="w-full" />
            </Link>
          </Card>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href) && (item.href === '/journal' ? pathname === item.href : true)}
                  variant={pathname.startsWith(item.href) && (item.href === '/journal' ? pathname === item.href : true) ? 'default' : 'ghost'}
                  className={`w-full justify-start ${pathname.startsWith(item.href) && (item.href === '/journal' ? pathname === item.href : true) ? 'bg-primary text-primary-foreground' : ''}`}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href} className="flex items-center">
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                    {item.isPremium && <Gem className="ml-auto h-4 w-4 text-yellow-500" />}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2 p-4">
            <Card className="bg-primary/10 border-primary/20">
                <div className="p-3 text-center">
                    <p className="font-semibold text-sm">Plano Premium</p>
                    <p className="text-xs text-muted-foreground">MEMBRO VITALÍCIO</p>
                </div>
            </Card>
             <Button variant="ghost" onClick={handleSignOut} className="w-full justify-start text-muted-foreground">
                <LogOut className="mr-3 h-5 w-5" />
                Encerrar Sessão
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-16 items-center justify-between border-b bg-background px-6 sticky top-0 z-40">
            <SidebarTrigger className="md:hidden"/>
            <div className="ml-auto flex items-center gap-4">
                <Button variant="ghost" size="icon">
                    <Info className="h-5 w-5" />
                </Button>
                <UserNav />
            </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/20">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
