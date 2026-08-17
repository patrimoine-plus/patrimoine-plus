import { Account, Category } from "../types/account";
import { Transaction } from "../types/transaction";
import { Investment } from "../types/investment";
import { Objective } from "../types/objective";
import { Snapshot } from "../types/snapshot";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const eur = (n: number) =>
  `${n.toLocaleString("fr-FR", { maximumFractionDigits: 0 })} €`;

export function answerPatrimoineEvolution(snapshots: Snapshot[]): string {
  if (snapshots.length < 2) {
    return "Je n'ai pas encore assez d'historique pour te répondre précisément. Rends-toi sur la page Statistiques : chaque visite enregistre un instantané de ton patrimoine, et je pourrai bientôt te dire comment il évolue.";
  }

  const premier = snapshots[0];
  const dernier = snapshots[snapshots.length - 1];

  const variation = dernier.totalPatrimoine - premier.totalPatrimoine;
  const pourcentage =
    premier.totalPatrimoine > 0
      ? (variation / premier.totalPatrimoine) * 100
      : 0;

  const tendance =
    variation > 0 ? "en hausse 📈" : variation < 0 ? "en baisse 📉" : "stable";

  return `Depuis le ${formatDate(premier.date)}, ton patrimoine est passé de ${eur(
    premier.totalPatrimoine
  )} à ${eur(dernier.totalPatrimoine)}. Il est ${tendance} de ${eur(
    Math.abs(variation)
  )} (${pourcentage >= 0 ? "+" : ""}${pourcentage.toFixed(1)}%) sur cette période.`;
}

export function answerSavingsRate(transactions: Transaction[]): string {
  const revenus = transactions
    .filter((t) => t.type === "revenu")
    .reduce((sum, t) => sum + t.amount, 0);

  const depenses = transactions
    .filter((t) => t.type === "depense")
    .reduce((sum, t) => sum + t.amount, 0);

  if (revenus === 0) {
    return "Je ne trouve aucun revenu enregistré dans Budget, donc je ne peux pas calculer ton taux d'épargne. Ajoute tes revenus dans la page Budget pour que je puisse t'aider sur ce point.";
  }

  const tauxEpargne = ((revenus - depenses) / revenus) * 100;

  let verdict: string;

  if (tauxEpargne < 0) {
    verdict =
      "C'est un point d'attention important ⚠️ : tes dépenses dépassent tes revenus enregistrés. Vérifie ton Budget pour identifier où réduire.";
  } else if (tauxEpargne < 10) {
    verdict =
      "C'est plutôt faible. Les recommandations générales visent souvent 10 à 20% : essaie d'identifier des postes de dépenses à réduire progressivement.";
  } else if (tauxEpargne < 20) {
    verdict =
      "C'est un bon rythme, dans la fourchette généralement recommandée (10-20%).";
  } else {
    verdict = "C'est excellent, bien au-dessus de la moyenne recommandée !";
  }

  return `Avec ${eur(revenus)} de revenus et ${eur(
    depenses
  )} de dépenses enregistrés, ton taux d'épargne actuel est de ${tauxEpargne.toFixed(
    0
  )}%. ${verdict}`;
}

export function answerRepartition(accounts: Account[]): string {
  const total = accounts.reduce((sum, a) => sum + a.amount, 0);

  if (total === 0) {
    return "Tu n'as pas encore de compte enregistré. Ajoute tes comptes dans la page Comptes pour que je puisse analyser la répartition de ton patrimoine.";
  }

  const categories: Category[] = [
    "Épargne",
    "Investissement",
    "Liquidités",
    "Immobilier",
  ];

  const parts = categories
    .map((cat) => {
      const montant = accounts
        .filter((a) => a.category === cat)
        .reduce((sum, a) => sum + a.amount, 0);

      const pct = (montant / total) * 100;

      return { cat, montant, pct };
    })
    .filter((p) => p.montant > 0)
    .sort((a, b) => b.montant - a.montant);

  const detail = parts
    .map((p) => `${p.cat} ${p.pct.toFixed(0)}% (${eur(p.montant)})`)
    .join(", ");

  const dominant = parts[0];

  return `Ton patrimoine total est de ${eur(
    total
  )}, réparti ainsi : ${detail}. La part la plus importante est en ${
    dominant.cat
  } (${dominant.pct.toFixed(0)}%).`;
}

