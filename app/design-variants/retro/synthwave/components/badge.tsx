import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-gradient-to-r from-[#FF00FF] to-[#FF1493] text-white dark:shadow-[0_0_10px_rgba(255,0,255,0.5)] animate-pulse",
    upcoming:
      "bg-gradient-to-r from-[#00FFFF] to-[#00CED1] text-black dark:shadow-[0_0_10px_rgba(0,255,255,0.5)]",
    completed:
      "bg-gradient-to-r from-[#666666] to-[#888888] text-white",
    winner:
      "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black dark:shadow-[0_0_10px_rgba(255,215,0,0.5)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-widest ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
