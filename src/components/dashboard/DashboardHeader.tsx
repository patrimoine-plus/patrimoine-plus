"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "patrimoine-appearance";
const THEME_EVENT = "patrimoine-theme-change";

type Props = {
  totalPatrimoine: number;
};

type Accent =
  | "blue"
  | "violet"
  | "green"
  | "orange";

export default function DashboardHeader({
  totalPatrimoine,
}: Props) {
  const [accent, setAccent] =
    useState<Accent>("blue");

  useEffect(() => {
    const loadAccent = () => {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        setAccent("blue");
        return;
      }

      try {
        const settings = JSON.parse(saved);

        if (
          settings.accent === "blue" ||
          settings.accent === "violet" ||
          settings.accent === "green" ||
          settings.accent === "orange"
        ) {
          setAccent(settings.accent);
        } else {
          setAccent("blue");
        }
      } catch {
        setAccent("blue");
      }
    };

    loadAccent();

    window.addEventListener(
      THEME_EVENT,
      loadAccent
    );

    return () => {
      window.removeEventListener(
        THEME_EVENT,
        loadAccent
      );
    };
  }, []);

  const gradientClasses = {
    blue: "from-blue-600 to-blue-800",
    violet: "from-violet-600 to-violet-800",
    green: "from-green-500 to-green-700",
    orange: "from-orange-500 to-orange-700",
  };

  const textClasses = {
    blue: "text-blue-100",
    violet: "text-violet-100",
    green: "text-green-100",
    orange: "text-orange-100",
  };

  return (
    <div className="mb-10">

      <p className="text-zinc-500 text-lg">
        Bonjour 👋
      </p>

      <h1 className="text-5xl font-bold mt-2">
        💎 Patrimoine+
      </h1>

      <p className="text-zinc-400 mt-4 text-lg">
        Ton assistant financier intelligent
      </p>

      <div
        className={`
          mt-8
          rounded-3xl
          bg-gradient-to-r
          ${gradientClasses[accent]}
          p-8
          shadow-xl
          transition-all
          duration-300
        `}
      >

        <p className={textClasses[accent]}>
          Patrimoine total
        </p>

        <h2 className="text-6xl font-bold mt-2">
          {totalPatrimoine.toLocaleString("fr-FR")} €
        </h2>

        <p className={`${textClasses[accent]} mt-4`}>
          Bienvenue sur ton tableau de bord.
        </p>

      </div>

    </div>
  );
}