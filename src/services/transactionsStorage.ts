import { Transaction } from "../types/transaction";

const STORAGE_KEY = "transactions";

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

export function loadTransactions(): Transaction[] | null {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as Transaction[];
  } catch {
    return null;
  }
}