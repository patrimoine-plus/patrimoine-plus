"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Account, Category } from "../../types/account";

type Props = {
  accounts: Account[];
};

const CATEGORY_COLORS: Record<Category, string> = {
  Épargne: "#0ea5e9",
  Investissement: "#8b5cf6",
  Liquidités: "#22c55e",
  Immobilier: "#f97316",
};

const CATEGORIES: Category[] = [
  "Épargne",
  "Investissement",
  "Liquidités",
  "Immobilier",
];

export default function PortfolioChart({ accounts }: Props) {
  const totalPatrimoine = accounts.reduce(
    (sum, account) => sum + account.amount,
    0
  );

  const data = CATEGORIES.map((category) => ({
    name: category,
    value: accounts
      .filter((account) => account.category === category)
      .reduce((sum, account) => sum + account.amount, 0),
    color: CATEGORY_COLORS[category],
  })).filter((entry) => entry.value > 0);

  if (data.length === 0) {
    return (
      <div id="repartition" className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8 scroll-mt-8">
        <h2 className="text-2xl font-bold mb-6">
          📊 Répartition du patrimoine
        </h2>

        <p className="text-zinc-500 text-center py-12">
          Ajoute un compte pour voir la répartition de ton patrimoine.
        </p>
      </div>
    );
  }

  return (
    <div id="repartition" className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8 scroll-mt-8">
      <h2 className="text-2xl font-bold">📊 Répartition du patrimoine</h2>

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
                  "Montant",
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
              {totalPatrimoine.toLocaleString("fr-FR")} €
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-10 w-full">
          {data.map((entry) => {
            const percentage = (
              (entry.value / totalPatrimoine) *
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