export function answerObjectives(objectives: Objective[]): string {
  if (objectives.length === 0) {
    return "Tu n'as pas encore créé d'objectif. Rends-toi dans la page Objectifs pour définir ton premier projet financier (voyage, achat, épargne...).";
  }

  const today = new Date().toISOString().slice(0, 10);

  const atteints = objectives.filter((o) => o.montantActuel >= o.montantCible);
  const enRetard = objectives.filter(
    (o) => o.montantActuel < o.montantCible && o.dateCible < today
  );
  const enCours = objectives.filter(
    (o) => o.montantActuel < o.montantCible && o.dateCible >= today
  );

  const prochain = [...enCours].sort((a, b) =>
    a.dateCible.localeCompare(b.dateCible)
  )[0];

  let texte = `Tu as ${objectives.length} objectif${
    objectives.length > 1 ? "s" : ""
  } au total : ${atteints.length} atteint${
    atteints.length > 1 ? "s" : ""
  } 🎉, ${enCours.length} en cours, et ${enRetard.length} en retard sur leur échéance.`;

  if (prochain) {
    const pct = (prochain.montantActuel / prochain.montantCible) * 100;

    texte += ` Ton prochain objectif à échéance est "${
      prochain.nom
    }" (${pct.toFixed(0)}% atteint, échéance le ${formatDate(
      prochain.dateCible
    )}).`;
  }

  return texte;
}

export function answerInvestmentPerformance(investments: Investment[]): string {
  if (investments.length === 0) {
    return "Tu n'as pas encore d'investissement enregistré. Ajoute-en dans la page Investissements pour que je puisse analyser leurs performances.";
  }

  const withPerf = investments.map((i) => {
    const gain = i.valeurActuelle - i.montantInvesti;
    const pct = i.montantInvesti > 0 ? (gain / i.montantInvesti) * 100 : 0;
    return { ...i, gain, pct };
  });

  const meilleur = [...withPerf].sort((a, b) => b.pct - a.pct)[0];
  const pire = [...withPerf].sort((a, b) => a.pct - b.pct)[0];

  const valeurTotale = investments.reduce((s, i) => s + i.valeurActuelle, 0);
  const investiTotal = investments.reduce((s, i) => s + i.montantInvesti, 0);
  const perfGlobale =
    investiTotal > 0
      ? ((valeurTotale - investiTotal) / investiTotal) * 100
      : 0;

  let texte = `Ton portefeuille affiche une performance globale de ${
    perfGlobale >= 0 ? "+" : ""
  }${perfGlobale.toFixed(1)}% (valeur actuelle ${eur(valeurTotale)} pour ${eur(
    investiTotal
  )} investis).`;

  texte += ` Ta meilleure performance est "${meilleur.name}" (${
    meilleur.pct >= 0 ? "+" : ""
  }${meilleur.pct.toFixed(1)}%).`;

  if (investments.length > 1 && pire.id !== meilleur.id) {
    texte += ` À l'inverse, "${pire.name}" affiche ${
      pire.pct >= 0 ? "+" : ""
    }${pire.pct.toFixed(1)}%.`;
  }

  return texte;
}

export function answerAttentionPoints(data: {
  accounts: Account[];
  transactions: Transaction[];
  investments: Investment[];
  objectives: Objective[];
}): string {
  const { accounts, transactions, investments, objectives } = data;
  const points: string[] = [];

  const totalPatrimoine = accounts.reduce((s, a) => s + a.amount, 0);

  if (totalPatrimoine > 0) {
    const liquidites = accounts
      .filter((a) => a.category === "Liquidités")
      .reduce((s, a) => s + a.amount, 0);

    if (liquidites / totalPatrimoine >= 0.3) {
      points.push(
        `💵 ${((liquidites / totalPatrimoine) * 100).toFixed(
          0
        )}% de ton patrimoine dort en liquidités, sans rapporter d'intérêts.`
      );
    }
  }

  const revenus = transactions
    .filter((t) => t.type === "revenu")
    .reduce((s, t) => s + t.amount, 0);
  const depenses = transactions
    .filter((t) => t.type === "depense")
    .reduce((s, t) => s + t.amount, 0);

  if (revenus > 0 && depenses > revenus) {
    points.push(
      "⚠️ Tes dépenses enregistrées dépassent tes revenus dans Budget."
    );
  }

  const investissementNegatif = investments.filter(
    (i) => i.valeurActuelle < i.montantInvesti
  );

  if (investissementNegatif.length > 0) {
    points.push(
      `📉 ${investissementNegatif.length} investissement${
        investissementNegatif.length > 1 ? "s sont" : " est"
      } actuellement en moins-value.`
    );
  }

  const today = new Date().toISOString().slice(0, 10);
  const objectifsEnRetard = objectives.filter(
    (o) => o.montantActuel < o.montantCible && o.dateCible < today
  );

  if (objectifsEnRetard.length > 0) {
    points.push(
      `🎯 ${objectifsEnRetard.length} objectif${
        objectifsEnRetard.length > 1 ? "s ont" : " a"
      } dépassé leur échéance sans être atteint${
        objectifsEnRetard.length > 1 ? "s" : ""
      }.`
    );
  }

  if (points.length === 0) {
    return "Je n'ai rien détecté de problématique dans tes données actuelles. Continue comme ça ! 👍";
  }

  return `Voici ce que j'ai repéré : \n\n${points.join("\n\n")}`;
}