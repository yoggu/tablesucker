import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#0088FF] text-white border-[#00DDFF] shadow-[0_0_10px_rgba(0,136,255,0.5)]",
    upcoming:
      "bg-[#0a1628] text-[#00DDFF] border-[#00DDFF]",
    completed:
      "bg-[#334455] text-[#99AABB] border-[#556677]",
    winner:
      "bg-[#00DDFF] text-[#0a1628] border-[#00DDFF] shadow-[0_0_10px_rgba(0,221,255,0.5)]",
  };

  return (
    <span
      className={`inline-flex items-center border-3 px-4 py-1.5 text-xs font-black uppercase tracking-wide ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
