import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#98BB6C] text-[#1F1F28]", // Spring green
    upcoming:
      "bg-[#7E9CD8] text-[#1F1F28]", // Wave blue
    completed:
      "bg-[#54546D] text-[#DCD7BA]", // Muted
    winner:
      "bg-[#DCA561] text-[#1F1F28]", // Autumn yellow/gold
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
