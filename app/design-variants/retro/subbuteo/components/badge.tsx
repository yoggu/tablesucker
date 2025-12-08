import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variantClasses = {
    active: "bg-[#4A7C23] text-white border-[#2D5016]",
    upcoming: "bg-[#1E90FF] text-white border-[#0066CC]",
    completed: "bg-[#808080] text-white border-[#666]",
    winner: "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-[#8B4513] border-[#DAA520]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-wider ${variantClasses[variant]}`}
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.15)" }}
    >
      {children}
    </span>
  );
}
