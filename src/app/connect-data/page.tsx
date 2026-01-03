
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plug, AlertTriangle } from "lucide-react";
import Link from "next/link";

const firebaseUrl = "https://console.developers.google.com/apis/api/firestore.googleapis.com/overview?project=studio-6173913974-5ee2c";

export default function ConnectDataPage() {
    return (
        <div className="flex items-center justify-center h-full p-4">
            <Card className="w-full max-w-lg text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        <Plug className="h-10 w-10" />
                    </div>
                    <CardTitle className="text-2xl font-headline">Conectar Banco de Dados</CardTitle>
                    <CardDescription>
                        Para o aplicativo funcionar, a API do Cloud Firestore precisa ser ativada no seu projeto.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="rounded-lg border border-amber-500/50 bg-amber-500/10 p-4">
                        <div className="flex items-start gap-4">
                            <AlertTriangle className="h-5 w-5 text-amber-600 mt-1" />
                            <div>
                                <h4 className="font-semibold text-amber-800">Ação Manual Necessária</h4>
                                <p className="text-sm text-amber-700/80 text-left">
                                    Este passo precisa ser feito manualmente. Ao clicar no botão abaixo, você será redirecionado para o painel do Google Cloud. Lá, basta clicar no botão azul **"ATIVAR"** para habilitar a API do Firestore.
                                </p>
                            </div>
                        </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Não se preocupe, este serviço está incluído no plano gratuito (Spark) do Firebase. Nenhuma cobrança será gerada.
                    </p>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                    <Button asChild size="lg" className="w-full">
                        <Link href={firebaseUrl} target="_blank">
                            Conectar Banco de Dados
                        </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground">
                        Depois de ativar, volte para o app e tente popular o banco de dados novamente com o comando <code className="bg-muted px-1 py-0.5 rounded-sm">npm run db:seed</code>.
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}
