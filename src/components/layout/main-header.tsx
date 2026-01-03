
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/icons/logo";
import { usePathname } from "next/navigation";


export function MainHeader() {
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
            <Logo className="h-10 w-32"/>
          </Link>
        </div>
        
        <div className="flex flex-1 items-center justify-end space-x-2">
            <Button asChild>
                <Link href="/auth">Começar no app</Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
