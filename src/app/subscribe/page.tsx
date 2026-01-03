"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Crown } from "lucide-react";

const paymentSchema = z.object({
    cardName: z.string().min(3, "Nome no cartão é obrigatório"),
    cardNumber: z.string().refine((value) => /^\d{16}$/.test(value.replace(/\s/g, '')), "Número do cartão inválido"),
    expiryDate: z.string().refine((value) => /^(0[1-9]|1[0-2])\/?([0-9]{4}|[0-9]{2})$/.test(value), "Data de validade inválida (MM/AA)"),
    cvc: z.string().refine((value) => /^\d{3,4}$/.test(value), "CVC inválido"),
});


export default function SubscribePage() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof paymentSchema>>({
        resolver: zodResolver(paymentSchema),
        defaultValues: {
            cardName: "",
            cardNumber: "",
            expiryDate: "",
            cvc: "",
        },
    });

    const onSubmit = (values: z.infer<typeof paymentSchema>) => {
        // Simulate a successful payment
        console.log("Payment details:", values);
        toast({
            title: "Pagamento bem-sucedido!",
            description: "Você agora é um membro Premium. Bem-vindo!",
        });

        // Simulate updating user session/status
        // In a real app, you'd likely update the user's subscription status in the backend
        // and then refetch the user data on the client.
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
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                                        {form.formState.isSubmitting ? "Processando..." : "Finalizar Pagamento (R$ 9,99)"}
                                    </Button>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    )
}
