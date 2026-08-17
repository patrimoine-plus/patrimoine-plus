"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "patrimoineplus_security";

type SecuritySettings = {
  enabled: boolean;
  pin: string;
};

const DEFAULT_SETTINGS: SecuritySettings = {
  enabled: false,
  pin: "",
};

export default function SecuritySection() {
  const [enabled, setEnabled] = useState(false);
  const [pin, setPin] = useState("");

  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");

  const [showPinForm, setShowPinForm] = useState(false);
  const [showPin, setShowPin] = useState(false);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return;

    try {
      const settings: SecuritySettings = {
        ...DEFAULT_SETTINGS,
        ...JSON.parse(saved),
      };

      setEnabled(settings.enabled);
      setPin(settings.pin);
    } catch {
      setEnabled(false);
      setPin("");
    }
  }, []);

  const saveSettings = (
    nextEnabled: boolean,
    nextPin: string
  ) => {
    const settings: SecuritySettings = {
      enabled: nextEnabled,
      pin: nextPin,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(settings)
    );

    window.dispatchEvent(
      new Event("patrimoine-security-change")
    );
  };

  const showMessage = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2500);
  };

  const handleToggle = () => {
    if (enabled) {
      setEnabled(false);
      saveSettings(false, pin);
      showMessage("Verrouillage désactivé");
      return;
    }

    if (!pin) {
      setShowPinForm(true);
      return;
    }

    setEnabled(true);
    saveSettings(true, pin);
    showMessage("Verrouillage activé 🔒");
  };

  const handleSavePin = () => {
    if (!/^\d{4}$/.test(newPin)) {
      showMessage("Le code PIN doit contenir 4 chiffres.");
      return;
    }

    if (newPin !== confirmPin) {
      showMessage("Les deux codes PIN ne correspondent pas.");
      return;
    }

    setPin(newPin);
    setEnabled(true);

    saveSettings(true, newPin);

    setNewPin("");
    setConfirmPin("");
    setShowPinForm(false);

    showMessage("Code PIN enregistré 🔐");
  };

  const handleChangePin = () => {
    setNewPin("");
    setConfirmPin("");
    setShowPinForm(true);
  };

  const handleCancelPin = () => {
    setNewPin("");
    setConfirmPin("");
    setShowPinForm(false);
  };

  const handleLockNow = () => {
    if (!enabled || !pin) {
      showMessage("Active d'abord le verrouillage avec un code PIN.");
      return;
    }

    window.dispatchEvent(
      new Event("patrimoine-lock-app")
    );
  };

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="text-3xl">
          🔒
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold">
            Sécurité
          </h2>

          <p className="text-zinc-500 mt-2">
            Protège l'accès à Patrimoine+ avec un code PIN.
          </p>

          {/* Activation */}
          <div className="mt-6 flex items-center justify-between gap-4 bg-zinc-800 rounded-2xl p-4">
            <div className="min-w-0">
              <p className="font-semibold">
                Verrouillage de l'application
              </p>

              <p className="text-sm text-zinc-500 mt-1">
                Demander un code PIN lors du verrouillage.
              </p>
            </div>

            <button
              type="button"
              onClick={handleToggle}
              className={`relative shrink-0 w-14 h-8 rounded-full transition ${
                enabled
                  ? "bg-blue-600"
                  : "bg-zinc-600"
              }`}
              aria-label="Activer le verrouillage"
            >
              <span
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
                  enabled
                    ? "left-7"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* État */}
          <div className="mt-4 bg-zinc-800 rounded-2xl p-4">
            <p className="font-semibold">
              État de la sécurité
            </p>

            <p className="text-sm mt-1">
              {enabled ? (
                <span className="text-green-400">
                  🔒 Verrouillage activé
                </span>
              ) : (
                <span className="text-zinc-500">
                  🔓 Verrouillage désactivé
                </span>
              )}
            </p>
          </div>

          {/* Gestion du PIN */}
          <div className="mt-4 flex flex-wrap gap-3">
            {!pin ? (
              <button
                type="button"
                onClick={() => setShowPinForm(true)}
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-3 font-medium transition"
              >
                🔢 Créer un code PIN
              </button>
            ) : (
              <button
                type="button"
                onClick={handleChangePin}
                className="bg-zinc-700 hover:bg-zinc-600 rounded-xl px-5 py-3 font-medium transition"
              >
                ✏️ Modifier le PIN
              </button>
            )}

            {pin && (
              <button
                type="button"
                onClick={() => setShowPin(!showPin)}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl px-5 py-3 font-medium transition"
              >
                {showPin
                  ? "🙈 Masquer le PIN"
                  : "👁️ Afficher le PIN"}
              </button>
            )}
          </div>

          {/* Verrouillage immédiat */}
          {enabled && pin && (
            <div className="mt-4">
              <button
                type="button"
                onClick={handleLockNow}
                className="w-full sm:w-auto bg-red-600 hover:bg-red-700 rounded-xl px-5 py-3 font-medium transition"
              >
                🔒 Verrouiller maintenant
              </button>
            </div>
          )}

          {/* PIN actuel */}
          {pin && showPin && (
            <div className="mt-4 bg-zinc-950 border border-zinc-800 rounded-2xl p-4">
              <p className="text-sm text-zinc-500">
                Code PIN actuel
              </p>

              <p className="text-2xl font-bold tracking-[0.4em] mt-2">
                {pin}
              </p>
            </div>
          )}

          {/* Formulaire PIN */}
          {showPinForm && (
            <div className="mt-6 bg-zinc-800 rounded-2xl p-5">
              <h3 className="font-semibold text-lg">
                {pin
                  ? "Modifier le code PIN"
                  : "Créer un code PIN"}
              </h3>

              <p className="text-sm text-zinc-500 mt-1">
                Choisis un code à 4 chiffres.
              </p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-zinc-400">
                    Nouveau PIN
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={newPin}
                    onChange={(e) =>
                      setNewPin(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="••••"
                    className="w-full mt-2 bg-zinc-950 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="text-sm text-zinc-400">
                    Confirmer le PIN
                  </label>

                  <input
                    type="password"
                    inputMode="numeric"
                    maxLength={4}
                    value={confirmPin}
                    onChange={(e) =>
                      setConfirmPin(
                        e.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="••••"
                    className="w-full mt-2 bg-zinc-950 border border-zinc-700 rounded-xl p-3 outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  type="button"
                  onClick={handleCancelPin}
                  className="bg-zinc-700 hover:bg-zinc-600 rounded-xl px-5 py-3 font-medium transition"
                >
                  Annuler
                </button>

                <button
                  type="button"
                  onClick={handleSavePin}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-3 font-medium transition"
                >
                  🔐 Enregistrer le PIN
                </button>
              </div>
            </div>
          )}

          {message && (
            <p className="mt-4 text-sm text-green-400">
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}