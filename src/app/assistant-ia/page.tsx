"use client";

import { useEffect, useRef, useState } from "react";

import Sidebar from "../../components/Sidebar";

import { accounts as defaultAccounts } from "../../data/accounts";
import { loadAccounts } from "../../services/localStorage";
import { transactions as defaultTransactions } from "../../data/transactions";
import { loadTransactions } from "../../services/transactionsStorage";
import { investments as defaultInvestments } from "../../data/investments";
import { loadInvestments } from "../../services/investmentsStorage";
import { objectives as defaultObjectives } from "../../data/objectives";
import { loadObjectives } from "../../services/objectivesStorage";
import { loadSnapshots } from "../../services/snapshotsStorage";

import {
  answerPatrimoineEvolution,
  answerSavingsRate,
  answerRepartition,
  answerObjectives,
  answerInvestmentPerformance,
  answerAttentionPoints,
} from "../../utils/assistant";

import { Account } from "../../types/account";
import { Transaction } from "../../types/transaction";
import { Investment } from "../../types/investment";
import { Objective } from "../../types/objective";
import { Snapshot } from "../../types/snapshot";
import { ChatMessage, QuestionPreset } from "../../types/assistant";

const QUESTIONS: QuestionPreset[] = [
  { id: "evolution", label: "Comment évolue mon patrimoine ?" },
  { id: "epargne", label: "Est-ce que j'épargne suffisamment ?" },
  { id: "repartition", label: "Quelle est ma répartition d'actifs ?" },
  { id: "objectifs", label: "Où en sont mes objectifs ?" },
  { id: "investissements", label: "Quels sont mes investissements les plus performants ?" },
  { id: "attention", label: "Ai-je des points d'attention ?" },
];

export default function AssistantIAPage() {
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);
  const [transactions, setTransactions] =
    useState<Transaction[]>(defaultTransactions);
  const [investments, setInvestments] =
    useState<Investment[]>(defaultInvestments);
  const [objectives, setObjectives] =
    useState<Objective[]>(defaultObjectives);
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 0,
      role: "assistant",
      text: "Salut ! Je suis ton assistant Patrimoine+. Clique sur une question ci-dessous et j'analyserai tes données pour te répondre.",
    },
  ]);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setAccounts(loadAccounts() ?? defaultAccounts);
    setTransactions(loadTransactions() ?? defaultTransactions);
    setInvestments(loadInvestments() ?? defaultInvestments);
    setObjectives(loadObjectives() ?? defaultObjectives);
    setSnapshots(loadSnapshots());
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleQuestion = (preset: QuestionPreset) => {
    let answer = "";

    switch (preset.id) {
      case "evolution":
        answer = answerPatrimoineEvolution(snapshots);
        break;
      case "epargne":
        answer = answerSavingsRate(transactions);
        break;
      case "repartition":
        answer = answerRepartition(accounts);
        break;
      case "objectifs":
        answer = answerObjectives(objectives);
        break;
      case "investissements":
        answer = answerInvestmentPerformance(investments);
        break;
      case "attention":
        answer = answerAttentionPoints({
          accounts,
          transactions,
          investments,
          objectives,
        });
        break;
    }

    setMessages((prev) => [
      ...prev,
      { id: prev.length, role: "user", text: preset.label },
      { id: prev.length + 1, role: "assistant", text: answer },
    ]);
  };

  return (
    <main className="flex min-h-screen bg-zinc-950 text-white">
      <Sidebar />

      <div className="flex-1 p-10 flex flex-col">
        <h2 className="text-3xl font-bold mb-2">🤖 Assistant IA</h2>

        <p className="text-zinc-500 mb-6">
          Pose une question sur tes finances, je réponds en analysant tes
          données.
        </p>

        <div className="bg-zinc-900 rounded-3xl p-8 shadow-lg flex-1 flex flex-col min-h-[420px]">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-5 py-3 whitespace-pre-line leading-7 ${
                    message.role === "user"
                      ? "bg-blue-600"
                      : "bg-zinc-800 text-zinc-200"
                  }`}
                >
                  {message.role === "assistant" && (
                    <span className="mr-2">🤖</span>
                  )}
                  {message.text}
                </div>
              </div>
            ))}

            <div ref={bottomRef} />
          </div>

          <div className="border-t border-zinc-800 mt-6 pt-6">
            <p className="text-zinc-500 text-sm mb-3">
              Questions suggérées :
            </p>

            <div className="flex flex-wrap gap-3">
              {QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuestion(q)}
                  className="bg-zinc-800 hover:bg-blue-600 transition rounded-xl px-4 py-2 text-sm"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}