import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Ad } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import placeholderImages from "@/lib/placeholder-images.json";

const ads: Ad[] = [
    { id: "AD001", company: "FitGear", title: "Summer Sportswear Sale", imageUrl: placeholderImages.placeholderImages[7].imageUrl, imageHint: "healthy food", isActive: true, expiresAt: "2024-12-31" },
    { id: "AD002", company: "NutriBoost", title: "New Protein Shakes", imageUrl: placeholderImages.placeholderImages[8].imageUrl, imageHint: "running shoes", isActive: true, expiresAt: "2024-11-30" },
    { id: "AD003", company: "YogaMats+", title: "Eco-friendly Mats", imageUrl: "https://picsum.photos/seed/vivafitad3/800/200", imageHint: "yoga mat", isActive: false, expiresAt: "2024-06-30" },
];

export default function AdsManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Ad Management</h1>
                    <p className="text-muted-foreground">Manage your ad placements.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Ad
                </Button>
            </div>
            
            <div className="grid gap-6">
                {ads.map(ad => (
                    <Card key={ad.id}>
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div>
                                    <CardTitle>{ad.title}</CardTitle>
                                    <CardDescription>{ad.company}</CardDescription>
                                </div>
                                <Badge variant={ad.isActive ? "default" : "outline"}>
                                    {ad.isActive ? "Active" : "Inactive"}
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
                                <span>Expires: {new Date(ad.expiresAt).toLocaleDateString()}</span>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="destructive" size="sm">Delete</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
