export const PROJECT_STATUSES = ["active", "paused", "delivered"] as const;
export const PROJECT_STATUS_LABEL: Record<string, string> = { active: "In progress", paused: "Paused", delivered: "Delivered" };
export const MILESTONE_STATUSES = ["todo", "doing", "done"] as const;
export const MILESTONE_LABEL: Record<string, string> = { todo: "Not started", doing: "In progress", done: "Done" };

export const DEFAULT_MILESTONES = [
  "Scope and price agreed",
  "Access to the store received",
  "Build on a preview theme",
  "Your review",
  "Revisions",
  "Published live and handed over",
];

export const TOKEN_RE = /^[a-f0-9]{24,64}$/;

export interface Milestone {
  id: string;
  title: string;
  sort: number;
  status: string;
  due_date: string | null;
  done_at: string | null;
}

export function progress(ms: Pick<Milestone, "status">[]): number {
  if (ms.length === 0) return 0;
  const score = ms.reduce((n, m) => n + (m.status === "done" ? 1 : m.status === "doing" ? 0.5 : 0), 0);
  return Math.round((score / ms.length) * 100);
}
