import { Account } from "../types/account";

const STORAGE_KEY = "accounts";

export function saveAccounts(accounts: Account[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(accounts));
}

export function loadAccounts(): Account[] | null {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as Account[];
  } catch {
    // Données corrompues dans le localStorage : on ignore plutôt que de crasher
    return null;
  }
}