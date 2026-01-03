"use client"

export function StatsSummary() {
    return (
        <div className="flex justify-around text-center w-full max-w-md">
            <div>
                <div className="text-2xl font-bold">870</div>
                <div className="text-sm text-muted-foreground">Cal</div>
            </div>
            <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">km</div>
            </div>
            <div>
                <div className="text-2xl font-bold">0</div>
                <div className="text-sm text-muted-foreground">Min. em movimento</div>
            </div>
        </div>
    )
}
