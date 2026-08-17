"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import AccountGrid from "../../components/accounts/AccountGrid";
import AccountSearch from "../../components/accounts/AccountSearch";
import AccountFilters from "../../components/accounts/AccountFilters";
import AccountSort from "../../components/accounts/AccountSort";

import AddAccountModal from "../../components/modals/AddAccountModal";
import EditAccountModal from "../../components/modals/EditAccountModal";

import { accounts } from "../../data/accounts";
import {
  loadAccounts,
  saveAccounts,
} from "../../services/localStorage";

import {
  Account,
  Category,
  FilterCategory,
  SortOption,
} from "../../types/account";

export default function ComptesPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("Tous");

  const [sortOption, setSortOption] =
    useState<SortOption>("amount-desc");

  const [accountToDelete, setAccountToDelete] =
    useState<number | null>(null);

  const [accountToEdit, setAccountToEdit] =
    useState<Account | null>(null);

  const [userAccounts, setUserAccounts] =
    useState<Account[]>(accounts);

  const [isLoaded, setIsLoaded] = useState(false);

  // =========================================================
  // Charger les comptes
  // =========================================================

  useEffect(() => {
    const savedAccounts = loadAccounts();

    if (savedAccounts) {
      setUserAccounts(savedAccounts);
    }

    setIsLoaded(true);
  }, []);

  // =========================================================
  // Sauvegarder les comptes
  // =========================================================

  useEffect(() => {
    if (!isLoaded) return;

    saveAccounts(userAccounts);
  }, [userAccounts, isLoaded]);

  // =========================================================
  // Filtrage + recherche + tri
  // =========================================================

  const filteredAccounts = [...userAccounts]
    .filter((account) => {
      const matchSearch =
        account.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        account.category
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchCategory =
        selectedCategory === "Tous" ||
        account.category === selectedCategory;

      return matchSearch && matchCategory;
    })
    .sort((a, b) => {
      switch (sortOption) {
        case "amount-desc":
          return b.amount - a.amount;

        case "amount-asc":
          return a.amount - b.amount;

        case "name-asc":
          return a.name.localeCompare(b.name);

        case "name-desc":
          return b.name.localeCompare(a.name);

        default:
          return 0;
      }
    });

  // =========================================================
  // Patrimoine total
  // =========================================================

  const totalPatrimoine = userAccounts.reduce(
    (total, account) => total + account.amount,
    0
  );

  // =========================================================
  // Suppression
  // =========================================================

  const confirmDelete = () => {
    if (accountToDelete === null) return;

    setUserAccounts(
      userAccounts.filter(
        (account) => account.id !== accountToDelete
      )
    );

    setAccountToDelete(null);
  };

  // =========================================================
  // Icône selon catégorie
  // =========================================================

  const getIcon = (category: Category) => {
    switch (category) {
      case "Épargne":
        return "🏦";

      case "Investissement":
        return "📈";

      case "Liquidités":
        return "💵";

      case "Immobilier":
        return "🏠";
    }
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
            mb-6
            md:flex-row
            md:items-center
            md:justify-between
          "
        >
          <div>
            <h2 className="text-3xl font-bold">
              🏦 Mes comptes
            </h2>

            <p className="text-zinc-500 mt-2">
              Gère et consulte tous tes comptes.
              Patrimoine total :{" "}
              <span className="text-white font-semibold">
                {totalPatrimoine.toLocaleString("fr-FR")} €
              </span>
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
            ➕ Ajouter un compte
          </button>
        </div>

        {/* ===================================================
            Recherche
        =================================================== */}

        <AccountSearch
          value={search}
          onChange={setSearch}
        />

        {/* ===================================================
            Filtres
        =================================================== */}

        <AccountFilters
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        {/* ===================================================
            Tri
        =================================================== */}

        <AccountSort
          value={sortOption}
          onChange={setSortOption}
        />

        {/* ===================================================
            Comptes
        =================================================== */}

        <AccountGrid
          accounts={filteredAccounts}
          onDelete={setAccountToDelete}
          onEdit={(id) => {
            const account = userAccounts.find(
              (a) => a.id === id
            );

            if (account) {
              setAccountToEdit(account);
            }
          }}
        />
      </div>

      {/* =====================================================
          Ajouter un compte
      ===================================================== */}

      <AddAccountModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(name, amount, category) => {
          setUserAccounts([
            ...userAccounts,
            {
              id: Date.now(),
              name,
              amount,
              category,
              icon: getIcon(category),
            },
          ]);

          setIsOpen(false);
        }}
      />

      {/* =====================================================
          Modifier un compte
      ===================================================== */}

      <EditAccountModal
        isOpen={accountToEdit !== null}
        account={accountToEdit}
        onClose={() => setAccountToEdit(null)}
        onSave={(id, name, amount, category) => {
          setUserAccounts(
            userAccounts.map((account) =>
              account.id === id
                ? {
                    ...account,
                    name,
                    amount,
                    category,
                    icon: getIcon(category),
                  }
                : account
            )
          );

          setAccountToEdit(null);
        }}
      />

      {/* =====================================================
          Confirmation suppression
      ===================================================== */}

      {accountToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-5 z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-[420px]">
            <h2 className="text-2xl font-bold mb-3">
              Supprimer ce compte ?
            </h2>

            <p className="text-zinc-400 mb-8">
              Cette action est irréversible.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setAccountToDelete(null)}
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
                onClick={confirmDelete}
                className="
                  flex-1
                  bg-red-600
                  hover:bg-red-700
                  rounded-xl
                  py-3
                  transition
                "
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}