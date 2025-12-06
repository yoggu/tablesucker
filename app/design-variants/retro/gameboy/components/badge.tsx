import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active: "bg-[#0F380F] text-[#9BBC0F] border-[#0F380F] dark:bg-[#6868a8] dark:text-[#0a0a14] dark:border-[#1a1a2e]",
    upcoming: "bg-[#306230] text-[#9BBC0F] border-[#0F380F] dark:bg-[#4a4a6a] dark:text-[#c8c8d8] dark:border-[#1a1a2e]",
    completed: "bg-[#8BAC0F] text-[#0F380F] border-[#0F380F] dark:bg-[#2d2d44] dark:text-[#6868a8] dark:border-[#1a1a2e]",
    winner: "bg-[#0F380F] text-[#9BBC0F] border-[#9BBC0F] dark:bg-[#8888c8] dark:text-[#0a0a14] dark:border-[#c8c8d8]",
  };

  return (
    <span
      className={`inline-flex items-center border-2 px-3 py-1 text-[8px] font-bold ${variants[variant]}`}
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {children}
    </span>
  );
}
