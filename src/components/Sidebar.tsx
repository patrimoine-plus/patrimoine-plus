"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Wallet,
  PiggyBank,
  TrendingUp,
  BarChart3,
  Calculator,
  Target,
  Bot,
  Settings,
  Menu,
  X,
  LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  enabled: boolean;
};

const navItems: NavItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home,
    enabled: true,
  },
  {
    label: "Comptes",
    href: "/comptes",
    icon: Wallet,
    enabled: true,
  },
  {
    label: "Budget",
    href: "/budget",
    icon: PiggyBank,
    enabled: true,
  },
  {
    label: "Investissements",
    href: "/investissements",
    icon: TrendingUp,
    enabled: true,
  },
  {
    label: "Statistiques",
    href: "/statistiques",
    icon: BarChart3,
    enabled: true,
  },
  {
    label: "Simulateurs",
    href: "/simulateurs",
    icon: Calculator,
    enabled: true,
  },
  {
    label: "Objectifs",
    href: "/objectifs",
    icon: Target,
    enabled: true,
  },
  {
    label: "Assistant IA",
    href: "/assistant-ia",
    icon: Bot,
    enabled: true,
  },
  {
    label: "Paramètres",
    href: "/parametres",
    icon: Settings,
    enabled: true,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* =====================================================
          Bouton menu mobile
      ===================================================== */}

      <button
        onClick={() => setIsOpen(true)}
        className="
          fixed
          top-4
          left-4
          z-40
          md:hidden
          bg-zinc-900
          text-white
          rounded-xl
          p-3
          shadow-lg
          border
          border-zinc-800
        "
        aria-label="Ouvrir le menu"
      >
        <Menu size={22} />
      </button>

      {/* =====================================================
          Fond sombre derrière le menu mobile
      ===================================================== */}

      {isOpen && (
        <button
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            z-40
            bg-black/60
            md:hidden
          "
          aria-label="Fermer le menu"
        />
      )}

      {/* =====================================================
          Sidebar
      ===================================================== */}

      <aside
        className={`
          fixed
          md:sticky
          top-0
          left-0
          z-50
          w-64
          h-screen
          bg-zinc-900
          text-white
          p-6
          overflow-y-auto
          shrink-0

          transform
          transition-transform
          duration-300

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }

          md:translate-x-0
        `}
      >
        {/* ===================================================
            Header Sidebar
        =================================================== */}

        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">
            💎 Patrimoine+
          </h2>

          <button
            onClick={closeSidebar}
            className="
              md:hidden
              text-zinc-400
              hover:text-white
              transition
            "
            aria-label="Fermer le menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* ===================================================
            Navigation
        =================================================== */}

        <nav className="space-y-2">
          {navItems.map(
            ({
              label,
              href,
              icon: Icon,
              enabled,
            }) => {
              const isActive = pathname === href;

              if (!enabled) {
                return (
                  <div
                    key={label}
                    className="
                      flex
                      items-center
                      justify-between
                      gap-3
                      rounded-xl
                      px-3
                      py-2
                      text-zinc-600
                      cursor-not-allowed
                    "
                  >
                    <span className="flex items-center gap-3">
                      <Icon size={18} />
                      {label}
                    </span>

                    <span
                      className="
                        text-[10px]
                        bg-zinc-800
                        text-zinc-500
                        px-2
                        py-0.5
                        rounded-full
                      "
                    >
                      Bientôt
                    </span>
                  </div>
                );
              }

              return (
                <Link
                  key={label}
                  href={href}
                  onClick={closeSidebar}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2
                    transition

                    ${
                      isActive
                        ? "bg-[var(--accent-color)] text-white"
                        : "hover:bg-zinc-800 text-zinc-300"
                    }
                  `}
                >
                  <Icon size={18} />

                  {label}
                </Link>
              );
            }
          )}
        </nav>
      </aside>
    </>
  );
}