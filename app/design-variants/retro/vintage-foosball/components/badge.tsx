import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variantClasses = {
    active: "bg-[#228B22] text-[#F5DEB3] border-[#32CD32]",
    upcoming: "bg-[#4682B4] text-[#F5DEB3] border-[#87CEEB]",
    completed: "bg-[#696969] text-[#F5DEB3] border-[#A9A9A9]",
    winner: "bg-gradient-to-r from-[#B8860B] to-[#DAA520] text-[#3D2914] border-[#FFD700]",
  };

  return (
    <span
      className={`inline-flex items-center rounded border-2 px-3 py-1 font-serif text-sm font-semibold ${variantClasses[variant]}`}
      style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.2)" }}
    >
      {children}
    </span>
  );
}
