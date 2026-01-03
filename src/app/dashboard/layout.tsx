"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Dumbbell, User, Bot, Utensils } from "lucide-react";
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
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { Logo } from "@/components/icons/logo";
import { useAuth } from "../auth-provider";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading, isOnboardingComplete } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/auth');
      } else if (isOnboardingComplete === false) { // Explicitly check for false
        router.push('/onboarding');
      }
    }
  }, [user, loading, isOnboardingComplete, router]);

  const menuItems = [
    { href: "/dashboard", label: "Início", icon: Home },
    { href: "/workouts", label: "Treinos", icon: Dumbbell },
    { href: "/recipes", label: "Receitas", icon: Utensils },
    { href: "/ai-coach", label: "IA Coach", icon: Bot },
    { href: "/account", label: "Perfil", icon: User },
  ];
  
  if (loading || !user || isOnboardingComplete === null) {
    return (
       <div className="flex min-h-screen items-center justify-center">
            Carregando...
       </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-24" />
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.href)}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 sticky top-0 z-40">
            <SidebarTrigger className="md:hidden"/>
            <div className="ml-auto">
                <UserNav />
            </div>
        </header>
        <main className="flex-1 overflow-auto bg-muted/40">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
