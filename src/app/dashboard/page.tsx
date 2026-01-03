
"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { StatsSummary } from "@/components/dashboard/stats-summary"
import { Footprints, Heart, Plus, Scale, Pencil, Dumbbell, X, HeartPulse } from "lucide-react"
import { useAuth } from "../auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { DailyGoalCard } from "@/components/dashboard/daily-goal-card";
import { WeeklyGoalCard } from "@/components/dashboard/weekly-goal-card";
import { cn } from "@/lib/utils";
import { WeightTrendCard } from "@/components/dashboard/weight-trend-card";
import { EnergyManagementCard } from "@/components/dashboard/energy-management-card";
import { SleepNeedsCard, YourFitSleepCard, PacedWalkingCard } from "@/components/dashboard/sleep-cards";
import { AddBloodPressureDialog } from "@/components/dashboard/add-blood-pressure-dialog";
import { AddWeightDialog } from "@/components/dashboard/add-weight-dialog";


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
    const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

    // Simulated daily activity data
    const [activity, setActivity] = useState({
        steps: 0,
        cardioPoints: 0,
    });
    
    const [goals] = useState({
        stepGoal: 10000,
        cardioGoal: 30,
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
                 // Simulate fetching activity data after user is loaded
                 setActivity({
                    steps: 3450,
                    cardioPoints: 25,
                 });

                setLoading(false);
            }, 500);
        }
    }, [user]);

    if (loading) {
        return (
             <div className="p-4 md:p-6 space-y-6">
                <div className="flex flex-col items-center justify-center pt-8 pb-4">
                    <Skeleton className="w-64 h-64 rounded-full"/>
                    <div className="flex justify-center items-center gap-8 mt-6">
                       <Skeleton className="h-5 w-24" />
                       <Skeleton className="h-5 w-20" />
                    </div>
                </div>
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-28 w-full" />
                <Skeleton className="h-36 w-full" />
            </div>
        )
    }

    const calculatedStats = {
        calories: 870, // mock
        distance: 0, // mock
        duration: 0 // mock
    }

  return (
    <div className="relative p-4 md:p-6 space-y-6 pb-24">
      <div className="flex flex-col items-center justify-center pt-8 pb-4">
        <ProgressRing 
          steps={activity.steps}
          stepGoal={goals.stepGoal}
          cardioPoints={activity.cardioPoints}
          cardioGoal={goals.cardioGoal}
        />
        <div className="flex justify-center items-center gap-8 text-sm font-medium mt-6">
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
        
        <DailyGoalCard />
        <WeeklyGoalCard />
        
        <div className="space-y-4">
            <h2 className="text-xl font-bold font-headline px-2">Tendências</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <WeightTrendCard />
                <EnergyManagementCard />
            </div>
        </div>


        <div className="grid grid-cols-1 gap-6">
          <SleepNeedsCard />
          <PacedWalkingCard />
          <YourFitSleepCard />
        </div>

        {/* Speed Dial FAB */}
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-4">
            {isFabMenuOpen && (
                 <div className="flex flex-col items-end gap-4 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <span className="bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm">Monitorar treino</span>
                        <Button size="icon" className="rounded-full h-12 w-12 shadow-lg bg-white hover:bg-gray-100 text-gray-700">
                            <Dumbbell className="h-6 w-6"/>
                        </Button>
                    </div>
                     <div className="flex items-center gap-4">
                        <span className="bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm">Adicionar atividade</span>
                        <Button size="icon" className="rounded-full h-12 w-12 shadow-lg bg-white hover:bg-gray-100 text-gray-700">
                            <Pencil className="h-6 w-6"/>
                        </Button>
                    </div>
                     <AddWeightDialog>
                        <div className="flex items-center gap-4 cursor-pointer">
                            <span className="bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm">Adicionar peso</span>
                            <Button size="icon" className="rounded-full h-12 w-12 shadow-lg bg-white hover:bg-gray-100 text-gray-700">
                                <Scale className="h-6 w-6"/>
                            </Button>
                        </div>
                    </AddWeightDialog>
                    <AddBloodPressureDialog>
                         <div className="flex items-center gap-4 cursor-pointer">
                            <span className="bg-background/80 backdrop-blur-sm text-foreground text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm">Adicionar pressão arterial</span>
                            <Button size="icon" className="rounded-full h-12 w-12 shadow-lg bg-white hover:bg-gray-100 text-gray-700">
                                <HeartPulse className="h-6 w-6"/>
                            </Button>
                        </div>
                    </AddBloodPressureDialog>
                </div>
            )}
             <Button 
                size="icon" 
                className={cn(
                    "rounded-full h-16 w-16 shadow-lg transition-transform duration-300",
                    isFabMenuOpen ? "bg-white hover:bg-gray-100 text-gray-700 rotate-90" : "bg-blue-600 hover:bg-blue-700"
                )}
                onClick={() => setIsFabMenuOpen(!isFabMenuOpen)}
            >
                {isFabMenuOpen ? <X className="h-8 w-8" /> : <Plus className="h-8 w-8" />}
            </Button>
        </div>
    </div>
  )
}
