"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
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
import { auth } from "@/lib/firebase/config";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "Cadastro bem-sucedido!",
        description: "Você será redirecionado para a plataforma.",
      });
      router.push("/workouts");
    } catch (error) {
      console.error("Erro no cadastro com Google:", error);
      toast({
        title: "Erro no cadastro",
        description: "Não foi possível se cadastrar com o Google. Tente novamente.",
        variant: "destructive",
      });
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
       <div className="absolute top-4 left-4">
          <Button variant="ghost" asChild>
            <Link href="/">
              &larr; Voltar para a Home
            </Link>
          </Button>
        </div>
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Logo className="mx-auto" />
          <CardTitle className="text-2xl font-headline mt-4">Crie sua conta</CardTitle>
          <CardDescription>
            Insira suas informações para começar com o VivaFit
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Nome Completo</Label>
              <Input id="full-name" placeholder="Seu Nome" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seunome@exemplo.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Senha</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn}>
              Cadastrar com Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Já tem uma conta?{" "}
            <Link href="/login" className="underline">
              Entrar
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
