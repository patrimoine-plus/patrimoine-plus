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
import { InflationDataPoint } from "../../utils/inflation";

type Props = {
  data: InflationDataPoint[];
};

export default function InflationChart({ data }: Props) {
  const chartData = data.map((d) => ({
    Année: d.annee,
    "Pouvoir d'achat": Math.round(d.pouvoirAchat),
  }));

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">
        📉 Érosion du pouvoir d&apos;achat
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />

            <XAxis dataKey="Année" stroke="#71717a" fontSize={12} />

            <YAxis stroke="#71717a" fontSize={12} />

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
              dataKey="Pouvoir d'achat"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}