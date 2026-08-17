type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function AccountSearch({
  value,
  onChange,
}: Props) {
  return (
    <div className="mt-8 mb-8">

      <input
        type="text"
        placeholder="🔍 Rechercher un compte..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          max-w-xl
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          px-5
          py-4
          text-white
          placeholder:text-zinc-500
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
          transition
        "
      />

    </div>
  );
}