
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  User,
  CreditCard,
  Settings,
  Wallet,
  Info,
  ShieldQuestion,
} from "lucide-react";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { UserNav } from "@/components/layout/user-nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { useAuth } from "../auth-provider";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/auth');
    }
  }, [authLoading, router, user]);


  const menuItems = [
    { href: "/account", label: "Perfil", icon: User },
    { href: "/account/billing", label: "Assinatura", icon: CreditCard },
    { href: "/account/payments", label: "Pagamentos", icon: Wallet },
    { href: "/account/settings", label: "Configurações", icon: Settings },
    { href: "/account/info", label: "Minhas Informações", icon: Info },
    { href: "/account/google", label: "Conta Google", icon: ShieldQuestion },
  ];
  
  if (authLoading || !user) {
     return (
      <div className="flex min-h-screen">
        <div className="hidden md:block w-64 border-r p-4">
            <Skeleton className="h-8 w-24 mb-8" />
            <div className="space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
                 <Skeleton className="h-10 w-full" />
            </div>
        </div>
        <div className="flex-1">
           <header className="flex h-14 items-center justify-end border-b bg-background px-4 sticky top-0 z-40">
              <Skeleton className="h-8 w-8 rounded-full" />
           </header>
           <main className="flex-1 overflow-auto p-4 md:p-6">
             <div className="space-y-6">
                <div>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-2/3 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="grid gap-2">
                            <Skeleton className="h-4 w-1/4" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Skeleton className="h-10 w-32" />
                    </CardFooter>
                </Card>
            </div>
           </main>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Logo className="w-24" />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
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
        <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/dashboard">
                    &larr; Voltar para o Dashboard
                </Link>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 sticky top-0 z-40">
            <SidebarTrigger className="md:hidden"/>
            <div className="ml-auto">
                <UserNav />
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
