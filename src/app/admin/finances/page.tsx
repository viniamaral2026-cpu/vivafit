import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentPayments } from "@/components/dashboard/recent-payments";
import { DollarSign, Users, Wallet, CreditCard } from "lucide-react";

export default function FinancesPage() {
    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-2xl font-bold font-headline">Financial Overview</h1>
                <p className="text-muted-foreground">Monitor revenue, subscriptions, and payments.</p>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">
                    +20.1% from last month
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Active Subscriptions
                    </CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">
                    +180.1% from last month
                    </p>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">New Payments</CardTitle>
                    <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+12,234</div>
                    <p className="text-xs text-muted-foreground">
                    +19% from last month
                    </p>
                </CardContent>
                </Card>
                 <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                    Monthly Recurring Revenue
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$23,497.50</div>
                    <p className="text-xs text-muted-foreground">
                    Based on 2350 premium users
                    </p>
                </CardContent>
                </Card>
            </div>
             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                     <CardDescription>Monthly revenue chart.</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <OverviewChart />
                </CardContent>
                </Card>
                <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>Recent Payments</CardTitle>
                    <CardDescription>
                    You made 265 payments this month.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <RecentPayments />
                </CardContent>
                </Card>
            </div>
        </div>
    )
}
