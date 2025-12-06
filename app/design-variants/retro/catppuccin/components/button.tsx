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
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#CBA6F7] focus:ring-offset-2 focus:ring-offset-[#1E1E2E]";

  const variants = {
    primary:
      "bg-[#CBA6F7] text-[#1E1E2E] hover:bg-[#B4BEFE]", // Mauve
    secondary:
      "bg-[#A6E3A1] text-[#1E1E2E] hover:bg-[#94E2D5]", // Green
    outline:
      "border border-[#45475A] bg-transparent text-[#CDD6F4] hover:bg-[#313244] hover:border-[#CBA6F7]",
    ghost:
      "bg-transparent text-[#CDD6F4] hover:bg-[#313244]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
