
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/logo";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/app/auth-provider";

// Mock user for development
const mockUser = {
  uid: 'mock-user-123',
  displayName: 'Usuário de Teste',
  email: 'teste@vivafit.com',
  photoURL: 'https://i.pravatar.cc/150?u=mock-user-123',
};

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);

  // State for Login
  const [loginEmail, setLoginEmail] = useState("teste@vivafit.com");
  const [loginPassword, setLoginPassword] = useState("password");

  // State for Register
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");


  useEffect(() => {
    setIsClient(true);
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);
  
  const handleSignIn = () => {
    // Simulate a successful login
     if (typeof window !== 'undefined') {
        window.sessionStorage.setItem('vivafit-user', JSON.stringify(mockUser));
     }
     toast({
        title: `Login de simulação bem-sucedido!`,
        description: "Você será redirecionado...",
      });
    // A real app would re-render AuthProvider, but here we force a reload
    // to simulate the session change.
    setTimeout(() => {
       router.push("/dashboard");
       // A soft reload might be needed if the provider doesn't update across layouts
       setTimeout(() => window.location.reload(), 500);
    }, 1000);
  }

  const handleSignUp = () => {
    if (!registerName || !registerEmail || !registerPassword) {
      toast({
        title: "Campos incompletos",
        description: "Por favor, preencha todos os campos para criar a conta.",
        variant: "destructive"
      });
      return;
    }
    // Simulate a successful registration
    const newUser = {
      uid: `mock-${Date.now()}`,
      displayName: registerName,
      email: registerEmail,
      photoURL: `https://i.pravatar.cc/150?u=${registerEmail}`
    };

    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem('vivafit-user', JSON.stringify(newUser));
      // Mark this as a new user for onboarding
      window.sessionStorage.setItem('vivafit-new-user', 'true');
    }
    toast({
      title: `Conta criada para ${registerName}!`,
      description: "Registro de simulação bem-sucedido. Você será redirecionado para o onboarding...",
    });
    
    setTimeout(() => {
       router.push("/onboarding");
       setTimeout(() => window.location.reload(), 500);
    }, 1000);
  }

  if (!isClient || loading || user) return null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">&larr; Voltar para a Home</Link>
        </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Logo className="mx-auto h-12 w-auto" />
          <CardTitle className="text-2xl font-headline mt-4">Acesse sua Conta</CardTitle>
          <CardDescription>
            Use uma das opções abaixo para entrar ou criar seu acesso.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Entrar</TabsTrigger>
              <TabsTrigger value="register">Criar Conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="m@exemplo.com" required value={loginEmail} onChange={e => setLoginEmail(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                     <div className="flex items-center">
                        <Label htmlFor="login-password">Senha</Label>
                        <Link href="#" className="ml-auto inline-block text-sm underline">Esqueceu sua senha?</Link>
                     </div>
                    <Input id="login-password" type="password" required value={loginPassword} onChange={e => setLoginPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full">Entrar</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="register-name">Nome Completo</Label>
                        <Input id="register-name" placeholder="Seu Nome" required value={registerName} onChange={e => setRegisterName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input id="register-email" type="email" placeholder="seunome@exemplo.com" required value={registerEmail} onChange={e => setRegisterEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="register-password">Senha</Label>
                        <Input id="register-password" type="password" required value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
                    </div>
                    <Button type="submit" className="w-full">Criar conta</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
          
          <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Ou continue com</span>
              </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" onClick={handleSignIn}>
                  Google
              </Button>
               <Button variant="outline" onClick={handleSignIn}>
                  Facebook
              </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
