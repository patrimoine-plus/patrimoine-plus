import { TransactionFilter } from "../../types/transaction";

type Props = {
  selected: TransactionFilter;
  onSelect: (filter: TransactionFilter) => void;
};

const filters: TransactionFilter[] = ["Tous", "Revenus", "Dépenses"];

export default function BudgetFilters({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3 mb-2 mt-8">
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
          {filter}
        </button>
      ))}
    </div>
  );
}