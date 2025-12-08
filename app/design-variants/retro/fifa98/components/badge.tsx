import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variantClasses = {
    active: "bg-[#00FF00] text-[#0D1F33] border-[#00FF00]",
    upcoming: "bg-[#00BFFF] text-[#0D1F33] border-[#00BFFF]",
    completed: "bg-[#808080] text-white border-[#C0C0C0]",
    winner: "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#0D1F33] border-[#FFD700]",
  };

  return (
    <span
      className={`inline-flex items-center rounded border-2 px-3 py-1 text-xs font-black uppercase tracking-wider ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
