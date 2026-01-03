
import { Card, CardContent } from "@/components/ui/card"
import { Moon, ChevronRight, BarChart } from "lucide-react"
import { Button } from "../ui/button"

export function SleepNeedsCard() {
    return (
        <Card className="shadow-sm p-6">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-100 rounded-full">
                    <Moon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-semibold">De quanto sono você precisa?</h3>
                    <p className="text-sm text-muted-foreground">O sono afeta o seu humor, a sua saúde e muito mais.</p>
                </div>
            </div>
        </Card>
    )
}


export function YourFitSleepCard() {
    return (
        <Card className="shadow-sm p-6">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                        <BarChart className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                        <h3 className="font-semibold">Seu sono Fit</h3>
                        <p className="text-sm text-muted-foreground">Nenhum dado de sono</p>
                    </div>
                </div>
                 <Button variant="ghost" size="icon">
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                 </Button>
            </div>
        </Card>
    )
}
