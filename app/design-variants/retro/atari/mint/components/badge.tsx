import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#20B2AA] text-white border-[#008B8B] dark:bg-[#40E0D0] dark:text-[#0f1a1a] dark:border-[#20B2AA]",
    upcoming:
      "bg-[#DDA0DD] text-[#4B0082] border-[#9932CC] dark:bg-[#DA70D6] dark:text-[#0f1a1a] dark:border-[#BA55D3]",
    completed:
      "bg-[#708090] text-white border-[#2F4F4F] dark:bg-[#778899] dark:text-[#0f1a1a] dark:border-[#696969]",
    winner:
      "bg-[#FFD700] text-[#8B4513] border-[#DAA520] dark:bg-[#FFE066] dark:text-[#0f1a1a] dark:border-[#FFD700]",
  };

  return (
    <span
      className={`inline-flex items-center border-4 px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
