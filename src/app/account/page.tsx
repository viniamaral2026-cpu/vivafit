"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "../auth-provider";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Skeleton } from "@/components/ui/skeleton";

type UserProfile = {
    name: string;
    email: string;
}

export default function AccountProfilePage() {
    const { user } = useAuth();
    const [profile, setProfile] = useState<UserProfile | null>(null);

     useEffect(() => {
        if (user) {
            const fetchProfile = async () => {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    setProfile(userDoc.data() as UserProfile);
                } else {
                    // Fallback for new users who might not have a doc yet
                    setProfile({
                        name: user.displayName || 'Usuário',
                        email: user.email || 'Não informado'
                    });
                }
            };
            fetchProfile();
        }
    }, [user]);

    if (!profile) return (
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
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Skeleton className="h-10 w-32" />
                </CardFooter>
            </Card>
        </div>
    )

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Perfil</h1>
                <p className="text-muted-foreground">Gerencie suas informações pessoais.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Seus Detalhes</CardTitle>
                    <CardDescription>Atualize seu nome e endereço de e-mail.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input id="name" defaultValue={profile.name} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" defaultValue={profile.email} disabled />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Salvar Alterações</Button>
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
                        <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="new-password">Nova Senha</Label>
                        <Input id="new-password" type="password" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirme a Nova Senha</Label>
                        <Input id="confirm-password" type="password" />
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button>Atualizar Senha</Button>
                </CardFooter>
            </Card>
        </div>
    )
}
