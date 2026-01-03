import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard } from "lucide-react";
import { Logo } from "@/components/icons/logo";

export default function SubscribePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
             <div className="absolute top-4 left-4">
                <Button variant="ghost" asChild>
                    <Link href="/">
                    &larr; Voltar para a Home
                    </Link>
                </Button>
             </div>
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <Logo className="mx-auto" />
                    <CardTitle className="text-2xl font-headline mt-4">Seja Premium</CardTitle>
                    <CardDescription>
                        Finalize sua compra para desbloquear todos os recursos.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg border bg-secondary/50 p-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Premium Mensal</h4>
                            <div className="text-xl font-bold">R$ 9,99</div>
                        </div>
                        <p className="text-sm text-muted-foreground">Cobrado mensalmente.</p>
                    </div>
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Treinos premium ilimitados</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Planos personalizados</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Experiência sem anúncios</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg">
                        <CreditCard className="mr-2 h-5 w-5"/>
                        Pagar com Pagseguro
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
