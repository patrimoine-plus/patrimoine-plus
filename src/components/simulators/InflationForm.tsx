type Props = {
  montantActuel: string;
  tauxInflation: string;
  dureeAnnees: string;
  onMontantActuelChange: (v: string) => void;
  onTauxInflationChange: (v: string) => void;
  onDureeAnneesChange: (v: string) => void;
};

export default function InflationForm({
  montantActuel,
  tauxInflation,
  dureeAnnees,
  onMontantActuelChange,
  onTauxInflationChange,
  onDureeAnneesChange,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">⚙️ Paramètres</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="text-zinc-400">Montant aujourd&apos;hui</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={montantActuel}
              onChange={(e) => onMontantActuelChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              €
            </span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400">Taux d&apos;inflation</label>

          <div className="relative mt-2">
            <input
              type="number"
              step="0.1"
              value={tauxInflation}
              onChange={(e) => onTauxInflationChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              %
            </span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400">Durée</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={dureeAnnees}
              onChange={(e) => onDureeAnneesChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-16"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              ans
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}