"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DailyGoalCard } from "@/components/dashboard/daily-goal-card"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { StatsSummary } from "@/components/dashboard/stats-summary"
import { WeeklyGoalCard } from "@/components/dashboard/weekly-goal-card"
import { Footprints, Heart, Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex justify-center">
        <ProgressRing />
      </div>

      <div className="flex justify-center items-center gap-8 text-sm font-medium">
        <div className="flex items-center gap-2 text-accent">
          <Heart className="w-5 h-5" />
          <span>Pontos cardio</span>
        </div>
        <div className="flex items-center gap-2 text-primary">
          <Footprints className="w-5 h-5" />
          <span>Passos</span>
        </div>
      </div>

      <StatsSummary />
      
      <div className="max-w-md mx-auto space-y-6">
        <DailyGoalCard />
        <WeeklyGoalCard />
      </div>

      <div className="fixed bottom-6 right-6 md:hidden">
         <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
            <Plus className="h-8 w-8" />
         </Button>
      </div>
    </div>
  )
}
