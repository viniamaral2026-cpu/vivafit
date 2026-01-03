import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function RecipesManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Recipe Management</h1>
                    <p className="text-muted-foreground">Create, edit, and manage all recipes.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Recipe
                </Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Recipes</CardTitle>
                    <CardDescription>No recipes found. Add one to get started.</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12 text-muted-foreground">
                    <p>This is where the recipe data table will be displayed.</p>
                </CardContent>
            </Card>
        </div>
    )
}
