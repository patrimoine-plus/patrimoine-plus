export type Snapshot = {
  date: string; // format "YYYY-MM-DD"
  totalPatrimoine: number;
  totalEpargne: number;
  totalInvestissementCompte: number;
  totalLiquidites: number;
  totalImmobilier: number;
  valeurPortefeuille: number;
};

export type PeriodFilter = "Mois" | "Trimestre" | "Année" | "Tout";