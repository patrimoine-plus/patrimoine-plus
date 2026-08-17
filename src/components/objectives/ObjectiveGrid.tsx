import ObjectiveCard from "./ObjectiveCard";
import { Objective } from "../../types/objective";

type Props = {
  objectives: Objective[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

export default function ObjectiveGrid({
  objectives,
  onDelete,
  onEdit,
}: Props) {
  if (objectives.length === 0) {
    return (
      <p className="text-zinc-500 text-center py-12">
        Aucun objectif pour l&apos;instant. Ajoute ton premier projet
        financier !
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {objectives.map((objective) => (
        <ObjectiveCard
          key={objective.id}
          id={objective.id}
          nom={objective.nom}
          montantCible={objective.montantCible}
          montantActuel={objective.montantActuel}
          dateCible={objective.dateCible}
          icon={objective.icon}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}