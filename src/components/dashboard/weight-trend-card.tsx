
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

const dayData = [
  { name: '10h', peso: 75.2 },
  { name: '12h', peso: 75.4 },
  { name: '14h', peso: 75.3 },
  { name: '16h', peso: 75.5 },
  { name: '18h', peso: 75.6 },
];

const weekData = [
  { name: 'Seg', peso: 75.8 },
  { name: 'Ter', peso: 75.5 },
  { name: 'Qua', peso: 75.6 },
  { name: 'Qui', peso: 75.2 },
  { name: 'Sex', peso: 75.1 },
  { name: 'Sáb', peso: 75.3 },
  { name: 'Dom', peso: 75.0 },
];

const monthData = [
    { name: 'Sem 1', peso: 76.5 },
    { name: 'Sem 2', peso: 76.1 },
    { name: 'Sem 3', peso: 75.8 },
    { name: 'Sem 4', peso: 75.0 },
];

const yearData = [
    { name: 'Jan', peso: 78 },
    { name: 'Fev', peso: 77 },
    { name: 'Mar', peso: 76 },
    { name: 'Abr', peso: 76.5 },
    { name: 'Mai', peso: 75.5 },
    { name: 'Jun', peso: 75 },
]

const Chart = ({ data }: { data: any[] }) => (
    <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={['dataMin - 1', 'dataMax + 1']} tickFormatter={(value) => `${value}kg`} />
            <Tooltip
                contentStyle={{
                    backgroundColor: 'hsl(var(--background))',
                    borderColor: 'hsl(var(--border))',
                    borderRadius: 'var(--radius)'
                }}
                cursor={{ fill: 'hsla(var(--accent) / 0.1)' }}
             />
            <Bar dataKey="peso" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
    </ResponsiveContainer>
);

export function WeightTrendCard() {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Tendência de peso</CardTitle>
        <CardDescription>75,0 kg | Últimos 7 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="week" className="w-full">
          <TabsList className="grid w-full grid-cols-4 h-auto">
            <TabsTrigger value="day">DIA</TabsTrigger>
            <TabsTrigger value="week">SEM</TabsTrigger>
            <TabsTrigger value="month">MÊS</TabsTrigger>
            <TabsTrigger value="year">ANO</TabsTrigger>
          </TabsList>
          <TabsContent value="day" className="mt-4">
            <Chart data={dayData} />
          </TabsContent>
          <TabsContent value="week" className="mt-4">
             <Chart data={weekData} />
          </TabsContent>
          <TabsContent value="month" className="mt-4">
             <Chart data={monthData} />
          </TabsContent>
          <TabsContent value="year" className="mt-4">
             <Chart data={yearData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
