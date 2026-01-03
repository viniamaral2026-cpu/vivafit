"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Watch } from "lucide-react";
import { useAuth } from "@/app/auth-provider";
import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

type NotificationSettings = {
    workoutReminders: boolean;
    mealLogging: boolean;
    weeklySummary: boolean;
}

export default function AccountSettingsPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [settings, setSettings] = useState<NotificationSettings | null>(null);
    const [loading, setLoading] = useState(true);

     useEffect(() => {
        if (user) {
            setLoading(true);
             // Simulate fetching settings
            setTimeout(() => {
                 setSettings({
                    workoutReminders: true,
                    mealLogging: true,
                    weeklySummary: false,
                });
                setLoading(false);
            }, 500);
        } else {
             setLoading(false);
        }
    }, [user]);

    const handleSettingChange = (key: keyof NotificationSettings, value: boolean) => {
        if (!user || !settings) return;

        const newSettings = { ...settings, [key]: value };
        setSettings(newSettings);
        
        toast({
            title: "Configuração salva!",
            description: "Suas preferências de notificação foram atualizadas (simulação).",
        });
    };


    if (loading) {
        return (
             <div className="space-y-6">
                <div>
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </div>
                 <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-2/3 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-1/3" />
                        <Skeleton className="h-4 w-2/3 mt-2" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-6 w-11 rounded-full" />
                        </div>
                         <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-6 w-11 rounded-full" />
                        </div>
                         <div className="flex items-center justify-between">
                            <Skeleton className="h-5 w-1/3" />
                            <Skeleton className="h-6 w-11 rounded-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Configurações</h1>
                <p className="text-muted-foreground">Gerencie as configurações da sua conta e dispositivos.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Dispositivos Conectados</CardTitle>
                    <CardDescription>Sincronize sua atividade de seus dispositivos vestíveis.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            <Watch className="w-8 h-8" />
                            <div>
                                <h3 className="font-semibold">Smartwatch</h3>
                                <p className="text-sm text-muted-foreground">Não conectado</p>
                            </div>
                        </div>
                        <Button variant="outline">Conectar</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notificações</CardTitle>
                    <CardDescription>Gerencie como você recebe notificações do VivaFit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {settings && (
                        <>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="workout-reminders">Lembretes de treino</Label>
                                <Switch 
                                    id="workout-reminders" 
                                    checked={settings.workoutReminders} 
                                    onCheckedChange={(value) => handleSettingChange('workoutReminders', value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="meal-logging">Alertas de registro de refeições</Label>
                                <Switch 
                                    id="meal-logging" 
                                    checked={settings.mealLogging}
                                    onCheckedChange={(value) => handleSettingChange('mealLogging', value)}
                                />
                            </div>
                            <div className="flex items-center justify-between">
                                <Label htmlFor="weekly-summary">Resumo semanal do progresso</Label>
                                <Switch 
                                    id="weekly-summary"
                                    checked={settings.weeklySummary}
                                    onCheckedChange={(value) => handleSettingChange('weeklySummary', value)}
                                />
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
