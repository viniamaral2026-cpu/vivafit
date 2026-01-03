import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ad } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

// Mock data as seed file is removed. This should be replaced with a Supabase query.
const adsData: Ad[] = [
    {
        "id": "ad1",
        "company": "FitMeals Co.",
        "title": "Entrega de Comida Saudável",
        "imageUrl": "https://images.unsplash.com/photo-1547592180-85f173990554?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwyfHxoZWFsdGh5JTIwZm9vZHxlbnwwfHx8fDE3Njc0MjE2MzF8MA&ixlib_rb-4.1.0&q=80&w=1080",
        "imageHint": "healthy food",
        "isActive": true,
        "expiresAt": "2024-12-31T23:59:59Z"
    },
    {
        "id": "ad2",
        "company": "RunFast Shoes",
        "title": "Tênis de Corrida de Última Geração",
        "imageUrl": "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxydW5uaW5nJTIwc2hvZXN8ZW58MHx8fHwxNzY3NDI5MTM2fDA&ixlib_rb-4.1.0&q=80&w=1080",
        "imageHint": "running shoes",
        "isActive": false,
        "expiresAt": "2024-08-31T23:59:59Z"
    }
];


function getAds(): Ad[] {
    return adsData.map(ad => ({
        ...ad,
        expiresAt: new Date(ad.expiresAt).toISOString(),
    }));
}

export default function AdsManagementPage() {
    const ads = getAds();

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
                {ads.length > 0 ? ads.map(ad => (
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
