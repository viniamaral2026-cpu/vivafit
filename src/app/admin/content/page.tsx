import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ContentDataTable } from "@/components/content/content-data-table";
import { Workout } from "@/lib/types";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

async function getWorkouts(): Promise<Workout[]> {
  const workoutsCol = collection(db, 'workouts');
  const workoutSnapshot = await getDocs(workoutsCol);
  const workoutList = workoutSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Workout));
  return workoutList;
}

export default async function ContentManagementPage() {
    const workouts = await getWorkouts();

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
