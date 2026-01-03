
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronRight } from "lucide-react"

export function WeeklyGoalCard() {
    return (
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                    <CardTitle className="text-lg font-semibold">Sua meta semanal</CardTitle>
                    <CardDescription>28 de dez. de 2025 - 3 de jan. de 2026</CardDescription>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="pt-4">
                <div className="w-full">
                    <div className="flex justify-between items-baseline mb-1">
                        <span className="text-lg font-bold text-primary">0 de 150</span>
                    </div>
                    <Progress value={(0/150)*100} className="h-2" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                    Conseguir 150 Pontos cardio por semana pode ajudar você a viver mais e melhor.
                </p>
            </CardContent>
        </Card>
    )
}
