
"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus, MoreVertical } from "lucide-react";
import { DailyGoalCard } from "@/components/dashboard/daily-goal-card";
import { WeeklyGoalCard } from "@/components/dashboard/weekly-goal-card";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EnergyManagementCard } from "@/components/dashboard/energy-management-card";

export default function ActivityPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-background">
             <header className="flex items-center justify-between p-4 border-b sticky top-0 bg-background z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">Atividades</h1>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Plus className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-6 w-6" />
                    </Button>
                </div>
            </header>

             <main className="flex-1 p-4 md:p-6 space-y-6 bg-muted/30">
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground px-2">INSIGHTS</h2>
                    <div className="grid gap-4">
                        <DailyGoalCard />
                        <WeeklyGoalCard />
                    </div>
                </div>

                 <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground px-2">DADOS</h2>
                    <EnergyManagementCard />
                </div>
            </main>
        </div>
    );
}
