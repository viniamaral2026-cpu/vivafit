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

const workouts: Workout[] = [
  { id: "WK001", title: "Morning Yoga Flow", category: "Yoga", duration: 30, level: 'Beginner', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-1')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-1')?.imageHint || '' },
  { id: "WK002", title: "HIIT Cardio Blast", category: "Cardio", duration: 20, level: 'Intermediate', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-2')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-2')?.imageHint || '' },
  { id: "WK003", title: "Full Body Strength", category: "Weightlifting", duration: 45, level: 'Advanced', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-3')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-3')?.imageHint || '' },
  { id: "WK004", title: "Core Sculpt Pilates", category: "Pilates", duration: 35, level: 'Intermediate', isPremium: true, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-4')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-4')?.imageHint || '' },
  { id: "WK005", title: "Beginner's Cardio", category: "Cardio", duration: 25, level: 'Beginner', isPremium: false, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-5')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-5')?.imageHint || '' },
  { id: "WK006", title: "Peaceful Outdoor Yoga", category: "Yoga", duration: 40, level: 'Beginner', isPremium: false, videoUrl: "#", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-6')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-6')?.imageHint || '' },
];

export default function WorkoutsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="flex-1">
        <div className="container py-8">
          <div className="space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight font-headline">Workouts</h1>
            <p className="text-muted-foreground">Browse our library of workouts and find your next challenge.</p>
          </div>

          <div className="flex justify-end gap-4 mb-8">
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="weightlifting">Weightlifting</SelectItem>
                    <SelectItem value="pilates">Pilates</SelectItem>
                </SelectContent>
            </Select>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
