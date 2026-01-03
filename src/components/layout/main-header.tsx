
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
  const { user, loading } = useAuth();
  const pathname = usePathname();

  // The main header should NOT appear on any authenticated-only app pages or auth flow pages.
  const isAppPage = [
    '/journal',
    '/recipes',
    '/ai-coach',
    '/premium',
    '/devices',
    '/account',
    '/admin',
    '/auth',
    '/subscribe',
    '/onboarding',
    '/dashboard'
  ].some(path => pathname.startsWith(path));


  // Hide header on all internal app pages.
  if (isAppPage) {
    return null;
  }
  

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <Logo className="w-24"/>
          </Link>
        </div>

        <div className="ml-auto hidden md:flex items-center gap-6">
           <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="transition-colors hover:text-foreground/80 text-foreground/60">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center gap-2">
                 <Button asChild>
                    <Link href="/auth">Começar no app</Link>
                </Button>
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
                        <SheetHeader className="p-4">
                        <SheetTitle className="sr-only">Menu</SheetTitle>
                        </SheetHeader>
                        <Link href="/" className="flex items-center space-x-2 p-4">
                        <Logo />
                        </Link>
                        <div className="flex flex-col space-y-3 pt-6 px-4">
                        {navLinks.map(link => (
                            <Link key={link.href} href={link.href} className="text-foreground">
                            {link.label}
                            </Link>
                        ))}
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </div>
      </div>
    </header>
  );
}
