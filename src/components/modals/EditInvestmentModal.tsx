"use client";

import { useEffect, useState } from "react";
import { AssetType, Investment } from "../../types/investment";

type Props = {
  isOpen: boolean;
  investment: Investment | null;
  onClose: () => void;
  onSave: (
    id: number,
    name: string,
    montantInvesti: number,
    valeurActuelle: number,
    assetType: AssetType
  ) => void;
};

const ASSET_TYPES: AssetType[] = ["ETF", "Action", "Obligation", "Autre"];

const ASSET_ICONS: Record<AssetType, string> = {
  ETF: "📊",
  Action: "📈",
  Obligation: "🏦",
  Autre: "💼",
};

export default function EditInvestmentModal({
  isOpen,
  investment,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [montantInvesti, setMontantInvesti] = useState("");
  const [valeurActuelle, setValeurActuelle] = useState("");
  const [assetType, setAssetType] = useState<AssetType>("ETF");

  useEffect(() => {
    if (investment) {
      setName(investment.name);
      setMontantInvesti(investment.montantInvesti.toString());
      setValeurActuelle(investment.valeurActuelle.toString());
      setAssetType(investment.assetType);
    }
  }, [investment]);

  if (!isOpen || !investment) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold mb-6">
          Modifier un investissement
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-zinc-400">Nom</label>

            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-zinc-400">Montant investi</label>

            <input
              type="number"
              value={montantInvesti}
              onChange={(e) => setMontantInvesti(e.target.value)}
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-zinc-400">Valeur actuelle</label>

            <input
              type="number"
              value={valeurActuelle}
              onChange={(e) => setValeurActuelle(e.target.value)}
              className="w-full mt-2 bg-zinc-800 rounded-xl p-3"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-3">
              Type d&apos;actif
            </label>

            <div className="grid grid-cols-2 gap-2">
              {ASSET_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setAssetType(type)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 transition text-left ${
                    assetType === type ? "bg-blue-600" : "bg-zinc-800"
                  }`}
                >
                  {ASSET_ICONS[type]} {type}
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
                  investment.id,
                  name,
                  Number(montantInvesti),
                  Number(valeurActuelle),
                  assetType
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