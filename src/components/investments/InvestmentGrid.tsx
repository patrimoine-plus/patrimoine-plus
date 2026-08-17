import InvestmentCard from "./InvestmentCard";
import { Investment } from "../../types/investment";

type Props = {
  investments: Investment[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function InvestmentGrid({
  investments,
  onDelete,
  onEdit,
}: Props) {
  if (investments.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        Aucun investissement ne correspond.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {investments.map((investment) => (
        <InvestmentCard
          key={investment.id}
          id={investment.id}
          name={investment.name}
          assetType={investment.assetType}
          montantInvesti={investment.montantInvesti}
          valeurActuelle={investment.valeurActuelle}
          icon={investment.icon}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}