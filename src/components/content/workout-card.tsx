import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workout } from "@/lib/types";
import { Crown, PlayCircle } from "lucide-react";
import { Button } from "../ui/button";

const levelMap: { [key: string]: { text: string; color: string } } = {
  Beginner: { text: "BAIXO", color: "bg-green-500" },
  Intermediate: { text: "MÉDIO", color: "bg-orange-500" },
  Advanced: { text: "ALTO", color: "bg-red-500" },
};

export function WorkoutCard({ workout }: { workout: Workout }) {
  const levelInfo = levelMap[workout.level];

  const categoryTranslations: { [key: string]: string } = {
    Weightlifting: "Força",
    Cardio: "Cardio",
    Yoga: "Flexibilidade",
    Pilates: "Abdômen"
  }

  return (
    <Card className="overflow-hidden transition-all hover:shadow-xl group bg-background rounded-lg">
      <Link href={`/workouts/${workout.id}`}>
        <div className="relative">
          <Image
            src={workout.thumbnailUrl}
            alt={workout.title}
            data-ai-hint={workout.thumbnailHint}
            width={600}
            height={400}
            className="aspect-[4/3] w-full object-cover"
          />
           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute top-2 left-2 flex flex-col gap-1">
             {levelInfo && (
                <Badge variant="default" className={`border-none text-white ${levelInfo.color}`}>
                    {levelInfo.text}
                </Badge>
             )}
            {workout.isPremium && (
                <Badge variant="default" className="bg-blue-600 border-none text-white">
                    <Crown className="h-3 w-3 mr-1" />
                    PREMIUM
                </Badge>
            )}
           </div>
           <div className="absolute top-2 right-2 bg-black/50 text-white text-xs font-semibold px-2 py-1 rounded-full">
                {workout.duration} min
           </div>
        </div>
      </Link>
      <CardContent className="p-4 space-y-3">
         <div>
            <h3 className="font-bold text-lg">{workout.title}</h3>
            <p className="text-sm text-muted-foreground">{categoryTranslations[workout.category] || workout.category}</p>
         </div>
         <Button className={`w-full ${workout.isPremium ? 'bg-blue-600 hover:bg-blue-700' : 'bg-primary hover:bg-primary/90'}`}>
            {workout.isPremium ? "Ver Vídeo Guia" : "Iniciar Treino"}
         </Button>
      </CardContent>
    </Card>
  );
}
