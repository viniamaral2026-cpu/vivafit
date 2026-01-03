
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Plus, MoreVertical, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CycleTrackingPage() {
    const router = useRouter();

    return (
        <div className="flex flex-col min-h-screen bg-muted/40">
            <header className="flex items-center justify-between p-4 border-b bg-background sticky top-0 z-10">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">Monitoramento de ciclo</h1>
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
                    <h2 className="text-sm font-semibold text-muted-foreground px-2">SEM DADOS RECENTES</h2>
                    <Card className="shadow-sm">
                        <CardContent className="p-4 flex justify-between items-center">
                            <div>
                                <p className="font-semibold">Menstruação</p>
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
