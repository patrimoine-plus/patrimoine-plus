"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "patrimoineplus_security";

type SecuritySettings = {
  enabled: boolean;
  pin: string;
};

export default function SecurityGuard() {
  const [isLocked, setIsLocked] = useState(false);
  const [pin, setPin] = useState("");
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const loadSecurity = () => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {
      setIsLocked(false);
      setPin("");
      setLoaded(true);
      return;
    }

    try {
      const settings: SecuritySettings = JSON.parse(saved);

      if (
        settings.enabled &&
        typeof settings.pin === "string" &&
        settings.pin.length === 4
      ) {
        setPin(settings.pin);
        setIsLocked(true);
      } else {
        setPin("");
        setIsLocked(false);
      }
    } catch {
      setPin("");
      setIsLocked(false);
    }

    setLoaded(true);
  };

  useEffect(() => {
    loadSecurity();

    const handleLock = () => {
      loadSecurity();
    };

    window.addEventListener(
      "patrimoine-lock-app",
      handleLock
    );

    return () => {
      window.removeEventListener(
        "patrimoine-lock-app",
        handleLock
      );
    };
  }, []);

  const handleUnlock = () => {
    if (input === pin) {
      setIsLocked(false);
      setInput("");
      setError("");
      return;
    }

    setInput("");
    setError("Code PIN incorrect.");
  };

  if (!loaded || !isLocked) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[9999] bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-zinc-900 rounded-3xl p-8 shadow-2xl border border-zinc-800">
        <div className="text-center">
          <div className="text-5xl mb-5">
            🔒
          </div>

          <h1 className="text-3xl font-bold">
            Patrimoine+
          </h1>

          <p className="text-zinc-500 mt-2">
            Application verrouillée
          </p>
        </div>

        <div className="mt-8">
          <label className="text-sm text-zinc-400">
            Code PIN
          </label>

          <input
            type="password"
            inputMode="numeric"
            maxLength={4}
            autoFocus
            value={input}
            onChange={(event) => {
              setInput(
                event.target.value.replace(/\D/g, "")
              );
              setError("");
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleUnlock();
              }
            }}
            placeholder="••••"
            className="w-full mt-2 bg-zinc-800 border border-zinc-700 rounded-xl p-4 text-center text-2xl tracking-[0.5em] outline-none focus:border-blue-500"
          />

          {error && (
            <p className="text-red-400 text-sm mt-3 text-center">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleUnlock}
            disabled={input.length !== 4}
            className="w-full mt-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl py-3 font-medium transition"
          >
            🔓 Déverrouiller
          </button>
        </div>
      </div>
    </div>
  );
}