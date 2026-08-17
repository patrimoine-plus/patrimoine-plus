"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type Accent = "blue" | "violet" | "green" | "orange";
type Layout = "standard" | "compact" | "spacious";

const STORAGE_KEY = "patrimoine-appearance";

type AppearanceSettings = {
  theme: Theme;
  accent: Accent;
  layout: Layout;
};

const defaultSettings: AppearanceSettings = {
  theme: "dark",
  accent: "blue",
  layout: "standard",
};

export default function AppearanceSection() {
  const [theme, setTheme] = useState<Theme>(
    defaultSettings.theme
  );

  const [accent, setAccent] = useState<Accent>(
    defaultSettings.accent
  );

  const [layout, setLayout] = useState<Layout>(
    defaultSettings.layout
  );

  const [loaded, setLoaded] = useState(false);

  // =========================================================
  // Charger les préférences existantes
  // =========================================================

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        const settings = JSON.parse(saved);

        if (
          settings.theme === "dark" ||
          settings.theme === "light" ||
          settings.theme === "system"
        ) {
          setTheme(settings.theme);
        }

        if (
          settings.accent === "blue" ||
          settings.accent === "violet" ||
          settings.accent === "green" ||
          settings.accent === "orange"
        ) {
          setAccent(settings.accent);
        }

        if (
          settings.layout === "standard" ||
          settings.layout === "compact" ||
          settings.layout === "spacious"
        ) {
          setLayout(settings.layout);
        }
      } catch {
        console.log(
          "Impossible de charger les préférences d'apparence."
        );
      }
    }

    setLoaded(true);
  }, []);

  // =========================================================
  // Sauvegarder les préférences
  // =========================================================

  useEffect(() => {
    if (!loaded) return;

    const settings: AppearanceSettings = {
      theme,
      accent,
      layout,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings)
    );

    window.dispatchEvent(
      new Event("patrimoine-theme-change")
    );
  }, [theme, accent, layout, loaded]);

  // =========================================================
  // Couleurs
  // =========================================================

  const accentColors: Record<Accent, string> = {
    blue: "bg-blue-500",
    violet: "bg-violet-500",
    green: "bg-green-500",
    orange: "bg-orange-500",
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
      <div className="flex items-start gap-4">

        <div className="text-3xl">
          🎨
        </div>

        <div className="flex-1">

          <h2 className="text-2xl font-bold">
            Apparence
          </h2>

          <p className="text-zinc-500 mt-2">
            Personnalisation des couleurs et de la mise en page.
          </p>

          {/* =================================================
              Thème
          ================================================= */}

          <div className="mt-8">

            <h3 className="text-lg font-semibold mb-4">
              Thème
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Sombre */}

              <button
                onClick={() => setTheme("dark")}
                className={`rounded-2xl p-4 text-left border transition ${
                  theme === "dark"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
                }`}
              >
                <div className="text-2xl">
                  🌙
                </div>

                <p className="font-semibold mt-2">
                  Sombre
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  Interface sombre
                </p>
              </button>

              {/* Clair */}

              <button
                onClick={() => setTheme("light")}
                className={`rounded-2xl p-4 text-left border transition ${
                  theme === "light"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
                }`}
              >
                <div className="text-2xl">
                  ☀️
                </div>

                <p className="font-semibold mt-2">
                  Clair
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  Interface claire
                </p>
              </button>

              {/* Système */}

              <button
                onClick={() => setTheme("system")}
                className={`rounded-2xl p-4 text-left border transition ${
                  theme === "system"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
                }`}
              >
                <div className="text-2xl">
                  🖥️
                </div>

                <p className="font-semibold mt-2">
                  Système
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  Suivre ton appareil
                </p>
              </button>

            </div>
          </div>

          {/* =================================================
              Couleur principale
          ================================================= */}

          <div className="mt-8">

            <h3 className="text-lg font-semibold mb-4">
              Couleur principale
            </h3>

            <div className="flex flex-wrap gap-4">

              {(
                [
                  ["blue", "Bleu"],
                  ["violet", "Violet"],
                  ["green", "Vert"],
                  ["orange", "Orange"],
                ] as [Accent, string][]
              ).map(([value, label]) => (

                <button
                  key={value}
                  onClick={() => setAccent(value)}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 border transition ${
                    accent === value
                      ? "border-white bg-zinc-800"
                      : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
                  }`}
                >

                  <span
                    className={`w-5 h-5 rounded-full ${accentColors[value]}`}
                  />

                  <span>
                    {label}
                  </span>

                </button>

              ))}

            </div>
          </div>

          {/* =================================================
              Mise en page
          ================================================= */}

          <div className="mt-8">

            <h3 className="text-lg font-semibold mb-4">
              Mise en page
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

              {/* Standard */}

              <button
                onClick={() => setLayout("standard")}
                className={`rounded-2xl p-4 text-left border transition ${
                  layout === "standard"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
                }`}
              >
                <p className="font-semibold">
                  Standard
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  Équilibre entre espace et informations
                </p>
              </button>

              {/* Compact */}

              <button
                onClick={() => setLayout("compact")}
                className={`rounded-2xl p-4 text-left border transition ${
                  layout === "compact"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
                }`}
              >
                <p className="font-semibold">
                  Compact
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  Plus d'informations à l'écran
                </p>
              </button>

              {/* Aéré */}

              <button
                onClick={() => setLayout("spacious")}
                className={`rounded-2xl p-4 text-left border transition ${
                  layout === "spacious"
                    ? "border-blue-500 bg-zinc-800"
                    : "border-zinc-800 bg-zinc-950 hover:bg-zinc-800"
                }`}
              >
                <p className="font-semibold">
                  Aéré
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  Plus d'espace entre les éléments
                </p>
              </button>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}