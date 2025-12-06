import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-emerald-500/20 text-emerald-700 border-emerald-500/30 dark:bg-emerald-500/20 dark:text-emerald-300 dark:border-emerald-500/30",
    upcoming:
      "bg-blue-500/20 text-blue-700 border-blue-500/30 dark:bg-sky-500/20 dark:text-sky-300 dark:border-sky-500/30",
    completed:
      "bg-slate-500/20 text-slate-700 border-slate-500/30 dark:bg-slate-500/20 dark:text-slate-300 dark:border-slate-500/30",
    winner:
      "bg-amber-500/20 text-amber-700 border-amber-500/30 dark:bg-amber-500/20 dark:text-amber-300 dark:border-amber-500/30",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
