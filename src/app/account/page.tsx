
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../auth-provider";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { createClient } from "@/lib/supabase/client";

type UserProfile = {
    id: string;
    full_name: string;
    username: string;
    gender: string;
    birth_date: string;
    weight: number;
    height: number;
};

type ActivityGoals = {
    steps: number;
    cardio_points: number;
}

type SleepSchedule = {
    enabled: boolean;
    bedtime: string;
    wakeup: string;
}

export default function AccountProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const supabase = createClient();

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [goals, setGoals] = useState<ActivityGoals | null>(null);
    const [sleep, setSleep] = useState<SleepSchedule | null>(null);

    const [loading, setLoading] = useState(true);
    
    // Form state
    const [name, setName] = useState("");
    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [steps, setSteps] = useState("10000");
    const [cardioPoints, setCardioPoints] = useState("40");
    const [sleepEnabled, setSleepEnabled] = useState(false);
    const [bedtime, setBedtime] = useState("23:00");
    const [wakeup, setWakeup] = useState("07:00");


     useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                setLoading(true);
                
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                if (error) {
                    toast({ title: "Erro ao buscar perfil", description: error.message, variant: "destructive" });
                    setLoading(false);
                    return;
                }
                
                if (data) {
                    setProfile(data);
                    // Set form state from fetched data
                    setName(data.full_name || '');
                    setGender(data.gender || '');
                    setBirthDate(data.birth_date || '');
                    setWeight(data.weight?.toString() || '');
                    setHeight(data.height?.toString() || '');
                    // Mock goals and sleep for now as they are not in profiles table
                    const userGoals = { steps: 10000, cardio_points: 40 };
                    const userSleep = { enabled: false, bedtime: "23:00", wakeup: "07:00" };
                    setGoals(userGoals);
                    setSleep(userSleep);
                    setSteps(userGoals.steps.toString());
                    setCardioPoints(userGoals.cardio_points.toString());
                    setSleepEnabled(userSleep.enabled);
                    setBedtime(userSleep.bedtime);
                    setWakeup(userSleep.wakeup);
                }
                setLoading(false);
            }
            fetchProfile();
        } else {
            setLoading(false);
        }
    }, [user, supabase, toast]);

    const handleUpdate = async () => {
        if (!user || !profile) return;
        
        const { error } = await supabase
            .from('profiles')
            .update({
                full_name: name,
                gender: gender,
                birth_date: birthDate,
                weight: parseFloat(weight),
                height: parseInt(height),
                // Note: goals and sleep are not part of the 'profiles' table schema
            })
            .eq('id', user.id);

        if (error) {
            toast({ title: "Erro ao atualizar", description: error.message, variant: "destructive" });
        } else {
            toast({
                title: "Sucesso!",
                description: "Suas configurações foram atualizadas."
            });
        }
    }

    if (loading) return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
            </div>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="flex justify-between items-center">
                         <Skeleton className="h-6 w-48" />
                         <Skeleton className="h-6 w-12 rounded-full" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
            <Card>
                 <CardHeader>
                    <Skeleton className="h-6 w-1/3" />
                </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end">
                <Skeleton className="h-10 w-32" />
            </div>
        </div>
    )

    if (!profile || !goals || !sleep) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Perfil e Metas</h1>
                <p className="text-muted-foreground">Gerencie suas informações e objetivos pessoais.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Metas de atividade</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div className="grid gap-2">
                            <Label htmlFor="steps">Passos</Label>
                             <Select onValueChange={setSteps} value={steps}>
                                <SelectTrigger id="steps">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="5000">5.000</SelectItem>
                                    <SelectItem value="7500">7.500</SelectItem>
                                    <SelectItem value="10000">10.000</SelectItem>
                                     <SelectItem value="12500">12.500</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                             <Label htmlFor="cardio-points">Pontos cardio</Label>
                             <Select onValueChange={setCardioPoints} value={cardioPoints}>
                                <SelectTrigger id="cardio-points">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="10">10</SelectItem>
                                    <SelectItem value="20">20</SelectItem>
                                    <SelectItem value="30">30</SelectItem>
                                    <SelectItem value="40">40</SelectItem>
                                    <SelectItem value="50">50</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                     </div>
                     <div className="flex items-center justify-between pt-4">
                        <Label htmlFor="sleep-schedule" className="font-semibold">Programação da hora de dormir</Label>
                        <Switch id="sleep-schedule" checked={sleepEnabled} onCheckedChange={setSleepEnabled} />
                     </div>
                     {sleepEnabled && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="bedtime">Ir para a cama</Label>
                                <Input id="bedtime" type="time" value={bedtime} onChange={e => setBedtime(e.target.value)} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="wakeup">Acordar</Label>
                                <Input id="wakeup" type="time" value={wakeup} onChange={e => setWakeup(e.target.value)} />
                            </div>
                        </div>
                     )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Sobre você</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="grid gap-2">
                        <Label htmlFor="name">Nome</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Gênero</Label>
                            <Select onValueChange={setGender} value={gender}>
                                <SelectTrigger id="gender">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Masculino</SelectItem>
                                    <SelectItem value="female">Feminino</SelectItem>
                                    <SelectItem value="other">Outro</SelectItem>
                                    <SelectItem value="unspecified">Prefiro não dizer</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="birthDate">Data de nascimento</Label>
                            <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
                        </div>
                    </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="weight">Peso (kg)</Label>
                            <Input id="weight" type="number" placeholder="ex: 70" value={weight} onChange={(e) => setWeight(e.target.value)} />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="height">Altura (cm)</Label>
                            <Input id="height" type="number" placeholder="ex: 175" value={height} onChange={(e) => setHeight(e.target.value)} />
                        </div>
                    </div>
                </CardContent>
            </Card>
            <div className="flex justify-end">
                <Button onClick={handleUpdate}>Salvar Alterações</Button>
            </div>
        </div>
    )
}
