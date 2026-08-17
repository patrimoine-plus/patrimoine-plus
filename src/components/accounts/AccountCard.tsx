import { Category } from "../../types/account";

type Props = {
  id: number;
  name: string;
  amount: number;
  category: Category;
  icon: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function AccountCard({
  id,
  name,
  amount,
  category,
  icon,
  onDelete,
  onEdit,
}: Props) {
  const getCategoryColor = () => {
    switch (category) {
      case "Épargne":
        return "bg-sky-500";

      case "Investissement":
        return "bg-violet-500";

      case "Liquidités":
        return "bg-green-500";

      case "Immobilier":
        return "bg-orange-500";

      default:
        return "bg-zinc-600";
    }
  };

  return (
    <div
      className="
        bg-zinc-900
        rounded-3xl
        overflow-hidden
        border
        border-zinc-800
        shadow-lg
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-2xl
      "
    >
      <div className={`h-2 ${getCategoryColor()}`} />

      <div className="p-7 flex flex-col h-full">
        <div className="text-5xl">{icon}</div>

        <h2 className="text-3xl font-bold mt-6">{name}</h2>

        <p className="text-zinc-400 mt-2">{category}</p>

        <div className="border-t border-zinc-800 my-6"></div>

        <h3 className="text-5xl font-bold">
          {amount.toLocaleString("fr-FR")} €
        </h3>

        <div className="flex justify-end gap-4 mt-auto pt-8">
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
    </div>
  );
}