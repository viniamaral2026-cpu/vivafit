"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { StatsSummary } from "@/components/dashboard/stats-summary"
import { Footprints, Heart, Plus, Dumbbell, HeartPulse, Utensils } from "lucide-react"
import { useAuth } from "../auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

type UserData = {
    name: string;
    email: string;
    weight: number;
    height: number;
};

// Rough estimations
const caloriesPerStep = 0.04;
const kmPerStep = 0.000762;
const durationPerStep = 0.00833; // minutes per step (assuming walking)

export default function DashboardPage() {
    const { user } = useAuth();
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Simulated daily activity data
    const [activity, setActivity] = useState({
        steps: 3450,
        cardioPoints: 25,
    });
    
    const [goals] = useState({
        stepGoal: 8000,
        cardioGoal: 150,
    });

    useEffect(() => {
        if (user) {
            setLoading(true);
            // Simulate fetching user data
            setTimeout(() => {
                setUserData({
                    name: user.displayName || 'Usuário de Teste',
                    email: user.email || 'teste@vivafit.com',
                    weight: 75, // mock data
                    height: 180, // mock data
                });
                setLoading(false);
            }, 500);
        }
    }, [user]);

    if (loading) {
        return (
             <div className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 md:p-8 space-y-6">
                <div className="flex-grow flex flex-col items-center justify-center">
                    <Skeleton className="w-64 h-64 rounded-full"/>
                    <div className="flex justify-center items-center gap-8 text-sm font-medium mt-8">
                       <Skeleton className="h-5 w-24" />
                       <Skeleton className="h-5 w-20" />
                    </div>
                </div>
                 <div className="fixed bottom-8 w-full max-w-md p-4">
                    <Skeleton className="h-24 w-full rounded-xl"/>
                </div>
            </div>
        )
    }

    const calculatedStats = {
        calories: activity.steps * caloriesPerStep,
        distance: activity.steps * kmPerStep,
        duration: Math.round(activity.steps * durationPerStep)
    }

  return (
    <div className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 md:p-8 space-y-6">
      <div className="flex-grow flex flex-col items-center justify-center">
        <ProgressRing 
          steps={activity.steps}
          stepGoal={goals.stepGoal}
          cardioPoints={activity.cardioPoints}
          cardioGoal={goals.cardioGoal}
        />
        <div className="flex justify-center items-center gap-8 text-sm font-medium mt-8">
            <div className="flex items-center gap-2 text-accent">
                <Heart className="w-4 h-4 fill-current" />
                <span>Pontos cardio</span>
            </div>
            <div className="flex items-center gap-2 text-primary">
                <Footprints className="w-4 h-4 fill-current" />
                <span>Passos</span>
            </div>
        </div>
      </div>
      
      <StatsSummary 
        calories={calculatedStats.calories}
        distance={calculatedStats.distance}
        duration={calculatedStats.duration}
      />

      <div className="fixed bottom-6 right-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
                <Plus className="h-8 w-8" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="top" className="w-64 mb-2">
             <DropdownMenuItem className="py-3">
                <Dumbbell className="mr-3" />
                <span>Adicionar Atividade</span>
             </DropdownMenuItem>
             <DropdownMenuItem className="py-3">
                <HeartPulse className="mr-3" />
                <span>Adicionar Medição</span>
             </DropdownMenuItem>
             <DropdownMenuItem className="py-3">
                <Utensils className="mr-3" />
                <span>Registrar Refeição</span>
             </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
