
"use client";

import { useAuth } from "@/app/auth-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight, Info, LogOut, ShieldCheck, HelpCircle, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MenuItem = ({ icon: Icon, label, href, action }: { icon: React.ElementType, label: string, href?: string, action?: () => void }) => {
    const content = (
         <div className="flex items-center justify-between w-full p-4 text-left">
            <div className="flex items-center gap-4">
                <Icon className="h-6 w-6 text-muted-foreground" />
                <span className="font-medium">{label}</span>
            </div>
            {href && <ChevronRight className="h-5 w-5 text-muted-foreground" />}
        </div>
    );
    
    if (href) {
        return <Link href={href} className="block hover:bg-muted/50 transition-colors rounded-lg">{content}</Link>
    }

    return <button onClick={action} className="block w-full hover:bg-muted/50 transition-colors rounded-lg">{content}</button>;
};

export default function GoogleAccountPage() {
    const { user } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

     const handleSignOut = async () => {
        if (typeof window !== 'undefined') {
        window.sessionStorage.removeItem('vivafit-user');
        }
        toast({
        title: "Você saiu!",
        description: "Esperamos te ver novamente em breve.",
        });
        router.push("/");
        setTimeout(() => window.location.reload(), 500);
    };


    if (!user) {
        return null;
    }

    return (
        <div className="flex flex-col min-h-screen bg-muted">
            <header className="flex items-center justify-between p-4 bg-background">
                <span className="font-semibold">{user.email}</span>
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <X className="h-6 w-6" />
                </Button>
            </header>

            <main className="flex-1 flex flex-col items-center pt-8 px-4">
                <Avatar className="h-24 w-24 border-2 mb-4">
                    <AvatarImage src={user.photoURL!} alt={user.displayName!} />
                    <AvatarFallback>{user.displayName?.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold">Olá, {user.displayName?.split(" ")[0]}!</h1>
                
                <Button variant="outline" className="mt-6 rounded-full" asChild>
                    <Link href="#">
                        Gerenciar sua Conta do Google
                    </Link>
                </Button>

                <Card className="w-full max-w-md mt-8 p-4 flex items-center justify-between bg-muted-foreground/10 border-none">
                    <p className="font-medium text-sm">Não é possível mudar de conta</p>
                    <Info className="h-5 w-5 text-muted-foreground" />
                </Card>

                <div className="w-full max-w-md mt-8">
                    <h2 className="px-4 text-sm font-semibold text-muted-foreground mb-2">Mais deste app</h2>
                    <Card className="p-2">
                        <MenuItem icon={LogOut} label="Sair do VivaFit" action={handleSignOut} />
                        <Separator className="my-1" />
                        <MenuItem icon={ShieldCheck} label="Dados e privacidade do Fit" href="#" />
                        <Separator className="my-1" />
                        <MenuItem icon={HelpCircle} label="Ajuda e feedback" href="#" />
                    </Card>
                </div>

                <div className="mt-auto pb-8 flex gap-4 text-sm text-muted-foreground">
                    <Link href="#" className="hover:underline">Política de Privacidade</Link>
                    <span>•</span>
                    <Link href="#" className="hover:underline">Termos de Serviço</Link>
                </div>
            </main>
        </div>
    )
}
