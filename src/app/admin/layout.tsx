
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Megaphone,
  Users,
  Utensils,
  Newspaper,
  Clapperboard,
  DollarSign,
  ChevronDown,
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
import { AdminNav } from "@/components/layout/admin-nav";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isContentOpen, setIsContentOpen] = useState(true);

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Usuários", icon: Users },
    { href: "/admin/finances", label: "Finanças", icon: DollarSign },
    { href: "/admin/ads", label: "Anúncios", icon: Megaphone },
  ];

  const contentMenuItems = [
     { href: "/admin/content/workouts", label: "Treinos", icon: Video },
     { href: "/admin/content/recipes", label: "Receitas", icon: Utensils },
     { href: "/admin/content/articles", label: "Artigos", icon: Newspaper },
     { href: "/admin/content/testimonials", label: "Depoimentos", icon: Clapperboard },
  ];

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Logo className="w-28" />
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
             <Collapsible open={isContentOpen} onOpenChange={setIsContentOpen}>
                <CollapsibleTrigger asChild className="w-full">
                     <SidebarMenuButton className="w-full justify-between" variant="ghost">
                        <div className="flex items-center gap-2">
                            <Newspaper />
                            <span>Gerenciar Conteúdo</span>
                        </div>
                        <ChevronDown className={cn("h-4 w-4 transition-transform", isContentOpen && "rotate-180")} />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <div className="flex flex-col gap-1 py-1 pl-8">
                        {contentMenuItems.map(item => (
                             <Link href={item.href} key={item.href} className={`text-sm py-2 px-3 rounded-md hover:bg-muted ${pathname.startsWith(item.href) ? 'font-semibold text-primary' : 'text-muted-foreground'}`}>
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </CollapsibleContent>
             </Collapsible>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
            <Button variant="ghost" className="w-full justify-start" asChild>
                <Link href="/">
                    &larr; Voltar ao App
                </Link>
            </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center justify-between border-b bg-background px-4 sticky top-0 z-40">
            <SidebarTrigger className="md:hidden"/>
            <div className="ml-auto">
                <AdminNav />
            </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
