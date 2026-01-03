"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Footprints } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/app/auth-provider";
import { db } from "@/lib/firebase/config";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function OnboardingActivityGoalsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCompleteOnboarding = async () => {
         if (!user) return;
        setIsSubmitting(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                onboardingComplete: true,
            });
            // Em um app real, as metas (Pontos cardio, Passos) seriam salvas aqui
            toast({
                title: "Tudo pronto!",
                description: "Seu perfil foi configurado com sucesso. Bem-vindo(a)!",
            });
            router.push("/dashboard");
        } catch (error) {
            console.error("Error updating user document:", error);
            toast({ title: "Erro", description: "Não foi possível finalizar a configuração.", variant: "destructive"});
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <CardTitle className="text-2xl font-headline mt-4">Vamos definir suas metas de atividade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8 px-8">
                   <div className="grid gap-2">
                        <Heart className="h-8 w-8 text-green-500 mx-auto" />
                        <h3 className="font-semibold text-lg">Pontos cardio</h3>
                        <p className="text-sm text-muted-foreground">Acelere o ritmo para ganhar pontos para essa meta.</p>
                   </div>
                   <div className="grid gap-2">
                        <Footprints className="h-8 w-8 text-blue-500 mx-auto" />
                        <h3 className="font-semibold text-lg">Passos</h3>
                        <p className="text-sm text-muted-foreground">Continue se movimentando para alcançar a meta.</p>
                   </div>
                   <p className="text-sm text-muted-foreground pt-4">
                    Além de contar seus passos, o VivaFit concede Pontos cardio quando você se esforça.
                   </p>
                </CardContent>
                <CardFooter className="flex-col gap-4 p-6">
                    <Button className="w-full" size="lg" onClick={handleCompleteOnboarding} disabled={isSubmitting}>
                        {isSubmitting ? "Finalizando..." : "Concluir"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
