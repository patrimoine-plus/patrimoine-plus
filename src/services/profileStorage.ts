import { Profile } from "../types/profile";

const STORAGE_KEY = "profile";

export function saveProfile(profile: Profile): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function loadProfile(): Profile | null {
  const data = localStorage.getItem(STORAGE_KEY);

  if (!data) return null;

  try {
    return JSON.parse(data) as Profile;
  } catch {
    return null;
  }
}