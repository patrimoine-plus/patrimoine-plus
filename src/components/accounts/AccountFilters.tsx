import { FilterCategory } from "../../types/account";

type Props = {
  selected: FilterCategory;
  onSelect: (category: FilterCategory) => void;
};

const filters: FilterCategory[] = [
  "Tous",
  "Épargne",
  "Investissement",
  "Liquidités",
  "Immobilier",
];

export default function AccountFilters({
  selected,
  onSelect,
}: Props) {
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
          {filter === "Tous" && "📋 "}
          {filter === "Épargne" && "🏦 "}
          {filter === "Investissement" && "📈 "}
          {filter === "Liquidités" && "💵 "}
          {filter === "Immobilier" && "🏠 "}

          {filter}
        </button>
      ))}
    </div>
  );
}