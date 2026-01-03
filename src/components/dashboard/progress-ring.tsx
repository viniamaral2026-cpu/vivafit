"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const dataSteps = [{ value: 60 }, { value: 40 }] // 60% completed
const dataCardio = [{ value: 30 }, { value: 70 }] // 30% completed

const COLORS_STEPS = ["hsl(var(--primary))", "hsl(var(--muted))"]
const COLORS_CARDIO = ["hsl(var(--accent))", "hsl(var(--muted))"]

export function ProgressRing() {
  return (
    <div className="w-64 h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataSteps}
            cx="50%"
            cy="50%"
            innerRadius="80%"
            outerRadius="100%"
            startAngle={90}
            endAngle={450}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {dataSteps.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS_STEPS[index % COLORS_STEPS.length]} />
            ))}
          </Pie>
           <Pie
            data={dataCardio}
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="75%"
            startAngle={90}
            endAngle={450}
            paddingAngle={0}
            dataKey="value"
            stroke="none"
          >
            {dataCardio.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS_CARDIO[index % COLORS_CARDIO.length]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-6xl font-bold text-primary">0</div>
        <div className="text-2xl font-semibold text-accent">0</div>
      </div>
    </div>
  )
}
