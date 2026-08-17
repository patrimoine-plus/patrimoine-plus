"use client";

import { useEffect, useState } from "react";
import { Objective, OBJECTIVE_ICONS } from "../../types/objective";

type Props = {
  isOpen: boolean;
  objective: Objective | null;
  onClose: () => void;
  onSave: (
    id: number,
    nom: string,
    montantCible: number,
    montantActuel: number,
    dateCible: string,
    icon: string
  ) => void;
};

export default function EditObjectiveModal({
  isOpen,
  objective,
  onClose,
  onSave,
}: Props) {
  const [nom, setNom] = useState("");
  const [montantCible, setMontantCible] = useState("");
  const [montantActuel, setMontantActuel] = useState("");
  const [dateCible, setDateCible] = useState("");
  const [icon, setIcon] = useState<string>(OBJECTIVE_ICONS[0]);

  useEffect(() => {
    if (objective) {
      setNom(objective.nom);
      setMontantCible(objective.montantCible.toString());
      setMontantActuel(objective.montantActuel.toString());
      setDateCible(objective.dateCible);
      setIcon(objective.icon);
    }
  }, [objective]);

  if (!isOpen || !objective) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold mb-6">Modifier un objectif</h2>

        <div className="space-y-5">
          <div>
            <label className="text-zinc-400">Nom</label>

            <input
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-zinc-400">Montant cible</label>

            <input
              type="number"
              value={montantCible}
              onChange={(e) => setMontantCible(e.target.value)}
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-zinc-400">Montant actuel</label>

            <input
              type="number"
              value={montantActuel}
              onChange={(e) => setMontantActuel(e.target.value)}
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-zinc-400">Date cible</label>

            <input
              type="date"
              value={dateCible}
              onChange={(e) => setDateCible(e.target.value)}
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-3">Icône</label>

            <div className="grid grid-cols-5 gap-2">
              {OBJECTIVE_ICONS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => setIcon(emoji)}
                  className={`text-2xl rounded-xl py-2 transition ${
                    icon === emoji ? "bg-blue-600" : "bg-zinc-800"
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-zinc-700 rounded-xl py-3"
            >
              Annuler
            </button>

            <button
              onClick={() =>
                onSave(
                  objective.id,
                  nom,
                  Number(montantCible),
                  Number(montantActuel),
                  dateCible,
                  icon
                )
              }
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl py-3"
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}