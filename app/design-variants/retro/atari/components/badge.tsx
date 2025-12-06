import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#FF6600] text-white border-[#CC5200] dark:bg-[#FFCC00] dark:text-black dark:border-[#CC9900] animate-pulse",
    upcoming:
      "bg-[#0066FF] text-white border-[#0052CC] dark:bg-[#00CCFF] dark:text-black dark:border-[#0099CC]",
    completed:
      "bg-[#666666] text-white border-[#444444] dark:bg-[#888888] dark:text-black dark:border-[#666666]",
    winner:
      "bg-[#FFD700] text-black border-[#CC9900] dark:bg-[#FFD700] dark:text-black dark:border-[#CC9900]",
  };

  return (
    <span
      className={`inline-flex items-center border-4 px-3 py-1 text-xs font-black uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
