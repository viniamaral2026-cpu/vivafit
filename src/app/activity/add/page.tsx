
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { X, MoreVertical } from "lucide-react";
import { format } from 'date-fns';

const ListItem = ({ label, value, actionLabel }: { label: string, value?: string, actionLabel?: string }) => (
    <div className="flex justify-between items-center py-4">
        <span className="text-base font-medium">{label}</span>
        <span className="text-base text-muted-foreground">{value || actionLabel}</span>
    </div>
);

export default function AddActivityPage() {
    const router = useRouter();
    const now = new Date();
    const formattedTime = format(now, 'HH:mm');

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.back()}>
                    <X className="h-6 w-6" />
                </Button>
                <h1 className="text-xl font-bold">Adicionar atividade</h1>
                <div className="flex items-center gap-2">
                    <Button variant="link" className="text-primary font-semibold px-4">Salvar</Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-6 w-6" />
                    </Button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 px-4">
                <ListItem label="Título" actionLabel="Adicionar" />
                <Separator />
                <ListItem label="Atividade" value="Caminhada" />
                <Separator />
                <ListItem label="Início" value={`Hoje ${formattedTime}`} />
                <Separator />
                <ListItem label="Duração" value="30 min" />
                <Separator />
                <ListItem label="Intensidade" actionLabel="Adicionar Pts cardio" />
                <Separator />
                <ListItem label="Distância" actionLabel="Adicionar km" />
                <Separator />
                <ListItem label="Gasto de energia" actionLabel="Adicionar Cal" />
                <Separator />
                <ListItem label="Passos" actionLabel="Adicionar passos" />
                <Separator />
                
                <div className="py-4">
                    <Input 
                        placeholder="Adicione observações" 
                        className="border-none text-base p-0 h-auto focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>
                 <Separator />
            </main>
        </div>
    );
}
