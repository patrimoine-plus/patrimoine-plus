import { Objective } from "../types/objective";

const STORAGE_KEY = "objectives";

export function saveObjectives(objectives: Objective[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(objectives));
}

export function loadObjectives(): Objective[] | null {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as Objective[];
  } catch {
    return null;
  }
}