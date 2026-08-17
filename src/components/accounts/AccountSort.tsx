import { SortOption } from "../../types/account";

type Props = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export default function AccountSort({
  value,
  onChange,
}: Props) {
  return (
    <div className="mb-8">
      <label className="block text-zinc-400 mb-2">Trier par</label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-xl
          px-4
          py-3
          text-white
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      >
        <option value="amount-desc">💰 Montant décroissant</option>
        <option value="amount-asc">💵 Montant croissant</option>
        <option value="name-asc">🔤 Nom A → Z</option>
        <option value="name-desc">🔤 Nom Z → A</option>
      </select>
    </div>
  );
}