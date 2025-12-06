import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md shadow-green-300/50 dark:shadow-green-900/50",
    upcoming:
      "bg-gradient-to-r from-purple-400 to-violet-500 text-white shadow-md shadow-purple-300/50 dark:shadow-purple-900/50",
    completed:
      "bg-gradient-to-r from-slate-400 to-slate-500 text-white shadow-md shadow-slate-300/50 dark:shadow-slate-900/50",
    winner:
      "bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 shadow-md shadow-yellow-300/50 dark:shadow-yellow-900/50",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
