
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Video, Upload } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const testimonials = [
    {
        id: 1,
        name: 'Carlos Silva',
        testimonial: '"Perdi 15kg em 3 meses! O VivaFit mudou minha vida, o acompanhamento da IA e as receitas fizeram toda a diferença."',
        thumbnailUrl: 'https://images.unsplash.com/photo-1557862921-37829c790f19?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3',
        thumbnailHint: 'happy man smiling',
    },
    {
        id: 2,
        name: 'Mariana Costa',
        testimonial: '"Finalmente encontrei treinos que eu amo fazer. A variedade é incrível e os vídeos são super fáceis de seguir."',
        thumbnailUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3',
        thumbnailHint: 'woman portrait smiling',
    },
    {
        id: 3,
        name: 'Fernanda Lima',
        testimonial: '"O plano alimentar da IA é fantástico. Adeus, dietas chatas! Agora eu como bem e ainda emagreço."',
        thumbnailUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3',
        thumbnailHint: 'woman smiling bright',
    },
];

export default function TestimonialsPage() {
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
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight font-headline">Depoimentos</h1>
                    <p className="text-muted-foreground">Veja histórias de sucesso de nossos membros.</p>
                </div>
                <Button>
                    <Upload className="mr-2 h-4 w-4" />
                    Envie seu Vídeo
                </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {testimonials.map((testimonial) => (
                    <Card key={testimonial.id} className="overflow-hidden group">
                        <div className="relative aspect-video">
                             <Image
                                src={testimonial.thumbnailUrl}
                                alt={`Thumbnail for ${testimonial.name}'s testimonial`}
                                data-ai-hint={testimonial.thumbnailHint}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <Video className="h-8 w-8 text-white/80" />
                            </div>
                        </div>
                        <CardContent className="p-4">
                            <blockquote className="italic text-muted-foreground">
                                {testimonial.testimonial}
                            </blockquote>
                            <p className="font-bold text-right mt-2">- {testimonial.name}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
