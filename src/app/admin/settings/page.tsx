
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Save } from "lucide-react";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Configurações do Sistema</h1>
                    <p className="text-muted-foreground">Gerencie as configurações globais do aplicativo VivaFit.</p>
                </div>
                 <Button>
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                </Button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Integrações de Anúncios</CardTitle>
                            <CardDescription>Configure seus IDs de publicidade para Google AdSense e AdMob.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="adsense-id">ID do Google AdSense</Label>
                                <Input id="adsense-id" placeholder="pub-XXXXXXXXXXXXXXXX" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="admob-id">ID do Google AdMob</Label>
                                <Input id="admob-id" placeholder="ca-app-pub-XXXXXXXXXXXXXXXX~XXXXXXXXXX" />
                            </div>
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle>Marketing & Analytics</CardTitle>
                            <CardDescription>Configure suas chaves de API para serviços de marketing e análise.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="ga-id">ID de Acompanhamento do Google Analytics</Label>
                                <Input id="ga-id" placeholder="G-XXXXXXXXXX" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="fb-pixel-id">ID do Pixel do Facebook</Label>
                                <Input id="fb-pixel-id" placeholder="Seu ID do Pixel" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>APIs de Conteúdo e Pagamento</CardTitle>
                            <CardDescription>Gerencie chaves para serviços externos como PagSeguro e YouTube.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="pagseguro-token">Token do PagSeguro</Label>
                                <Input id="pagseguro-token" type="password" placeholder="Cole seu token aqui" defaultValue="127259b0-b0ea-4292-a853-3b5b3f107aab6a2d47b746979b36991bd6d3759cd17ea476-c986-478e-aa33-6da99e3bfe81" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="pagseguro-email">E-mail do PagSeguro</Label>
                                <Input id="pagseguro-email" type="email" placeholder="seu-email@pagseguro.com" defaultValue="dmgproductionsoficial@gmail.com" />
                            </div>
                             <Separator className="my-4" />
                             <div className="space-y-2">
                                <Label htmlFor="youtube-api-key">Chave da API do YouTube</Label>
                                <Input id="youtube-api-key" type="password" placeholder="Sua chave de API do YouTube" />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                
                 <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Manutenção</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label htmlFor="maintenance-mode" className="font-semibold">Modo Manutenção</Label>
                                    <p className="text-xs text-muted-foreground">Desativa o acesso para usuários não-administradores.</p>
                                </div>
                                <Switch id="maintenance-mode" />
                            </div>
                            <Button variant="outline" className="w-full">Limpar Cache do App</Button>
                            <Button variant="destructive" className="w-full">Fazer Backup Agora</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
