"use client"

import { Button } from "@/components/ui/button"
import { ProgressRing } from "@/components/dashboard/progress-ring"
import { StatsSummary } from "@/components/dashboard/stats-summary"
import { Footprints, Heart, Plus } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="relative h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4 md:p-8 space-y-6">
      <div className="flex-grow flex flex-col items-center justify-center">
        <ProgressRing />
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
      
      <StatsSummary />

      <div className="fixed bottom-6 right-6">
         <Button size="icon" className="rounded-full h-14 w-14 shadow-lg">
            <Plus className="h-8 w-8" />
         </Button>
      </div>
    </div>
  )
}
