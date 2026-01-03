import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Crown, Calendar, BrainCircuit } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Article, Workout } from '@/lib/types';

// Mock data based on the image
const articles: (Article & { author_avatar: string })[] = [
  {
    id: 'jejum-intermitente',
    title: 'O Segredo do Jejum Intermitente',
    author: 'Dra. Luiza Mello',
    author_avatar: 'https://i.pravatar.cc/150?u=luiza-mello',
    publishedAt: '2024-07-30',
    isPremium: true,
    imageUrl: 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610660601_122094250269204574_1400262102073866173_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=127cfc&_nc_ohc=f6t67t3E7q4Q7kNvwFf2t9d&_nc_oc=Adg69J23_iP9w_Vvj1s12_wAUnbL6iG3Jc48l6dJ1b36k_V2m6N_Vq8yGf11mJ3-r8vY-3q1qCg4P-tI5Jk9jX5dM&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=A_V0S3C2xS-aF1lB-b1z6w&oh=00_AfrfHq9zYy-u6_xQG67h6v5mO5Z4b1t8w5tXy3mZ5oI6Ag&oe=695EDA2B',
    imageHint: 'healthy food bowl',
    content: 'Descubra como o tempo de alimentação afeta seu metabolism...',
    category: 'NUTRIÇÃO',
  },
  {
    id: 'mindfulness-performance',
    title: 'Mindfulness para Performance',
    author: 'Coach Rick',
    author_avatar: 'https://i.pravatar.cc/150?u=coach-rick',
    publishedAt: '2024-07-29',
    isPremium: true,
    imageUrl: 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/611263422_122094244149204574_2843972870277414775_n.jpg?stp=dst-jpg_p526x296_tt6&_nc_cat=105&ccb=1-7&_nc_sid=127cfc&_nc_ohc=4USiOEABauwQ7kNvwErTUaD&_nc_oc=Adn2nzaSLXyOFRWypjUJzhF7ABC1JhV9Dzxhbaws6VINfbSSsCVMxUIOe6WwCuC2ZHxs1FyDsh--OpxzSL6-n9fN&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=atYY1D9e8SFdalYlvJn_-g&oh=00_AfpJJzkrNQMc1REJc_y9p9j2xloJkwT8jcUcmqrxSBsQ-g&oe=695EE0B0',
    imageHint: 'meditation sunset',
    content: 'Técnicas de respiração para manter o foco durante treinos de alta...',
    category: 'MENTAL',
  },
];

const masterclassWorkouts: Workout[] = [
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
        category: 'Cardio',
        duration: 25,
        level: 'Intermediate',
        isPremium: true,
        videoUrl: '',
        thumbnailUrl: 'https://scontent.fpoa13-1.fna.fbcdn.net/v/t39.30808-6/610815124_122094249821204574_8683515086815594966_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=d4h_4g-bN8sQ7kNvwH_7_aK&_nc_oc=AdhrAfrq6nJkI4y5y6T4Gk1nJj2N_1e63SjP0g8R1uY-9U1p2p3W1o5g9X6v4o0u5Zc&_nc_zt=23&_nc_ht=scontent.fpoa13-1.fna&_nc_gid=AR52gGjV0fIaq2S1jXw2Cg&oh=00_AfB75xG7m3g8v1s2n9f5q4f6Y5k2w2N7V9x6x7Y6j3z_ZQ&oe=695ED7F7',
        thumbnailHint: 'person doing crunches'
    }
];

export default function PremiumHubPage() {
  return (
    <div className="bg-muted/30">
      {/* Header Section */}
      <section className="w-full bg-gradient-to-br from-blue-700 to-indigo-800 text-white">
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
            <h3 className="text-2xl font-bold text-center font-headline">Ask the Pro</h3>
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
                        <Link href="#">
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
      </main>
    </div>
  );
}
