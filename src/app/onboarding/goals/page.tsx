"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PersonStanding, Bike, Run } from "lucide-react";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/app/auth-provider";
import { db } from "@/lib/firebase/config";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";


export default function OnboardingGoalsPage() {
    const router = useRouter();
    const { user } = useAuth();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleActivate = async () => {
         if (!user) return;
        setIsSubmitting(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                onboardingComplete: true,
                activityMonitoring: true,
            });
            router.push("/workouts");
        } catch (error) {
            console.error("Error updating user document:", error);
            toast({ title: "Erro", description: "Não foi possível salvar sua preferência.", variant: "destructive"});
            setIsSubmitting(false);
        }
    };

    const handleSkip = async () => {
        if (!user) return;
        setIsSubmitting(true);
        try {
            const userDocRef = doc(db, "users", user.uid);
            await updateDoc(userDocRef, {
                onboardingComplete: true,
                activityMonitoring: false,
            });
            router.push("/workouts");
        } catch (error) {
            console.error("Error updating user document:", error);
            toast({ title: "Erro", description: "Não foi possível salvar sua preferência.", variant: "destructive"});
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md text-center">
                <CardHeader>
                    <PersonStanding className="mx-auto h-12 w-12 text-primary" />
                    <CardTitle className="text-2xl font-headline mt-4">Monitorar atividades</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm text-muted-foreground px-8">
                   <p>
                     O VivaFit pode monitorar caminhadas, corridas e passeios de bicicleta em segundo plano. Isso significa que você verá métricas como passos, distância e calorias para todas essas atividades.
                   </p>
                   <p>
                    Para fazer isso, o app precisa de permissão para reconhecer sua atividade. Com o tempo, o VivaFit também usará esses dados para personalizar sua experiência e aprimorar o reconhecimento de atividade física.
                   </p>
                    <div className="flex justify-center gap-8 py-4">
                        <PersonStanding className="h-10 w-10 text-blue-500" />
                        <Run className="h-10 w-10 text-blue-500" />
                        <Bike className="h-10 w-10 text-blue-500" />
                    </div>
                   <p>
                    Se você preferir desativar essa configuração, ainda será possível monitorar seus treinos manualmente com o VivaFit.
                   </p>
                </CardContent>
                <CardFooter className="flex-col gap-4 p-6">
                    <Button className="w-full" size="lg" onClick={handleActivate} disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Ativar"}
                    </Button>
                    <Button variant="link" onClick={handleSkip} disabled={isSubmitting}>Não</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
