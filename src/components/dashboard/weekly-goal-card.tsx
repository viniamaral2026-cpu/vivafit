
"use client"

import Image from "next/image"
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
                        <span className="text-lg font-bold text-blue-600">0 de 150</span>
                    </div>
                    <Progress value={(0/150)*100} className="h-2 [&>div]:bg-blue-600" />
                </div>
                <div className="flex justify-between items-end">
                    <p className="mt-2 text-sm text-muted-foreground max-w-[75%]">
                        Conseguir 150 Pontos cardio por semana pode ajudar você a viver mais, dormir melhor e melhorar seu humor.
                    </p>
                    <div className="relative w-12 h-12">
                         <Image 
                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/World_Health_Organization_Logo.svg/240px-World_Health_Organization_Logo.svg.png" 
                            alt="World Health Organization Logo"
                            fill
                            sizes="48px"
                            className="object-contain"
                         />
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
