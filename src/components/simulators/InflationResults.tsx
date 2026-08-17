type Props = {
  montantActuel: number;
  pouvoirAchatFinal: number;
  perteValeur: number;
  perteValeurPourcentage: number;
  montantEquivalentFutur: number;
};

export default function InflationResults({
  montantActuel,
  pouvoirAchatFinal,
  perteValeur,
  perteValeurPourcentage,
  montantEquivalentFutur,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-red-500">
          {pouvoirAchatFinal.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">
          Pouvoir d&apos;achat futur de tes{" "}
          {montantActuel.toLocaleString("fr-FR")} € actuels
        </p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-red-500">
          -{perteValeurPourcentage.toFixed(0)}%
        </h3>
        <p className="text-zinc-500 mt-2">
          Perte de valeur (
          {perteValeur.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €)
        </p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold">
          {montantEquivalentFutur.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">
          Montant futur pour le même pouvoir d&apos;achat
        </p>
      </div>
    </div>
  );
}