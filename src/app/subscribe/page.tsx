import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, CreditCard, Dumbbell } from "lucide-react";

export default function SubscribePage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
             <div className="absolute top-4 left-4">
                <Button variant="ghost" asChild>
                    <Link href="/">
                    &larr; Back to Home
                    </Link>
                </Button>
             </div>
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader className="text-center">
                    <Dumbbell className="mx-auto h-10 w-10 text-primary" />
                    <CardTitle className="text-2xl font-headline mt-4">Go Premium</CardTitle>
                    <CardDescription>
                        Complete your purchase to unlock all features.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="rounded-lg border bg-secondary/50 p-4">
                        <div className="flex justify-between items-center">
                            <h4 className="font-semibold">Premium Monthly</h4>
                            <div className="text-xl font-bold">$12.00</div>
                        </div>
                        <p className="text-sm text-muted-foreground">Billed monthly.</p>
                    </div>
                    <ul className="grid gap-2 text-sm text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Unlimited premium workouts</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Personalized plans</li>
                        <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Ad-free experience</li>
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg">
                        <CreditCard className="mr-2 h-5 w-5"/>
                        Pay with Pagseguro
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
