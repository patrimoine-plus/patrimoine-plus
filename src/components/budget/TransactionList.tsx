import TransactionRow from "./TransactionRow";
import { Transaction } from "../../types/transaction";

type Props = {
  transactions: Transaction[];
  onDelete: (id: number) => void;
};

export default function TransactionList({ transactions, onDelete }: Props) {
  if (transactions.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        Aucune transaction pour l'instant.
      </p>
    );
  }

  return (
    <div className="space-y-3 mt-6">
      {transactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          {...transaction}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}