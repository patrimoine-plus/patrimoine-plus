import { FilterAssetType } from "../../types/investment";

type Props = {
  selected: FilterAssetType;
  onSelect: (filter: FilterAssetType) => void;
};

const filters: FilterAssetType[] = ["Tous", "ETF", "Action", "Obligation", "Autre"];

const ICONS: Record<FilterAssetType, string> = {
  Tous: "📋",
  ETF: "📊",
  Action: "📈",
  Obligation: "🏦",
  Autre: "💼",
};

export default function InvestmentFilters({ selected, onSelect }: Props) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onSelect(filter)}
          className={`px-5 py-2 rounded-xl transition font-medium ${
            selected === filter
              ? "bg-blue-600 text-white"
              : "bg-zinc-900 hover:bg-zinc-800"
          }`}
        >
          {ICONS[filter]} {filter}
        </button>
      ))}
    </div>
  );
}