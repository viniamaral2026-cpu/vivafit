
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

// Mock data for payment history
const payments = [
    { invoice: "INV001", date: "Julho 30, 2024", description: "Plano Premium Mensal", amount: "R$ 9,99", status: "Paid" },
    { invoice: "INV002", date: "Junho 30, 2024", description: "Plano Premium Mensal", amount: "R$ 9,99", status: "Paid" },
    { invoice: "INV003", date: "Maio 30, 2024", description: "Plano Premium Mensal", amount: "R$ 9,99", status: "Paid" },
];

export default function PaymentsPage() {

    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-2xl font-bold font-headline">Histórico de Pagamentos</h1>
                <p className="text-muted-foreground">Veja e baixe suas faturas anteriores.</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Suas Transações</CardTitle>
                    <CardDescription>Um registro de todos os seus pagamentos no VivaFit.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Fatura</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Descrição</TableHead>
                                <TableHead>Valor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment.invoice}>
                                    <TableCell className="font-medium">{payment.invoice}</TableCell>
                                    <TableCell>{payment.date}</TableCell>
                                    <TableCell>{payment.description}</TableCell>
                                    <TableCell>{payment.amount}</TableCell>
                                    <TableCell>
                                        <Badge variant={payment.status === "Paid" ? "default" : "destructive"}>
                                            {payment.status === "Paid" ? "Pago" : "Falhou"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="icon">
                                            <Download className="h-4 w-4" />
                                            <span className="sr-only">Baixar Fatura</span>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
