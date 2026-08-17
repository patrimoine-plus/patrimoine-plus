export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: number;
  role: ChatRole;
  text: string;
};

export type QuestionPreset = {
  id: string;
  label: string;
};