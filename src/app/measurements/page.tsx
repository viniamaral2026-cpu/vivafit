
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, MoreVertical, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function MeasurementsPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">Medidas corporais</h1>
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
                    <h2 className="text-sm font-semibold text-muted-foreground px-2">DADOS</h2>
                    <div className="grid gap-4">
                        <Card className="shadow-sm">
                            <CardContent className="p-4 relative">
                                <ChevronRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground" />
                                <p className="font-semibold">Peso</p>
                                <p className="text-xs text-muted-foreground">12 de out. de 2025 – 3 de jan. de 2026</p>
                                <div className="mt-2">
                                     <span className="text-2xl font-bold text-blue-600">130 kg</span>
                                     <p className="text-sm text-muted-foreground">Há 4 h</p>
                                </div>
                                <div className="mt-4 flex justify-end items-end">
                                    <div className="flex items-end gap-6 text-sm text-muted-foreground">
                                        <span>nov.</span>
                                        <span>dez.</span>
                                        <div className="flex flex-col items-center">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mb-1"></div>
                                            <span>jan.</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="shadow-sm">
                             <CardContent className="p-4 relative">
                                <ChevronRight className="absolute top-4 right-4 h-5 w-5 text-muted-foreground" />
                                <p className="font-semibold">Altura</p>
                                <p className="text-xs text-muted-foreground">Há 4 h</p>
                                <div className="mt-2">
                                     <span className="text-2xl font-bold">175 cm</span>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                 <div className="space-y-2">
                    <h2 className="text-sm font-semibold text-muted-foreground px-2">SEM DADOS RECENTES</h2>
                     <Card className="shadow-sm">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Gordura corporal</p>
                                <p className="text-sm text-muted-foreground">Não há dados recentes</p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
