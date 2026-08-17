export type SimulatorId =
  | "interets"
  | "epargne"
  | "immobilier"
  | "fire"
  | "retraite"
  | "inflation";

type SimulatorMeta = {
  id: SimulatorId;
  label: string;
  icon: string;
  enabled: boolean;
};

const simulators: SimulatorMeta[] = [
  { id: "interets", label: "Intérêts composés", icon: "💰", enabled: true },
  { id: "epargne", label: "Épargne", icon: "🎯", enabled: true },
  { id: "immobilier", label: "Immobilier", icon: "🏠", enabled: true },
  { id: "fire", label: "FIRE", icon: "🔥", enabled: true },
  { id: "retraite", label: "Retraite", icon: "👴", enabled: true },
  { id: "inflation", label: "Inflation", icon: "📉", enabled: true },
];

type Props = {
  selected: SimulatorId;
  onSelect: (id: SimulatorId) => void;
};

export default function SimulatorSelector({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mt-8">
      {simulators.map((sim) => {
        if (!sim.enabled) {
          return (
            <div
              key={sim.id}
              className="bg-zinc-900 rounded-2xl p-5 opacity-50 cursor-not-allowed relative"
            >
              <span className="absolute top-3 right-3 text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-full">
                Bientôt
              </span>
              <div className="text-3xl mb-2">{sim.icon}</div>
              <p className="font-medium text-sm">{sim.label}</p>
            </div>
          );
        }

        return (
          <button
            key={sim.id}
            onClick={() => onSelect(sim.id)}
            className={`rounded-2xl p-5 text-left transition ${
              selected === sim.id
                ? "bg-blue-600"
                : "bg-zinc-900 hover:bg-zinc-800"
            }`}
          >
            <div className="text-3xl mb-2">{sim.icon}</div>
            <p className="font-medium text-sm">{sim.label}</p>
          </button>
        );
      })}
    </div>
  );
}