import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ContentDataTable } from "@/components/content/content-data-table";
import { Workout } from "@/lib/types";

// Mock data as seed file is removed. This should be replaced with a Supabase query.
const workoutsData: Workout[] = [
    {
        "id": "hiit-express",
        "title": "HIIT Express",
        "category": "Cardio",
        "duration": 15,
        "level": "Advanced",
        "isPremium": false,
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "thumbnailUrl": "https://images.unsplash.com/photo-1758875569612-94d5e0f1a35f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxjYXJkaW8lMjBjbGFzc3xlbnwwfHx8fDE3Njc0MzU5NTR8MA&ixlib=rb-4.1.0&q=80&w=1080",
        "thumbnailHint": "cardio class"
    },
    {
        "id": "yoga-matinal",
        "title": "Yoga Matinal",
        "category": "Yoga",
        "duration": 20,
        "level": "Beginner",
        "isPremium": false,
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "thumbnailUrl": "https://images.unsplash.com/photo-1564282350350-a8355817fd2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw3fHxvdXRkb29yJTIweW9nYXxlbnwwfHx8fDE3Njc0MzU5NTR8MA&ixlib_rb-4.1.0&q=80&w=1080",
        "thumbnailHint": "outdoor yoga"
    },
    {
        "id": "treino-de-forca",
        "title": "Treino de Força",
        "category": "Weightlifting",
        "duration": 45,
        "level": "Intermediate",
        "isPremium": true,
        "videoUrl": "https://www.youtube.com/embed/dQw4w9WgXcQ",
        "thumbnailUrl": "https://images.unsplash.com/photo-1722925541321-f52d45b29c17?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHx3ZWlnaHRsaWZ0aW5nJTIwZ3ltfGVufDB8fHx8MTc2NzMyMTU2OXww&ixlib=rb-4.1.0&q=80&w=1080",
        "thumbnailHint": "weightlifting gym"
    }
];


function getWorkouts(): Workout[] {
  return workoutsData as Workout[];
}

export default function WorkoutsManagementPage() {
    const workouts = getWorkouts();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Gerenciamento de Treinos</h1>
                    <p className="text-muted-foreground">Gerencie seu conteúdo de treinos premium.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Adicionar Treino
                </Button>
            </div>
            <ContentDataTable data={workouts} />
        </div>
    )
}
