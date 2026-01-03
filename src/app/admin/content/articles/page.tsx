import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ArticlesManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Articles & Tips Management</h1>
                    <p className="text-muted-foreground">Write, edit, and publish articles for your users.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Article
                </Button>
            </div>
             <Card>
                <CardHeader>
                    <CardTitle>Articles</CardTitle>
                    <CardDescription>No articles found. Add one to get started.</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12 text-muted-foreground">
                    <p>This is where the articles data table will be displayed.</p>
                </CardContent>
            </Card>
        </div>
    )
}
