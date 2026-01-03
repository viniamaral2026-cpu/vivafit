"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Footprints } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function OnboardingActivityGoalsPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCompleteOnboarding = async () => {
        setIsSubmitting(true);
        // Simulate completing onboarding
        toast({
            title: "Tudo pronto!",
            description: "Seu perfil foi configurado com sucesso. Bem-vindo(a)!",
        });
        router.push("/journal");
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
