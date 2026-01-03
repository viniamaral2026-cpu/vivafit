
"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Recipe } from "@/lib/types";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecipesManagementPage() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('recipes').select('*');
            if (error) {
                console.error("Error fetching recipes:", error);
            } else {
                setRecipes(data as Recipe[]);
            }
            setLoading(false);
        };
        fetchRecipes();
    }, [supabase]);

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
                            {loading ? (
                                Array.from({ length: 2 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-4 w-40" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                                        <TableCell><Skeleton className="h-6 w-16 rounded-full" /></TableCell>
                                        <TableCell><Skeleton className="h-4 w-16" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-8 w-16 ml-auto" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                recipes.map(recipe => (
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
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
