"use client";

import { useState } from "react";
import { MainHeader } from "@/components/layout/main-header";
import { Workout } from "@/lib/types";
import placeholderImages from "@/lib/placeholder-images.json";
import { WorkoutCard } from "@/components/content/workout-card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const allWorkouts: Workout[] = [
  { id: "WK001", title: "Morning Yoga Flow", category: "Yoga", duration: 30, level: 'Beginner', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-1')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-1')?.imageHint || '' },
  { id: "WK002", title: "HIIT Cardio Blast", category: "Cardio", duration: 20, level: 'Intermediate', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-2')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-2')?.imageHint || '' },
  { id: "WK003", title: "Full Body Strength", category: "Weightlifting", duration: 45, level: 'Advanced', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-3')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-3')?.imageHint || '' },
  { id: "WK004", title: "Core Sculpt Pilates", category: "Pilates", duration: 35, level: 'Intermediate', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-4')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-4')?.imageHint || '' },
  { id: "WK005", title: "Beginner's Cardio", category: "Cardio", duration: 25, level: 'Beginner', isPremium: false, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-5')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-5')?.imageHint || '' },
  { id: "WK006", title: "Peaceful Outdoor Yoga", category: "Yoga", duration: 40, level: 'Beginner', isPremium: false, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-6')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-6')?.imageHint || '' },
];

export default function WorkoutsPage() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const filteredWorkouts = allWorkouts.filter(workout => {
    const categoryMatch = categoryFilter === 'all' || workout.category === categoryFilter;
    const levelMatch = levelFilter === 'all' || workout.level === levelFilter;
    return categoryMatch && levelMatch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1 p-4 md:p-8">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorkouts.map(workout => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>
        {filteredWorkouts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum treino encontrado com os filtros selecionados.</p>
          </div>
        )}
      </main>
    </div>
  )
}
