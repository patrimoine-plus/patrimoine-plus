type Props = {
  capitalFinal: number;
  revenuMensuelPotentiel: number;
  revenuAnnuelPotentiel: number;
  dureeAnnees: number;
};

export default function RetirementResults({
  capitalFinal,
  revenuMensuelPotentiel,
  revenuAnnuelPotentiel,
  dureeAnnees,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-zinc-300">{dureeAnnees}</h3>
        <p className="text-zinc-500 mt-2">Années avant la retraite</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-blue-500">
          {capitalFinal.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Capital à la retraite</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-green-500">
          {revenuMensuelPotentiel.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Revenu mensuel potentiel</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-green-500">
          {revenuAnnuelPotentiel.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Revenu annuel potentiel</p>
      </div>
    </div>
  );
}