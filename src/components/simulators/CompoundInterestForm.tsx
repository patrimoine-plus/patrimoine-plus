import { Frequence } from "../../utils/compoundInterest";

type Props = {
  capitalInitial: string;
  versementMensuel: string;
  tauxAnnuel: string;
  dureeAnnees: string;
  frequence: Frequence;
  onCapitalInitialChange: (v: string) => void;
  onVersementMensuelChange: (v: string) => void;
  onTauxAnnuelChange: (v: string) => void;
  onDureeAnneesChange: (v: string) => void;
  onFrequenceChange: (v: Frequence) => void;
};

export default function CompoundInterestForm({
  capitalInitial,
  versementMensuel,
  tauxAnnuel,
  dureeAnnees,
  frequence,
  onCapitalInitialChange,
  onVersementMensuelChange,
  onTauxAnnuelChange,
  onDureeAnneesChange,
  onFrequenceChange,
}: Props) {
  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg mt-8">
      <h2 className="text-2xl font-bold mb-6">⚙️ Paramètres</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-zinc-400">Capital initial</label>

          <div className="relative mt-2">
            <input
              type="number"
              value={capitalInitial}
              onChange={(e) => onCapitalInitialChange(e.target.value)}
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
          <label className="text-zinc-400">Taux annuel</label>

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

      <div className="mt-6">
        <label className="text-zinc-400 block mb-3">
          Fréquence de capitalisation
        </label>

        <div className="flex gap-3">
          <button
            onClick={() => onFrequenceChange("mensuelle")}
            className={`flex-1 rounded-xl py-3 font-medium transition ${
              frequence === "mensuelle" ? "bg-blue-600" : "bg-zinc-800"
            }`}
          >
            Mensuelle
          </button>

          <button
            onClick={() => onFrequenceChange("annuelle")}
            className={`flex-1 rounded-xl py-3 font-medium transition ${
              frequence === "annuelle" ? "bg-blue-600" : "bg-zinc-800"
            }`}
          >
            Annuelle
          </button>
        </div>
      </div>
    </div>
  );
}