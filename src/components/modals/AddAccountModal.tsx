"use client";

import { useState } from "react";
import { Category } from "../../types/account";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (name: string, amount: number, category: Category) => void;
};

export default function AddAccountModal({
  isOpen,
  onClose,
  onAdd,
}: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<Category>("Épargne");

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!name || !amount) return;

    onAdd(name, Number(amount), category);

    setName("");
    setAmount("");
    setCategory("Épargne");

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold mb-6">
          Ajouter un compte
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-zinc-400">
              Nom
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mt-2 rounded-xl bg-zinc-800 p-3"
              placeholder="Ex : Livret A"
            />
          </div>

          <div>
            <label className="text-zinc-400">
              Montant
            </label>

            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-2 rounded-xl bg-zinc-800 p-3"
              placeholder="5000"
            />
          </div>

          <div>
            <label className="text-zinc-400 block mb-3">
              Type
            </label>

            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={category === "Épargne"}
                  onChange={() => setCategory("Épargne")}
                />
                🏦 Épargne
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={category === "Investissement"}
                  onChange={() =>
                    setCategory("Investissement")
                  }
                />
                📈 Investissement
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={category === "Liquidités"}
                  onChange={() =>
                    setCategory("Liquidités")
                  }
                />
                💵 Liquidités
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  checked={category === "Immobilier"}
                  onChange={() =>
                    setCategory("Immobilier")
                  }
                />
                🏠 Immobilier
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="
                flex-1
                bg-zinc-700
                hover:bg-zinc-600
                rounded-xl
                py-3
                transition
              "
            >
              Annuler
            </button>

            <button
              onClick={handleSubmit}
              className="
                flex-1
                accent-bg
                hover:opacity-90
                rounded-xl
                py-3
                transition
              "
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}