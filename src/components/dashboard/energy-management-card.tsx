
import { Card, CardContent } from "@/components/ui/card"
import { Zap, ChevronRight } from "lucide-react"

export function EnergyManagementCard() {
    return (
        <Card className="shadow-sm p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                    <Zap className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                    <h3 className="font-semibold">Gestão de energia</h3>
                    <p className="text-sm text-muted-foreground">Equilibrado</p>
                </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </Card>
    )
}
