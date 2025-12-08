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
    "inline-flex items-center justify-center rounded border-2 px-4 py-2 font-mono text-sm font-bold uppercase tracking-wider transition-all";

  const variants = {
    primary:
      "border-[#FF6B00] bg-[#FF6B00] text-black hover:bg-[#FF8533] hover:shadow-[0_0_15px_rgba(255,107,0,0.5)]",
    secondary:
      "border-[#00FF00] bg-[#00FF00] text-black hover:bg-[#33FF33] hover:shadow-[0_0_15px_rgba(0,255,0,0.5)]",
    outline:
      "border-[#FF6B00] bg-transparent text-[#FF6B00] hover:bg-[#FF6B00]/10 hover:shadow-[0_0_15px_rgba(255,107,0,0.3)]",
    ghost:
      "border-transparent bg-transparent text-[#FF6B00] hover:bg-[#FF6B00]/10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
