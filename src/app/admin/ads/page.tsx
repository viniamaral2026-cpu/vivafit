
"use client";

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ad } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdsManagementPage() {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchAds = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('ads').select('*');
            if (error) {
                console.error("Error fetching ads:", error);
            } else {
                setAds(data as Ad[]);
            }
            setLoading(false);
        };
        fetchAds();
    }, [supabase]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Gerenciamento de Anúncios</h1>
                    <p className="text-muted-foreground">Gerencie seus espaços de anúncio.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Anúncio
                </Button>
            </div>
            
            <div className="grid gap-6">
                {loading ? (
                    Array.from({ length: 2 }).map((_, i) => (
                        <Card key={i}>
                            <CardHeader><Skeleton className="h-6 w-1/2" /></CardHeader>
                            <CardContent>
                                <Skeleton className="aspect-[4/1] w-full" />
                            </CardContent>
                        </Card>
                    ))
                ) : ads.length > 0 ? ads.map(ad => (
                    <Card key={ad.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{ad.title}</CardTitle>
                                    <CardDescription>{ad.company}</CardDescription>
                                </div>
                                <Badge variant={ad.isActive ? "default" : "outline"}>
                                    {ad.isActive ? "Ativo" : "Inativo"}
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="aspect-[4/1] w-full overflow-hidden rounded-md">
                                <Image
                                    src={ad.imageUrl}
                                    alt={ad.title}
                                    data-ai-hint={ad.imageHint}
                                    width={800}
                                    height={200}
                                    className="object-cover w-full h-full"
                                />
                            </div>
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                                <span>Expira em: {new Date(ad.expiresAt).toLocaleDateString()}</span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Editar</Button>
                                    <Button variant="destructive" size="sm">Deletar</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )) : (
                    <Card>
                        <CardContent className="p-6 text-center text-muted-foreground">
                            Nenhum anúncio encontrado.
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
