
"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/icons/logo";
import { useToast } from "@/hooks/use-toast";

export default function ForgotPasswordPage() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, insira seu e-mail.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    // Simulate sending a password reset email
    setTimeout(() => {
      toast({
        title: "Link de redefinição enviado!",
        description: `Se um usuário com o e-mail ${email} existir, um link para redefinir a senha foi enviado.`,
      });
      setIsSubmitting(false);
      setEmail("");
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <Logo className="mx-auto h-12 w-auto" />
          <CardTitle className="text-2xl font-headline mt-4">Redefinir Senha</CardTitle>
          <CardDescription>
            Insira seu e-mail para receber um link de redefinição de senha.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleResetPassword}>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="seu-email@exemplo.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Link de Redefinição"}
            </Button>
          </CardContent>
        </form>
        <CardFooter className="flex justify-center">
          <Button variant="link" asChild>
            <Link href="/auth">&larr; Voltar para o Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
