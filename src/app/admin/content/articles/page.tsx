
"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Article } from "@/lib/types";

// Mock data as Firestore is disabled
const mockArticles: Article[] = [
    {
        id: "article1",
        title: "O Segredo do Jejum Intermitente",
        author: "Dra. Luiza Mello",
        publishedAt: "2024-07-30",
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=1887&auto=format&fit=crop",
        imageHint: "intermittent fasting food",
        content: "Descubra como o tempo de alimentação afeta seu metabolismo...",
        category: "NUTRIÇÃO"
    },
    {
        id: "article2",
        title: "10 Dicas para Manter a Motivação",
        author: "Coach Rick",
        publishedAt: "2024-07-28",
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1475666673248-340a5289d185?q=80&w=2070&auto=format&fit=crop",
        imageHint: "motivation sunrise",
        content: "Estratégias mentais para não desistir da sua jornada fitness...",
        category: "MENTAL"
    }
];

export default function ArticlesManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Gerenciamento de Artigos & Dicas</h1>
                    <p className="text-muted-foreground">Escreva, edite e publique artigos para seus usuários.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Artigo
                </Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Artigos</CardTitle>
                    <CardDescription>Uma lista de todos os artigos e dicas publicados.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Autor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Data de Publicação</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockArticles.map(article => (
                                <TableRow key={article.id}>
                                    <TableCell className="font-medium">{article.title}</TableCell>
                                    <TableCell>{article.author}</TableCell>
                                    <TableCell>
                                        <Badge variant={article.isPremium ? "default" : "secondary"}>
                                            {article.isPremium ? "Premium" : "Grátis"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{new Date(article.publishedAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
