import { Investment } from "../types/investment";

const STORAGE_KEY = "investments";

export function saveInvestments(investments: Investment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(investments));
}

export function loadInvestments(): Investment[] | null {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as Investment[];
  } catch {
    return null;
  }
}