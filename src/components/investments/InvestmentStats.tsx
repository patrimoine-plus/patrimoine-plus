type Props = {
  valeurTotale: number;
  montantInvestiTotal: number;
  gainsPertes: number;
  performanceGlobale: number;
};

export default function InvestmentStats({
  valeurTotale,
  montantInvestiTotal,
  gainsPertes,
  performanceGlobale,
}: Props) {
  const isPositive = gainsPertes >= 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold">
          {valeurTotale.toLocaleString("fr-FR")} €
        </h3>
        <p className="text-zinc-500 mt-2">Valeur totale</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-zinc-300">
          {montantInvestiTotal.toLocaleString("fr-FR")} €
        </h3>
        <p className="text-zinc-500 mt-2">Montant investi</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3
          className={`text-3xl font-bold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {gainsPertes.toLocaleString("fr-FR")} €
        </h3>
        <p className="text-zinc-500 mt-2">Gains / Pertes</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3
          className={`text-3xl font-bold ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        >
          {isPositive ? "+" : ""}
          {performanceGlobale.toFixed(1)}%
        </h3>
        <p className="text-zinc-500 mt-2">Performance globale</p>
      </div>
    </div>
  );
}