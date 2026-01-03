
"use client"

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DailyGoalCard } from "@/components/dashboard/daily-goal-card";
import { WeeklyGoalCard } from "@/components/dashboard/weekly-goal-card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Dumbbell, HeartPulse, Utensils, ArrowLeft } from "lucide-react";
import Link from "next/link";


export default function JournalPage() {

    return (
        <div className="p-4 md:p-6 space-y-6">
             <div className="mb-4">
                <Button variant="ghost" asChild>
                    <Link href="/dashboard">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Voltar para o Dashboard
                    </Link>
                </Button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold font-headline">Feed do Diário</h1>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button className="md:hidden" size="icon">
                            <Plus />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            <Dumbbell className="mr-2 h-4 w-4" />
                            <span>Adicionar Atividade</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <HeartPulse className="mr-2 h-4 w-4" />
                            <span>Adicionar Medição</span>
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            <Utensils className="mr-2 h-4 w-4" />
                            <span>Registrar Refeição</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2">
                <DailyGoalCard />
                <WeeklyGoalCard />
            </div>

            {/* Placeholder for the journal feed */}
            <div className="text-center py-16 border-2 border-dashed rounded-lg">
                <p className="text-muted-foreground">O feed do seu diário aparecerá aqui.</p>
            </div>

             <div className="hidden md:block fixed bottom-6 right-6">
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
