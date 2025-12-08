import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variantClasses = {
    active: "bg-[#228B22] text-white border-[#32CD32] shadow-[0_0_10px_rgba(50,205,50,0.4)]",
    upcoming: "bg-[#4169E1] text-white border-[#6495ED] shadow-[0_0_10px_rgba(100,149,237,0.4)]",
    completed: "bg-[#696969] text-white border-[#808080]",
    winner: "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#1A0F0A] border-[#FFD700] shadow-[0_0_10px_rgba(255,215,0,0.5)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-wider ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
