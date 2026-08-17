"use client";

import { useEffect } from "react";

const STORAGE_KEY = "patrimoine-appearance";
const THEME_EVENT = "patrimoine-theme-change";

type Theme = "dark" | "light" | "system";
type Accent = "blue" | "violet" | "green" | "orange";
type Layout = "standard" | "compact" | "spacious";

function applyTheme(theme: Theme) {
  const root = document.documentElement;

  let finalTheme: "dark" | "light";

  if (theme === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    finalTheme = prefersDark ? "dark" : "light";
  } else {
    finalTheme = theme;
  }

  root.classList.remove("dark", "light");
  root.classList.add(finalTheme);
}

function applyAccent(accent: Accent) {
  const root = document.documentElement;

  root.classList.remove(
    "accent-blue",
    "accent-violet",
    "accent-green",
    "accent-orange"
  );

  root.classList.add(`accent-${accent}`);
}

function applyLayout(layout: Layout) {
  const root = document.documentElement;

  root.classList.remove(
    "layout-standard",
    "layout-compact",
    "layout-spacious"
  );

  root.classList.add(`layout-${layout}`);
}

export default function ThemeProvider() {
  useEffect(() => {
    const loadAppearance = () => {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (!saved) {
        applyTheme("dark");
        applyAccent("blue");
        applyLayout("standard");
        return;
      }

      try {
        const settings = JSON.parse(saved);

        // =========================
        // Thème
        // =========================

        if (
          settings.theme === "dark" ||
          settings.theme === "light" ||
          settings.theme === "system"
        ) {
          applyTheme(settings.theme);
        } else {
          applyTheme("dark");
        }

        // =========================
        // Couleur principale
        // =========================

        if (
          settings.accent === "blue" ||
          settings.accent === "violet" ||
          settings.accent === "green" ||
          settings.accent === "orange"
        ) {
          applyAccent(settings.accent);
        } else {
          applyAccent("blue");
        }

        // =========================
        // Mise en page
        // =========================

        if (
          settings.layout === "standard" ||
          settings.layout === "compact" ||
          settings.layout === "spacious"
        ) {
          applyLayout(settings.layout);
        } else {
          applyLayout("standard");
        }
      } catch {
        applyTheme("dark");
        applyAccent("blue");
        applyLayout("standard");
      }
    };

    loadAppearance();

    window.addEventListener(
      THEME_EVENT,
      loadAppearance
    );

    return () => {
      window.removeEventListener(
        THEME_EVENT,
        loadAppearance
      );
    };
  }, []);

  return null;
}