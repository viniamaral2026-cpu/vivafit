"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
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
import { auth, db } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();
  
  const createOrUpdateUserDocument = async (user: import("firebase/auth").User) => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);
    if (!docSnap.exists()) {
      await setDoc(userRef, {
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        subscription: "Free",
        role: "User",
        onboardingComplete: false,
      });
       router.push("/onboarding");
    } else {
      if(docSnap.data().onboardingComplete) {
         router.push("/dashboard");
      } else {
         router.push("/onboarding");
      }
    }
  }

  const handleOAuthSignIn = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
    const providerName = provider.providerId.replace('.com', '').charAt(0).toUpperCase() + provider.providerId.replace('.com', '').slice(1);
    try {
      const result = await signInWithPopup(auth, provider);
      await createOrUpdateUserDocument(result.user);
      toast({
        title: `Login com ${providerName} bem-sucedido!`,
        description: "Você será redirecionado...",
      });
    } catch (error: any) {
      console.error(`Erro no login com ${providerName}:`, error);
      let description = `Não foi possível fazer login com ${providerName}. Tente novamente.`;
      if (error.code === 'auth/account-exists-with-different-credential') {
        description = 'Já existe uma conta com este e-mail. Tente fazer login com um método diferente.';
      } else if (error.code === 'auth/popup-closed-by-user') {
        description = 'A janela de login foi fechada antes da conclusão. Por favor, tente novamente.';
      }
      toast({
        title: `Erro no login com ${providerName}`,
        description: description,
        variant: "destructive",
      });
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      await createOrUpdateUserDocument(result.user);
      toast({
        title: `Login com E-mail bem-sucedido!`,
        description: "Você será redirecionado...",
      });
    } catch (error: any) {
        console.error("Erro no login com E-mail:", error);
        let description = "Ocorreu um erro ao tentar fazer login. Verifique seu e-mail e senha.";
        if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
            description = "E-mail ou senha inválidos. Por favor, tente novamente."
        }
        toast({
            title: "Erro de Login",
            description,
            variant: "destructive",
        });
    }
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      await updateProfile(userCredential.user, {
        displayName: registerName,
      });
      // Pass the updated user object to createOrUpdateUserDocument
      const userWithProfile = {
        ...userCredential.user,
        displayName: registerName,
      };
      // We need to cast here because updateProfile doesn't change the type of the original object
      await createOrUpdateUserDocument(userWithProfile as import("firebase/auth").User);

      toast({
        title: "Cadastro bem-sucedido!",
        description: "Sua conta foi criada. Vamos configurar seu perfil.",
      });
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      let description = "Ocorreu um erro ao criar sua conta. Tente novamente.";
      if (error.code === 'auth/email-already-in-use') {
        description = "Este endereço de e-mail já está em uso.";
      } else if (error.code === 'auth/weak-password') {
        description = "Sua senha é muito fraca. Por favor, use pelo menos 6 caracteres.";
      }
       toast({
        title: "Erro no cadastro",
        description,
        variant: "destructive",
      });
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="absolute top-4 left-4">
        <Button variant="ghost" asChild>
          <Link href="/">&larr; Voltar para a Home</Link>
        </Button>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Logo className="mx-auto" />
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
              <form onSubmit={handleEmailLogin}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input id="login-email" type="email" placeholder="m@exemplo.com" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                     <div className="flex items-center">
                        <Label htmlFor="login-password">Senha</Label>
                        <Link href="#" className="ml-auto inline-block text-sm underline">Esqueceu sua senha?</Link>
                     </div>
                    <Input id="login-password" type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                  </div>
                  <Button type="submit" className="w-full">Entrar</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="register">
              <form onSubmit={handleEmailSignUp}>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="register-name">Nome Completo</Label>
                        <Input id="register-name" placeholder="Seu Nome" required value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input id="register-email" type="email" placeholder="seunome@exemplo.com" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="register-password">Senha</Label>
                        <Input id="register-password" type="password" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
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
              <Button variant="outline" onClick={() => handleOAuthSignIn(new GoogleAuthProvider())}>
                  Google
              </Button>
               <Button variant="outline" onClick={() => handleOAuthSignIn(new FacebookAuthProvider())}>
                  Facebook
              </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}
