"use client";

import { useState } from "react";
import { OBJECTIVE_ICONS } from "../../types/objective";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    nom: string,
    montantCible: number,
    montantActuel: number,
    dateCible: string,
    icon: string
  ) => void;
};

export default function AddObjectiveModal({ isOpen, onClose, onAdd }: Props) {
  const [nom, setNom] = useState("");
  const [montantCible, setMontantCible] = useState("");
  const [montantActuel, setMontantActuel] = useState("");
  const [dateCible, setDateCible] = useState("");
  const [icon, setIcon] = useState<string>(OBJECTIVE_ICONS[0]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!nom || !montantCible || !dateCible) return;

    onAdd(
      nom,
      Number(montantCible),
      montantActuel ? Number(montantActuel) : 0,
      dateCible,
      icon
    );

    setNom("");
    setMontantCible("");
    setMontantActuel("");
    setDateCible("");
    setIcon(OBJECTIVE_ICONS[0]);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold mb-6">Ajouter un objectif</h2>

        <div className="space-y-5">
          <div>
            <label className="text-zinc-400">Nom</label>

            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full mt-2 rounded-xl bg-zinc-800 p-3"
              placeholder="Ex : Voyage au Japon"
            />
          </div>

          <div>
            <label className="text-zinc-400">Montant cible</label>

            <div className="relative mt-2">
              <input
                type="number"
                value={montantCible}
                onChange={(e) => setMontantCible(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
                placeholder="3000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                €
              </span>
            </div>
          </div>

          <div>
            <label className="text-zinc-400">
              Montant actuel{" "}
              <span className="text-zinc-600">(optionnel)</span>
            </label>

            <div className="relative mt-2">
              <input
                type="number"
                value={montantActuel}
                onChange={(e) => setMontantActuel(e.target.value)}
                className="w-full rounded-xl bg-zinc-800 p-3 pr-10"
                placeholder="0"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500">
                €
              </span>
            </div>
          </div>

          <div>
            <label className="text-zinc-400">Date cible</label>

            <input
              type="date"
              value={dateCible}
              onChange={(e) => setDateCible(e.target.value)}
              className="w-full mt-2 rounded-xl bg-zinc-800 p-3"
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

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 bg-zinc-700 rounded-xl py-3"
            >
              Annuler
            </button>

            <button
              onClick={handleSubmit}
              className="flex-1 bg-blue-600 hover:bg-blue-700 rounded-xl py-3"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}