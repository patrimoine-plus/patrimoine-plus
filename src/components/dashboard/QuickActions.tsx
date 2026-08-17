"use client";

import Link from "next/link";

type Props = {
  onAddAccount: () => void;
};

export default function QuickActions({ onAddAccount }: Props) {
  const scrollToRepartition = () => {
    document
      .getElementById("repartition")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-5">
        ⚡ Actions rapides
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-5">

        {/* Ajouter un compte */}
        <button
          onClick={onAddAccount}
          className="
            accent-bg
            rounded-2xl
            p-6
            hover:opacity-90
            hover:-translate-y-1
            transition
            shadow-lg
            text-left
            border
            border-transparent
          "
        >
          <div className="text-4xl mb-4">
            ➕
          </div>

          <h3 className="font-bold text-lg">
            Ajouter
          </h3>

          <p className="text-white/80 text-sm mt-1">
            Ajouter un nouveau compte.
          </p>
        </button>

        {/* Répartition */}
        <button
          onClick={scrollToRepartition}
          className="
            bg-zinc-900
            rounded-2xl
            p-6
            hover:bg-zinc-800
            hover:-translate-y-1
            transition
            shadow-lg
            text-left
            border
            border-zinc-800
          "
        >
          <div className="text-4xl mb-4">
            📊
          </div>

          <h3 className="font-bold text-lg">
            Répartition
          </h3>

          <p className="text-zinc-400 text-sm mt-1">
            Voir la répartition du patrimoine.
          </p>
        </button>

        {/* Simulateurs */}
        <Link
          href="/simulateurs"
          className="
            bg-zinc-900
            rounded-2xl
            p-6
            hover:bg-zinc-800
            hover:-translate-y-1
            transition
            shadow-lg
            text-left
            border
            border-zinc-800
            block
          "
        >
          <div className="text-4xl mb-4">
            🧮
          </div>

          <h3 className="font-bold text-lg">
            Simulateurs
          </h3>

          <p className="text-zinc-400 text-sm mt-1">
            Tester différents scénarios.
          </p>
        </Link>

        {/* Objectifs */}
        <Link
          href="/objectifs"
          className="
            bg-zinc-900
            rounded-2xl
            p-6
            hover:bg-zinc-800
            hover:-translate-y-1
            transition
            shadow-lg
            text-left
            border
            border-zinc-800
            block
          "
        >
          <div className="text-4xl mb-4">
            🎯
          </div>

          <h3 className="font-bold text-lg">
            Objectifs
          </h3>

          <p className="text-zinc-400 text-sm mt-1">
            Suivre tes projets financiers.
          </p>
        </Link>

        {/* Assistant IA */}
        <Link
          href="/assistant-ia"
          className="
            bg-zinc-900
            rounded-2xl
            p-6
            hover:bg-zinc-800
            hover:-translate-y-1
            transition
            shadow-lg
            text-left
            border
            border-zinc-800
            block
          "
        >
          <div className="text-4xl mb-4">
            🤖
          </div>

          <h3 className="font-bold text-lg">
            Assistant IA
          </h3>

          <p className="text-zinc-400 text-sm mt-1">
            Obtenir une analyse personnalisée.
          </p>
        </Link>

      </div>
    </div>
  );
}