
"use client"

import { Card } from "@/components/ui/card"

type StatsSummaryProps = {
    calories: number;
    distance: number; // in km
    duration: number; // in minutes
}

export function StatsSummary({ calories, distance, duration }: StatsSummaryProps) {
    return (
        <Card className="w-full shadow-sm p-4">
             <div className="flex justify-around text-center w-full">
                <div>
                    <div className="text-2xl font-bold">{Math.round(calories)}</div>
                    <div className="text-sm text-muted-foreground uppercase">Cal</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{distance.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground uppercase">km</div>
                </div>
                <div>
                    <div className="text-2xl font-bold">{duration}</div>
                    <div className="text-sm text-muted-foreground uppercase">Min. em movimento</div>
                </div>
            </div>
        </Card>
    )
}
