"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import PeriodFilter from "../../components/statistics/PeriodFilter";
import PatrimoineEvolutionChart from "../../components/statistics/PatrimoineEvolutionChart";
import RepartitionEvolutionChart from "../../components/statistics/RepartitionEvolutionChart";
import PortfolioEvolutionChart from "../../components/statistics/PortfolioEvolutionChart";

import { accounts as defaultAccounts } from "../../data/accounts";
import { loadAccounts } from "../../services/localStorage";

import { investments as defaultInvestments } from "../../data/investments";
import { loadInvestments } from "../../services/investmentsStorage";

import { recordSnapshot } from "../../services/snapshotsStorage";

import {
  Snapshot,
  PeriodFilter as PeriodFilterType,
} from "../../types/snapshot";

export default function StatistiquesPage() {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [period, setPeriod] =
    useState<PeriodFilterType>("Mois");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const accounts =
      loadAccounts() ?? defaultAccounts;

    const investments =
      loadInvestments() ?? defaultInvestments;

    const totalPatrimoine = accounts.reduce(
      (sum, account) => sum + account.amount,
      0
    );

    const totalEpargne = accounts
      .filter(
        (account) =>
          account.category === "Épargne"
      )
      .reduce(
        (sum, account) => sum + account.amount,
        0
      );

    const totalInvestissementCompte = accounts
      .filter(
        (account) =>
          account.category === "Investissement"
      )
      .reduce(
        (sum, account) => sum + account.amount,
        0
      );

    const totalLiquidites = accounts
      .filter(
        (account) =>
          account.category === "Liquidités"
      )
      .reduce(
        (sum, account) => sum + account.amount,
        0
      );

    const totalImmobilier = accounts
      .filter(
        (account) =>
          account.category === "Immobilier"
      )
      .reduce(
        (sum, account) => sum + account.amount,
        0
      );

    const valeurPortefeuille =
      investments.reduce(
        (sum, investment) =>
          sum + investment.valeurActuelle,
        0
      );

    const updated = recordSnapshot({
      totalPatrimoine,
      totalEpargne,
      totalInvestissementCompte,
      totalLiquidites,
      totalImmobilier,
      valeurPortefeuille,
    });

    setSnapshots(updated);
    setIsLoaded(true);
  }, []);

  const filteredSnapshots = (() => {
    if (period === "Tout") {
      return snapshots;
    }

    const days =
      period === "Mois"
        ? 30
        : period === "Trimestre"
        ? 90
        : 365;

    const cutoff = new Date();

    cutoff.setDate(
      cutoff.getDate() - days
    );

    const cutoffStr = cutoff
      .toISOString()
      .slice(0, 10);

    return snapshots.filter(
      (snapshot) =>
        snapshot.date >= cutoffStr
    );
  })();

  return (
    <main className="flex min-h-screen w-full min-w-0 overflow-x-hidden bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 min-w-0 w-full p-5 md:p-10">

        {/* =====================================================
            En-tête
        ===================================================== */}

        <div className="min-w-0">

          <h2 className="text-3xl font-bold mb-2 break-words">
            📊 Statistiques
          </h2>

          <p className="text-zinc-500 mb-6 break-words">
            Analyse l&apos;évolution de ton patrimoine
            dans le temps.
          </p>

        </div>

        {/* =====================================================
            Filtre période
        ===================================================== */}

        <div className="w-full min-w-0 overflow-hidden">
          <PeriodFilter
            selected={period}
            onSelect={setPeriod}
          />
        </div>

        {/* =====================================================
            Contenu
        ===================================================== */}

        {isLoaded && snapshots.length < 2 ? (

          <div className="w-full min-w-0 bg-zinc-900 rounded-3xl p-6 md:p-8 shadow-lg mt-8">

            <p className="text-zinc-400 leading-7 break-words">
              📅 L&apos;historique vient de démarrer
              aujourd&apos;hui. Reviens dans quelques
              jours pour voir tes premières courbes
              d&apos;évolution — chaque visite enrichit
              automatiquement ton historique.
            </p>

          </div>

        ) : (

          <div className="w-full min-w-0 overflow-hidden">

            <div className="w-full min-w-0 overflow-hidden">
              <PatrimoineEvolutionChart
                snapshots={filteredSnapshots}
              />
            </div>

            <div className="w-full min-w-0 overflow-hidden">
              <RepartitionEvolutionChart
                snapshots={filteredSnapshots}
              />
            </div>

            <div className="w-full min-w-0 overflow-hidden">
              <PortfolioEvolutionChart
                snapshots={filteredSnapshots}
              />
            </div>

          </div>

        )}

      </div>
    </main>
  );
}