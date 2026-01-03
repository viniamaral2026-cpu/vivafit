
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight } from "lucide-react"

const energyData = [
    { day: "D", value: 80 },
    { day: "S", value: 90 },
    { day: "T", value: 100 },
    { day: "Q", value: 100 },
    { day: "Q", value: 95 },
    { day: "S", value: 85 },
    { day: "S", value: 40 },
];


export function EnergyManagementCard() {
    return (
        <Card className="shadow-sm">
             <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">Gasto de energia</CardTitle>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardDescription>Últimos 7 dias</CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    <span className="text-3xl font-bold text-blue-600">1.267 cal</span>
                    <p className="text-sm text-muted-foreground">Hoje</p>
                </div>
                <div className="mt-4 h-16 flex items-end gap-2">
                    {energyData.map((item, index) => (
                        <div key={index} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full bg-blue-600 rounded-sm" style={{ height: `${item.value}%`}}></div>
                            <span className="text-xs font-medium text-muted-foreground">{item.day}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
