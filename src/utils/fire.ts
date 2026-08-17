import { computeSavingsGoal, SavingsGoalDataPoint } from "./savingsGoal";

export type FireInputs = {
  depensesAnnuelles: number;
  tauxRetrait: number; // en pourcentage, 4 = règle des 4%
  capitalActuel: number;
  versementMensuel: number;
  tauxRendementAnnuel: number; // en pourcentage
  ageActuel: number;
};

export type FireResult = {
  patrimoineNecessaire: number;
  reachable: boolean;
  anneesNecessaires: number;
  moisRestants: number;
  ageIndependance: number | null;
  dataPoints: SavingsGoalDataPoint[];
};

export function computeFire(inputs: FireInputs): FireResult {
  const {
    depensesAnnuelles,
    tauxRetrait,
    capitalActuel,
    versementMensuel,
    tauxRendementAnnuel,
    ageActuel,
  } = inputs;

  const patrimoineNecessaire =
    tauxRetrait > 0 ? depensesAnnuelles / (tauxRetrait / 100) : 0;

  const savings = computeSavingsGoal({
    objectif: patrimoineNecessaire,
    capitalActuel,
    versementMensuel,
    tauxAnnuel: tauxRendementAnnuel,
  });

  const ageIndependance = savings.reachable
    ? Math.round(
        (ageActuel + savings.anneesNecessaires + savings.moisRestants / 12) *
          10
      ) / 10
    : null;

  return {
    patrimoineNecessaire,
    reachable: savings.reachable,
    anneesNecessaires: savings.anneesNecessaires,
    moisRestants: savings.moisRestants,
    ageIndependance,
    dataPoints: savings.dataPoints,
  };
}