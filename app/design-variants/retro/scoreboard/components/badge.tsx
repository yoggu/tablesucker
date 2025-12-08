import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#00FF00] text-black shadow-[0_0_10px_rgba(0,255,0,0.5)]", // Green LED
    upcoming:
      "bg-[#FF6B00] text-black shadow-[0_0_10px_rgba(255,107,0,0.5)]", // Amber LED
    completed:
      "bg-[#444] text-[#888]", // Off LED
    winner:
      "bg-[#FFD700] text-black shadow-[0_0_10px_rgba(255,215,0,0.5)]", // Gold LED
  };

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-1 font-mono text-xs font-bold uppercase tracking-wider ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
