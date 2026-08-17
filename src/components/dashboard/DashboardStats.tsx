"use client";

import Link from "next/link";

type Props = {
  totalPatrimoine: number;
  nombreComptes: number;
  totalEpargne: number;
  totalInvestissement: number;
};

export default function DashboardStats({
  totalPatrimoine,
  nombreComptes,
  totalEpargne,
  totalInvestissement,
}: Props) {
  const cards = [
    {
      icon: "💰",
      title: "Patrimoine",
      value: `${totalPatrimoine.toLocaleString("fr-FR")} €`,
      subtitle: "Patrimoine total",
      href: "#repartition",
    },
    {
      icon: "🏦",
      title: "Comptes",
      value: nombreComptes,
      subtitle: "Comptes enregistrés",
      href: "/comptes",
    },
    {
      icon: "💵",
      title: "Épargne",
      value: `${totalEpargne.toLocaleString("fr-FR")} €`,
      subtitle: "Capital sécurisé",
      href: "/comptes",
    },
    {
      icon: "📈",
      title: "Investissements",
      value: `${totalInvestissement.toLocaleString("fr-FR")} €`,
      subtitle: "Capital investi",
      href: "/investissements",
    },
  ];

  return (
    <section className="mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="
              group
              bg-zinc-900
              rounded-3xl
              p-6
              shadow-lg
              transition-all
              duration-300
              hover:-translate-y-1
              hover:shadow-2xl
              border
              border-zinc-800
              hover:border-[var(--accent-color)]
              cursor-pointer
            "
          >
            <div
              className="
                text-3xl
                mb-5
                transition-transform
                duration-300
                group-hover:scale-110
              "
            >
              {card.icon}
            </div>

            <p className="text-zinc-400 text-sm">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {card.value}
            </h2>

            <p className="text-zinc-500 text-sm mt-4">
              {card.subtitle}
            </p>

            <div
              className="
                mt-5
                text-sm
                font-medium
                opacity-0
                group-hover:opacity-100
                transition-opacity
                duration-300
              "
              style={{
                color: "var(--accent-color)",
              }}
            >
              Voir les détails →
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}