
"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/lib/types";

// Mock data as Firestore is disabled
const mockRecipes: Recipe[] = [
    {
        id: "recipe1",
        title: "Salada de Quinoa com Abacate",
        category: "Lunch",
        prepTime: 15,
        cookTime: 20,
        calories: 350,
        isPremium: false,
        imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
        imageHint: "quinoa salad"
    },
    {
        id: "recipe2",
        title: "Salmão Grelhado com Aspargos",
        category: "Dinner",
        prepTime: 10,
        cookTime: 15,
        calories: 550,
        isPremium: true,
        imageUrl: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=1887&auto=format&fit=crop",
        imageHint: "grilled salmon"
    }
];

export default function RecipesManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Gerenciamento de Receitas</h1>
                    <p className="text-muted-foreground">Crie, edite e gerencie todas as receitas.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Receita
                </Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Receitas</CardTitle>
                    <CardDescription>Uma lista de todas as receitas em seu aplicativo.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Título</TableHead>
                                <TableHead>Categoria</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Calorias</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockRecipes.map(recipe => (
                                <TableRow key={recipe.id}>
                                    <TableCell className="font-medium">{recipe.title}</TableCell>
                                    <TableCell>{recipe.category}</TableCell>
                                    <TableCell>
                                        <Badge variant={recipe.isPremium ? "default" : "secondary"}>
                                            {recipe.isPremium ? "Premium" : "Grátis"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{recipe.calories} kcal</TableCell>
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
