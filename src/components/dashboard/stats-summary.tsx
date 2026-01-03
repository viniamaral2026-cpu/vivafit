"use client"

import { Card } from "@/components/ui/card"

type StatsSummaryProps = {
    calories: number;
    distance: number; // in km
    duration: number; // in minutes
}

export function StatsSummary({ calories, distance, duration }: StatsSummaryProps) {
    return (
        <Card className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-4rem)] max-w-md shadow-lg p-4 animate-in slide-in-from-bottom-4 duration-500">
             <div className="flex justify-around text-center w-full">
                <div>
                    <div className="text-2xl font-bold">{Math.round(calories)}</div>
                    <div className="text-sm text-muted-foreground uppercase">KCAL</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{distance.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground uppercase">KM</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{duration}</div>
                    <div className="text-sm text-muted-foreground uppercase">MIN</div>
                </div>
            </div>
        </Card>
    )
}
