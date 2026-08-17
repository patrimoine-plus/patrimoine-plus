"use client";

import Sidebar from "../../components/Sidebar";

import ProfileSection from "../../components/settings/ProfileSection";
import DataSection from "../../components/settings/DataSection";
import AppearanceSection from "../../components/settings/AppearanceSection";
import NotificationSection from "../../components/settings/NotificationSection";
import SecuritySection from "../../components/settings/SecuritySection";

export default function ParametresPage() {
  return (
    <main className="flex min-h-screen w-full overflow-x-hidden bg-zinc-950 text-white">
      <Sidebar />

      <div className="min-w-0 flex-1 px-4 py-6 sm:px-6 md:p-10">
        {/* =====================================================
            En-tête
        ===================================================== */}

        <div className="mb-6">
          <h2 className="text-3xl font-bold">
            ⚙️ Paramètres
          </h2>

          <p className="text-zinc-500 mt-2">
            Gère ton profil et tes données.
          </p>
        </div>

        {/* =====================================================
            Profil
        ===================================================== */}

        <div className="w-full min-w-0">
          <ProfileSection />
        </div>

        {/* =====================================================
            Données
        ===================================================== */}

        <div className="mt-6 w-full min-w-0">
          <DataSection />
        </div>

        {/* =====================================================
            Apparence
        ===================================================== */}

        <div className="mt-6 w-full min-w-0 overflow-hidden">
          <AppearanceSection />
        </div>

        {/* =====================================================
            Notifications
        ===================================================== */}

        <div className="mt-6 w-full min-w-0">
          <NotificationSection />
        </div>

        {/* =====================================================
            Sécurité
        ===================================================== */}

        <div className="mt-6 w-full min-w-0">
          <SecuritySection />
        </div>
      </div>
    </main>
  );
}