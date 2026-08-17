type Props = {
  reachable: boolean;
  anneesNecessaires: number;
  moisRestants: number;
  capitalFinal: number;
  objectif: number;
};

export default function SavingsGoalResults({
  reachable,
  anneesNecessaires,
  moisRestants,
  capitalFinal,
  objectif,
}: Props) {
  if (!reachable) {
    return (
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8 border-l-4 border-orange-500">
        <h3 className="text-xl font-bold mb-2">
          ⚠️ Objectif hors de portée
        </h3>

        <p className="text-zinc-400 leading-7">
          Avec ces paramètres, tu n&apos;atteindrais pas {objectif.toLocaleString("fr-FR")} € même en 100 ans. Essaie d&apos;augmenter ton versement mensuel ou ton taux annuel.
        </p>
      </div>
    );
  }

  const anneesLabel =
    anneesNecessaires > 0
      ? `${anneesNecessaires} an${anneesNecessaires > 1 ? "s" : ""}`
      : "";

  const moisLabel =
    moisRestants > 0 ? `${moisRestants} mois` : "";

  const dureeLabel =
    anneesNecessaires === 0 && moisRestants === 0
      ? "immédiatement"
      : [anneesLabel, moisLabel].filter(Boolean).join(" et ");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg sm:col-span-2">
        <p className="text-zinc-500 mb-2">Temps nécessaire</p>
        <h3 className="text-4xl font-bold text-blue-500">
          🎯 {dureeLabel}
        </h3>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold">
          {capitalFinal.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Capital à l&apos;arrivée</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-green-500">
          {objectif.toLocaleString("fr-FR")} €
        </h3>
        <p className="text-zinc-500 mt-2">Objectif visé</p>
      </div>
    </div>
  );
}