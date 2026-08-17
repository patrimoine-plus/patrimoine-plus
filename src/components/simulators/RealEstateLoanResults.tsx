type Props = {
  montantEmprunte: number;
  mensualite: number;
  coutTotalCredit: number;
  coutTotalAvecCapital: number;
};

export default function RealEstateLoanResults({
  montantEmprunte,
  mensualite,
  coutTotalCredit,
  coutTotalAvecCapital,
}: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-zinc-300">
          {montantEmprunte.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Montant emprunté</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-blue-500">
          {mensualite.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Mensualité</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold text-orange-500">
          {coutTotalCredit.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Coût du crédit (intérêts)</p>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg">
        <h3 className="text-3xl font-bold">
          {coutTotalAvecCapital.toLocaleString("fr-FR", {
            maximumFractionDigits: 0,
          })}{" "}
          €
        </h3>
        <p className="text-zinc-500 mt-2">Coût total (capital + intérêts)</p>
      </div>
    </div>
  );
}