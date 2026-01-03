"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { UserNav } from "./user-nav";
import { Logo } from "@/components/icons/logo";
import { useAuth } from "@/app/auth-provider";
import { usePathname } from "next/navigation";


const navLinks = [
  { href: "/#features", label: "Funcionalidades" },
  { href: "/#pricing", label: "Preços" },
  { href: "/workouts", label: "Treinos" },
];

export function MainHeader() {
  const { user, loading, isOnboardingComplete } = useAuth();
  const pathname = usePathname();

  const isAuthPage = pathname === '/auth' || pathname.startsWith('/onboarding');
  const showDashboardNav = user && isOnboardingComplete;

  if (isAuthPage || showDashboardNav) return null;
  
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo className="w-24"/>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle className="sr-only">Menu</SheetTitle>
            </SheetHeader>
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Logo />
            </Link>
            <div className="flex flex-col space-y-3 pt-6">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className="text-foreground">
                  {link.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex flex-1 items-center justify-end space-x-4">
          {!loading && user ? (
            <UserNav />
          ) : (
            <>
              <Link href="/auth" className="hidden md:inline-flex text-sm font-medium transition-colors hover:text-foreground/80 text-foreground/60">
                Entrar
              </Link>
              <Button asChild>
                <Link href="/auth">Começar no app</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
