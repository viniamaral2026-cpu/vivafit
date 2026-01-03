"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/app/auth-provider";
import { CheckCircle, Crown, Star } from "lucide-react";
import Link from "next/link";

export default function BillingPage() {
    const { user, loading, isPremium } = useAuth();

    if (loading) {
        return (
            <div className="space-y-6">
                <div>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-2/3 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-4 w-3/4" />
                        <div className="grid gap-2 pt-2">
                             <Skeleton className="h-5 w-1/2" />
                             <Skeleton className="h-5 w-1/2" />
                             <Skeleton className="h-5 w-1/2" />
                        </div>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Skeleton className="h-10 w-32" />
                    </CardFooter>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Assinatura</h1>
                <p className="text-muted-foreground">Gerencie sua cobrança e plano de assinatura.</p>
            </div>

            {isPremium ? (
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
                                <span className="text-4xl font-bold">R$ 9,99</span>
                                <span className="text-xl text-muted-foreground">/mês</span>
                            </div>
                            <p className="text-sm text-muted-foreground">Sua assinatura será renovada automaticamente em 30 de julho de 2024.</p>
                            <ul className="grid gap-2 text-left text-sm">
                                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Treinos premium ilimitados</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Planos personalizados de IA</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Experiência sem anúncios</li>
                                <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Receitas exclusivas</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row justify-between border-t pt-6 gap-4">
                        <Button variant="outline">Atualizar Método de Pagamento</Button>
                        <Button variant="destructive">Cancelar Assinatura</Button>
                    </CardFooter>
                </Card>
            ) : (
                 <Card>
                    <CardHeader>
                        <CardTitle>Plano Atual</CardTitle>
                        <CardDescription>Você está no plano Gratuito.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4 p-6 text-center bg-muted rounded-lg">
                           <Star className="w-12 h-12 text-primary mx-auto" />
                           <h3 className="text-xl font-headline">Desbloqueie todo o potencial do VivaFit!</h3>
                           <p className="text-muted-foreground">Faça o upgrade para o Premium e tenha acesso a treinos, receitas e planos de IA exclusivos.</p>
                        </div>
                    </CardContent>
                    <CardFooter className="border-t pt-6">
                        <Button asChild className="w-full" size="lg">
                            <Link href="/subscribe">
                                <Crown className="mr-2 h-5 w-5"/>
                                Virar Premium
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            )}
        </div>
    );
}
