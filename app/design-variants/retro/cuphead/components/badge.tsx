import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#C41E3A] text-[#FDF8F0] border-[#8B0A1A] dark:bg-[#8B2500] dark:text-[#F5E6D3] dark:border-[#D4A574] dark:shadow-[0_0_10px_rgba(139,37,0,0.4)]",
    upcoming:
      "bg-[#4A4A8A] text-[#FDF8F0] border-[#2A2A5A] dark:bg-[#1A5631] dark:text-[#F5E6D3] dark:border-[#D4A574] dark:shadow-[0_0_10px_rgba(26,86,49,0.4)]",
    completed:
      "bg-[#5D5D5D] text-[#E8E8E8] border-[#3D3D3D] dark:bg-[#2A1A08] dark:text-[#8B4513] dark:border-[#8B4513]",
    winner:
      "bg-[#DAA520] text-[#5D3A1A] border-[#8B6914] dark:bg-gradient-to-r dark:from-[#DAA520] dark:to-[#8B4513] dark:text-[#1A1008] dark:border-[#DAA520] dark:shadow-[0_0_15px_rgba(218,165,32,0.5)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-sm border-2 px-3 py-1 font-serif text-xs font-bold italic shadow-[2px_2px_0_#5D3A1A] dark:shadow-none ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
