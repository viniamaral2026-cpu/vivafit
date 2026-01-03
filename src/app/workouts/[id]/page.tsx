import { MainHeader } from "@/components/layout/main-header";
import { Workout } from "@/lib/types";
import placeholderImages from "@/lib/placeholder-images.json";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, Crown, Dumbbell, Flame, Lock, Zap } from "lucide-react";
import Link from "next/link";

const workouts: Workout[] = [
  { id: "WK001", title: "Morning Yoga Flow", category: "Yoga", duration: 30, level: 'Beginner', isPremium: true, videoUrl: "https://www.youtube.com/embed/g_tea8ZN-1Q", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-1')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-1')?.imageHint || '' },
  { id: "WK002", title: "HIIT Cardio Blast", category: "Cardio", duration: 20, level: 'Intermediate', isPremium: true, videoUrl: "https://www.youtube.com/embed/g_tea8ZN-1Q", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-2')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-2')?.imageHint || '' },
  { id: "WK003", title: "Full Body Strength", category: "Weightlifting", duration: 45, level: 'Advanced', isPremium: true, videoUrl: "https://www.youtube.com/embed/g_tea8ZN-1Q", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-3')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-3')?.imageHint || '' },
  { id: "WK004", title: "Core Sculpt Pilates", category: "Pilates", duration: 35, level: 'Intermediate', isPremium: true, videoUrl: "https://www.youtube.com/embed/g_tea8ZN-1Q", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-4')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-4')?.imageHint || '' },
  { id: "WK005", title: "Beginner's Cardio", category: "Cardio", duration: 25, level: 'Beginner', isPremium: false, videoUrl: "https://www.youtube.com/embed/g_tea8ZN-1Q", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-5')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-5')?.imageHint || '' },
  { id: "WK006", title: "Peaceful Outdoor Yoga", category: "Yoga", duration: 40, level: 'Beginner', isPremium: false, videoUrl: "https://www.youtube.com/embed/g_tea8ZN-1Q", thumbnailUrl: placeholderImages.placeholderImages.find(p => p.id === 'workout-6')?.imageUrl || '', thumbnailHint: placeholderImages.placeholderImages.find(p => p.id === 'workout-6')?.imageHint || '' },
];

// Placeholder for user subscription status. In a real app, this would come from an auth context.
const isPremiumUser = true;

export default function WorkoutDetailPage({ params }: { params: { id: string } }) {
  const workout = workouts.find(w => w.id === params.id);

  if (!workout) {
    return (
        <div className="flex min-h-screen flex-col">
            <MainHeader />
            <main className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">Workout not found</h1>
                    <p className="text-muted-foreground mt-2">Sorry, we couldn't find the workout you're looking for.</p>
                    <Button asChild className="mt-6">
                        <Link href="/workouts">Back to Workouts</Link>
                    </Button>
                </div>
            </main>
        </div>
    );
  }

  const showPremiumBlocker = workout.isPremium && !isPremiumUser;

  return (
    <div className="flex min-h-screen flex-col">
      <MainHeader />
      <main className="container py-8">
        <div className="max-w-4xl mx-auto">
            <div className="mb-4">
                <Button variant="ghost" asChild>
                    <Link href="/workouts">&larr; Back to Workouts</Link>
                </Button>
            </div>
            <div className="relative mb-6 aspect-video rounded-lg overflow-hidden bg-muted">
                {showPremiumBlocker ? (
                    <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-10">
                        <Lock className="w-16 h-16 text-primary" />
                        <h2 className="text-2xl font-bold text-white mt-4">This is a Premium Workout</h2>
                        <p className="text-muted-foreground text-white/80 mt-2">Upgrade to Premium to access this and all other exclusive content.</p>
                        <Button asChild className="mt-6" size="lg">
                            <Link href="/subscribe">
                                <Crown className="mr-2 h-5 w-5"/>
                                Go Premium
                            </Link>
                        </Button>
                    </div>
                ) : (
                    <iframe
                        className="w-full h-full"
                        src={workout.videoUrl}
                        title={workout.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>

            <div className="space-y-6">
                <div className="flex justify-between items-start">
                    <div>
                        {workout.isPremium && <Badge className="mb-2"><Crown className="w-3 h-3 mr-1" /> Premium</Badge>}
                        <h1 className="text-4xl font-bold font-headline">{workout.title}</h1>
                    </div>
                    <div className="flex items-center gap-4 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5"/>
                            <span>{workout.duration} min</span>
                        </div>
                        <div className="flex items-center gap-2">
                           <Flame className="w-5 h-5" />
                            <span>{workout.level}</span>
                        </div>
                         <div className="flex items-center gap-2">
                           <Dumbbell className="w-5 h-5" />
                            <span>{workout.category}</span>
                        </div>
                    </div>
                </div>

                <p className="text-lg text-muted-foreground">
                    This is a placeholder description for the {workout.title} workout. A more detailed explanation of the exercises, benefits, and required equipment would go here.
                </p>

                <Card>
                    <CardHeader>
                        <CardTitle>What you'll need</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside text-muted-foreground">
                            <li>Yoga Mat</li>
                            <li>Comfortable clothing</li>
                            <li>Water bottle</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}