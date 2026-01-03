"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const dataSteps = [{ value: 35 }, { value: 65 }] // 35% completed
const dataCardio = [{ value: 60 }, { value: 40 }] // 60% completed

const COLORS_STEPS = ["hsl(var(--primary))", "hsl(var(--muted))"]
const COLORS_CARDIO = ["hsl(var(--accent))", "hsl(var(--muted))"]

export function ProgressRing() {
  return (
    <div className="w-64 h-64 relative">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={dataCardio}
            cx="50%"
            cy="50%"
            innerRadius="88%"
            outerRadius="100%"
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
           <Pie
            data={dataSteps}
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="82%"
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
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-6xl font-bold text-accent">0</div>
        <div className="text-6xl font-bold text-primary mt-2">0</div>
      </div>
    </div>
  )
}
