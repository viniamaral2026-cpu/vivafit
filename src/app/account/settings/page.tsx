
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight, MoreVertical } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

const SettingsSection = ({ title, children, noBorder = false }: { title: string, children: React.ReactNode, noBorder?: boolean }) => (
    <div>
        <h2 className="text-primary font-semibold px-4 pb-2 pt-4 text-sm">{title}</h2>
        <div className={!noBorder ? "bg-card rounded-lg border" : ""}>
            {children}
        </div>
    </div>
);

const SettingsItem = ({ label, value, href = "#", description }: { label: string, value?: string, href?: string, description?: string }) => (
    <Link href={href} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg">
        <div>
            <p className="font-medium">{label}</p>
            {description && <p className="text-sm text-muted-foreground">{description}</p>}
            {value && <p className="text-sm text-muted-foreground">{value}</p>}
        </div>
        <ChevronRight className="h-5 w-5 text-muted-foreground" />
    </Link>
);

const SettingsLinkItem = ({ label, href = "#" }: { label: string, href?: string }) => (
     <Link href={href} className="block p-4 hover:bg-muted/50 transition-colors first:rounded-t-lg last:rounded-b-lg">
        <p className="font-medium text-primary">{label}</p>
    </Link>
)

const SettingsSwitchItem = ({ label, description, checked, onCheckedChange }: { label: string, description: string, checked: boolean, onCheckedChange: (checked: boolean) => void }) => (
    <div className="flex items-center justify-between p-4">
        <div className="flex-1 pr-4">
            <p className="font-medium">{label}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
);


export default function AccountSettingsPage() {
    const [monitorActivities, setMonitorActivities] = useState(true);
    const [useLocation, setUseLocation] = useState(false);

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

            <SettingsSection title="Preferências de monitoramento" noBorder>
                 <div className="bg-card rounded-lg border">
                    <SettingsSwitchItem 
                        label="Monitorar atividades" 
                        description="Usar os sensores do smartphone para monitorar métricas, como passos e distância, em segundo plano"
                        checked={monitorActivities}
                        onCheckedChange={setMonitorActivities}
                    />
                    <div className="mx-4"><Separator /></div>
                    <SettingsSwitchItem 
                        label="Usar sua localização" 
                        description="Incluir mapas com as atividades monitoradas pelo Fit em segundo plano"
                        checked={useLocation}
                        onCheckedChange={setUseLocation}
                    />
                     <div className="mx-4"><Separator /></div>
                     <SettingsItem label="Configurações para outros dispositivos" />
                 </div>
            </SettingsSection>

            <SettingsSection title="Notificações" noBorder>
                 <div className="bg-card rounded-lg border">
                    <SettingsItem label="Mensagens de treinamento" />
                 </div>
            </SettingsSection>
            
            <SettingsSection title="Treinos" noBorder>
                 <div className="bg-card rounded-lg border">
                    <SettingsItem label="Anúncios falados" value="Desativado" />
                 </div>
            </SettingsSection>

             <SettingsSection title="Diagnóstico" noBorder>
                 <div className="bg-card rounded-lg border">
                    <SettingsItem label="Configurar diagnósticos" description="Os relatórios contêm detalhes sobre seu uso" />
                 </div>
            </SettingsSection>
            
            <SettingsSection title="Tela" noBorder>
                <div className="bg-card rounded-lg border">
                    <SettingsItem label="Tema" />
                </div>
            </SettingsSection>

        </div>
    );
}
