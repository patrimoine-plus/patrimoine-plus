import { Transaction } from "../types/transaction";

export const transactions: Transaction[] = [
  {
    id: 1,
    name: "Salaire",
    amount: 2400,
    type: "revenu",
    category: "Salaire",
    icon: "💼",
  },
  {
    id: 2,
    name: "Loyer",
    amount: 750,
    type: "depense",
    category: "Logement",
    icon: "🏠",
  },
  {
    id: 3,
    name: "Courses",
    amount: 320,
    type: "depense",
    category: "Alimentation",
    icon: "🍽️",
  },
  {
    id: 4,
    name: "Abonnement transport",
    amount: 75,
    type: "depense",
    category: "Transport",
    icon: "🚗",
  },
];