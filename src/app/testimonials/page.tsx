
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Video, Upload } from "lucide-react";
import Link from "next/link";
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
};

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchTestimonials = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('testimonials')
                .select('*');

            if (error) {
                console.error("Error fetching testimonials", error);
            } else {
                setTestimonials(data as Testimonial[]);
            }
            setLoading(false);
        };
        fetchTestimonials();
    }, [supabase]);


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
            
            {loading ? (
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({length: 3}).map((_, i) => (
                        <Card key={i} className="overflow-hidden">
                            <Skeleton className="aspect-video w-full" />
                            <CardContent className="p-4">
                                <Skeleton className="h-4 w-full mb-2" />
                                <Skeleton className="h-4 w-3/4 mb-4" />
                                <Skeleton className="h-4 w-1/3 ml-auto" />
                            </CardContent>
                        </Card>
                    ))}
                 </div>
            ) : (
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
            )}
        </div>
    );
}
