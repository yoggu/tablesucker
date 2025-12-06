import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#DC143C] text-white border-[#8B0000] dark:bg-[#FF6B6B] dark:text-[#1a0a0f] dark:border-[#DC143C]",
    upcoming:
      "bg-[#4169E1] text-white border-[#27408B] dark:bg-[#6495ED] dark:text-[#1a0a0f] dark:border-[#4169E1]",
    completed:
      "bg-[#696969] text-white border-[#2F4F4F] dark:bg-[#808080] dark:text-[#1a0a0f] dark:border-[#696969]",
    winner:
      "bg-[#FFD700] text-[#8B4513] border-[#DAA520] dark:bg-[#FFE066] dark:text-[#1a0a0f] dark:border-[#FFD700]",
  };

  return (
    <span
      className={`inline-flex items-center border-4 px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
