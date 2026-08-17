"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import BudgetStats from "../../components/budget/BudgetStats";
import BudgetFilters from "../../components/budget/BudgetFilters";
import TransactionList from "../../components/budget/TransactionList";

import AddTransactionModal from "../../components/modals/AddTransactionModal";

import { transactions } from "../../data/transactions";
import {
  loadTransactions,
  saveTransactions,
} from "../../services/transactionsStorage";
import {
  Transaction,
  TransactionFilter,
} from "../../types/transaction";

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

export default function BudgetPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] =
    useState<TransactionFilter>("Tous");

  const [userTransactions, setUserTransactions] =
    useState<Transaction[]>(transactions);

  const [isLoaded, setIsLoaded] = useState(false);

  // =========================================================
  // Charger les transactions
  // =========================================================

  useEffect(() => {
    const saved = loadTransactions();

    if (saved) {
      setUserTransactions(saved);
    }

    setIsLoaded(true);
  }, []);

  // =========================================================
  // Sauvegarder les transactions
  // =========================================================

  useEffect(() => {
    if (!isLoaded) return;

    saveTransactions(userTransactions);
  }, [userTransactions, isLoaded]);

  // =========================================================
  // Calculs
  // =========================================================

  const totalRevenus = userTransactions
    .filter((t) => t.type === "revenu")
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const totalDepenses = userTransactions
    .filter((t) => t.type === "depense")
    .reduce(
      (sum, t) => sum + t.amount,
      0
    );

  const resteDisponible =
    totalRevenus - totalDepenses;

  const tauxEpargne =
    totalRevenus > 0
      ? (resteDisponible / totalRevenus) * 100
      : 0;

  // =========================================================
  // Filtrage
  // =========================================================

  const filteredTransactions =
    userTransactions.filter((t) => {
      if (filter === "Revenus") {
        return t.type === "revenu";
      }

      if (filter === "Dépenses") {
        return t.type === "depense";
      }

      return true;
    });

  // =========================================================
  // Suppression
  // =========================================================

  const handleDelete = (id: number) => {
    setUserTransactions(
      userTransactions.filter(
        (t) => t.id !== id
      )
    );
  };

  // =========================================================
  // Interface
  // =========================================================

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-5 pt-20 md:p-10">

        {/* ===================================================
            En-tête
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            mb-2
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h2 className="text-3xl font-bold">
              💳 Budget
            </h2>

            <p className="text-zinc-500 mt-2">
              Suis tes revenus et tes dépenses.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="
              w-full
              md:w-auto
              bg-[var(--accent-color)]
              hover:opacity-90
              rounded-xl
              px-5
              py-3
              font-medium
              transition
            "
          >
            ➕ Ajouter une transaction
          </button>
        </div>

        {/* ===================================================
            Statistiques
        =================================================== */}

        <BudgetStats
          totalRevenus={totalRevenus}
          totalDepenses={totalDepenses}
          resteDisponible={resteDisponible}
          tauxEpargne={tauxEpargne}
        />

        {/* ===================================================
            Filtres
        =================================================== */}

        <BudgetFilters
          selected={filter}
          onSelect={setFilter}
        />

        {/* ===================================================
            Transactions
        =================================================== */}

        <TransactionList
          transactions={filteredTransactions}
          onDelete={handleDelete}
        />
      </div>

      {/* =====================================================
          Modal ajout transaction
      ===================================================== */}

      <AddTransactionModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(name, amount, type, category) => {
          setUserTransactions([
            ...userTransactions,
            {
              id: Date.now(),
              name,
              amount,
              type,
              category,
              icon:
                CATEGORY_ICONS[category] ??
                "🔹",
            },
          ]);

          setIsOpen(false);
        }}
      />
    </main>
  );
}