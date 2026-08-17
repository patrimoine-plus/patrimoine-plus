type Props = {
  totalVersements: number;
  interetsGagnes: number;
  capitalFinal: number;
};

export default function CompoundInterestResults({
  totalVersements,
  interetsGagnes,
  capitalFinal,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-zinc-300">
          {totalVersements.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Capital versé</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-green-500">
          +
          {interetsGagnes.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Intérêts gagnés</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-blue-500">
          {capitalFinal.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Capital final</p>
      </div>
    </div>
  );
}