"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
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

export default function PortfolioEvolutionChart({ snapshots }: Props) {
  const data = snapshots.map((s) => ({
    date: formatDate(s.date),
    Portefeuille: s.valeurPortefeuille,
  }));

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">
        💼 Évolution du portefeuille d&apos;investissements
      </h2>

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

            <Line
              type="monotone"
              dataKey="Portefeuille"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}