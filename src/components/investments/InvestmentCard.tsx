import { AssetType } from "../../types/investment";

type Props = {
  id: number;
  name: string;
  assetType: AssetType;
  montantInvesti: number;
  valeurActuelle: number;
  icon: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function InvestmentCard({
  id,
  name,
  assetType,
  montantInvesti,
  valeurActuelle,
  icon,
  onDelete,
  onEdit,
}: Props) {
  const gain = valeurActuelle - montantInvesti;
  const performance = montantInvesti > 0 ? (gain / montantInvesti) * 100 : 0;
  const isPositive = gain >= 0;

  const getAssetColor = () => {
    switch (assetType) {
      case "ETF":
        return "bg-sky-500";

      case "Action":
        return "bg-violet-500";

      case "Obligation":
        return "bg-green-500";

      case "Autre":
        return "bg-orange-500";
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
      <div className={`h-2 ${getAssetColor()}`} />

      <div className="p-7 flex flex-col h-full">
        <div className="flex items-center justify-between">
          <div className="text-4xl">{icon}</div>

          <span
            className={`text-sm font-bold px-3 py-1 rounded-full ${
              isPositive
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {isPositive ? "+" : ""}
            {performance.toFixed(1)}%
          </span>
        </div>

        <h2 className="text-2xl font-bold mt-5">{name}</h2>

        <p className="text-zinc-400 mt-1">{assetType}</p>

        <div className="border-t border-zinc-800 my-5"></div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Investi</span>
            <span className="text-zinc-300">
              {montantInvesti.toLocaleString("fr-FR")} €
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Valeur actuelle</span>
            <span className="font-bold">
              {valeurActuelle.toLocaleString("fr-FR")} €
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-zinc-500">Gain / Perte</span>
            <span
              className={isPositive ? "text-green-500" : "text-red-500"}
            >
              {isPositive ? "+" : ""}
              {gain.toLocaleString("fr-FR")} €
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-auto pt-6">
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