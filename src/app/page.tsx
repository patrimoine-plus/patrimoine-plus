"use client";

import { useEffect, useState } from "react";

import Sidebar from "../components/Sidebar";

import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStats from "../components/dashboard/DashboardStats";
import QuickActions from "../components/dashboard/QuickActions";
import PortfolioChart from "../components/dashboard/PortfolioChart";
import AIInsight from "../components/dashboard/AIInsight";

import AddAccountModal from "../components/modals/AddAccountModal";

import { accounts } from "../data/accounts";
import { loadAccounts, saveAccounts } from "../services/localStorage";
import { Account, Category } from "../types/account";

export default function Home() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [userAccounts, setUserAccounts] =
    useState<Account[]>(accounts);

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedAccounts = loadAccounts();

    if (savedAccounts) {
      setUserAccounts(savedAccounts);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    saveAccounts(userAccounts);
  }, [userAccounts, isLoaded]);

  const totalPatrimoine = userAccounts.reduce(
    (total, account) => total + account.amount,
    0
  );

  const totalEpargne = userAccounts
    .filter((account) => account.category === "Épargne")
    .reduce(
      (total, account) => total + account.amount,
      0
    );

  const totalInvestissement = userAccounts
    .filter(
      (account) =>
        account.category === "Investissement"
    )
    .reduce(
      (total, account) => total + account.amount,
      0
    );

  const nombreComptes = userAccounts.length;

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

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-5 pt-20 md:p-10">
        <DashboardHeader
          totalPatrimoine={totalPatrimoine}
        />

        <DashboardStats
          totalPatrimoine={totalPatrimoine}
          nombreComptes={nombreComptes}
          totalEpargne={totalEpargne}
          totalInvestissement={totalInvestissement}
        />

        <QuickActions
          onAddAccount={() => setIsAddOpen(true)}
        />

        <PortfolioChart
          accounts={userAccounts}
        />

        <AIInsight
          accounts={userAccounts}
        />
      </div>

      <AddAccountModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
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

          setIsAddOpen(false);
        }}
      />
    </main>
  );
}