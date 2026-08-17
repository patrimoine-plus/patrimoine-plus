"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";

import ObjectiveGrid from "../../components/objectives/ObjectiveGrid";

import AddObjectiveModal from "../../components/modals/AddObjectiveModal";
import EditObjectiveModal from "../../components/modals/EditObjectiveModal";

import { objectives } from "../../data/objectives";
import {
  loadObjectives,
  saveObjectives,
} from "../../services/objectivesStorage";
import { Objective } from "../../types/objective";

export default function ObjectifsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [objectiveToDelete, setObjectiveToDelete] = useState<number | null>(
    null
  );
  const [objectiveToEdit, setObjectiveToEdit] = useState<Objective | null>(
    null
  );

  const [userObjectives, setUserObjectives] =
    useState<Objective[]>(objectives);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = loadObjectives();

    if (saved) {
      setUserObjectives(saved);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    saveObjectives(userObjectives);
  }, [userObjectives, isLoaded]);

  const confirmDelete = () => {
    if (objectiveToDelete === null) return;

    setUserObjectives(
      userObjectives.filter((o) => o.id !== objectiveToDelete)
    );

    setObjectiveToDelete(null);
  };

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-10">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold">🎯 Objectifs</h2>

          <button
            onClick={() => setIsOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 rounded-xl px-5 py-3 font-medium transition"
          >
            ➕ Ajouter un objectif
          </button>
        </div>

        <p className="text-zinc-500">
          Suis la progression de tes projets financiers.
        </p>

        <ObjectiveGrid
          objectives={userObjectives}
          onDelete={setObjectiveToDelete}
          onEdit={(id) => {
            const objective = userObjectives.find((o) => o.id === id);

            if (objective) {
              setObjectiveToEdit(objective);
            }
          }}
        />
      </div>

      <AddObjectiveModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAdd={(nom, montantCible, montantActuel, dateCible, icon) => {
          setUserObjectives([
            ...userObjectives,
            {
              id: Date.now(),
              nom,
              montantCible,
              montantActuel,
              dateCible,
              icon,
            },
          ]);

          setIsOpen(false);
        }}
      />

      <EditObjectiveModal
        isOpen={objectiveToEdit !== null}
        objective={objectiveToEdit}
        onClose={() => setObjectiveToEdit(null)}
        onSave={(id, nom, montantCible, montantActuel, dateCible, icon) => {
          setUserObjectives(
            userObjectives.map((objective) =>
              objective.id === id
                ? {
                    ...objective,
                    nom,
                    montantCible,
                    montantActuel,
                    dateCible,
                    icon,
                  }
                : objective
            )
          );

          setObjectiveToEdit(null);
        }}
      />

      {objectiveToDelete !== null && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-zinc-900 rounded-2xl p-8 w-[420px]">
            <h2 className="text-2xl font-bold mb-3">
              Supprimer cet objectif ?
            </h2>

            <p className="text-zinc-400 mb-8">
              Cette action est irréversible.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setObjectiveToDelete(null)}
                className="flex-1 bg-zinc-700 rounded-xl py-3"
              >
                Annuler
              </button>

              <button
                onClick={confirmDelete}
                className="flex-1 bg-red-600 hover:bg-red-700 rounded-xl py-3"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}