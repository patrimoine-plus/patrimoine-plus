type Props = {
  ageActuel: string;
  ageRetraite: string;
  capitalActuel: string;
  versementMensuel: string;
  tauxRendementAnnuel: string;
  tauxRetraitRetraite: string;
  onAgeActuelChange: (v: string) => void;
  onAgeRetraiteChange: (v: string) => void;
  onCapitalActuelChange: (v: string) => void;
  onVersementMensuelChange: (v: string) => void;
  onTauxRendementAnnuelChange: (v: string) => void;
  onTauxRetraitRetraiteChange: (v: string) => void;
};

export default function RetirementForm({
  ageActuel,
  ageRetraite,
  capitalActuel,
  versementMensuel,
  tauxRendementAnnuel,
  tauxRetraitRetraite,
  onAgeActuelChange,
  onAgeRetraiteChange,
  onCapitalActuelChange,
  onVersementMensuelChange,
  onTauxRendementAnnuelChange,
  onTauxRetraitRetraiteChange,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">⚙️ Paramètres</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-zinc-400">Ton âge actuel</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={ageActuel}
              onChange={(e) => onAgeActuelChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-14"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              ans
            </span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400">Âge de départ à la retraite</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={ageRetraite}
              onChange={(e) => onAgeRetraiteChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-14"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              ans
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
          <label className="text-zinc-400">Rendement annuel visé</label>

          <div className="relative mt-2">
            <input
              type="number"
              step="0.1"
              value={tauxRendementAnnuel}
              onChange={(e) => onTauxRendementAnnuelChange(e.target.value)}
              className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
              %
            </span>
          </div>
        </div>

        <div>
          <label className="text-zinc-400">
            Taux de retrait à la retraite
          </label>

          <div className="relative mt-2">
            <input
              type="number"
              step="0.1"
              value={tauxRetraitRetraite}
              onChange={(e) => onTauxRetraitRetraiteChange(e.target.value)}
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