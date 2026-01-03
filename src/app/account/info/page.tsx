
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/app/auth-provider";

export default function MyInfoPage() {
    const { user } = useAuth();

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Minhas Informações</h1>
                <p className="text-muted-foreground">Aqui estão os detalhes da sua conta.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Informações do Usuário</CardTitle>
                    <CardDescription>Estes são os dados associados à sua conta VivaFit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground">Nome</p>
                        <p className="font-semibold">{user?.displayName || "Não disponível"}</p>
                    </div>
                     <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <p className="font-semibold">{user?.email || "Não disponível"}</p>
                    </div>
                     <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-muted-foreground">Plano de Assinatura</p>
                        <p className="font-semibold">{user?.subscription || "Free"}</p>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button variant="outline">Exportar Meus Dados</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
