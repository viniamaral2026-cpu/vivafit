import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown } from "lucide-react";

export default function SubscriptionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Assinatura</h1>
                <p className="text-muted-foreground">Gerencie sua cobrança e plano de assinatura.</p>
            </div>

            <Card className="border-primary border-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Plano Atual</CardTitle>
                        <CardDescription>Você está no plano Premium Mensal.</CardDescription>
                    </div>
                    <Crown className="w-10 h-10 text-primary"/>
                </CardHeader>
                <CardContent>
                     <div className="space-y-4">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-4xl font-bold">R$ 12</span>
                            <span className="text-xl text-muted-foreground">/mês</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Sua assinatura será renovada automaticamente em 30 de julho de 2024.</p>
                        <ul className="grid gap-2 text-left text-sm">
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Treinos premium ilimitados</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Planos personalizados</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Experiência sem anúncios</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline">Atualizar Método de Pagamento</Button>
                    <Button variant="destructive">Cancelar Assinatura</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
