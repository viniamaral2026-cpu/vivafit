
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ArrowLeft, Battery, Play, PersonStanding, ChevronDown, Pause, Square } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function TrackActivityPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countdown, setCountdown] = useState(3);
    const [isTracking, setIsTracking] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    // Mock activity data
    const [activityData, setActivityData] = useState({
        km: 0.0,
        pace: "-'--\"",
        cardioPts: 0,
        cal: 0,
        steps: 0,
    });

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log("Localização obtida:", position);
                },
                (error) => {
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

    const handleStartWorkout = () => {
        setIsCountingDown(true);
        const countdownInterval = setInterval(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(countdownInterval);
            setIsCountingDown(false);
            setIsTracking(true);
            setCountdown(3); // Reset for next time
        }, 3000);
    };

    const handlePauseWorkout = () => {
        setIsPaused(true);
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    
    const handleResumeWorkout = () => {
        setIsPaused(false);
        // The useEffect for isTracking will restart the timer
    };

    const handleStopWorkout = () => {
        setIsTracking(false);
        setIsPaused(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        // Redirect to summary page
        // In a real app, you'd save the workout and pass its ID
        router.push(`/activity/summary-mock`);
    };


     useEffect(() => {
        if (isTracking && !isPaused) {
            timerRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 1);
                // Simulate data changing over time
                setActivityData(prev => ({
                    km: prev.km + 0.001,
                    cal: prev.cal + 1,
                    steps: prev.steps + 2,
                    cardioPts: Math.floor((prev.steps + 2) / 500),
                    pace: "5'30\"", // Mock pace
                }))
            }, 1000);
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isTracking, isPaused]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${mins}:${secs}`;
    }

    if (isCountingDown) {
        return (
            <div className="flex flex-col min-h-screen bg-background items-center justify-center">
                <div className="text-9xl font-bold text-blue-600">
                    {countdown}
                </div>
            </div>
        )
    }

    if (isTracking) {
        return (
             <div className="flex flex-col min-h-screen bg-background items-center text-center p-8">
                <header className="w-full text-center mb-16">
                     <p className="text-xl text-muted-foreground">Caminhada</p>
                </header>

                <main className="flex-grow flex flex-col justify-center w-full">
                    <h1 className="text-8xl font-light tracking-tighter mb-12">{formatTime(elapsedTime)}</h1>

                    <div className="grid grid-cols-3 gap-y-10 text-center mb-16">
                        <div>
                            <p className="text-4xl">{activityData.km.toFixed(2)}</p>
                            <p className="text-muted-foreground">km</p>
                        </div>
                        <div>
                            <p className="text-4xl">{activityData.pace}</p>
                            <p className="text-muted-foreground">/km</p>
                        </div>
                        <div>
                            <p className="text-4xl">{activityData.cardioPts}</p>
                            <p className="text-muted-foreground">Pts de cardio</p>
                        </div>
                         <div>
                            <p className="text-4xl">{activityData.cal}</p>
                            <p className="text-muted-foreground">cal</p>
                        </div>
                         <div className="col-start-2 col-end-3">
                            <p className="text-4xl">{activityData.steps}</p>
                            <p className="text-muted-foreground">passos</p>
                        </div>
                    </div>
                </main>
                
                <footer className="w-full flex justify-center items-center gap-8">
                    {isPaused ? (
                        <>
                            <Button variant="destructive" size="icon" className="w-16 h-16 rounded-lg shadow-lg" onClick={handleStopWorkout}>
                                <Square className="h-8 w-8 text-white fill-white" />
                            </Button>
                             <Button variant="default" className="w-32 h-16 rounded-lg shadow-lg bg-blue-600 hover:bg-blue-700" onClick={handleResumeWorkout}>
                                Retomar
                            </Button>
                        </>
                    ) : (
                        <Button variant="default" size="icon" className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg" onClick={handlePauseWorkout}>
                            <Pause className="h-8 w-8 text-white fill-white" />
                        </Button>
                    )}
                </footer>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="flex items-center p-4">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
            </header>

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
                    <Button variant="ghost" className="flex flex-col items-center justify-center h-auto gap-4" onClick={handleStartWorkout}>
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

    

    