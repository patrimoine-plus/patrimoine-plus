import { Account, Category } from "../../types/account";

type Props = {
  accounts: Account[];
};

type InsightType = "positif" | "attention" | "info";

type Insight = {
  type: InsightType;
  icon: string;
  text: string;
};

const STYLES: Record<InsightType, string> = {
  positif: "border-l-4 border-green-500 bg-zinc-800",
  attention: "border-l-4 border-orange-500 bg-zinc-800",
  info: "border-l-4 border-blue-500 bg-zinc-800",
};

function generateInsights(accounts: Account[]): Insight[] {
  const insights: Insight[] = [];

  const total = accounts.reduce((sum, a) => sum + a.amount, 0);

  if (total === 0) {
    return [
      {
        type: "info",
        icon: "💡",
        text: "Ajoute au moins un compte pour recevoir une analyse personnalisée de ton patrimoine.",
      },
    ];
  }

  const categories: Category[] = [
    "Épargne",
    "Investissement",
    "Liquidités",
    "Immobilier",
  ];

  const byCategory = categories.map((category) => {
    const amount = accounts
      .filter((a) => a.category === category)
      .reduce((sum, a) => sum + a.amount, 0);

    return {
      category,
      amount,
      percentage: (amount / total) * 100,
    };
  });

  const usedCategories = byCategory.filter((c) => c.amount > 0);
  const dominant = [...byCategory].sort((a, b) => b.amount - a.amount)[0];

  // Vue d'ensemble
  insights.push({
    type: "info",
    icon: "💼",
    text: `Ton patrimoine total est de ${total.toLocaleString(
      "fr-FR"
    )} €, réparti sur ${accounts.length} compte${
      accounts.length > 1 ? "s" : ""
    }.`,
  });

  // Concentration excessive sur une seule catégorie
  if (dominant.percentage >= 70 && usedCategories.length > 1) {
    insights.push({
      type: "attention",
      icon: "⚠️",
      text: `${dominant.percentage.toFixed(
        0
      )}% de ton patrimoine est concentré en ${dominant.category}. Diversifier davantage pourrait réduire ton exposition au risque.`,
    });
  }

  // Une seule catégorie utilisée
  if (usedCategories.length === 1) {
    insights.push({
      type: "attention",
      icon: "⚠️",
      text: `Tout ton patrimoine est actuellement placé en ${usedCategories[0].category}. Répartir sur plusieurs catégories peut t'aider à mieux équilibrer risque et rendement.`,
    });
  }

  // Bonne diversification
  if (usedCategories.length >= 3) {
    insights.push({
      type: "positif",
      icon: "✅",
      text: `Ton patrimoine est réparti sur ${usedCategories.length} catégories différentes, ce qui témoigne d'une bonne diversification.`,
    });
  }

  const liquidites = byCategory.find((c) => c.category === "Liquidités")!;
  const investissement = byCategory.find(
    (c) => c.category === "Investissement"
  )!;

  // Trop de liquidités qui dorment
  if (liquidites.percentage >= 30) {
    insights.push({
      type: "attention",
      icon: "💵",
      text: `${liquidites.percentage.toFixed(
        0
      )}% de ton patrimoine dort en liquidités. Au-delà de ton épargne de précaution, cet argent perd du pouvoir d'achat face à l'inflation.`,
    });
  }

  // Part investie faible sur un patrimoine conséquent
  if (investissement.percentage < 15 && total >= 3000) {
    insights.push({
      type: "attention",
      icon: "📈",
      text: `Seulement ${investissement.percentage.toFixed(
        0
      )}% de ton patrimoine est investi. Sur le long terme, augmenter cette part peut favoriser la croissance de ton capital.`,
    });
  }

  // Part investie solide
  if (investissement.percentage >= 40) {
    insights.push({
      type: "positif",
      icon: "📈",
      text: `${investissement.percentage.toFixed(
        0
      )}% de ton patrimoine est investi, ce qui est un bon moteur de croissance à long terme.`,
    });
  }

  // Epargne de précaution présente
  const epargne = byCategory.find((c) => c.category === "Épargne")!;

  if (epargne.amount >= 1000) {
    insights.push({
      type: "positif",
      icon: "🛡️",
      text: `Tu disposes de ${epargne.amount.toLocaleString(
        "fr-FR"
      )} € en épargne, une base solide pour ton matelas de sécurité.`,
    });
  }

  // Limite à 4 insights pour ne pas surcharger la carte
  return insights.slice(0, 4);
}

export default function AIInsight({ accounts }: Props) {
  const insights = generateInsights(accounts);

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">🤖 Analyse IA</h2>
      </div>

      <div className="mt-8 space-y-4">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 ${STYLES[insight.type]}`}
          >
            <p className="text-zinc-300 leading-7">
              {insight.icon} {insight.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}