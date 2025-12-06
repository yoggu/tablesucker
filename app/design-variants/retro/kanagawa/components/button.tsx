import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#7E9CD8] focus:ring-offset-2 focus:ring-offset-[#1F1F28]";

  const variants = {
    primary:
      "bg-[#7E9CD8] text-[#1F1F28] hover:bg-[#7FB4CA]",
    secondary:
      "bg-[#98BB6C] text-[#1F1F28] hover:bg-[#87A96B]",
    outline:
      "border border-[#54546D] bg-transparent text-[#DCD7BA] hover:bg-[#2A2A37] hover:border-[#7E9CD8]",
    ghost:
      "bg-transparent text-[#DCD7BA] hover:bg-[#2A2A37]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
