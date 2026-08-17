"use client";

import { useMemo, useState } from "react";

import Sidebar from "../../components/Sidebar";

import SimulatorSelector, {
  SimulatorId,
} from "../../components/simulators/SimulatorSelector";
import CompoundInterestForm from "../../components/simulators/CompoundInterestForm";
import CompoundInterestResults from "../../components/simulators/CompoundInterestResults";
import CompoundInterestChart from "../../components/simulators/CompoundInterestChart";
import SavingsGoalForm from "../../components/simulators/SavingsGoalForm";
import SavingsGoalResults from "../../components/simulators/SavingsGoalResults";
import SavingsGoalChart from "../../components/simulators/SavingsGoalChart";
import RealEstateLoanForm from "../../components/simulators/RealEstateLoanForm";
import RealEstateLoanResults from "../../components/simulators/RealEstateLoanResults";
import RealEstateLoanChart from "../../components/simulators/RealEstateLoanChart";
import FireForm from "../../components/simulators/FireForm";
import FireResults from "../../components/simulators/FireResults";
import RetirementForm from "../../components/simulators/RetirementForm";
import RetirementResults from "../../components/simulators/RetirementResults";
import InflationForm from "../../components/simulators/InflationForm";
import InflationResults from "../../components/simulators/InflationResults";
import InflationChart from "../../components/simulators/InflationChart";

import {
  computeCompoundInterest,
  Frequence,
} from "../../utils/compoundInterest";
import { computeSavingsGoal } from "../../utils/savingsGoal";
import { computeRealEstateLoan } from "../../utils/realEstateLoan";
import { computeFire } from "../../utils/fire";
import { computeRetirement } from "../../utils/retirement";
import { computeInflation } from "../../utils/inflation";

