
"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ContentDataTable } from "@/components/content/content-data-table";
import { Workout } from "@/lib/types";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkoutsManagementPage() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('workouts').select('*');
            if (error) {
                console.error("Error fetching workouts:", error);
            } else {
                setWorkouts(data as Workout[]);
            }
            setLoading(false);
        };
        fetchWorkouts();
    }, [supabase]);

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
            {loading ? (
                <div className="space-y-2">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-64 w-full" />
                </div>
            ) : (
                <ContentDataTable data={workouts} />
            )}
        </div>
    )
}
