import { steps, type StepId } from "./steps";

// The agent's get-started picks, shared by the onboarding flow and the destinations page.
export type Answers = Record<StepId, string[]>;
export type Saved = { answers: Answers; visited: StepId[] };

const STORAGE_KEY = "fct-get-started";

export const empty: Answers = {
  market: [],
  destinations: [],
  specialise: [],
  hotels: [],
};

export function loadAnswers(): Saved {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Partial<{
        answers: Partial<Answers>;
        visited: StepId[];
      }>;
      const answers = { ...empty };
      for (const s of steps) {
        const ids = (saved.answers?.[s.id] ?? []).filter((id) =>
          s.choices.some((c) => c.id === id),
        );
        answers[s.id] = s.multi ? ids : ids.slice(0, 1);
      }
      return {
        answers,
        visited: (saved.visited ?? []).filter((v) =>
          steps.some((s) => s.id === v),
        ),
      };
    }
  } catch {
    /* storage blocked or corrupt — start fresh */
  }
  return { answers: empty, visited: [] };
}

export function saveAnswers(saved: Saved) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
  } catch {
    /* ignore */
  }
}

export function clearAnswers() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
