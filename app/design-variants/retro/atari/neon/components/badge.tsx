import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#00FF88] text-[#0a0a14] border-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.6)]",
    upcoming:
      "bg-[#AA00FF] text-white border-[#AA00FF] shadow-[0_0_10px_rgba(170,0,255,0.4)]",
    completed:
      "bg-[#333344] text-[#88889A] border-[#444455]",
    winner:
      "bg-gradient-to-r from-[#00FF88] to-[#AA00FF] text-white border-[#00FF88] shadow-[0_0_15px_rgba(0,255,136,0.5)]",
  };

  return (
    <span
      className={`inline-flex items-center border-3 px-4 py-1.5 text-xs font-black uppercase tracking-wide ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
