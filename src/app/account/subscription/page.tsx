import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown } from "lucide-react";

export default function SubscriptionPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Subscription</h1>
                <p className="text-muted-foreground">Manage your billing and subscription plan.</p>
            </div>

            <Card className="border-primary border-2">
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Current Plan</CardTitle>
                        <CardDescription>You are on the Premium Monthly plan.</CardDescription>
                    </div>
                    <Crown className="w-10 h-10 text-primary"/>
                </CardHeader>
                <CardContent>
                     <div className="space-y-4">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-4xl font-bold">$12</span>
                            <span className="text-xl text-muted-foreground">/month</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Your subscription will auto-renew on July 30, 2024.</p>
                        <ul className="grid gap-2 text-left text-sm">
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Unlimited premium workouts</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Personalized plans</li>
                            <li className="flex items-center gap-2"><CheckCircle className="h-4 w-4 text-primary" /> Ad-free experience</li>
                        </ul>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                    <Button variant="outline">Update Payment Method</Button>
                    <Button variant="destructive">Cancel Subscription</Button>
                </CardFooter>
            </Card>
        </div>
    );
}
