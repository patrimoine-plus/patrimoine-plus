export type InflationInputs = {
  montantActuel: number;
  tauxInflation: number; // en pourcentage
  dureeAnnees: number;
};

export type InflationDataPoint = {
  annee: number;
  pouvoirAchat: number;
};

export type InflationResult = {
  pouvoirAchatFinal: number;
  perteValeur: number;
  perteValeurPourcentage: number;
  montantEquivalentFutur: number;
  dataPoints: InflationDataPoint[];
};

export function computeInflation(inputs: InflationInputs): InflationResult {
  const { montantActuel, tauxInflation, dureeAnnees } = inputs;
  const taux = tauxInflation / 100;

  const dataPoints: InflationDataPoint[] = [];

  for (let annee = 0; annee <= dureeAnnees; annee++) {
    dataPoints.push({
      annee,
      pouvoirAchat: montantActuel / Math.pow(1 + taux, annee),
    });
  }

  const pouvoirAchatFinal = dataPoints[dataPoints.length - 1].pouvoirAchat;
  const perteValeur = montantActuel - pouvoirAchatFinal;

  const perteValeurPourcentage =
    montantActuel > 0 ? (perteValeur / montantActuel) * 100 : 0;

  const montantEquivalentFutur =
    montantActuel * Math.pow(1 + taux, dureeAnnees);

  return {
    pouvoirAchatFinal,
    perteValeur,
    perteValeurPourcentage,
    montantEquivalentFutur,
    dataPoints,
  };
}