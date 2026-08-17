export type TransactionType = "revenu" | "depense";

export const REVENU_CATEGORIES = ["Salaire", "Freelance", "Autres"] as const;

export const DEPENSE_CATEGORIES = [
  "Logement",
  "Alimentation",
  "Transport",
  "Loisirs",
  "Santé",
  "Autres",
] as const;

export type RevenuCategory = (typeof REVENU_CATEGORIES)[number];
export type DepenseCategory = (typeof DEPENSE_CATEGORIES)[number];
export type TransactionCategory = RevenuCategory | DepenseCategory;

export type Transaction = {
  id: number;
  name: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  icon: string;
};

export type TransactionFilter = "Tous" | "Revenus" | "Dépenses";