import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-gradient-to-r from-[#8B0000] to-[#FF4500] text-[#FFD700] border-[#FFD700] shadow-[0_0_15px_rgba(255,69,0,0.5)] animate-pulse",
    upcoming:
      "bg-gradient-to-r from-[#000080] to-[#0000CD] text-[#00BFFF] border-[#00BFFF] shadow-[0_0_10px_rgba(0,191,255,0.3)]",
    completed:
      "bg-gradient-to-r from-[#333] to-[#555] text-[#999] border-[#666]",
    winner:
      "bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-black border-[#8B4513] shadow-[0_0_20px_rgba(255,215,0,0.5)]",
  };

  return (
    <span
      className={`inline-flex items-center border-2 px-4 py-1.5 text-xs font-black uppercase tracking-widest ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
