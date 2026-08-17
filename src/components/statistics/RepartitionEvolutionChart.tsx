"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Snapshot } from "../../types/snapshot";

type Props = {
  snapshots: Snapshot[];
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });

export default function RepartitionEvolutionChart({ snapshots }: Props) {
  const data = snapshots.map((s) => ({
    date: formatDate(s.date),
    Épargne: s.totalEpargne,
    Investissement: s.totalInvestissementCompte,
    Liquidités: s.totalLiquidites,
    Immobilier: s.totalImmobilier,
  }));

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">📊 Évolution par catégorie</h2>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

            <XAxis dataKey="date" stroke="#71717a" fontSize={12} />

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

            <Line
              type="monotone"
              dataKey="Épargne"
              stroke="#0ea5e9"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Investissement"
              stroke="#8b5cf6"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Liquidités"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
            <Line
              type="monotone"
              dataKey="Immobilier"
              stroke="#f97316"
              strokeWidth={2}
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}