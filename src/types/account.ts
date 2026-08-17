
export type Category =
  | "Épargne"
  | "Investissement"
  | "Liquidités"
  | "Immobilier";

export type FilterCategory = "Tous" | Category;

export type SortOption =
  | "amount-desc"
  | "amount-asc"
  | "name-asc"
  | "name-desc";

export type Account = {
  id: number;
  name: string;
  amount: number;
  category: Category;
  icon: string;
};