import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Workout } from "@/lib/types";
import { Crown, PlayCircle } from "lucide-react";

export function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg group">
      <Link href={`/workouts/${workout.id}`}>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <Image
            src={workout.thumbnailUrl}
            alt={workout.title}
            data-ai-hint={workout.thumbnailHint}
            width={600}
            height={400}
            className="aspect-video w-full object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            {workout.isPremium && (
                <Badge variant="default" className="bg-primary/80 backdrop-blur-sm">
                    <Crown className="h-3 w-3 mr-1" />
                    Premium
                </Badge>
            )}
           </div>
           <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{workout.title}</h3>
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 transition-opacity group-hover:opacity-100">
                <PlayCircle className="h-16 w-16 text-white/80" />
           </div>
        </div>
      </Link>
      <CardContent className="p-4">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
            <Badge variant="outline">{workout.category}</Badge>
            <span>{workout.duration} min</span>
            <Badge variant="secondary">{workout.level}</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
