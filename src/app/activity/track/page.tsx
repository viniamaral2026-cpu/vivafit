
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Battery, Play, PersonStanding, ChevronDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function TrackActivityPage() {
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    // Permissão concedida
                    console.log("Localização obtida:", position);
                    toast({
                        title: "Permissão de localização concedida.",
                        description: "O monitoramento de treino está pronto.",
                    });
                },
                (error) => {
                    // Permissão negada ou erro
                    console.error("Erro de geolocalização:", error);
                     if (error.code === error.PERMISSION_DENIED) {
                        toast({
                            variant: "destructive",
                            title: "Permissão de localização negada",
                            description: "Para monitorar treinos, por favor, habilite a localização nas configurações do seu navegador.",
                        });
                    }
                }
            );
        } else {
             toast({
                variant: "destructive",
                title: "Geolocalização não suportada",
                description: "Seu navegador não suporta o monitoramento de localização.",
            });
        }
    }, [toast]);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <header className="flex items-center p-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </header>

            {/* Content */}
            <main className="flex-1 px-4 md:px-6 flex flex-col">
                <Alert className="bg-blue-50 border-blue-200">
                    <Battery className="h-5 w-5 text-blue-600" />
                    <AlertTitle className="text-blue-900 font-semibold">A "Economia de bateria" está ativada.</AlertTitle>
                    <AlertDescription className="text-blue-800">
                        Para economizar bateria, o Fit não rastreará o local nem a elevação.
                        <Button variant="link" className="p-0 h-auto text-blue-700 font-bold block mt-2">
                           Gerenciar a "Economia de bateria"
                        </Button>
                    </AlertDescription>
                </Alert>

                <div className="mt-6">
                    <label className="text-xs text-muted-foreground ml-2">Tipo de atividade</label>
                    <div className="flex justify-between items-center p-3 border rounded-lg mt-1">
                        <div className="flex items-center gap-3">
                            <PersonStanding className="h-6 w-6 text-blue-600" />
                            <span className="font-semibold">Caminhada</span>
                            <span className="text-muted-foreground">•</span>
                            <span className="text-muted-foreground">Recente</span>
                        </div>
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                    </div>
                </div>
                
                <div className="flex-grow flex flex-col items-center justify-center">
                    <Button variant="ghost" className="flex flex-col items-center justify-center h-auto gap-4" onClick={() => alert("Iniciar caminhada!")}>
                        <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors">
                            <Play className="h-12 w-12 text-white fill-white ml-2" />
                        </div>
                        <span className="text-blue-600 font-semibold text-lg">Iniciar caminhada</span>
                    </Button>
                </div>
            </main>
        </div>
    );
}
