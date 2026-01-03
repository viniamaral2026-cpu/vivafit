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
    { title: "Manage Users", icon: Users, href: "/admin/users", description: "View and edit user profiles." },
    { title: "Manage Workouts", icon: Video, href: "/admin/content/workouts", description: "Add or update workout videos." },
    { title: "Manage Recipes", icon: Utensils, href: "/admin/content/recipes", description: "Create and publish new recipes." },
    { title: "Manage Articles", icon: Newspaper, href: "/admin/content/articles", description: "Write and manage posts." },
    { title: "Manage Ads", icon: Megaphone, href: "/admin/ads", description: "Control ad placements." },
    { title: "Manage Testimonials", icon: Clapperboard, href: "/admin/content/testimonials", description: "Approve and feature testimonials." },
  ]
  return (
    <div className="space-y-6">
       <div className="flex justify-between items-start">
         <div>
            <h1 className="text-3xl font-bold font-headline">Admin Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's a summary of your app.</p>
         </div>
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
              Premium Content
            </CardTitle>
            <Video className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">
              +21 since last hour
            </p>
          </CardContent>
        </Card>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Navigate to key management areas.</CardDescription>
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
            <CardTitle>Revenue Overview</CardTitle>
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
  );
}
