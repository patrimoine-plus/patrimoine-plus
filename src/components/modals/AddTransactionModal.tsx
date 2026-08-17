"use client";

import { useState } from "react";
import {
  TransactionType,
  TransactionCategory,
  REVENU_CATEGORIES,
  DEPENSE_CATEGORIES,
} from "../../types/transaction";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (
    name: string,
    amount: number,
    type: TransactionType,
    category: TransactionCategory
  ) => void;
};

const CATEGORY_ICONS: Record<string, string> = {
  Salaire: "💼",
  Freelance: "💻",
  Logement: "🏠",
  Alimentation: "🍽️",
  Transport: "🚗",
  Loisirs: "🎮",
  Santé: "⚕️",
  Autres: "🔹",
};

export default function AddTransactionModal({
  isOpen,
  onClose,
  onAdd,
}: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<TransactionType>("depense");
  const [category, setCategory] = useState<TransactionCategory>(
    DEPENSE_CATEGORIES[0]
  );

  if (!isOpen) return null;

  const categories = type === "revenu" ? REVENU_CATEGORIES : DEPENSE_CATEGORIES;

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    setCategory(
      newType === "revenu" ? REVENU_CATEGORIES[0] : DEPENSE_CATEGORIES[0]
    );
  };

  const handleSubmit = () => {
    if (!name || !amount) return;

    onAdd(name, Number(amount), type, category);

    setName("");
    setAmount("");
    setType("depense");
    setCategory(DEPENSE_CATEGORIES[0]);

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold mb-6">Ajouter une transaction</h2>

        <div className="space-y-5">
          <div className="flex gap-3">
            <button
              onClick={() => handleTypeChange("revenu")}
              className={`flex-1 rounded-xl py-3 font-medium transition ${
                type === "revenu" ? "bg-green-600" : "bg-zinc-800"
              }`}
            >
              💰 Revenu
            </button>

            <button
              onClick={() => handleTypeChange("depense")}
              className={`flex-1 rounded-xl py-3 font-medium transition ${
                type === "depense" ? "bg-red-600" : "bg-zinc-800"
              }`}
            >
              💸 Dépense
            </button>
          </div>

          <div>
            <label className="text-zinc-400">Nom</label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 rounded-xl bg-zinc-800 p-3"
              placeholder={type === "revenu" ? "Ex : Salaire" : "Ex : Courses"}
            />
          </div>

          <div>
            <label className="text-zinc-400">Montant</label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-2 rounded-xl bg-zinc-800 p-3"
              placeholder="0"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-3">Catégorie</label>

            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`flex items-center gap-2 rounded-xl px-3 py-2 transition text-left ${
                    category === cat ? "bg-blue-600" : "bg-zinc-800"
                  }`}
                >
                  {CATEGORY_ICONS[cat]} {cat}
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