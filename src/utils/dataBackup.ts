export const STORAGE_KEYS = [
  "accounts",
  "transactions",
  "investments",
  "objectives",
  "snapshots",
  "profile",
];

export function exportAllData(): string {
  const data: Record<string, unknown> = {};

  STORAGE_KEYS.forEach((key) => {
    const value = localStorage.getItem(key);

    if (value !== null) {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = value;
      }
    }
  });

  return JSON.stringify(data, null, 2);
}

export function downloadJSON(filename: string, content: string): void {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export function importAllData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);

    STORAGE_KEYS.forEach((key) => {
      if (data[key] !== undefined) {
        localStorage.setItem(key, JSON.stringify(data[key]));
      }
    });

    return true;
  } catch {
    return false;
  }
}

export function resetAllData(): void {
  STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
}