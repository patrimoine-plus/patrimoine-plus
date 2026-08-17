import AccountCard from "./AccountCard";
import { Account } from "../../types/account";

type Props = {
  accounts: Account[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function AccountGrid({
  accounts,
  onDelete,
  onEdit,
}: Props) {
  if (accounts.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        Aucun compte ne correspond à ta recherche.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          id={account.id}
          name={account.name}
          amount={account.amount}
          category={account.category}
          icon={account.icon}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}