"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Logo } from "@/components/icons/logo";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export default function OnboardingPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const [gender, setGender] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [weight, setWeight] = useState("");
    const [height, setHeight] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleOnboardingSubmit = async () => {
        if (!gender || !birthDate || !weight || !height) {
            toast({ title: "Campos incompletos", description: "Por favor, preencha todos os campos para continuar.", variant: "destructive" });
            return;
        }
        
        setIsSubmitting(true);
        // Simulate saving data
        toast({ title: "Informações salvas!", description: "Vamos para o próximo passo." });
        router.push("/onboarding/goals");
        setIsSubmitting(false);
    };
    
    if (loading || !user) {
        return (
             <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
                 <Card className="w-full max-w-md">
                     <CardHeader className="items-center text-center">
                        <Skeleton className="h-12 w-28 mb-4"/>
                        <Skeleton className="h-8 w-48"/>
                        <Skeleton className="h-4 w-64 mt-2"/>
                     </CardHeader>
                     <CardContent className="space-y-4">
                        <Skeleton className="h-4 w-32 mx-auto"/>
                         <div className="grid grid-cols-2 gap-4">
                             <Skeleton className="h-10 w-full"/>
                             <Skeleton className="h-10 w-full"/>
                         </div>
                          <div className="grid grid-cols-2 gap-4">
                             <Skeleton className="h-10 w-full"/>
                             <Skeleton className="h-10 w-full"/>
                         </div>
                     </CardContent>
                     <CardFooter>
                        <Skeleton className="h-12 w-full"/>
                     </CardFooter>
                 </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="items-center text-center">
                    <Logo className="w-28 mb-4" />
                    <CardTitle className="text-2xl font-headline">Sobre você</CardTitle>
                    <CardDescription>
                        Essas informações permitem que o Fit calcule as calorias, a distância e a intensidade da sua atividade.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-center text-sm text-muted-foreground">{user?.email}</p>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="gender">Gênero</Label>
                            <Select onValueChange={setGender} value={gender}>
                                <SelectTrigger id="gender">
                                    <SelectValue placeholder="Selecione..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Masculino</SelectItem>
                                    <SelectItem value="female">Feminino</SelectItem>
                                    <SelectItem value="other">Outro</SelectItem>
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
                <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleOnboardingSubmit} disabled={isSubmitting}>
                        {isSubmitting ? "Salvando..." : "Avançar"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
