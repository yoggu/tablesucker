import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#39FF14] text-black border-[#39FF14] animate-pulse dark:bg-[#39FF14] dark:text-black dark:border-[#39FF14] dark:[box-shadow:0_0_10px_#39FF14]",
    upcoming:
      "bg-[#00CED1] text-black border-[#00CED1] dark:bg-[#00BFFF] dark:text-black dark:border-[#00BFFF]",
    completed:
      "bg-slate-400 text-black border-slate-400 dark:bg-slate-600 dark:text-white dark:border-slate-600",
    winner:
      "bg-[#FFD700] text-black border-[#FFD700] dark:bg-[#FFD700] dark:text-black dark:border-[#FFD700] dark:[box-shadow:0_0_10px_#FFD700]",
  };

  return (
    <span
      className={`inline-flex items-center border-2 px-3 py-1 font-mono text-xs font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
