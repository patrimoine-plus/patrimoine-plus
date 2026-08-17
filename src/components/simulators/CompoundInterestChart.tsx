"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { CompoundInterestDataPoint } from "../../utils/compoundInterest";

type Props = {
  data: CompoundInterestDataPoint[];
};

export default function CompoundInterestChart({ data }: Props) {
  const chartData = data.map((d) => ({
    Année: d.annee,
    "Capital versé": Math.round(d.versements),
    Intérêts: Math.round(d.interets),
  }));

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">📈 Évolution du capital</h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
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

            <Legend />

            <Area
              type="monotone"
              dataKey="Capital versé"
              stackId="a"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="Intérêts"
              stackId="a"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}