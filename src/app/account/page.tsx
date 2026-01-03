"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../auth-provider";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";


type UserProfile = {
    name: string;
    username: string;
    email: string;
}

export default function AccountProfilePage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loadingProfile, setLoadingProfile] = useState(true);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


     useEffect(() => {
        if (user) {
            setLoadingProfile(true);
            // Simulate fetching profile data
            setTimeout(() => {
                const userProfile = {
                    name: user.displayName || 'Usuário de Teste',
                    username: user.displayName?.toLowerCase().replace(' ', '') || 'usertest',
                    email: user.email || 'Não informado'
                };
                setProfile(userProfile);
                setName(userProfile.name);
                setUsername(userProfile.username);
                setLoadingProfile(false);
            }, 500);
        } else {
            setLoadingProfile(false);
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        if (!user || !profile) return;
        // Simulate update
        setProfile({...profile, name, username});
        toast({
            title: "Sucesso!",
            description: "Seu perfil foi atualizado (simulação)."
        });
    }
    
    const handleUpdatePassword = async () => {
        if (!user) return;
        if (newPassword !== confirmPassword) {
            toast({ title: "Erro", description: "As novas senhas não correspondem.", variant: "destructive" });
            return;
        }
        if (!currentPassword || !newPassword) {
            toast({ title: "Erro", description: "Por favor, preencha todos os campos de senha.", variant: "destructive" });
            return;
        }
        
        toast({ title: "Sucesso!", description: "Sua senha foi alterada (simulação)." });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    }

    if (loadingProfile) return (
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
                    <div className="grid gap-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                    <div className="grid gap-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                     <div className="grid gap-2">
                        <Skeleton className="h-4 w-1/4" />
                        <Skeleton className="h-10 w-full" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        </div>
    )

    if (!profile) return null;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Perfil</h1>
                <p className="text-muted-foreground">Gerencie suas informações pessoais.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Seus Detalhes</CardTitle>
                    <CardDescription>Atualize seu nome, nome de usuário e endereço de e-mail.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="username">Nome de usuário</Label>
                        <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" value={profile.email} disabled />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={handleUpdateProfile}>Salvar Alterações</Button>
                </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Alterar Senha</CardTitle>
                    <CardDescription>Atualize a senha da sua conta.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="current-password">Senha Atual</Label>
                        <Input id="current-password" type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirme a Nova Senha</Label>
                        <Input id="confirm-password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button onClick={handleUpdatePassword}>Atualizar Senha</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
