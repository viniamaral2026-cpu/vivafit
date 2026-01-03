import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { List, Watch } from "lucide-react";

export default function AccountSettingsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold font-headline">Settings</h1>
                <p className="text-muted-foreground">Manage your account and device settings.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Connected Devices</CardTitle>
                    <CardDescription>Sync your activity from your wearable devices.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <div className="flex items-center gap-4">
                            <Watch className="w-8 h-8" />
                            <div>
                                <h3 className="font-semibold">Smartwatch</h3>
                                <p className="text-sm text-muted-foreground">Not connected</p>
                            </div>
                        </div>
                        <Button variant="outline">Connect</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Manage how you receive notifications from VivaFit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="workout-reminders">Workout Reminders</Label>
                        <Switch id="workout-reminders" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                        <Label htmlFor="meal-logging">Meal Logging Alerts</Label>
                        <Switch id="meal-logging" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between">
                        <Label htmlFor="weekly-summary">Weekly Progress Summary</Label>
                        <Switch id="weekly-summary" />
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}