type Props = {
  id: number;
  nom: string;
  montantCible: number;
  montantActuel: number;
  dateCible: string;
  icon: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export default function ObjectiveCard({
  id,
  nom,
  montantCible,
  montantActuel,
  dateCible,
  icon,
  onDelete,
  onEdit,
}: Props) {
  const progression =
    montantCible > 0
      ? Math.min(100, (montantActuel / montantCible) * 100)
      : 0;

  const montantRestant = Math.max(0, montantCible - montantActuel);
  const isCompleted = montantActuel >= montantCible;

  const today = new Date().toISOString().slice(0, 10);
  const isOverdue = !isCompleted && dateCible < today;

  return (
    <div
      className="
        bg-zinc-900
        rounded-3xl
        p-7
        border
        border-zinc-800
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      <div className="flex items-start justify-between">
        <div className="text-4xl">{icon}</div>

        {isCompleted ? (
          <span className="text-sm font-bold px-3 py-1 rounded-full bg-green-500/10 text-green-500">
            Atteint 🎉
          </span>
        ) : isOverdue ? (
          <span className="text-sm font-bold px-3 py-1 rounded-full bg-red-500/10 text-red-500">
            Échéance dépassée
          </span>
        ) : null}
      </div>

      <h2 className="text-2xl font-bold mt-5">{nom}</h2>

      <p className="text-zinc-500 mt-1">Échéance : {formatDate(dateCible)}</p>

      <div className="mt-6">
        <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isCompleted ? "bg-green-500" : "bg-blue-500"
            }`}
            style={{ width: `${progression}%` }}
          />
        </div>

        <div className="flex justify-between text-sm mt-2">
          <span className="text-zinc-400">
            {montantActuel.toLocaleString("fr-FR")} € /{" "}
            {montantCible.toLocaleString("fr-FR")} €
          </span>
          <span className="font-bold">{progression.toFixed(0)}%</span>
        </div>
      </div>

      {!isCompleted && (
        <p className="text-zinc-500 text-sm mt-3">
          Il reste {montantRestant.toLocaleString("fr-FR")} € à épargner
        </p>
      )}

      <div className="flex justify-end gap-4 mt-6">
        <button
          onClick={() => onEdit(id)}
          className="
            w-11
            h-11
            rounded-xl
            bg-blue-500/10
            hover:bg-blue-500
            transition-all
            duration-300
          "
        >
          ✏️
        </button>

        <button
          onClick={() => onDelete(id)}
          className="
            w-11
            h-11
            rounded-xl
            bg-red-500/10
            hover:bg-red-500
            transition-all
            duration-300
          "
        >
          🗑️
        </button>
      </div>
    </div>
  );
}