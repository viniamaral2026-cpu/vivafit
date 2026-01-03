
"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Calendar, BrainCircuit, ArrowLeft, Lock } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Article, Workout } from '@/lib/types';
import { useAuth } from '../auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';


const PremiumContent = () => {
    const [articles, setArticles] = useState<(Article & { author_avatar: string })[]>([]);
    const [masterclassWorkouts, setMasterclassWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchPremiumContent = async () => {
            setLoading(true);
            const { data: articlesData, error: articlesError } = await supabase
                .from('articles')
                .select('*')
                .eq('isPremium', true)
                .limit(2);
            
            const { data: workoutsData, error: workoutsError } = await supabase
                .from('workouts')
                .select('*')
                .eq('isPremium', true)
                .limit(4);

            if (articlesError || workoutsError) {
                console.error(articlesError || workoutsError);
            } else {
                setArticles(articlesData.map(a => ({...a, author_avatar: `https://i.pravatar.cc/150?u=${a.author}`})) as (Article & { author_avatar: string })[]);
                setMasterclassWorkouts(workoutsData as Workout[]);
            }
            setLoading(false);
        }
        fetchPremiumContent();
    }, [supabase]);
    
    if (loading) {
        return (
            <div className="space-y-12">
                 <div className="space-y-6">
                    <Skeleton className="h-8 w-1/4" />
                    <div className="grid md:grid-cols-2 gap-8">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
                <div className="space-y-6">
                    <Skeleton className="h-8 w-1/4" />
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                        <Skeleton className="h-48 w-full" />
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {/* Artigos de Especialistas */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold font-headline">Artigos de Especialistas</h2>
                  <p className="text-muted-foreground">A ciência por trás da sua transformação.</p>
                </div>
                <Button variant="link" asChild>
                  <Link href="#">Ver todos &rarr;</Link>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {articles.map((article) => (
                  <Card key={article.id} className="bg-card overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
                    <div className="grid md:grid-cols-[150px_1fr]">
                      <div className="relative h-full aspect-square md:aspect-auto">
                        <Image src={article.imageUrl} alt={article.title} data-ai-hint={article.imageHint} fill className="object-cover" />
                      </div>
                      <div className="p-6 flex flex-col">
                        <p className="text-xs font-semibold text-primary uppercase tracking-wider">{article.category}</p>
                        <h3 className="font-bold text-lg mt-1 font-headline">{article.title}</h3>
                        <p className="text-sm text-muted-foreground mt-2 flex-grow">{article.content}</p>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={article.author_avatar} alt={article.author} />
                              <AvatarFallback>{article.author.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-muted-foreground">Por: {article.author}</span>
                          </div>
                          <Link href="#" className="text-sm font-semibold text-primary hover:underline">
                            Ler artigo &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>

            {/* AI Planner & Ask the Pro */}
            <section className="grid lg:grid-cols-3 gap-8 items-start">
              <Card className="lg:col-span-2 bg-card p-8 text-center shadow-sm">
                <h3 className="text-xl font-bold flex items-center justify-center gap-2 font-headline">
                  <Calendar className="w-5 h-5" />
                  Planejador Semanal IA
                </h3>
                <div className="my-8 flex justify-center">
                  <BrainCircuit className="w-16 h-16 text-primary" />
                </div>
                <h4 className="text-lg font-semibold">Crie seu ciclo de 7 dias</h4>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto">
                  Nossa IA combina nutrição e treinos baseados no seu biotipo e rotina.
                </p>
                <Button size="lg" className="mt-8 bg-blue-600 hover:bg-blue-700">
                  Gerar Planejamento
                </Button>
              </Card>
              <Card className="bg-gradient-to-b from-blue-700 to-indigo-900 text-white p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-center font-headline">Pergunte ao Profissional</h3>
                <p className="text-center text-blue-200 mt-2 text-sm">
                  Mande sua dúvida para nossos nutricionistas e receba resposta em até 24h.
                </p>
                <div className="flex justify-center -space-x-2 my-6">
                    <Avatar className="border-2 border-indigo-800">
                        <AvatarImage src="https://i.pravatar.cc/150?u=pro1" />
                        <AvatarFallback>P1</AvatarFallback>
                    </Avatar>
                     <Avatar className="border-2 border-indigo-800">
                        <AvatarImage src="https://i.pravatar.cc/150?u=pro2" />
                        <AvatarFallback>P2</AvatarFallback>
                    </Avatar>
                     <Avatar className="border-2 border-indigo-800">
                        <AvatarImage src="https://i.pravatar.cc/150?u=pro3" />
                        <AvatarFallback>P3</AvatarFallback>
                    </Avatar>
                     <Avatar className="border-2 border-indigo-800">
                        <AvatarImage src="https://i.pravatar.cc/150?u=pro4" />
                        <AvatarFallback>P4</AvatarFallback>
                    </Avatar>
                </div>
                <Button variant="secondary" className="w-full bg-white text-blue-800 hover:bg-gray-200">
                    Enviar Pergunta
                </Button>
              </Card>
            </section>

            {/* Séries Masterclass */}
            <section>
                <h2 className="text-2xl md:text-3xl font-bold font-headline mb-6">Séries Masterclass</h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {masterclassWorkouts.map(workout => (
                        <Card key={workout.id} className="bg-card overflow-hidden group shadow-sm hover:shadow-lg transition-shadow">
                            <Link href={`/workouts/${workout.id}`}>
                                <div className="relative aspect-video">
                                    <Image src={workout.thumbnailUrl} alt={workout.title} data-ai-hint={workout.thumbnailHint} fill className="object-cover" />
                                    <div className="absolute inset-0 bg-black/30"></div>
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-bold font-headline">{workout.title}</h3>
                                    <p className="text-sm text-muted-foreground">{`${workout.duration} MIN - ${workout.level.toUpperCase()}`}</p>
                                </CardContent>
                            </Link>
                        </Card>
                    ))}
                </div>
            </section>
        </>
    )
};

const PremiumBlocker = () => (
    <div className="relative">
      <div className="blur-sm pointer-events-none">
        <PremiumContent />
      </div>
      <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center z-10 text-center p-4 rounded-lg">
          <Lock className="w-16 h-16 text-primary" />
          <h2 className="text-2xl font-bold mt-4">Desbloqueie o Conteúdo Premium</h2>
          <p className="text-muted-foreground mt-2 max-w-md">Tenha acesso a artigos, planejamentos com IA, séries Masterclass e muito mais com o plano Premium.</p>
          <Button asChild className="mt-6" size="lg">
              <Link href="/subscribe">
                  <Crown className="mr-2 h-5 w-5"/>
                  Atualize para o Premium
              </Link>
          </Button>
      </div>
    </div>
);


export default function PremiumHubPage() {
  const { isPremium, loading } = useAuth();

  if (loading) {
    return (
        <div className="space-y-12 p-8">
            <Skeleton className="h-12 w-1/3" />
            <div className="space-y-6">
                <Skeleton className="h-8 w-1/4" />
                <div className="grid md:grid-cols-2 gap-8">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
             <div className="space-y-6">
                <Skeleton className="h-8 w-1/4" />
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="bg-muted/30">
        <div className="container px-4 md:px-6 pt-6">
            <Button variant="ghost" asChild>
                <Link href="/journal">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Voltar para o Diário
                </Link>
            </Button>
        </div>
      {/* Header Section */}
      <section className="w-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white mt-4">
        <div className="container px-4 md:px-6 py-12 md:py-20">
          <div className="max-w-3xl">
            <div className="inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold mb-4">
              <Crown className="inline-block w-4 h-4 mr-2 text-yellow-400" />
              ÁREA EXCLUSIVA
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter font-headline">
              Premium Hub
            </h1>
            <p className="mt-4 text-lg md:text-xl text-blue-200">
              Conteúdos avançados e ferramentas exclusivas para acelerar seus resultados.
            </p>
          </div>
        </div>
      </section>

      <main className="container px-4 md:px-6 py-12 space-y-16">
        {isPremium ? <PremiumContent /> : <PremiumBlocker />}
      </main>
    </div>
  );
}
