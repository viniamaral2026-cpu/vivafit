
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Disc3, Cloudy, Zap, Plus, RefreshCw, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DevicesPage() {

    const RunningManIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="10" cy="4" r="2" />
            <path d="m10.2 6.2-4.7 4.3" />
            <path d="M14.5 6.5 18 10" />
            <path d="m7 14 3-3 4 3-3 4-4-3Z" />
            <path d="M12 22v-3.5" />
            <path d="m6 15-1.5-1.5" />
            <path d="m18 15 1.5-1.5" />
        </svg>
    )

    const ZzzIcon = () => (
         <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.1641 16.1484L17.8359 16.1484L11.1641 24.8516L17.8359 24.8516" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M22.1641 24.1484L28.8359 24.1484L22.1641 32.8516L28.8359 32.8516" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M32.1641 10.1484L38.8359 10.1484L32.1641 18.8516L38.8359 18.8516" stroke="#4F46E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )

    return (
        <div className="p-4 md:p-8 bg-muted/20 min-h-screen">
            <div className="max-w-5xl mx-auto">
                 <div className="mb-4">
                    <Button variant="ghost" asChild>
                        <Link href="/journal">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para o Diário
                        </Link>
                    </Button>
                </div>
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline">Dispositivos & Wearables</h1>
                    <p className="text-muted-foreground mt-1">Sincronização inteligente baseada em foco.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Gestão de Hardware */}
                    <Card className="shadow-lg rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Disc3 className="w-6 h-6 text-foreground" />
                            <h2 className="text-lg font-semibold text-foreground">Gestão de Hardware</h2>
                        </div>

                        <Card className="bg-muted/50 rounded-2xl p-8 text-center border-dashed">
                             <div className="flex justify-center mb-4">
                                <RunningManIcon />
                             </div>
                             <h3 className="text-xl font-bold font-headline mb-2">Vincular Google Fit</h3>
                             <p className="text-muted-foreground text-sm max-w-xs mx-auto mb-6">
                                Ative a importação de biometria e atividades físicas diretamente da sua conta Google.
                             </p>
                             <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow" size="lg">
                                <Zap className="w-5 h-5 mr-2" />
                                Conectar Conta
                             </Button>
                        </Card>
                        <div className="mt-6 text-center">
                            <Button variant="ghost" className="text-muted-foreground font-semibold">
                                <Plus className="w-4 h-4 mr-2" />
                                Explorar outros wearables
                            </Button>
                        </div>
                    </Card>

                    {/* Estado da Nuvem */}
                     <Card className="shadow-lg rounded-2xl p-6 flex flex-col items-center justify-center text-center">
                        <div className="flex items-center gap-3 mb-6 absolute top-6 left-6">
                            <Cloudy className="w-6 h-6 text-foreground" />
                            <h2 className="text-lg font-semibold text-foreground">Estado da Nuvem</h2>
                        </div>
                        
                        <div className="flex-grow flex flex-col items-center justify-center">
                             <div className="w-32 h-32 rounded-full bg-muted/50 flex items-center justify-center border-4 border-dashed border-muted mb-4">
                               <ZzzIcon />
                             </div>
                             <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                                <span>Sincronizado:</span>
                                <span className="text-foreground/80">Nunca Sincronizado</span>
                             </div>
                             <p className="text-4xl font-bold font-headline mt-2">Offline</p>
                        </div>

                        <Button variant="outline" className="w-full bg-green-200/50 border-green-400/50 text-green-700 hover:bg-green-200 hover:text-green-800 rounded-lg mt-8" size="lg">
                            Forçar Atualização
                            <RefreshCw className="w-5 h-5 ml-2"/>
                        </Button>
                    </Card>
                </div>
            </div>
        </div>
    );
}
