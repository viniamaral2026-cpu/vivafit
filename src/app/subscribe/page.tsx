
"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Crown, QrCode, ClipboardCopy } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

const paymentSchema = z.object({
    cardName: z.string().min(3, "Nome no cartão é obrigatório"),
    cardNumber: z.string().refine((value) => /^\d{16}$/.test(value.replace(/\s/g, '')), "Número do cartão inválido"),
    expiryDate: z.string().refine((value) => /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value), "Data de validade inválida (MM/AA)"),
    cvc: z.string().refine((value) => /^\d{3,4}$/.test(value), "CVC inválido"),
});


export default function SubscribePage() {
    const router = useRouter();
    const { toast } = useToast();
    const pixCode = "00020126360014br.gov.bcb.pix0114+551199999999952040000530398654059.995802BR5913NOME DO LOJISTA6009SAO PAULO62070503***6304E2B1";

    const form = useForm<z.infer<typeof paymentSchema>>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
        },
    });

    const onPaymentSuccess = () => {
         toast({
            title: "Pagamento bem-sucedido!",
            description: "Você agora é um membro Premium. Bem-vindo!",
        });

        // Simulate updating user session/status
        if (typeof window !== 'undefined') {
            const userStr = window.sessionStorage.getItem('vivafit-user');
            if (userStr) {
                const user = JSON.parse(userStr);
                user.subscription = 'Premium';
                window.sessionStorage.setItem('vivafit-user', JSON.stringify(user));
            }
        }
        router.push("/account/billing");
    }

    const onCardSubmit = (values: z.infer<typeof paymentSchema>) => {
        console.log("Card details:", values);
        onPaymentSuccess();
    }

    const copyPixCode = () => {
        navigator.clipboard.writeText(pixCode);
        toast({
            title: "Código PIX copiado!",
            description: "Use o código no seu app de banco para pagar.",
        });
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
             <div className="absolute top-4 left-4">
                <Button variant="ghost" asChild>
                    <Link href="/">
                    &larr; Voltar para a Home
                    </Link>
                </Button>
             </div>
            <main className="w-full max-w-4xl mx-auto">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold font-headline">Finalize sua Assinatura</h1>
                    <p className="text-muted-foreground">Complete seus dados de pagamento para se tornar Premium.</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Order Summary */}
                    <Card className="bg-background/50">
                        <CardHeader>
                            <CardTitle>Resumo do Pedido</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h4 className="font-semibold">Plano Premium Mensal</h4>
                                    <p className="text-sm text-muted-foreground">Acesso ilimitado a todos os recursos.</p>
                                </div>
                                <div className="text-lg font-bold">R$ 9,99</div>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center font-bold text-lg">
                                <span>Total</span>
                                <span>R$ 9,99</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Payment Form */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Detalhes do Pagamento</CardTitle>
                            <CardDescription>Simulação de checkout seguro.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Tabs defaultValue="card">
                                <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="card">Cartão de Crédito</TabsTrigger>
                                    <TabsTrigger value="pix">PIX</TabsTrigger>
                                </TabsList>
                                <TabsContent value="card" className="pt-4">
                                    <Form {...form}>
                                        <form onSubmit={form.handleSubmit(onCardSubmit)} className="space-y-4">
                                            <FormField
                                                control={form.control}
                                                name="cardName"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Nome no Cartão</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="Seu nome completo" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="cardNumber"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>Número do Cartão</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="0000 0000 0000 0000" {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <div className="flex gap-4">
                                                <FormField
                                                    control={form.control}
                                                    name="expiryDate"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormLabel>Validade</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="MM/AA" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={form.control}
                                                    name="cvc"
                                                    render={({ field }) => (
                                                        <FormItem className="flex-1">
                                                            <FormLabel>CVC</FormLabel>
                                                            <FormControl>
                                                                <Input placeholder="123" {...field} />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                            </div>
                                            <Button type="submit" className="w-full" size="lg" disabled={form.formState.isSubmitting}>
                                                <Crown className="mr-2 h-5 w-5"/>
                                                {form.formState.isSubmitting ? "Processando..." : "Pagar com Cartão (R$ 9,99)"}
                                            </Button>
                                        </form>
                                    </Form>
                                </TabsContent>
                                 <TabsContent value="pix" className="pt-4">
                                    <div className="flex flex-col items-center justify-center space-y-4">
                                        <p className="text-sm text-muted-foreground text-center">Escaneie o código QR com seu app de banco para pagar.</p>
                                        <div className="p-2 border rounded-md">
                                            <QrCode className="h-40 w-40" />
                                        </div>
                                        <Button variant="outline" className="w-full" onClick={copyPixCode}>
                                            <ClipboardCopy className="mr-2 h-4 w-4" />
                                            Copiar código PIX
                                        </Button>
                                        <p className="text-xs text-muted-foreground text-center pt-2">Após o pagamento, sua assinatura será ativada automaticamente.</p>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
