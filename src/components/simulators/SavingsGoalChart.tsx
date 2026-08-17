"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import { SavingsGoalDataPoint } from "../../utils/savingsGoal";

type Props = {
  data: SavingsGoalDataPoint[];
  objectif: number;
};

export default function SavingsGoalChart({ data, objectif }: Props) {
  // On garde un point par an (+ le tout dernier point) pour un graphique lisible
  const yearlyPoints = data.filter((d) => d.mois % 12 === 0);
  const lastPoint = data[data.length - 1];

  if (yearlyPoints[yearlyPoints.length - 1]?.mois !== lastPoint.mois) {
    yearlyPoints.push(lastPoint);
  }

  const chartData = yearlyPoints.map((d) => ({
    Année: Math.round((d.mois / 12) * 10) / 10,
    Capital: Math.round(d.capital),
  }));

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">📈 Progression vers l&apos;objectif</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

            <XAxis dataKey="Année" stroke="#71717a" fontSize={12} />

            <YAxis
              stroke="#71717a"
              fontSize={12}
              tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
            />

            <Tooltip
              formatter={(value) => `${Number(value).toLocaleString("fr-FR")} €`}
              contentStyle={{
                backgroundColor: "#18181b",
                border: "1px solid #27272a",
                borderRadius: "12px",
                color: "#fff",
              }}
            />

            <ReferenceLine
              y={objectif}
              stroke="#22c55e"
              strokeDasharray="6 6"
              label={{
                value: "Objectif",
                fill: "#22c55e",
                fontSize: 12,
                position: "insideTopLeft",
              }}
            />

            <Line
              type="monotone"
              dataKey="Capital"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}