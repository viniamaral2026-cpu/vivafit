
"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/lib/types";
import { WorkoutCard } from "@/components/content/workout-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Gem, Crown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";


const categories = ["Todos", "Cardio", "Força", "Flexibilidade", "Abdômen"];

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const supabase = createClient();

  useEffect(() => {
    const fetchWorkouts = async () => {
        setLoading(true);
        let query = supabase.from('workouts').select('*');

        const categoryMap: { [key: string]: string } = {
            "Força": "Weightlifting",
            "Flexibilidade": "Yoga",
            "Abdômen": "Pilates",
        };

        if (activeCategory !== 'Todos') {
            const supabaseCategory = categoryMap[activeCategory] || activeCategory;
            query = query.eq('category', supabaseCategory);
        }
        
        const { data, error } = await query;

        if (error) {
            console.error(error);
        } else {
            setWorkouts(data as Workout[]);
        }
        setLoading(false);
    }
    fetchWorkouts();
  }, [activeCategory, supabase]);
  

  return (
    <div className="p-4 md:p-8">
      <div className="mb-4">
        <Button variant="ghost" asChild>
            <Link href="/journal">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para o Diário
            </Link>
        </Button>
      </div>
      <div className="space-y-2 mb-6 flex justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold tracking-tight font-headline">Treinos</h1>
            <p className="text-muted-foreground">Escolha o seu desafio de hoje.</p>
        </div>
        <Button variant="outline" className="border-blue-300 text-blue-600">
            <Gem className="mr-2 h-4 w-4 text-blue-500"/>
            Acesso Premium Ativo
        </Button>
      </div>

      <div className="flex gap-2 mb-8 border-b">
        {categories.map((category) => (
            <Button 
                key={category}
                variant="ghost"
                onClick={() => setActiveCategory(category)}
                className={`rounded-none font-semibold ${activeCategory === category ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground'}`}
            >
                {category}
            </Button>
        ))}
      </div>
      
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
             <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Skeleton className="h-40 w-full" />
                <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/4 mb-4" />
                    <Skeleton className="h-10 w-full rounded-md" />
                </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {workouts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {workouts.map(workout => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          ) : (
             <div className="text-center py-16">
              <p className="text-muted-foreground">Nenhum treino encontrado para esta categoria.</p>
            </div>
          )}
        </>
      )}

        {/* Masterclass Section */}
        <div className="relative mt-16 rounded-2xl overflow-hidden shadow-2xl">
            <Image 
                src="https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610776226_122094250413204574_3447186860395560382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uAPIqEeV8rEQ7kNvwErGvdr&_nc_oc=AdmojXGFJMImfmkx-SyecWayH4RjotRlN2U24mx_OQLTNTHhL2x-t96GaeaUQEqIi7ptAqkPbyRbeUPajpDIlWkU&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=PCg1f1GLhWjb7qWO_hgemA&oh=00_AfqCpYQG4SeSckTh3mcE9f4PeHYYKV_mZ5YKBMlrTCu6Ag&oe=695ED3E7"
                alt="Mulher levantando pesos"
                data-ai-hint="woman weightlifting intense"
                width={1200}
                height={500}
                className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/10 p-8 md:p-12 flex flex-col justify-center">
                <div className="max-w-md text-white">
                     <div className="flex items-center gap-2 text-sm font-semibold mb-2">
                        <Crown className="text-yellow-400"/>
                        <span>MASTERCLASS PREMIUM</span>
                    </div>
                    <h2 className="text-4xl font-bold font-headline leading-tight">Membros de Aço: Guia Avançado de Agachamento</h2>
                    <p className="mt-4 text-white/80">Aprenda a biomecânica correta com nossos especialistas e dobre seus resultados em 30 dias.</p>
                    <div className="mt-6 flex items-center gap-4">
                        <Button className="bg-white text-black hover:bg-gray-200">
                            Começar Guia
                        </Button>
                        <div className="flex -space-x-2">
                            <Avatar className="border-2 border-black">
                                <AvatarImage src="https://i.pravatar.cc/150?u=a" />
                                <AvatarFallback>A</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-black">
                                <AvatarImage src="https://i.pravatar.cc/150?u=b" />
                                <AvatarFallback>B</AvatarFallback>
                            </Avatar>
                             <Avatar className="border-2 border-black">
                                <AvatarImage src="https://i.pravatar.cc/150?u=c" />
                                <AvatarFallback>C</AvatarFallback>
                            </Avatar>
                            <Avatar className="border-2 border-black bg-gray-600">
                                <AvatarFallback className="text-xs">+12</AvatarFallback>
                            </Avatar>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
  )
}
