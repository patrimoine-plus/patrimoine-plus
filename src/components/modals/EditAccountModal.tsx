"use client";

import { useEffect, useState } from "react";
import { Account, Category } from "../../types/account";

type Props = {
  isOpen: boolean;
  account: Account | null;
  onClose: () => void;
  onSave: (
    id: number,
    name: string,
    amount: number,
    category: Category
  ) => void;
};

export default function EditAccountModal({
  isOpen,
  account,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] =
    useState<Category>("Épargne");

  useEffect(() => {
    if (account) {
      setName(account.name);
      setAmount(account.amount.toString());
      setCategory(account.category);
    }
  }, [account]);

  if (!isOpen || !account) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
        <h2 className="text-2xl font-bold mb-6">
          Modifier un compte
        </h2>

        <div className="space-y-5">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-zinc-800 rounded-xl p-3"
          />

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-zinc-800 rounded-xl p-3"
          />

          <div className="space-y-2">
            <label className="flex gap-2">
              <input
                type="radio"
                checked={category === "Épargne"}
                onChange={() =>
                  setCategory("Épargne")
                }
              />
              🏦 Épargne
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                checked={category === "Investissement"}
                onChange={() =>
                  setCategory("Investissement")
                }
              />
              📈 Investissement
            </label>

            <label className="flex gap-2">
              <input
                type="radio"
                checked={category === "Liquidités"}
                onChange={() =>
                  setCategory("Liquidités")
                }
              />
              💵 Liquidités
            </label>

            <label className="flex gap-2">
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

          <div className="flex gap-3">
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
              onClick={() =>
                onSave(
                  account.id,
                  name,
                  Number(amount),
                  category
                )
              }
              className="
                flex-1
                accent-bg
                hover:opacity-90
                rounded-xl
                py-3
                transition
              "
            >
              Enregistrer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}