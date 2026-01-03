

"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
    Newspaper, 
    Dumbbell, 
    Bot, 
    Utensils, 
    Gem,
    Smartphone, 
    LogOut, 
    Info,
    Clapperboard,
    Home,
    Search,
    Activity,
    Ruler,
    HeartPulse,
    Bed,
    CalendarDays,
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
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (authLoading) return; 

    const isNewUser = typeof window !== 'undefined' && window.sessionStorage.getItem('vivafit-new-user');

    if (!user) {
      router.push('/auth');
      return;
    }

    if (isNewUser && pathname !== '/onboarding' && !pathname.startsWith('/onboarding/')) {
      router.push('/onboarding');
      return;
    }

  }, [authLoading, router, user, pathname]);

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
    { href: "/dashboard", label: "Início", icon: Home },
    { href: "/journal", label: "Diário", icon: Newspaper },
    { href: "/recipes", label: "Alimentação", icon: Utensils },
    { href: "/workouts", label: "Treinos", icon: Dumbbell },
    { href: "/ai-coach", label: "AI Coach", icon: Bot },
    { href: "/premium", label: "Premium Hub", icon: Gem, isPremium: true },
    { href: "/testimonials", label: "Depoimentos", icon: Clapperboard },
    { href: "/devices", label: "Dispositivos", icon: Smartphone },
  ];

  const searchResults = [
      { label: "Atividades", icon: Activity, href: "/activity" },
      { label: "Medidas", icon: Ruler, href: "/measurements" },
      { label: "Sinais vitais", icon: HeartPulse, href: "/vitals" },
      { label: "Sono", icon: Bed, href: "/sleep" },
      { label: "Monitoramento de ciclo", icon: CalendarDays, href: "/cycle-tracking" },
  ].filter(item => item.label.toLowerCase().includes(searchQuery.toLowerCase()));
  
  if (authLoading || !user) {
    return (
       <div className="flex min-h-screen bg-background">
        <div className="hidden md:block md:w-64 border-r p-4">
            <div className="p-4 mb-4">
                <Skeleton className="h-10 w-28" />
            </div>
            <div className="space-y-1 p-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="p-2 mt-auto">
                 <Skeleton className="h-16 w-full" />
                 <Skeleton className="h-10 w-full mt-4" />
            </div>
        </div>
        <div className="flex-1">
           <header className="flex h-16 items-center justify-between border-b bg-background px-4 sticky top-0 z-40">
              <Skeleton className="h-10 w-10 md:hidden"/>
              <div className="ml-auto flex items-center gap-4">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
           </header>
           <main className="flex-1 overflow-auto bg-muted/20 p-4 md:p-6">
                <Skeleton className="h-full w-full"/>
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
            <Link href="/dashboard" className="block p-2">
              <Logo className="w-full" />
            </Link>
          </Card>
        </SidebarHeader>
        <SidebarContent className="p-2">
            <div className="relative mb-2">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Procurar..." 
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          {searchQuery ? (
             <SidebarMenu>
                 {searchResults.length > 0 ? searchResults.map((item) => (
                    <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                        asChild
                        variant="ghost"
                        className="w-full justify-start"
                        tooltip={{ children: item.label }}
                        >
                        <Link href={item.href} className="flex items-center">
                            <item.icon className="w-5 h-5 mr-3" />
                            <span>{item.label}</span>
                        </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                 )) : (
                    <p className="p-4 text-sm text-center text-muted-foreground">Nenhum resultado.</p>
                 )}
            </SidebarMenu>
          ) : (
            <SidebarMenu>
                {menuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                    asChild
                    isActive={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true)}
                    variant={pathname.startsWith(item.href) && (item.href === '/dashboard' ? pathname === item.href : true) ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    tooltip={{ children: item.label }}
                    >
                    <Link href={item.href} className="flex items-center">
                        <item.icon className="w-5 h-5 mr-3" />
                        <span>{item.label}</span>
                        {item.isPremium && <Gem className="ml-auto h-4 w-4 text-yellow-400" />}
                    </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                ))}
            </SidebarMenu>
          )}
        </SidebarContent>
        <SidebarFooter className="flex flex-col gap-2 p-4">
            <Card className="bg-primary/10 border-primary/20">
                <div className="p-3 text-center">
                    <p className="font-semibold text-sm text-primary">Plano Premium</p>
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
