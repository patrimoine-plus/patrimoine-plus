export type Objective = {
  id: number;
  nom: string;
  montantCible: number;
  montantActuel: number;
  dateCible: string; // format "YYYY-MM-DD"
  icon: string;
};

export const OBJECTIVE_ICONS = [
  "🎯",
  "🚗",
  "🏠",
  "✈️",
  "💰",
  "👴",
  "🎓",
  "💍",
  "👶",
  "🐶",
] as const;