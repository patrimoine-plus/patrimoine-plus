type Props = {
  patrimoineNecessaire: number;
  reachable: boolean;
  anneesNecessaires: number;
  moisRestants: number;
  ageIndependance: number | null;
};

export default function FireResults({
  patrimoineNecessaire,
  reachable,
  anneesNecessaires,
  moisRestants,
  ageIndependance,
}: Props) {
  if (!reachable) {
    return (
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8 border-l-4 border-orange-500">
        <h3 className="text-xl font-bold mb-2">
          ⚠️ Indépendance hors de portée
        </h3>

        <p className="text-zinc-400 leading-7">
          Avec ces paramètres, tu n&apos;atteindrais pas{" "}
          {patrimoineNecessaire.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          € même en 100 ans. Essaie d&apos;augmenter ton versement mensuel,
          ton rendement visé, ou de réduire tes dépenses annuelles cibles.
        </p>
      </div>
    );
  }

  const anneesLabel =
    anneesNecessaires > 0
      ? `${anneesNecessaires} an${anneesNecessaires > 1 ? "s" : ""}`
      : "";

  const moisLabel = moisRestants > 0 ? `${moisRestants} mois` : "";

  const dureeLabel =
    anneesNecessaires === 0 && moisRestants === 0
      ? "immédiatement"
      : [anneesLabel, moisLabel].filter(Boolean).join(" et ");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg sm:col-span-2">
        <p className="text-zinc-500 mb-2">
          Indépendance financière atteinte dans
        </p>
        <h3 className="text-4xl font-bold text-orange-500">
          🔥 {dureeLabel}
        </h3>

        {ageIndependance !== null && (
          <p className="text-zinc-400 mt-3">
            Tu aurais environ {ageIndependance} ans.
          </p>
        )}
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg sm:col-span-2">
        <h3 className="text-3xl font-bold">
          {patrimoineNecessaire.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">
          Patrimoine nécessaire pour couvrir tes dépenses
        </p>
      </div>
    </div>
  );
}