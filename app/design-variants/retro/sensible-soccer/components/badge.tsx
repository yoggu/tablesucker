import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variantClasses = {
    active: "bg-[#00FF00] text-[#000]",
    upcoming: "bg-[#FFFF00] text-[#000]",
    completed: "bg-[#808080] text-white",
    winner: "bg-[#FFD700] text-[#000]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-none border-2 border-[#000] px-2 py-1 font-mono text-xs font-bold uppercase ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
