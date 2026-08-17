"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AssetType, Investment } from "../../types/investment";

type Props = {
  investments: Investment[];
};

const ASSET_COLORS: Record<AssetType, string> = {
  ETF: "#0ea5e9",
  Action: "#8b5cf6",
  Obligation: "#22c55e",
  Autre: "#f97316",
};

const ASSET_TYPES: AssetType[] = ["ETF", "Action", "Obligation", "Autre"];

export default function InvestmentChart({ investments }: Props) {
  const valeurTotale = investments.reduce(
    (sum, i) => sum + i.valeurActuelle,
    0
  );

  const data = ASSET_TYPES.map((assetType) => ({
    name: assetType,
    value: investments
      .filter((i) => i.assetType === assetType)
      .reduce((sum, i) => sum + i.valeurActuelle, 0),
    color: ASSET_COLORS[assetType],
  })).filter((entry) => entry.value > 0);

  if (data.length === 0) {
    return (
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
        <h2 className="text-2xl font-bold mb-6">
          📊 Répartition du portefeuille
        </h2>

        <p className="text-zinc-500 text-center py-12">
          Ajoute un investissement pour voir la répartition de ton
          portefeuille.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold">📊 Répartition du portefeuille</h2>

      <div className="mt-8 flex flex-col items-center justify-center">
        <div className="relative w-64 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={3}
                stroke="none"
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toLocaleString("fr-FR")} €`,
                  "Valeur",
                ]}
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-zinc-500 text-sm">Total</span>
            <span className="text-xl font-bold">
              {valeurTotale.toLocaleString("fr-FR")} €
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10 w-full">
          {data.map((entry) => {
            const percentage = (
              (entry.value / valeurTotale) *
              100
            ).toFixed(0);

            return (
              <div key={entry.name} className="flex items-center gap-3">
                <div
                  className="w-4 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: entry.color }}
                ></div>

                <div>
                  <p className="text-sm">{entry.name}</p>
                  <p className="text-zinc-500 text-xs">
                    {entry.value.toLocaleString("fr-FR")} € · {percentage}%
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}