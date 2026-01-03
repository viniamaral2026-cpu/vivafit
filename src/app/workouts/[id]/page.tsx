
"use client";

import { UserNav } from "@/components/layout/user-nav";
import { Workout } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Crown, Dumbbell, Flame, Lock } from "lucide-react";
import Link from "next/link";
import workoutsData from "@/lib/firebase/seed-data/workouts.json";
import { useAuth } from "@/app/auth-provider";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";


async function getWorkout(id: string): Promise<Workout | null> {
    // Simulating fetching from a local JSON file instead of Firestore
    const workout = (workoutsData as Workout[]).find(w => w.id === id);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate network delay
    return workout || null;
}


export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const { isPremium, loading: authLoading } = useAuth();
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loadingWorkout, setLoadingWorkout] = useState(true);

  useEffect(() => {
    async function fetchWorkout() {
        setLoadingWorkout(true);
        const fetchedWorkout = await getWorkout(params.id);
        setWorkout(fetchedWorkout);
        setLoadingWorkout(false);
    }
    fetchWorkout();
  }, [params.id]);


  if (loadingWorkout || authLoading) {
     return (
       <div className="flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center justify-between">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </header>
          <main className="container py-8">
             <div className="max-w-4xl mx-auto">
                <Skeleton className="aspect-video w-full mb-6" />
                 <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-24 w-full" />
                 </div>
             </div>
          </main>
       </div>
     )
  }

  if (!workout) {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                <Button variant="ghost" asChild>
                    <Link href="/workouts">&larr; Voltar para os Treinos</Link>
                </Button>
                <UserNav />
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Treino não encontrado</h1>
                    <p className="text-muted-foreground mt-2">Desculpe, não conseguimos encontrar o treino que você está procurando.</p>
                    <Button asChild className="mt-6">
                        <Link href="/workouts">Voltar aos Treinos</Link>
                    </Button>
                </div>
            </main>
        </div>
    );
  }

  const showPremiumBlocker = workout.isPremium && !isPremium;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
           <Button variant="ghost" asChild>
              <Link href="/workouts">&larr; Voltar para os Treinos</Link>
           </Button>
           <UserNav />
        </div>
      </header>
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
            <div className="relative mb-6 aspect-video rounded-lg overflow-hidden bg-muted">
                {showPremiumBlocker ? (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10 text-center p-4">
                        <Lock className="w-16 h-16 text-primary" />
                        <h2 className="text-2xl font-bold text-white mt-4">Este é um Treino Premium</h2>
                        <p className="text-muted-foreground text-white/80 mt-2">Faça o upgrade para o Premium para acessar este e todos os outros conteúdos exclusivos.</p>
                        <Button asChild className="mt-6" size="lg">
                            <Link href="/subscribe">
                                <Crown className="mr-2 h-5 w-5"/>
                                Virar Premium
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <iframe
                        className="w-full h-full"
                        src={workout.videoUrl}
                        title={workout.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        {workout.isPremium && <Badge className="mb-2"><Crown className="w-3 h-3 mr-1" /> Premium</Badge>}
                        <h1 className="text-4xl font-bold font-headline">{workout.title}</h1>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5"/>
                            <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Flame className="w-5 h-5" />
                            <span>{workout.level}</span>
                        </div>
                         <div className="flex items-center gap-2">
                           <Dumbbell className="w-5 h-5" />
                            <span>{workout.category}</span>
                        </div>
                    </div>
                </div>

                <p className="text-lg text-muted-foreground">
                    Esta é uma descrição de placeholder para o treino {workout.title}. Uma explicação mais detalhada dos exercícios, benefícios e equipamentos necessários iria aqui.
                </p>

                <Card>
                    <CardHeader>
                        <CardTitle>O que você vai precisar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Tapete de Yoga</li>
                            <li>Roupas confortáveis</li>
                            <li>Garrafa de água</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}
