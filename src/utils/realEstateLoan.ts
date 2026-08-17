export type RealEstateLoanInputs = {
  prixBien: number;
  apport: number;
  tauxAnnuel: number; // en pourcentage
  dureeAnnees: number;
};

export type RealEstateLoanDataPoint = {
  annee: number;
  capitalRestant: number;
  interetsCumules: number;
  capitalRembourseCumule: number;
};

export type RealEstateLoanResult = {
  montantEmprunte: number;
  mensualite: number;
  coutTotalCredit: number; // total des intérêts payés
  coutTotalAvecCapital: number; // capital + intérêts
  dataPoints: RealEstateLoanDataPoint[];
};

export function computeRealEstateLoan(
  inputs: RealEstateLoanInputs
): RealEstateLoanResult {
  const { prixBien, apport, tauxAnnuel, dureeAnnees } = inputs;

  const montantEmprunte = Math.max(0, prixBien - apport);
  const n = Math.max(1, Math.round(dureeAnnees * 12));
  const r = tauxAnnuel / 100 / 12;

  const mensualite =
    r === 0
      ? montantEmprunte / n
      : (montantEmprunte * r) / (1 - Math.pow(1 + r, -n));

  let capitalRestant = montantEmprunte;
  let interetsCumules = 0;
  let capitalRembourseCumule = 0;

  const dataPoints: RealEstateLoanDataPoint[] = [
    { annee: 0, capitalRestant, interetsCumules, capitalRembourseCumule },
  ];

  for (let mois = 1; mois <= n; mois++) {
    const interet = capitalRestant * r;
    const principal = mensualite - interet;

    capitalRestant = Math.max(0, capitalRestant - principal);
    interetsCumules += interet;
    capitalRembourseCumule += principal;

    if (mois % 12 === 0 || mois === n) {
      dataPoints.push({
        annee: Math.round((mois / 12) * 10) / 10,
        capitalRestant,
        interetsCumules,
        capitalRembourseCumule,
      });
    }
  }

  return {
    montantEmprunte,
    mensualite,
    coutTotalCredit: interetsCumules,
    coutTotalAvecCapital: montantEmprunte + interetsCumules,
    dataPoints,
  };
}