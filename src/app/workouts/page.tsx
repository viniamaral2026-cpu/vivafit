"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/lib/types";
import { WorkoutCard } from "@/components/content/workout-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { Skeleton } from "@/components/ui/skeleton";

export default function WorkoutsPage() {
  const [allWorkouts, setAllWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  useEffect(() => {
    const fetchWorkouts = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, "workouts"));
        const workoutsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Workout[];
        setAllWorkouts(workoutsData);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  const filteredWorkouts = allWorkouts.filter(workout => {
    const categoryMatch = categoryFilter === 'all' || workout.category === categoryFilter;
    const levelMatch = levelFilter === 'all' || workout.level === levelFilter;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="p-4 md:p-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tight font-headline">Treinos</h1>
        <p className="text-muted-foreground">Navegue em nossa biblioteca de treinos e encontre seu próximo desafio.</p>
      </div>

      <div className="flex justify-end gap-4 mb-8">
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todas as Categorias</SelectItem>
                <SelectItem value="Yoga">Yoga</SelectItem>
                <SelectItem value="Cardio">Cardio</SelectItem>
                <SelectItem value="Weightlifting">Musculação</SelectItem>
                <SelectItem value="Pilates">Pilates</SelectItem>
            </SelectContent>
        </Select>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por nível" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">Todos os Níveis</SelectItem>
                <SelectItem value="Beginner">Iniciante</SelectItem>
                <SelectItem value="Intermediate">Intermediário</SelectItem>
                <SelectItem value="Advanced">Avançado</SelectItem>
            </SelectContent>
        </Select>
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <Skeleton className="aspect-video w-full" />
              <CardContent className="p-4">
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                       <Skeleton className="h-5 w-1/4" />
                       <Skeleton className="h-5 w-1/4" />
                       <Skeleton className="h-5 w-1/4" />
                  </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          {filteredWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorkouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : (
             <div className="text-center py-16">
              <p className="text-muted-foreground">Nenhum treino encontrado. Tente ajustar os filtros ou adicione treinos no Firestore.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}