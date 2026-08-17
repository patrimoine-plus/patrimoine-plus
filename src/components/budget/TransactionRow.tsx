type Props = {
  id: number;
  name: string;
  amount: number;
  type: "revenu" | "depense";
  category: string;
  icon: string;
  onDelete: (id: number) => void;
};

export default function TransactionRow({
  id,
  name,
  amount,
  type,
  category,
  icon,
  onDelete,
}: Props) {
  return (
    <div
      className="
        flex
        items-center
        justify-between
        bg-zinc-900
        rounded-2xl
        px-6
        py-4
        hover:bg-zinc-800/70
        transition
      "
    >
      <div className="flex items-center gap-4">
        <div className="text-2xl">{icon}</div>

        <div>
          <p className="font-semibold">{name}</p>
          <p className="text-zinc-500 text-sm">{category}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span
          className={`font-bold ${
            type === "revenu" ? "text-green-500" : "text-red-500"
          }`}
        >
          {type === "revenu" ? "+" : "-"}
          {amount.toLocaleString("fr-FR")} €
        </span>

        <button
          onClick={() => onDelete(id)}
          className="
            w-9
            h-9
            rounded-xl
            bg-red-500/10
            hover:bg-red-500
            transition
            flex
            items-center
            justify-center
          "
        >
          🗑️
        </button>
      </div>
    </div>
  );
}