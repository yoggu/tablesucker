import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#9370DB] text-white border-[#6A5ACD] dark:bg-[#DDA0DD] dark:text-[#150a1a] dark:border-[#9370DB]",
    upcoming:
      "bg-[#20B2AA] text-white border-[#008B8B] dark:bg-[#40E0D0] dark:text-[#150a1a] dark:border-[#20B2AA]",
    completed:
      "bg-[#778899] text-white border-[#2F4F4F] dark:bg-[#A9A9A9] dark:text-[#150a1a] dark:border-[#778899]",
    winner:
      "bg-[#FFD700] text-[#6A5ACD] border-[#DAA520] dark:bg-[#FFE066] dark:text-[#150a1a] dark:border-[#FFD700]",
  };

  return (
    <span
      className={`inline-flex items-center border-4 px-3 py-1.5 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
