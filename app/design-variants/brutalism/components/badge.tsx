import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#00FF00] text-black border-black dark:bg-[#00FF00] dark:border-white",
    upcoming:
      "bg-[#0066FF] text-white border-black dark:bg-[#00FFFF] dark:text-black dark:border-white",
    completed:
      "bg-black text-white border-black dark:bg-white dark:text-black dark:border-white",
    winner:
      "bg-[#FFFF00] text-black border-black dark:bg-[#FFFF00] dark:border-white",
  };

  return (
    <span
      className={`inline-flex items-center border-2 px-3 py-1 text-xs font-black uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
