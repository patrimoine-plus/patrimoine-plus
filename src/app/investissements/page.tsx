"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import InvestmentStats from "../../components/investments/InvestmentStats";
import InvestmentFilters from "../../components/investments/InvestmentFilters";
import InvestmentGrid from "../../components/investments/InvestmentGrid";
import InvestmentChart from "../../components/investments/InvestmentChart";

import AddInvestmentModal from "../../components/modals/AddInvestmentModal";
import EditInvestmentModal from "../../components/modals/EditInvestmentModal";

import { investments } from "../../data/investments";
import {
  loadInvestments,
  saveInvestments,
} from "../../services/investmentsStorage";
import {
  AssetType,
  FilterAssetType,
  Investment,
} from "../../types/investment";

const ASSET_ICONS: Record<AssetType, string> = {
  ETF: "📊",
  Action: "📈",
  Obligation: "🏦",
  Autre: "💼",
};

export default function InvestissementsPage() {
  const [isOpen, setIsOpen] = useState(false);

  const [filter, setFilter] =
    useState<FilterAssetType>("Tous");

  const [investmentToDelete, setInvestmentToDelete] =
    useState<number | null>(null);

  const [investmentToEdit, setInvestmentToEdit] =
    useState<Investment | null>(null);

  const [userInvestments, setUserInvestments] =
    useState<Investment[]>(investments);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadInvestments();

    if (saved) {
      setUserInvestments(saved);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    saveInvestments(userInvestments);
  }, [userInvestments, isLoaded]);

  const valeurTotale = userInvestments.reduce(
    (sum, investment) =>
      sum + investment.valeurActuelle,
    0
  );

  const montantInvestiTotal = userInvestments.reduce(
    (sum, investment) =>
      sum + investment.montantInvesti,
    0
  );

  const gainsPertes =
    valeurTotale - montantInvestiTotal;

  const performanceGlobale =
    montantInvestiTotal > 0
      ? (gainsPertes / montantInvestiTotal) * 100
      : 0;

  const filteredInvestments =
    userInvestments.filter(
      (investment) =>
        filter === "Tous" ||
        investment.assetType === filter
    );

  const confirmDelete = () => {
    if (investmentToDelete === null) return;

    setUserInvestments(
      userInvestments.filter(
        (investment) =>
          investment.id !== investmentToDelete
      )
    );

    setInvestmentToDelete(null);
  };

  return (
    <main className="flex min-h-screen w-full min-w-0 overflow-x-hidden bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 min-w-0 w-full p-5 md:p-10">

        {/* =====================================================
            En-tête
        ===================================================== */}

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
          <div className="min-w-0">
            <h2 className="text-3xl font-bold break-words">
              📈 Investissements
            </h2>

            <p className="text-zinc-500 mt-2">
              Suis la performance de tes placements.
            </p>
          </div>

          <button
            onClick={() => setIsOpen(true)}
            className="
              w-full
              md:w-auto
              shrink-0
              bg-blue-600
              hover:bg-blue-700
              rounded-xl
              px-5
              py-3
              font-medium
              transition
            "
          >
            ➕ Ajouter un investissement
          </button>
        </div>

        {/* =====================================================
            Statistiques
        ===================================================== */}

        <div className="w-full min-w-0 overflow-hidden">
          <InvestmentStats
            valeurTotale={valeurTotale}
            montantInvestiTotal={montantInvestiTotal}
            gainsPertes={gainsPertes}
            performanceGlobale={performanceGlobale}
          />
        </div>

        {/* =====================================================
            Mes investissements
        ===================================================== */}

        <div className="mt-10 md:mt-12 mb-2">
          <h2 className="text-2xl font-bold">
            Mes investissements
          </h2>
        </div>

        {/* =====================================================
            Filtres
        ===================================================== */}

        <div className="w-full min-w-0 overflow-hidden">
          <InvestmentFilters
            selected={filter}
            onSelect={setFilter}
          />
        </div>

        {/* =====================================================
            Liste des investissements
        ===================================================== */}

        <div className="w-full min-w-0 overflow-hidden">
          <InvestmentGrid
            investments={filteredInvestments}
            onDelete={setInvestmentToDelete}
            onEdit={(id) => {
              const investment =
                userInvestments.find(
                  (item) => item.id === id
                );

              if (investment) {
                setInvestmentToEdit(investment);
              }
            }}
          />
        </div>

        {/* =====================================================
            Graphique
        ===================================================== */}

        <div className="w-full min-w-0 overflow-hidden">
          <InvestmentChart
            investments={userInvestments}
          />
        </div>
      </div>

      {/* =======================================================
          Ajouter un investissement
      ======================================================= */}

      <AddInvestmentModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(
          name,
          montantInvesti,
          valeurActuelle,
          assetType
        ) => {
          setUserInvestments([
            ...userInvestments,
            {
              id: Date.now(),
              name,
              montantInvesti,
              valeurActuelle,
              assetType,
              icon: ASSET_ICONS[assetType],
            },
          ]);

          setIsOpen(false);
        }}
      />

      {/* =======================================================
          Modifier un investissement
      ======================================================= */}

      <EditInvestmentModal
        isOpen={investmentToEdit !== null}
        investment={investmentToEdit}
        onClose={() => setInvestmentToEdit(null)}
        onSave={(
          id,
          name,
          montantInvesti,
          valeurActuelle,
          assetType
        ) => {
          setUserInvestments(
            userInvestments.map((investment) =>
              investment.id === id
                ? {
                    ...investment,
                    name,
                    montantInvesti,
                    valeurActuelle,
                    assetType,
                    icon: ASSET_ICONS[assetType],
                  }
                : investment
            )
          );

          setInvestmentToEdit(null);
        }}
      />

      {/* =======================================================
          Confirmation suppression
      ======================================================= */}

      {investmentToDelete !== null && (
        <div className="fixed inset-0 z-[60] bg-black/60 flex items-center justify-center p-4">
          <div className="bg-zinc-900 rounded-2xl p-6 md:p-8 w-full max-w-[420px]">
            <h2 className="text-2xl font-bold mb-3">
              Supprimer cet investissement ?
            </h2>

            <p className="text-zinc-400 mb-8">
              Cette action est irréversible.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() =>
                  setInvestmentToDelete(null)
                }
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