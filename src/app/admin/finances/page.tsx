import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentPayments } from "@/components/dashboard/recent-payments";
import { DollarSign, Users, Wallet, CreditCard } from "lucide-react";

export default function FinancesPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-2xl font-bold font-headline">Visão Geral Financeira</h1>
                <p className="text-muted-foreground">Monitore receitas, assinaturas e pagamentos.</p>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                    +20.1% do último mês
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Assinaturas Ativas
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                    +180.1% do último mês
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Novos Pagamentos</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                    +19% do último mês
                    </p>
                </CardContent>
                </Card>
                 <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Receita Recorrente Mensal
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$23,497.50</div>
                    <p className="text-xs text-muted-foreground">
                    Baseado em 2350 usuários premium
                    </p>
                </CardContent>
                </Card>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Visão Geral da Receita</CardTitle>
                     <CardDescription>Gráfico de receita mensal.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <OverviewChart />
                </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Pagamentos Recentes</CardTitle>
                    <CardDescription>
                    Você fez 265 pagamentos este mês.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentPayments />
                </CardContent>
                </Card>
            </div>
        </div>
    )
}
