export type SavingsGoalInputs = {
  objectif: number;
  capitalActuel: number;
  versementMensuel: number;
  tauxAnnuel: number; // en pourcentage, 0 = pas d'intérêts
};

export type SavingsGoalDataPoint = {
  mois: number;
  capital: number;
};

export type SavingsGoalResult = {
  reachable: boolean;
  moisNecessaires: number | null;
  anneesNecessaires: number;
  moisRestants: number;
  capitalFinal: number;
  dataPoints: SavingsGoalDataPoint[];
};

const MAX_MOIS = 1200; // plafond de sécurité : 100 ans

export function computeSavingsGoal(
  inputs: SavingsGoalInputs
): SavingsGoalResult {
  const { objectif, capitalActuel, versementMensuel, tauxAnnuel } = inputs;
  const tauxMensuel = tauxAnnuel / 100 / 12;

  let capital = capitalActuel;
  const dataPoints: SavingsGoalDataPoint[] = [{ mois: 0, capital }];

  if (capital >= objectif) {
    return {
      reachable: true,
      moisNecessaires: 0,
      anneesNecessaires: 0,
      moisRestants: 0,
      capitalFinal: capital,
      dataPoints,
    };
  }

  let mois = 0;

  while (capital < objectif && mois < MAX_MOIS) {
    capital = capital * (1 + tauxMensuel) + versementMensuel;
    mois++;
    dataPoints.push({ mois, capital });
  }

  const reachable = capital >= objectif;

  return {
    reachable,
    moisNecessaires: reachable ? mois : null,
    anneesNecessaires: reachable ? Math.floor(mois / 12) : 0,
    moisRestants: reachable ? mois % 12 : 0,
    capitalFinal: capital,
    dataPoints,
  };
}