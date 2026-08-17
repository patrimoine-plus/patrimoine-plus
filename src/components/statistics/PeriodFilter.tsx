import { PeriodFilter as PeriodFilterType } from "../../types/snapshot";

type Props = {
  selected: PeriodFilterType;
  onSelect: (period: PeriodFilterType) => void;
};

const periods: PeriodFilterType[] = ["Mois", "Trimestre", "Année", "Tout"];

export default function PeriodFilter({ selected, onSelect }: Props) {
  return (
    <div className="flex gap-3 mb-2">
      {periods.map((period) => (
        <button
          key={period}
          onClick={() => onSelect(period)}
          className={`px-5 py-2 rounded-xl transition font-medium ${
            selected === period
              ? "bg-blue-600 text-white"
              : "bg-zinc-900 hover:bg-zinc-800"
          }`}
        >
          {period}
        </button>
      ))}
    </div>
  );
}