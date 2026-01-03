
"use client";

import { useEffect, useState } from "react";
import { Workout } from "@/lib/types";
import { WorkoutCard } from "@/components/content/workout-card";
import { Skeleton } from "@/components/ui/skeleton";
import allWorkoutsData from "@/lib/firebase/seed-data/workouts.json";
import { Button } from "@/components/ui/button";
import { Gem, Crown, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


const categories = ["All", "Cardio", "Strength", "Flexibility", "Abs"];

const masterclassWorkouts: Workout[] = [
    {
        id: "hiit-express",
        title: "HIIT Express",
        category: "Cardio",
        duration: 15,
        level: "Advanced", // Corresponds to HIGH
        isPremium: false,
        videoUrl: "",
        thumbnailUrl: "https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610776226_122094250413204574_3447186860395560382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uAPIqEeV8rEQ7kNvwErGvdr&_nc_oc=AdmojXGFJMImfmkx-SyecWayH4RjotRlN2U24mx_OQLTNTHhL2x-t96GaeaUQEqIi7ptAqkPbyRbeUPajpDIlWkU&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=PCg1f1GLhWjb7qWO_hgemA&oh=00_AfqCpYQG4SeSckTh3mcE9f4PeHYYKV_mZ5YKBMlrTCu6Ag&oe=695ED3E7",
        thumbnailHint: "man lifting weights"
    },
    {
        id: "yoga-matinal",
        title: "Yoga Matinal",
        category: "Yoga", // Should be Flexibility based on image filters, but using existing category
        duration: 20,
        level: "Beginner", // Corresponds to LOW
        isPremium: false,
        videoUrl: "",
        thumbnailUrl: "https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/611263422_122094244149204574_2843972870277414775_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4USiOEABauwQ7kNvwErTUaD&_nc_oc=Adn2nzaSLXyOFRWypjUJzhF7ABC1JhV9Dzxhbaws6VINfbSSsCVMxUIOe6WwCuC2ZHxs1FyDsh--OpxzSL6-n9fN&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=atYY1D9e8SFdalYlvJn_-g&oh=00_AfpJJzkrNQMc1REJc_y9p9j2xloJkwT8jcUcmqrxSBsQ-g&oe=695EE0B0",
        thumbnailHint: "woman doing yoga sunset"
    },
     {
        id: "treino-de-forca",
        title: "Treino de Força",
        category: "Weightlifting", // Corresponds to Strength
        duration: 45,
        level: "Intermediate", // Corresponds to MEDIUM
        isPremium: true,
        videoUrl: "",
        thumbnailUrl: "https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610660601_122094250269204574_1400262102073866173_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=f6t67t3E7q4Q7kNvwFf2t9d&_nc_oc=Adg69J23_iP9w_Vvj1s12_wAUnbL6iG3Jc48l6dJ1b36k_V2m6N_Vq8yGf11mJ3-r8vY-3q1qCg4P-tI5Jk9jX5dM&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=A_V0S3C2xS-aF1lB-b1z6w&oh=00_AfrfHq9zYy-u6_xQG67h6v5mO5Z4b1t8w5tXy3mZ5oI6Ag&oe=695EDA2B",
        thumbnailHint: "gym weights rack"
    },
    {
        id: 'power-lifting-pro',
        title: 'Power Lifting Pro',
        category: 'Weightlifting',
        duration: 60,
        level: 'Advanced',
        isPremium: true,
        videoUrl: '',
        thumbnailUrl: 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610776226_122094250413204574_3447186860395560382_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uAPIqEeV8rEQ7kNvwErGvdr&_nc_oc=AdmojXGFJMImfmkx-SyecWayH4RjotRlN2U24mx_OQLTNTHhL2x-t96GaeaUQEqIi7ptAqkPbyRbeUPajpDIlWkU&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=PCg1f1GLhWjb7qWO_hgemA&oh=00_AfqCpYQG4SeSckTh3mcE9f4PeHYYKV_mZ5YKBMlrTCu6Ag&oe=695ED3E7',
        thumbnailHint: 'powerlifting person'
    },
    {
        id: 'core-avancado',
        title: 'Core Avançado',
        category: 'Pilates', // Corresponds to Abs
        duration: 25,
        level: 'Intermediate',
        isPremium: true,
        videoUrl: '',
        thumbnailUrl: 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610815124_122094249821204574_8683515086815594966_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=d4h_4g-bN8sQ7kNvwH_7_aK&_nc_oc=AdhrAfrq6nJkI4y5y6T4Gk1nJj2N_1e63SjP0g8R1uY-9U1p2p3W1o5g9X6v4o0u5Zc&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=AR52gGjV0fIaq2S1jXw2Cg&oh=00_AfB75xG7m3g8v1s2n9f5q4f6Y5k2w2N7V9x6x7Y6j3z_ZQ&oe=695ED7F7',
        thumbnailHint: 'person doing crunches'
    }
];

export default function WorkoutsPage() {
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
        setLoading(false);
    }, 500);
  }, []);
  
  const categoryMap: { [key: string]: string } = {
    "All": "all",
    "Cardio": "Cardio",
    "Strength": "Weightlifting",
    "Flexibility": "Yoga",
    "Abs": "Pilates",
  };

  const filteredWorkouts = masterclassWorkouts.filter(workout => {
    if (activeCategory === 'All') return true;
    return workout.category === categoryMap[activeCategory];
  });

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
          {filteredWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkouts.map(workout => (
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
                alt="Woman lifting weights"
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
