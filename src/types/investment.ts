export type AssetType = "ETF" | "Action" | "Obligation" | "Autre";

export type FilterAssetType = "Tous" | AssetType;

export type Investment = {
  id: number;
  name: string;
  assetType: AssetType;
  montantInvesti: number;
  valeurActuelle: number;
  icon: string;
};