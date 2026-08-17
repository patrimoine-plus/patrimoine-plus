"use client";

import { useEffect, useState } from "react";

type NotificationSettings = {
  enabled: boolean;
  objectifs: boolean;
  budget: boolean;
  investissements: boolean;
};

const DEFAULT_SETTINGS: NotificationSettings = {
  enabled: true,
  objectifs: true,
  budget: true,
  investissements: false,
};

const STORAGE_KEY = "patrimoineplus_notifications";

export default function NotificationSection() {
  const [settings, setSettings] =
    useState<NotificationSettings>(DEFAULT_SETTINGS);

  const [permission, setPermission] =
    useState<NotificationPermission>("default");

  const [message, setMessage] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (saved) {
      try {
        setSettings({
          ...DEFAULT_SETTINGS,
          ...JSON.parse(saved),
        });
      } catch {
        setSettings(DEFAULT_SETTINGS);
      }
    }

    if ("Notification" in window) {
      setPermission(Notification.permission);
    }
  }, []);

  const updateSettings = (
    key: keyof NotificationSettings,
    value: boolean
  ) => {
    const updated = {
      ...settings,
      [key]: value,
    };

    setSettings(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setMessage("Préférences enregistrées");

    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  const requestPermission = async () => {
    if (!("Notification" in window)) {
      setMessage("Les notifications ne sont pas supportées par ce navigateur.");
      return;
    }

    const result = await Notification.requestPermission();

    setPermission(result);

    if (result === "granted") {
      setMessage("Notifications autorisées ✅");
    } else if (result === "denied") {
      setMessage("Les notifications sont bloquées dans le navigateur.");
    }
  };

  const testNotification = async () => {
    if (!("Notification" in window)) {
      setMessage("Les notifications ne sont pas supportées.");
      return;
    }

    if (Notification.permission !== "granted") {
      const result = await Notification.requestPermission();

      setPermission(result);

      if (result !== "granted") {
        setMessage("Autorise les notifications pour effectuer le test.");
        return;
      }
    }

    new Notification("Patrimoine+ 🔔", {
      body: "Les notifications fonctionnent correctement !",
    });

    setMessage("Notification envoyée ✅");
  };

  const notificationStatus =
    permission === "granted"
      ? "Autorisées"
      : permission === "denied"
        ? "Bloquées"
        : "Non configurées";

  return (
    <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
      <div className="flex items-start gap-4">
        <div className="text-3xl">🔔</div>

        <div className="flex-1">
          <h2 className="text-2xl font-bold">
            Notifications
          </h2>

          <p className="text-zinc-500 mt-2">
            Rappels et alertes sur tes objectifs, ton budget et tes
            investissements.
          </p>

          {/* Activation générale */}
          <div className="mt-6 flex items-center justify-between bg-zinc-800 rounded-2xl p-4">
            <div>
              <p className="font-semibold">
                Notifications
              </p>

              <p className="text-sm text-zinc-500 mt-1">
                Activer ou désactiver toutes les alertes.
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                updateSettings("enabled", !settings.enabled)
              }
              className={`relative w-14 h-8 rounded-full transition ${
                settings.enabled
                  ? "bg-blue-600"
                  : "bg-zinc-600"
              }`}
              aria-label="Activer les notifications"
            >
              <span
                className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
                  settings.enabled
                    ? "left-7"
                    : "left-1"
                }`}
              />
            </button>
          </div>

          {/* Options */}
          <div
            className={`mt-4 space-y-3 transition ${
              settings.enabled
                ? "opacity-100"
                : "opacity-50 pointer-events-none"
            }`}
          >
            <NotificationOption
              emoji="🎯"
              title="Objectifs"
              description="Être alerté lorsque la progression d'un objectif évolue."
              enabled={settings.objectifs}
              onChange={(value) =>
                updateSettings("objectifs", value)
              }
            />

            <NotificationOption
              emoji="💰"
              title="Budget"
              description="Recevoir une alerte lorsque tes dépenses deviennent importantes."
              enabled={settings.budget}
              onChange={(value) =>
                updateSettings("budget", value)
              }
            />

            <NotificationOption
              emoji="📈"
              title="Investissements"
              description="Recevoir des alertes concernant l'évolution de tes placements."
              enabled={settings.investissements}
              onChange={(value) =>
                updateSettings("investissements", value)
              }
            />
          </div>

          {/* Permission navigateur */}
          <div className="mt-6 bg-zinc-800 rounded-2xl p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="font-semibold">
                  🔐 Autorisation du navigateur
                </p>

                <p className="text-sm text-zinc-500 mt-1">
                  Statut :{" "}
                  <span
                    className={
                      permission === "granted"
                        ? "text-green-400"
                        : permission === "denied"
                          ? "text-red-400"
                          : "text-yellow-400"
                    }
                  >
                    {notificationStatus}
                  </span>
                </p>
              </div>

              {permission !== "granted" && (
                <button
                  type="button"
                  onClick={requestPermission}
                  className="bg-blue-600 hover:bg-blue-700 rounded-xl px-4 py-2 font-medium transition"
                >
                  Autoriser
                </button>
              )}
            </div>
          </div>

          {/* Test */}
          <div className="mt-4">
            <button
              type="button"
              onClick={testNotification}
              disabled={!settings.enabled}
              className="bg-zinc-700 hover:bg-zinc-600 disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-5 py-3 font-medium transition"
            >
              🔔 Tester une notification
            </button>
          </div>

          {/* Message */}
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

type NotificationOptionProps = {
  emoji: string;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (value: boolean) => void;
};

function NotificationOption({
  emoji,
  title,
  description,
  enabled,
  onChange,
}: NotificationOptionProps) {
  return (
    <div className="flex items-center justify-between gap-4 bg-zinc-800 rounded-2xl p-4">
      <div className="flex items-start gap-3">
        <span className="text-xl">{emoji}</span>

        <div>
          <p className="font-semibold">
            {title}
          </p>

          <p className="text-sm text-zinc-500 mt-1">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative shrink-0 w-14 h-8 rounded-full transition ${
          enabled
            ? "bg-blue-600"
            : "bg-zinc-600"
        }`}
        aria-label={`Activer les notifications ${title}`}
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
  );
}