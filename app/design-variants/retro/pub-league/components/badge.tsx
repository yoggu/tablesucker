import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variantClasses = {
    active: "bg-[#4CAF50] text-white border-[#66BB6A]",
    upcoming: "bg-[#1976D2] text-white border-[#42A5F5]",
    completed: "bg-[#616161] text-white border-[#9E9E9E]",
    winner: "bg-[#FDD835] text-[#1B5E20] border-[#FFEB3B] font-black",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-wider ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
