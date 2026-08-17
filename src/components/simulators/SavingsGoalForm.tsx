type Props = {
  objectif: string;
  capitalActuel: string;
  versementMensuel: string;
  tauxAnnuel: string;
  onObjectifChange: (v: string) => void;
  onCapitalActuelChange: (v: string) => void;
  onVersementMensuelChange: (v: string) => void;
  onTauxAnnuelChange: (v: string) => void;
};

export default function SavingsGoalForm({
  objectif,
  capitalActuel,
  versementMensuel,
  tauxAnnuel,
  onObjectifChange,
  onCapitalActuelChange,
  onVersementMensuelChange,
  onTauxAnnuelChange,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">⚙️ Paramètres</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-zinc-400">Objectif</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={objectif}
              onChange={(e) => onObjectifChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              €
            </span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400">Capital actuel</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={capitalActuel}
              onChange={(e) => onCapitalActuelChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              €
            </span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400">Versement mensuel</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={versementMensuel}
              onChange={(e) => onVersementMensuelChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              €
            </span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400">
            Taux annuel{" "}
            <span className="text-zinc-600">(optionnel, 0 par défaut)</span>
          </label>

          <div className="relative mt-2">
            <input
              type="number"
              step="0.1"
              value={tauxAnnuel}
              onChange={(e) => onTauxAnnuelChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              %
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}