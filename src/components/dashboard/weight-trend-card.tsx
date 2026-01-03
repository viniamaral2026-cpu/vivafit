
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, Plus } from "lucide-react"

export function WeightTrendCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">Peso</CardTitle>
            <div className="flex items-center gap-2 text-muted-foreground">
                <Plus className="h-5 w-5" />
                <ChevronRight className="h-5 w-5" />
            </div>
        </div>
        <CardDescription>12 de out. de 2025 - 3 de jan. de 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
            <span className="text-3xl font-bold text-primary">75,0 kg</span>
            <p className="text-sm text-muted-foreground">Há 4 h</p>
        </div>
        <div className="mt-4 h-16 flex justify-end items-end">
            {/* This is a placeholder for the simplified month view */}
            <div className="flex items-end gap-6 text-sm text-muted-foreground">
                <span>nov.</span>
                <span>dez.</span>
                <div className="flex flex-col items-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mb-1"></div>
                    <span>jan.</span>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}
