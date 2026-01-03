
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function DiscoverCard() {
    return (
        <Card className="shadow-sm overflow-hidden lg:col-span-2">
            <div className="grid md:grid-cols-2">
                <div className="p-6">
                    <h3 className="font-bold text-lg">Descobrir</h3>
                    <p className="text-muted-foreground mt-1 text-sm">Encontre novas receitas e exercícios para manter sua rotina interessante.</p>
                    <Button variant="outline" className="mt-4">Explorar</Button>
                </div>
                <div className="relative min-h-[150px] md:min-h-0">
                    <Image
                        src="https://images.unsplash.com/photo-1540420773420-2ea6b5f41561?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3"
                        alt="Healthy food"
                        data-ai-hint="healthy food variety"
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        </Card>
    )
}
