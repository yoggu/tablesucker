import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#4CAF50] text-white border-[#2E7D32] dark:bg-[#388E3C] dark:border-[#1B5E20]",
    upcoming:
      "bg-[#FF9800] text-white border-[#EF6C00] dark:bg-[#F57C00] dark:border-[#E65100]",
    completed:
      "bg-[#9E9E9E] text-white border-[#616161] dark:bg-[#757575] dark:border-[#424242]",
    winner:
      "bg-gradient-to-r from-[#FFD700] to-[#FFA000] text-[#5D4037] border-[#FF8F00] dark:from-[#FFB300] dark:to-[#FF6F00] dark:border-[#E65100]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border-2 px-3 py-1 text-xs font-bold uppercase tracking-wide shadow-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
