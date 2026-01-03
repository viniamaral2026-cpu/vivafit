
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, MoreVertical, ChevronRight, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { SleepNeedsCard } from "@/components/dashboard/sleep-cards";

const SleepDataItem = ({ label }: { label: string }) => (
    <Card className="shadow-sm">
        <CardContent className="p-4 flex justify-between items-center">
            <div>
                <p className="font-semibold">{label}</p>
                <p className="text-sm text-muted-foreground">Não há dados recentes</p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
        </CardContent>
    </Card>
);

export default function SleepPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">Sono</h1>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Plus className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-6 w-6" />
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6 space-y-6">
                <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground px-2">DESCOBRIR</h2>
                    <div className="grid gap-4">
                        <SleepNeedsCard />
                        <Card>
                            <CardContent className="p-4 relative">
                                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7">
                                    <X className="h-4 w-4" />
                                </Button>
                                <div className="flex items-start gap-3">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 mt-1 text-blue-600"><path d="M20.32 3.68A12.5 12.5 0 0 0 12 0C5.37 0 0 5.37 0 12a12.5 12.5 0 0 0 3.68 8.68L12 12Z" fill="#EA4335"/><path d="m12 12-8.32 8.32A12.5 12.5 0 0 0 12 24c6.63 0 12-5.37 12-12a12.5 12.5 0 0 0-3.68-8.68Z" fill="#4285F4"/><path d="m12 12 8.32-8.32A12.5 12.5 0 0 0 12 0C5.37 0 0 5.37 0 12a12.5 12.5 0 0 0 3.68 8.68Z" fill="#34A853"/><path d="M12 12 3.68 3.68A12.5 12.5 0 0 0 0 12c0 6.63 5.37 12 12 12a12.5 12.5 0 0 0 8.32-3.68Z" fill="#FBBC05"/></svg>
                                    <div>
                                        <h3 className="font-semibold text-blue-600">Aproveite o Fit ao máximo</h3>
                                        <p className="text-xs text-blue-600 font-medium">Google Play</p>
                                    </div>
                                </div>
                                <p className="text-sm text-muted-foreground mt-2">
                                    O Fit funciona melhor quando você conecta outros apps de saúde e fitness. Encontre apps compatíveis no Google Play para ajudar você a ficar sempre saudável.
                                </p>
                                <Button variant="link" className="p-0 h-auto mt-4 text-primary font-semibold">
                                    Encontre apps no Google Play
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
                 <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground px-2">SEM DADOS RECENTES</h2>
                     <div className="grid gap-4">
                        <SleepDataItem label="Duração do sono" />
                        <SleepDataItem label="Programação da hora de dormir" />
                    </div>
                </div>
            </main>
        </div>
    );
}
