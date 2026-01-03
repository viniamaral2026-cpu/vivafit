
"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, Share2, MoreVertical, Heart, Footprints, Clock, MapPin, Flame, PersonStanding } from "lucide-react";
import { format } from 'date-fns';

const SummaryItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string }) => (
    <div className="flex justify-between items-center py-4">
        <div className="flex items-center gap-4">
            <Icon className="h-6 w-6 text-muted-foreground" />
            <span className="text-base font-medium">{label}</span>
        </div>
        <span className="text-base font-semibold">{value}</span>
    </div>
);

export default function ActivitySummaryPage() {
    const router = useRouter();
    const now = new Date();
    const startTime = new Date(now.getTime() - (1 * 60 * 1000 + 21 * 1000)); // 1m 21s ago
    const formattedDate = format(startTime, "d 'de' MMMM");
    const formattedTimeRange = `${format(startTime, "HH:mm")} – ${format(now, "HH:mm")}`;

    // Mock data from the image
    const activityData = {
        time: "1 m 21 s",
        distance: "0 km",
        energy: "11 cal",
        moveMinutes: "0",
        heartPoints: "0",
        steps: "0"
    };

    return (
        <div className="flex flex-col min-h-screen bg-background">
            {/* Header */}
            <header className="flex items-center justify-between p-4 border-b">
                <Button variant="ghost" size="icon" onClick={() => router.push('/dashboard')}>
                    <ArrowLeft className="h-6 w-6" />
                </Button>
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                        <Edit className="h-6 w-6" />
                    </Button>
                     <Button variant="ghost" size="icon">
                        <Share2 className="h-6 w-6" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <MoreVertical className="h-6 w-6" />
                    </Button>
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 px-6 py-4">
                <h1 className="text-3xl font-bold mb-1">Caminhada à tarde</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <PersonStanding className="h-4 w-4" />
                    <span>{formattedDate} {formattedTimeRange}</span>
                </div>
                
                 <div className="flex items-center gap-8 text-sm font-medium my-6">
                    <div className="flex items-center gap-2 text-accent">
                        <Heart className="w-5 h-5 fill-current text-cyan-500" />
                        <span className="text-2xl font-bold">{activityData.heartPoints}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary">
                        <Footprints className="w-5 h-5 fill-current text-green-500" />
                        <span className="text-2xl font-bold">{activityData.steps}</span>
                    </div>
                </div>

                <Separator />
                <SummaryItem icon={Clock} label="Tempo da atividade" value={activityData.time} />
                <Separator />
                <SummaryItem icon={MapPin} label="Distância" value={activityData.distance} />
                <Separator />
                <SummaryItem icon={Flame} label="Gasto de energia" value={activityData.energy} />
                <Separator />
                <SummaryItem icon={PersonStanding} label="Minutos em movimento" value={activityData.moveMinutes} />
                <Separator />
            </main>
        </div>
    );
}

    