
"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Upload, XCircle } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";

type Testimonial = {
    id: number;
    name: string;
    testimonial: string;
    thumbnailUrl: string;
    thumbnailHint: string;
    status: 'pending' | 'approved';
}

export default function TestimonialsManagementPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            const { data, error } = await supabase.from('testimonials').select('*');
            if (error) {
                console.error("Error fetching testimonials:", error);
            } else {
                setTestimonials(data as Testimonial[]);
            }
            setLoading(false);
        };
        fetchTestimonials();
    }, [supabase]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Gerenciamento de Depoimentos</h1>
                    <p className="text-muted-foreground">Aprove e gerencie os depoimentos enviados por usuários.</p>
                </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <Skeleton className="aspect-video w-full" />
                            <CardContent className="p-4">
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4" />
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    testimonials.map((testimonial) => (
                        <Card key={testimonial.id} className="overflow-hidden group">
                            <div className="relative aspect-video">
                                <Image
                                    src={testimonial.thumbnailUrl}
                                    alt={`Thumbnail for ${testimonial.name}'s testimonial`}
                                    data-ai-hint={testimonial.thumbnailHint}
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
                    ))
                )}
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
