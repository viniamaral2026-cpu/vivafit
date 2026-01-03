
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LayoutDashboard, LogOut, User as UserIcon } from "lucide-react";
import { useAuth } from "@/app/auth-provider";
import { useToast } from "@/hooks/use-toast";


export function AdminNav() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = async () => {
    if (typeof window !== 'undefined') {
      window.sessionStorage.removeItem('vivafit-user');
    }
    toast({
      title: "Você saiu da área de administração!",
      description: "Sessão de administrador encerrada.",
    });
    router.push("/");
    setTimeout(() => window.location.reload(), 500);
  };

  if (loading) {
    return null;
  }
  
  if (!user) {
    return null;
  }

  // Assuming an admin has a specific role, or we can just show a generic admin profile
  const adminUser = {
      ...user,
      displayName: "Admin",
      email: "admin@vivafit.com"
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10 border-2 border-primary">
            <AvatarImage src={adminUser.photoURL!} alt={adminUser.displayName!} />
            <AvatarFallback>{adminUser.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{adminUser.displayName}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {adminUser.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/admin/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
