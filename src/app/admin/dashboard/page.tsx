import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, Video, Wallet, Newspaper, Utensils, Clapperboard, Megaphone } from "lucide-react";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentPayments } from "@/components/dashboard/recent-payments";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const shortcutCards = [
    { title: "Gerenciar Usuários", icon: Users, href: "/admin/users", description: "Ver e editar perfis de usuários." },
    { title: "Gerenciar Treinos", icon: Video, href: "/admin/content/workouts", description: "Adicionar ou atualizar vídeos de treino." },
    { title: "Gerenciar Receitas", icon: Utensils, href: "/admin/content/recipes", description: "Criar e publicar novas receitas." },
    { title: "Gerenciar Artigos", icon: Newspaper, href: "/admin/content/articles", description: "Escrever e gerenciar postagens." },
    { title: "Gerenciar Anúncios", icon: Megaphone, href: "/admin/ads", description: "Controlar posicionamentos de anúncios." },
    { title: "Gerenciar Depoimentos", icon: Clapperboard, href: "/admin/content/testimonials", description: "Aprovar e destacar depoimentos." },
  ]
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start">
         <div>
            <h1 className="text-3xl font-bold font-headline">Painel do Administrador</h1>
            <p className="text-muted-foreground">Bem-vindo de volta! Aqui está um resumo do seu aplicativo.</p>
         </div>
       </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45.231,89</div>
            <p className="text-xs text-muted-foreground">
              +20.1% do último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Assinaturas Ativas
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% do último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Pagamentos</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12.234</div>
            <p className="text-xs text-muted-foreground">
              +19% do último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Conteúdo Premium
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +21 desde a última hora
            </p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Navegue para as principais áreas de gerenciamento.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {shortcutCards.map(card => (
                 <Link href={card.href} key={card.href} className="block p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                    <card.icon className="h-6 w-6 mb-2 text-primary" />
                    <h3 className="font-semibold">{card.title}</h3>
                    <p className="text-sm text-muted-foreground">{card.description}</p>
                 </Link>
            ))}
        </CardContent>
       </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Visão Geral da Receita</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Pagamentos Recentes</CardTitle>
            <CardDescription>
              Você fez 265 pagamentos este mês.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentPayments />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
