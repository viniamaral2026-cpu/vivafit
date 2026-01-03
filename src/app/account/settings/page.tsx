
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const SettingsSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div>
        <h2 className="text-primary font-semibold px-4 pb-2 pt-4 text-sm">{title}</h2>
        <div className="bg-card rounded-lg border">
            {children}
        </div>
    </div>
);

const SettingsItem = ({ label, value, href = "#" }: { label: string, value?: string, href?: string }) => (
    <Link href={href} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg">
        <div>
            <p className="font-medium">{label}</p>
            {value && <p className="text-sm text-muted-foreground">{value}</p>}
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
);

const SettingsLinkItem = ({ label, href = "#" }: { label: string, href?: string }) => (
     <Link href={href} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg">
        <p className="font-medium text-primary">{label}</p>
    </Link>
)


export default function AccountSettingsPage() {

    return (
        <div className="space-y-6">
             <div className="flex items-center justify-between">
                 <div>
                    <h1 className="text-2xl font-bold font-headline">Configurações</h1>
                    <p className="text-muted-foreground">Gerencie as preferências do seu app.</p>
                </div>
                 <Button variant="ghost" size="icon">
                    <MoreVertical />
                 </Button>
            </div>
            
            <SettingsSection title="Unidades">
                <SettingsItem label="Altura" value="Centímetros" />
                <SettingsItem label="Peso" value="Quilogramas" />
                <SettingsItem label="Distância" value="Quilômetros" />
                <SettingsItem label="Energia" value="Calorias" />
            </SettingsSection>
            
             <SettingsSection title="Dados e personalização do VivaFit">
                <SettingsItem label="Gerenciar apps conectados" />
                <SettingsItem label="Excluir dados" />
                <SettingsItem label="Gerenciar Google Assistente" />
                <SettingsItem label="Gerenciar personalização" />
                <SettingsItem label="Gerenciar permissões de dados do Fit" />
            </SettingsSection>

            <SettingsSection title="Preferências de monitoramento">
                <SettingsLinkItem label="Preferências de monitoramento" />
            </SettingsSection>
        </div>
    );
}
