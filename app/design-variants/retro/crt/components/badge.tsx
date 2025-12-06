import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#006400] text-white border-[#006400] dark:bg-[#39FF14] dark:text-black dark:border-[#39FF14] dark:[box-shadow:0_0_10px_#39FF14] animate-pulse",
    upcoming:
      "bg-[#008080] text-white border-[#008080] dark:bg-[#00FFFF] dark:text-black dark:border-[#00FFFF]",
    completed:
      "bg-slate-500 text-white border-slate-500 dark:bg-slate-600 dark:text-white dark:border-slate-600",
    winner:
      "bg-yellow-500 text-black border-yellow-500 dark:bg-yellow-400 dark:text-black dark:border-yellow-400 dark:[box-shadow:0_0_10px_#facc15]",
  };

  return (
    <span
      className={`inline-flex items-center border-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
