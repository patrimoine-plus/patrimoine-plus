import { Snapshot } from "../types/snapshot";

const STORAGE_KEY = "snapshots";

export function loadSnapshots(): Snapshot[] {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return [];

  try {
    return JSON.parse(data) as Snapshot[];
  } catch {
    return [];
  }
}

function saveSnapshots(snapshots: Snapshot[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots));
}

// Enregistre (ou met à jour si déjà fait aujourd'hui) un snapshot du jour,
// puis retourne l'historique complet à jour.
export function recordSnapshot(
  snapshot: Omit<Snapshot, "date">
): Snapshot[] {
  const today = new Date().toISOString().slice(0, 10);
  const snapshots = loadSnapshots();
  const existingIndex = snapshots.findIndex((s) => s.date === today);

  const newSnapshot: Snapshot = { date: today, ...snapshot };

  let updated: Snapshot[];

  if (existingIndex >= 0) {
    updated = [...snapshots];
    updated[existingIndex] = newSnapshot;
  } else {
    updated = [...snapshots, newSnapshot];
  }

  updated.sort((a, b) => a.date.localeCompare(b.date));
  saveSnapshots(updated);

  return updated;
}