export type Frequence = "mensuelle" | "annuelle";

export type CompoundInterestInputs = {
  capitalInitial: number;
  versementMensuel: number;
  tauxAnnuel: number; // en pourcentage, ex : 5 pour 5%
  dureeAnnees: number;
  frequence: Frequence;
};

export type CompoundInterestDataPoint = {
  annee: number;
  versements: number;
  interets: number;
  capital: number;
};

export type CompoundInterestResult = {
  dataPoints: CompoundInterestDataPoint[];
  capitalFinal: number;
  totalVersements: number;
  interetsGagnes: number;
};

export function computeCompoundInterest(
  inputs: CompoundInterestInputs
): CompoundInterestResult {
  const {
    capitalInitial,
    versementMensuel,
    tauxAnnuel,
    dureeAnnees,
    frequence,
  } = inputs;

  let capital = capitalInitial;
  let totalVersements = capitalInitial;

  const dataPoints: CompoundInterestDataPoint[] = [
    { annee: 0, versements: totalVersements, interets: 0, capital },
  ];

  const tauxMensuel = tauxAnnuel / 100 / 12;
  const tauxAnnuelDecimal = tauxAnnuel / 100;

  for (let annee = 1; annee <= dureeAnnees; annee++) {
    for (let mois = 1; mois <= 12; mois++) {
      capital += versementMensuel;
      totalVersements += versementMensuel;

      if (frequence === "mensuelle") {
        capital *= 1 + tauxMensuel;
      }
    }

    if (frequence === "annuelle") {
      capital *= 1 + tauxAnnuelDecimal;
    }

    dataPoints.push({
      annee,
      versements: totalVersements,
      interets: capital - totalVersements,
      capital,
    });
  }

  return {
    dataPoints,
    capitalFinal: capital,
    totalVersements,
    interetsGagnes: capital - totalVersements,
  };
}