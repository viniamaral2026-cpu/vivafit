
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const days = ["D", "S", "T", "Q", "Q", "S", "S"]

function DayProgress({ day, achieved }: { day: string; achieved: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
       <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${achieved ? "border-primary" : "border-muted-foreground/20"}`}>
            {achieved && <div className="w-2 h-2 rounded-full bg-primary" />}
        </div>
      <span className="text-xs font-medium text-muted-foreground">{day}</span>
    </div>
  )
}

export function DailyGoalCard() {
  const achievedCount = 0 // Placeholder

  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Suas metas diárias</CardTitle>
          <CardDescription>Últimos 7 dias</CardDescription>
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <div className="text-lg font-bold text-blue-600">{achievedCount}/7</div>
          <span className="text-sm text-muted-foreground">Alcançadas</span>
        </div>
        <div className="mt-4 flex justify-between">
          {days.map((day, index) => (
            <DayProgress key={index} day={day} achieved={index < achievedCount} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
