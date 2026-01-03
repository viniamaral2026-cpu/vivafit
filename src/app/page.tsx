
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MainHeader } from "@/components/layout/main-header";
import placeholderImages from '@/lib/placeholder-images.json';
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Video, Bot, Watch } from "lucide-react";

export default function Home() {
  const heroImage = placeholderImages.placeholderImages.find(p => p.id === 'hero-fitness');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MainHeader />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Transforme seu corpo com <span className="text-primary">inteligência e motivação.</span>
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    O VivaFit combina IA de ponta, acompanhamento de exercícios e treinos personalizados para garantir que você alcance seus melhores resultados.
                  </p>
                </div>
                <div className="flex flex-col gap-4 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/auth">
                      Começar Gratuitamente
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#">
                      Ver Vídeo Demo
                    </Link>
                  </Button>
                </div>
              </div>
              {heroImage && (
                <div className="relative mx-auto overflow-hidden rounded-xl sm:w-full">
                  <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    data-ai-hint={heroImage.imageHint}
                    width={526}
                    height={296}
                    className="aspect-video object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-headline">Tudo o que você precisa em um só lugar</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore os pilares da sua jornada fitness.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:grid-cols-4 lg:gap-12">
              <div className="grid gap-2 text-center">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 text-green-600">
                    <BarChart className="h-6 w-6" />
                 </div>
                <h3 className="text-lg font-bold">Contador de Macros</h3>
                <p className="text-sm text-muted-foreground">Ajuste sua alimentação e bata suas metas diárias com facilidade.</p>
              </div>
              <div className="grid gap-2 text-center">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Video className="h-6 w-6" />
                 </div>
                <h3 className="text-lg font-bold">Treinos em Vídeo</h3>
                <p className="text-sm text-muted-foreground">Centenas de treinos guiados por especialistas, de acordo com seu nível.</p>
              </div>
              <div className="grid gap-2 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-purple-600">
                    <Bot className="h-6 w-6" />
                 </div>
                <h3 className="text-lg font-bold">IA Health Coach</h3>
                <p className="text-sm text-muted-foreground">Utilize a IA para otimizar os seus treinos e tirar dúvidas 24h.</p>
              </div>
               <div className="grid gap-2 text-center">
                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100 text-orange-600">
                    <Watch className="h-6 w-6" />
                 </div>
                <h3 className="text-lg font-bold">Sincronização Wearable</h3>
                <p className="text-sm text-muted-foreground">Integre seus dados de smartwatches para um acompanhamento completo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-4xl">
              <Card className="bg-gray-900 text-white rounded-3xl p-8 md:p-12 shadow-2xl" style={{background: 'linear-gradient(145deg, #182848 0%, #4b6cb7 100%)'}}>
                <CardContent className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4 text-center md:text-left">
                        <div className="inline-block rounded-lg bg-white/10 px-3 py-1 text-sm">POWERED BY VIVAFIT</div>
                        <h2 className="text-4xl font-bold tracking-tight font-headline">VivaFit Premium</h2>
                        <p className="text-gray-300">
                          Desbloqueie planos de refeição personalizados, ou IA, artigos exclusivos e Masterclasses com especialistas.
                        </p>
                    </div>
                    <div className="flex flex-col items-center gap-6">
                         <div className="text-center rounded-xl bg-black/20 p-6">
                            <div className="text-5xl font-bold">R$ 9,99<span className="text-2xl text-gray-400">/mês</span></div>
                            <p className="text-sm text-gray-400">Cancele quando quiser</p>
                        </div>
                        <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white" size="lg" asChild>
                            <Link href="/auth">Seja Premium Agora</Link>
                        </Button>
                    </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">&copy; 2024 VivaFit. Todos os direitos reservados.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/#features" className="text-xs hover:underline underline-offset-4">
            Funcionalidades
          </Link>
          <Link href="/#pricing" className="text-xs hover:underline underline-offset-4">
            Preços
          </Link>
          <Link href="/workouts" className="text-xs hover:underline underline-offset-4">
            Treinos
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Termos de Serviço
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4">
            Privacidade
          </Link>
        </nav>
      </footer>
    </div>
  );
}
