import {
  computeCompoundInterest,
  CompoundInterestDataPoint,
} from "./compoundInterest";

export type RetirementInputs = {
  ageActuel: number;
  ageRetraite: number;
  capitalActuel: number;
  versementMensuel: number;
  tauxRendementAnnuel: number;
  tauxRetraitRetraite: number; // % pour convertir le capital en revenu annuel
};

export type RetirementResult = {
  dureeAnnees: number;
  capitalFinal: number;
  totalVersements: number;
  interetsGagnes: number;
  revenuAnnuelPotentiel: number;
  revenuMensuelPotentiel: number;
  dataPoints: CompoundInterestDataPoint[];
};

export function computeRetirement(
  inputs: RetirementInputs
): RetirementResult {
  const {
    ageActuel,
    ageRetraite,
    capitalActuel,
    versementMensuel,
    tauxRendementAnnuel,
    tauxRetraitRetraite,
  } = inputs;

  const dureeAnnees = Math.max(1, ageRetraite - ageActuel);

  const result = computeCompoundInterest({
    capitalInitial: capitalActuel,
    versementMensuel,
    tauxAnnuel: tauxRendementAnnuel,
    dureeAnnees,
    frequence: "mensuelle",
  });

  const revenuAnnuelPotentiel =
    result.capitalFinal * (tauxRetraitRetraite / 100);
  const revenuMensuelPotentiel = revenuAnnuelPotentiel / 12;

  return {
    dureeAnnees,
    capitalFinal: result.capitalFinal,
    totalVersements: result.totalVersements,
    interetsGagnes: result.interetsGagnes,
    revenuAnnuelPotentiel,
    revenuMensuelPotentiel,
    dataPoints: result.dataPoints,
  };
}