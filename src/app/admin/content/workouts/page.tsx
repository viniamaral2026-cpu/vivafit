import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ContentDataTable } from "@/components/content/content-data-table";
import { Workout } from "@/lib/types";
import workoutsData from "@/lib/firebase/seed-data/workouts.json";


function getWorkouts(): Workout[] {
  // Simulating fetching from a local JSON file instead of Firestore
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
