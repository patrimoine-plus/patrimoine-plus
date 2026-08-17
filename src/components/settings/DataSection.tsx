"use client";

import { ChangeEvent, useRef, useState } from "react";
import {
  exportAllData,
  downloadJSON,
  importAllData,
  resetAllData,
} from "../../utils/dataBackup";

export default function DataSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importMessage, setImportMessage] = useState<string | null>(null);

  const handleExport = () => {
    const json = exportAllData();
    const today = new Date().toISOString().slice(0, 10);
    downloadJSON(`patrimoine-plus-export-${today}.json`, json);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const success = importAllData(reader.result as string);

      setImportMessage(
        success
          ? "✅ Données importées avec succès. Recharge la page pour voir les changements."
          : "❌ Le fichier n'est pas un export valide de Patrimoine+."
      );
    };

    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = () => {
    resetAllData();
    setShowResetConfirm(false);
    window.location.reload();
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">💾 Sauvegarde &amp; données</h2>

      <p className="text-zinc-500 mb-6">
        Toutes tes données restent stockées localement dans ton navigateur —
        rien n&apos;est envoyé à un serveur.
      </p>

      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleExport}
          className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-3 font-medium transition"
        >
          ⬇️ Exporter mes données
        </button>

        <button
          onClick={handleImportClick}
          className="bg-zinc-800 hover:bg-zinc-700 rounded-xl px-5 py-3 font-medium transition"
        >
          ⬆️ Importer des données
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          onClick={() => setShowResetConfirm(true)}
          className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl px-5 py-3 font-medium transition"
        >
          🗑️ Réinitialiser toutes les données
        </button>
      </div>

      {importMessage && (
        <p className="text-sm mt-4 text-zinc-300">{importMessage}</p>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
            <h2 className="text-2xl font-bold mb-3">
              Tout réinitialiser ?
            </h2>

            <p className="text-zinc-400 mb-8">
              Comptes, budget, investissements, objectifs et historique
              seront définitivement supprimés. Cette action est
              irréversible.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 bg-zinc-700 rounded-xl py-3"
              >
                Annuler
              </button>

              <button
                onClick={handleReset}
                className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl py-3"
              >
                Réinitialiser
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}