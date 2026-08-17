"use client";

import { useEffect, useState } from "react";
import { loadProfile, saveProfile } from "../../services/profileStorage";

export default function ProfileSection() {
  const [nom, setNom] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const profile = loadProfile();

    if (profile) {
      setNom(profile.nom);
    }
  }, []);

  const handleSave = () => {
    saveProfile({ nom });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">
        👤 Profil
      </h2>

      <label className="text-zinc-400">
        Nom affiché
      </label>

      <div className="flex gap-3 mt-2">
        <input
          type="text"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder=""
          className="flex-1 rounded-xl bg-zinc-800 p-3"
        />

        <button
          onClick={handleSave}
          className="
            accent-bg
            rounded-xl
            px-6
            py-3
            font-medium
            transition
            hover:opacity-90
          "
        >
          Enregistrer
        </button>
      </div>

      {saved && (
        <p className="text-green-500 text-sm mt-3">
          ✅ Nom enregistré
        </p>
      )}
    </div>
  );
}