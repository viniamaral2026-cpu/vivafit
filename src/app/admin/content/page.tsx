import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ContentDataTable } from "@/components/content/content-data-table";
import { Workout } from "@/lib/types";
import placeholderImages from "@/lib/placeholder-images.json";

const workouts: Workout[] = [
    { id: "WK001", title: "Morning Yoga Flow", category: "Yoga", duration: 30, level: 'Beginner', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages[1].imageUrl, thumbnailHint: placeholderImages.placeholderImages[1].imageHint },
    { id: "WK002", title: "HIIT Cardio Blast", category: "Cardio", duration: 20, level: 'Intermediate', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages[2].imageUrl, thumbnailHint: placeholderImages.placeholderImages[2].imageHint },
    { id: "WK003", title: "Full Body Strength", category: "Weightlifting", duration: 45, level: 'Advanced', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages[3].imageUrl, thumbnailHint: placeholderImages.placeholderImages[3].imageHint },
    { id: "WK004", title: "Core Sculpt Pilates", category: "Pilates", duration: 35, level: 'Intermediate', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages[4].imageUrl, thumbnailHint: placeholderImages.placeholderImages[4].imageHint },
    { id: "WK005", title: "Beginner's Run", category: "Cardio", duration: 25, level: 'Beginner', isPremium: false, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages[5].imageUrl, thumbnailHint: placeholderImages.placeholderImages[5].imageHint },
];

export default function ContentManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Content Management</h1>
                    <p className="text-muted-foreground">Manage your premium workout content.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Content
                </Button>
            </div>
            <ContentDataTable data={workouts} />
        </div>
    )
}
