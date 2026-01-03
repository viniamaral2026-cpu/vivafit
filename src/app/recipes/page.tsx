
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BrainCircuit, Plus, Coffee, Sun, Moon, ArrowLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const MealCard = ({ title, content }: { title: string, content: string }) => (
    <div className="bg-muted/50 p-4 rounded-lg">
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
        <p className="text-sm mt-1">{content}</p>
    </div>
);

const MacroCircle = ({ value, goal, label, color }: { value: number, goal: number, label: string, color: string }) => (
    <Card className="flex-1 text-center p-4 shadow-sm">
        <div className="relative w-24 h-24 mx-auto">
            <svg className="w-full h-full" viewBox="0 0 36 36">
                <path
                    className="text-muted/40"
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                />
                <path
                    className={color}
                    strokeDasharray={`${(value / goal) * 100}, 100`}
                    d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                 <span className="text-2xl font-bold">{value}g</span>
            </div>
        </div>
        <p className="mt-2 text-sm font-semibold">{label}</p>
        <p className="text-xs text-muted-foreground">Meta: {goal}g</p>
    </Card>
);

const FoodItem = ({ name, protein, carbs, fat, calories }: { name: string, protein: number, carbs: number, fat: number, calories: number }) => (
    <div className="flex justify-between items-center py-3 border-b border-border/60">
        <div>
            <p className="font-semibold">{name}</p>
            <p className="text-xs text-muted-foreground">P: {protein}g | C: {carbs}g | G: {fat}g</p>
        </div>
        <p className="font-medium">{calories} cal</p>
    </div>
);


export default function RecipesPage() {

    return (
        <div className="p-4 md:p-8 bg-muted/20 min-h-screen">
            <div className="max-w-4xl mx-auto">
                <div className="mb-4">
                    <Button variant="ghost" asChild>
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Voltar para a Home
                        </Link>
                    </Button>
                </div>
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight font-headline">Alimentação</h1>
                        <p className="text-muted-foreground">Mantenha o foco nos seus macros.</p>
                    </div>
                    <div className="flex gap-2">
                         <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                            <BrainCircuit className="mr-2 h-4 w-4"/>
                            Plano IA Premium
                        </Button>
                         <Button className="bg-primary hover:bg-primary/90">
                            <Plus className="mr-2 h-4 w-4"/>
                            Adicionar
                        </Button>
                    </div>
                </div>

                {/* Sugestão IA */}
                <Card className="mb-8 shadow-md">
                    <CardHeader>
                        <h3 className="text-lg font-bold flex items-center gap-2"><BrainCircuit className="text-primary"/> Sugestão IA Personalizada</h3>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-4 gap-4">
                            <MealCard title="Café" content="Omelete de 3 ovos com espinafre e queijo feta, servido com uma fatia de pão integral torrado e meia xícara de mirtilos." />
                            <MealCard title="Almoço" content="Peito de frango grelhado (150g) com 150g de arroz integral, 100g de feijão preto e uma salada grande de folhas verdes com tomate e pepino temperada com 1 colher de sopa de azeite." />
                            <MealCard title="Jantar" content="Filé de salmão assado (150g) com 200g de batata-doce assada e uma porção generosa de aspargos ou brócolis ao vapor." />
                            <MealCard title="Lanches" content="Uma maçã média com 2 colheres de sopa de manteiga de amendoim e um iogurte grego natural (170g) com um punhado de nozes." />
                        </div>
                        <div className="text-center text-sm font-semibold text-muted-foreground pt-4 border-t">
                            RESUMO ESTIMADO: Calorias: 2200 kcal | Proteína: 165g | Carboidratos: 210g | Gorduras: 78g
                        </div>
                    </CardContent>
                </Card>
                
                {/* Resumo Macros */}
                <div className="flex gap-4 md:gap-8 mb-8">
                   <MacroCircle value={70} goal={110} label="PROTEÍNAS" color="text-sky-500" />
                   <MacroCircle value={120} goal={200} label="CARBOS" color="text-orange-500" />
                   <MacroCircle value={35} goal={60} label="GORDURAS" color="text-yellow-500" />
                </div>
                
                {/* Diário de Refeições */}
                <Accordion type="single" collapsible defaultValue="item-1" className="space-y-4">
                    <AccordionItem value="item-1" className="bg-card rounded-xl border shadow-sm">
                        <AccordionTrigger className="px-6 py-4 font-bold text-lg hover:no-underline">
                            <div className="flex items-center gap-3">
                               <div className="w-1.5 h-8 bg-yellow-400 rounded-full"></div>
                               <Coffee className="w-5 h-5"/>
                               <span>Café da Manhã</span>
                            </div>
                             <span className="text-base font-medium text-muted-foreground mr-4">260 kcal</span>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6">
                            <FoodItem name="Ovo cozido" protein={13} carbs={1} fat={10} calories={140} />
                            <FoodItem name="Pão Integral" protein={4} carbs={22} fat={2} calories={120} />
                             <Button variant="outline" className="w-full mt-4">
                                <Plus className="mr-2 h-4 w-4"/>
                                Adicionar Alimento
                            </Button>
                        </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="bg-card rounded-xl border shadow-sm">
                        <AccordionTrigger className="px-6 py-4 font-bold text-lg hover:no-underline">
                             <div className="flex items-center gap-3">
                               <div className="w-1.5 h-8 bg-green-500 rounded-full"></div>
                               <Sun className="w-5 h-5"/>
                               <span>Almoço</span>
                            </div>
                             <Button variant="ghost" size="sm" className="mr-4"><Plus className="mr-1 h-4 w-4" /> Adicionar</Button>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 text-center text-muted-foreground">
                            Nenhum alimento registrado para o almoço ainda.
                            <Button variant="outline" className="w-full mt-4">
                                <Plus className="mr-2 h-4 w-4"/>
                                Adicionar Alimento
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                    
                    <AccordionItem value="item-3" className="bg-card rounded-xl border shadow-sm">
                        <AccordionTrigger className="px-6 py-4 font-bold text-lg hover:no-underline">
                             <div className="flex items-center gap-3">
                               <div className="w-1.5 h-8 bg-indigo-500 rounded-full"></div>
                               <Moon className="w-5 h-5"/>
                               <span>Jantar</span>
                            </div>
                             <Button variant="ghost" size="sm" className="mr-4"><Plus className="mr-1 h-4 w-4" /> Adicionar</Button>
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-6 text-center text-muted-foreground">
                            Nenhum alimento registrado para o jantar ainda.
                             <Button variant="outline" className="w-full mt-4">
                                <Plus className="mr-2 h-4 w-4"/>
                                Adicionar Alimento
                            </Button>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    );
}
