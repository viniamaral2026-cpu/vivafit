"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const COLORS_STEPS = ["hsl(var(--primary))", "hsl(var(--muted))"]
const COLORS_CARDIO = ["hsl(var(--accent))", "hsl(var(--muted))"]

type ProgressRingProps = {
  steps: number;
  stepGoal: number;
  cardioPoints: number;
  cardioGoal: number;
}

export function ProgressRing({ steps, stepGoal, cardioPoints, cardioGoal }: ProgressRingProps) {
  const stepsPercentage = stepGoal > 0 ? (steps / stepGoal) * 100 : 0;
  const cardioPercentage = cardioGoal > 0 ? (cardioPoints / cardioGoal) * 100 : 0;

  const dataSteps = [{ value: stepsPercentage }, { value: 100 - stepsPercentage }]
  const dataCardio = [{ value: cardioPercentage }, { value: 100 - cardioPercentage }]


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
        <div className="text-6xl font-bold text-accent">{cardioPoints}</div>
        <div className="text-6xl font-bold text-primary mt-2">{steps}</div>
      </div>
    </div>
  )
}
