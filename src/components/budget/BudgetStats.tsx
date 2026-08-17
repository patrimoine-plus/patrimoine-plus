type Props = {
  totalRevenus: number;
  totalDepenses: number;
  resteDisponible: number;
  tauxEpargne: number;
};

export default function BudgetStats({
  totalRevenus,
  totalDepenses,
  resteDisponible,
  tauxEpargne,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-green-500">
          +{totalRevenus.toLocaleString("fr-FR")} €
        </h3>
        <p className="text-zinc-500 mt-2">Revenus</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-red-500">
          -{totalDepenses.toLocaleString("fr-FR")} €
        </h3>
        <p className="text-zinc-500 mt-2">Dépenses</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3
          className={`text-3xl font-bold ${
            resteDisponible >= 0 ? "text-white" : "text-red-500"
          }`}
        >
          {resteDisponible.toLocaleString("fr-FR")} €
        </h3>
        <p className="text-zinc-500 mt-2">Reste disponible</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3
          className={`text-3xl font-bold ${
            tauxEpargne >= 0 ? "text-blue-500" : "text-red-500"
          }`}
        >
          {tauxEpargne.toFixed(0)}%
        </h3>
        <p className="text-zinc-500 mt-2">Taux d'épargne</p>
      </div>
    </div>
  );
}