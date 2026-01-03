
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
import { createClient } from "@/lib/supabase/client";
import { Provider } from "@supabase/supabase-js";

export default function AuthPage() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, loading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const supabase = createClient();

  // State for Login
  const [loginEmail, setLoginEmail] = useState("teste@vivafit.com");
  const [loginPassword, setLoginPassword] = useState("password123");

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
  
  const handleSignIn = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    });

    if (error) {
      toast({
        title: "Erro de Login",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Login bem-sucedido!",
        description: "Você será redirecionado...",
      });
      router.push("/dashboard");
      router.refresh();
    }
  }

  const handleSignUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: registerEmail,
      password: registerPassword,
      options: {
        data: {
          full_name: registerName,
          // You can add other metadata here
        },
      },
    });

    if (error) {
      toast({
        title: "Erro no Registro",
        description: error.message,
        variant: "destructive",
      });
    } else if (data.user) {
        // This marks the user as new to trigger the onboarding flow
        if (typeof window !== 'undefined') {
            window.sessionStorage.setItem('vivafit-new-user', 'true');
        }
        toast({
            title: `Conta criada para ${registerName}!`,
            description: "Bem-vindo! Vamos configurar seu perfil.",
        });
        // You might want to create a profile entry in your database here
        router.push("/onboarding");
        router.refresh();
    }
  }

  const handleOAuthSignIn = async (provider: Provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
       toast({
        title: `Erro de login com ${provider}`,
        description: error.message,
        variant: "destructive",
      });
    }
  };


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
                        <Link href="/auth/forgot-password" className="ml-auto inline-block text-sm underline">Esqueceu sua senha?</Link>
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
              <Button variant="outline" onClick={() => handleOAuthSignIn('google')}>
                  Google
              </Button>
               <Button variant="outline" onClick={() => handleOAuthSignIn('facebook')}>
                  Facebook
              </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