export default function SimulateursPage() {
  const [selected, setSelected] = useState<SimulatorId>("interets");

  const [capitalInitial, setCapitalInitial] = useState("1000");
  const [versementMensuel, setVersementMensuel] = useState("200");
  const [tauxAnnuel, setTauxAnnuel] = useState("5");
  const [dureeAnnees, setDureeAnnees] = useState("20");
  const [frequence, setFrequence] = useState<Frequence>("mensuelle");

  const result = useMemo(() => {
    return computeCompoundInterest({
      capitalInitial: Number(capitalInitial) || 0,
      versementMensuel: Number(versementMensuel) || 0,
      tauxAnnuel: Number(tauxAnnuel) || 0,
      dureeAnnees: Math.max(1, Number(dureeAnnees) || 1),
      frequence,
    });
  }, [capitalInitial, versementMensuel, tauxAnnuel, dureeAnnees, frequence]);

  const [objectif, setObjectif] = useState("50000");
  const [capitalActuelEpargne, setCapitalActuelEpargne] = useState("10000");
  const [versementMensuelEpargne, setVersementMensuelEpargne] =
    useState("500");
  const [tauxAnnuelEpargne, setTauxAnnuelEpargne] = useState("0");

  const savingsResult = useMemo(() => {
    return computeSavingsGoal({
      objectif: Number(objectif) || 0,
      capitalActuel: Number(capitalActuelEpargne) || 0,
      versementMensuel: Number(versementMensuelEpargne) || 0,
      tauxAnnuel: Number(tauxAnnuelEpargne) || 0,
    });
  }, [objectif, capitalActuelEpargne, versementMensuelEpargne, tauxAnnuelEpargne]);

  const [prixBien, setPrixBien] = useState("250000");
  const [apport, setApport] = useState("25000");
  const [tauxAnnuelImmo, setTauxAnnuelImmo] = useState("3.5");
  const [dureeAnneesImmo, setDureeAnneesImmo] = useState("25");

  const loanResult = useMemo(() => {
    return computeRealEstateLoan({
      prixBien: Number(prixBien) || 0,
      apport: Number(apport) || 0,
      tauxAnnuel: Number(tauxAnnuelImmo) || 0,
      dureeAnnees: Math.max(1, Number(dureeAnneesImmo) || 1),
    });
  }, [prixBien, apport, tauxAnnuelImmo, dureeAnneesImmo]);

  const [depensesAnnuelles, setDepensesAnnuelles] = useState("24000");
  const [tauxRetrait, setTauxRetrait] = useState("4");
  const [capitalActuelFire, setCapitalActuelFire] = useState("15000");
  const [versementMensuelFire, setVersementMensuelFire] = useState("600");
  const [tauxRendementFire, setTauxRendementFire] = useState("6");
  const [ageActuelFire, setAgeActuelFire] = useState("30");

  const fireResult = useMemo(() => {
    return computeFire({
      depensesAnnuelles: Number(depensesAnnuelles) || 0,
      tauxRetrait: Number(tauxRetrait) || 4,
      capitalActuel: Number(capitalActuelFire) || 0,
      versementMensuel: Number(versementMensuelFire) || 0,
      tauxRendementAnnuel: Number(tauxRendementFire) || 0,
      ageActuel: Number(ageActuelFire) || 0,
    });
  }, [
    depensesAnnuelles,
    tauxRetrait,
    capitalActuelFire,
    versementMensuelFire,
    tauxRendementFire,
    ageActuelFire,
  ]);

  const [ageActuelRetraite, setAgeActuelRetraite] = useState("30");
  const [ageRetraite, setAgeRetraite] = useState("64");
  const [capitalActuelRetraite, setCapitalActuelRetraite] = useState("15000");
  const [versementMensuelRetraite, setVersementMensuelRetraite] =
    useState("300");
  const [tauxRendementRetraite, setTauxRendementRetraite] = useState("6");
  const [tauxRetraitRetraite, setTauxRetraitRetraite] = useState("4");

  const retirementResult = useMemo(() => {
    return computeRetirement({
      ageActuel: Number(ageActuelRetraite) || 0,
      ageRetraite: Number(ageRetraite) || 0,
      capitalActuel: Number(capitalActuelRetraite) || 0,
      versementMensuel: Number(versementMensuelRetraite) || 0,
      tauxRendementAnnuel: Number(tauxRendementRetraite) || 0,
      tauxRetraitRetraite: Number(tauxRetraitRetraite) || 0,
    });
  }, [
    ageActuelRetraite,
    ageRetraite,
    capitalActuelRetraite,
    versementMensuelRetraite,
    tauxRendementRetraite,
    tauxRetraitRetraite,
  ]);

  const [montantActuelInflation, setMontantActuelInflation] =
    useState("10000");
  const [tauxInflation, setTauxInflation] = useState("2");
  const [dureeAnneesInflation, setDureeAnneesInflation] = useState("20");

  const inflationResult = useMemo(() => {
    return computeInflation({
      montantActuel: Number(montantActuelInflation) || 0,
      tauxInflation: Number(tauxInflation) || 0,
      dureeAnnees: Math.max(1, Number(dureeAnneesInflation) || 1),
    });
  }, [montantActuelInflation, tauxInflation, dureeAnneesInflation]);

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-10">
        <h2 className="text-3xl font-bold mb-2">🧮 Simulateurs</h2>

        <p className="text-zinc-500">
          Teste différents scénarios financiers.
        </p>

        <SimulatorSelector selected={selected} onSelect={setSelected} />

        {selected === "interets" && (
          <>
            <CompoundInterestForm
              capitalInitial={capitalInitial}
              versementMensuel={versementMensuel}
              tauxAnnuel={tauxAnnuel}
              dureeAnnees={dureeAnnees}
              frequence={frequence}
              onCapitalInitialChange={setCapitalInitial}
              onVersementMensuelChange={setVersementMensuel}
              onTauxAnnuelChange={setTauxAnnuel}
              onDureeAnneesChange={setDureeAnnees}
              onFrequenceChange={setFrequence}
            />

            <CompoundInterestResults
              totalVersements={result.totalVersements}
              interetsGagnes={result.interetsGagnes}
              capitalFinal={result.capitalFinal}
            />

            <CompoundInterestChart data={result.dataPoints} />
          </>
        )}

        {selected === "epargne" && (
          <>
            <SavingsGoalForm
              objectif={objectif}
              capitalActuel={capitalActuelEpargne}
              versementMensuel={versementMensuelEpargne}
              tauxAnnuel={tauxAnnuelEpargne}
              onObjectifChange={setObjectif}
              onCapitalActuelChange={setCapitalActuelEpargne}
              onVersementMensuelChange={setVersementMensuelEpargne}
              onTauxAnnuelChange={setTauxAnnuelEpargne}
            />

            <SavingsGoalResults
              reachable={savingsResult.reachable}
              anneesNecessaires={savingsResult.anneesNecessaires}
              moisRestants={savingsResult.moisRestants}
              capitalFinal={savingsResult.capitalFinal}
              objectif={Number(objectif) || 0}
            />

            {savingsResult.reachable && (
              <SavingsGoalChart
                data={savingsResult.dataPoints}
                objectif={Number(objectif) || 0}
              />
            )}
          </>
        )}

        {selected === "immobilier" && (
          <>
            <RealEstateLoanForm
              prixBien={prixBien}
              apport={apport}
              tauxAnnuel={tauxAnnuelImmo}
              dureeAnnees={dureeAnneesImmo}
              onPrixBienChange={setPrixBien}
              onApportChange={setApport}
              onTauxAnnuelChange={setTauxAnnuelImmo}
              onDureeAnneesChange={setDureeAnneesImmo}
            />

            <RealEstateLoanResults
              montantEmprunte={loanResult.montantEmprunte}
              mensualite={loanResult.mensualite}
              coutTotalCredit={loanResult.coutTotalCredit}
              coutTotalAvecCapital={loanResult.coutTotalAvecCapital}
            />

            <RealEstateLoanChart data={loanResult.dataPoints} />
          </>
        )}

        {selected === "fire" && (
          <>
            <FireForm
              depensesAnnuelles={depensesAnnuelles}
              tauxRetrait={tauxRetrait}
              capitalActuel={capitalActuelFire}
              versementMensuel={versementMensuelFire}
              tauxRendementAnnuel={tauxRendementFire}
              ageActuel={ageActuelFire}
              onDepensesAnnuellesChange={setDepensesAnnuelles}
              onTauxRetraitChange={setTauxRetrait}
              onCapitalActuelChange={setCapitalActuelFire}
              onVersementMensuelChange={setVersementMensuelFire}
              onTauxRendementAnnuelChange={setTauxRendementFire}
              onAgeActuelChange={setAgeActuelFire}
            />

            <FireResults
              patrimoineNecessaire={fireResult.patrimoineNecessaire}
              reachable={fireResult.reachable}
              anneesNecessaires={fireResult.anneesNecessaires}
              moisRestants={fireResult.moisRestants}
              ageIndependance={fireResult.ageIndependance}
            />

            {fireResult.reachable && (
              <SavingsGoalChart
                data={fireResult.dataPoints}
                objectif={fireResult.patrimoineNecessaire}
              />
            )}
          </>
        )}

        {selected === "retraite" && (
          <>
            <RetirementForm
              ageActuel={ageActuelRetraite}
              ageRetraite={ageRetraite}
              capitalActuel={capitalActuelRetraite}
              versementMensuel={versementMensuelRetraite}
              tauxRendementAnnuel={tauxRendementRetraite}
              tauxRetraitRetraite={tauxRetraitRetraite}
              onAgeActuelChange={setAgeActuelRetraite}
              onAgeRetraiteChange={setAgeRetraite}
              onCapitalActuelChange={setCapitalActuelRetraite}
              onVersementMensuelChange={setVersementMensuelRetraite}
              onTauxRendementAnnuelChange={setTauxRendementRetraite}
              onTauxRetraitRetraiteChange={setTauxRetraitRetraite}
            />

            <RetirementResults
              capitalFinal={retirementResult.capitalFinal}
              revenuMensuelPotentiel={retirementResult.revenuMensuelPotentiel}
              revenuAnnuelPotentiel={retirementResult.revenuAnnuelPotentiel}
              dureeAnnees={retirementResult.dureeAnnees}
            />

            <CompoundInterestChart data={retirementResult.dataPoints} />
          </>
        )}

        {selected === "inflation" && (
          <>
            <InflationForm
              montantActuel={montantActuelInflation}
              tauxInflation={tauxInflation}
              dureeAnnees={dureeAnneesInflation}
              onMontantActuelChange={setMontantActuelInflation}
              onTauxInflationChange={setTauxInflation}
              onDureeAnneesChange={setDureeAnneesInflation}
            />

            <InflationResults
              montantActuel={Number(montantActuelInflation) || 0}
              pouvoirAchatFinal={inflationResult.pouvoirAchatFinal}
              perteValeur={inflationResult.perteValeur}
              perteValeurPourcentage={inflationResult.perteValeurPourcentage}
              montantEquivalentFutur={inflationResult.montantEquivalentFutur}
            />

            <InflationChart data={inflationResult.dataPoints} />
          </>
        )}
      </div>
    </main>
  );
}