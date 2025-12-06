import { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "active" | "upcoming" | "completed" | "winner";
}

export function Badge({ children, variant = "active" }: BadgeProps) {
  const variants = {
    active:
      "bg-[#A6E3A1] text-[#1E1E2E]", // Green
    upcoming:
      "bg-[#89B4FA] text-[#1E1E2E]", // Blue
    completed:
      "bg-[#6C7086] text-[#CDD6F4]", // Overlay1
    winner:
      "bg-[#F9E2AF] text-[#1E1E2E]", // Yellow
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
