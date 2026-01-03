import { Button } from "@/components/ui/button";
import { CheckCircle, Upload, XCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: 'Carlos Silva',
        testimonial: '"Perdi 15kg em 3 meses! O VivaFit mudou minha vida, o acompanhamento da IA e as receitas fizeram toda a diferença."',
        thumbnailUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
        status: 'pending'
    },
    {
        id: 2,
        name: 'Mariana Costa',
        testimonial: '"Finalmente encontrei treinos que eu amo fazer. A variedade é incrível e os vídeos são super fáceis de seguir."',
        thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
        status: 'approved'
    },
];

export default function TestimonialsManagementPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Gerenciamento de Depoimentos</h1>
                    <p className="text-muted-foreground">Aprove e gerencie os depoimentos enviados por usuários.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="overflow-hidden group">
                        <div className="relative aspect-video">
                             <Image
                                src={testimonial.thumbnailUrl}
                                alt={`Thumbnail for ${testimonial.name}'s testimonial`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                {testimonial.status === 'approved' ? (
                                    <span className="text-xs font-bold uppercase text-green-300">Aprovado</span>
                                ) : (
                                    <span className="text-xs font-bold uppercase text-yellow-300">Aprovação Pendente</span>
                                )}
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <blockquote className="italic text-muted-foreground text-sm">
                                {testimonial.testimonial}
                            </blockquote>
                            <p className="font-bold text-right mt-2">- {testimonial.name}</p>
                        </CardContent>
                        {testimonial.status === 'pending' && (
                             <CardFooter className="flex gap-2 bg-muted/50 p-2">
                                <Button size="sm" className="w-full">
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Aprovar
                                </Button>
                                <Button size="sm" variant="destructive" className="w-full">
                                    <XCircle className="h-4 w-4 mr-2" />
                                    Rejeitar
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                ))}
                 <Card className="flex flex-col items-center justify-center border-2 border-dashed h-full">
                    <CardContent className="text-center p-6">
                        <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                        <h3 className="font-semibold">Enviar um Depoimento</h3>
                        <p className="text-sm text-muted-foreground">Tem uma história de sucesso? Adicione aqui para ser destaque.</p>
                        <Button size="sm" className="mt-4">Adicionar Manualmente</Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
