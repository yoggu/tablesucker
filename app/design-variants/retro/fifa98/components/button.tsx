import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({ children, variant = "primary", className = "" }: ButtonProps) {
  const baseClasses =
    "px-5 py-2.5 rounded font-black uppercase tracking-wider text-sm transition-all duration-200 border-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-[#FFD700] to-[#FFA500] border-[#FFD700] text-[#0D1F33] hover:from-[#FFEB3B] hover:to-[#FFD700] shadow-lg",
    secondary:
      "bg-gradient-to-b from-[#C0C0C0] to-[#808080] border-[#C0C0C0] text-[#0D1F33] hover:from-[#D3D3D3] hover:to-[#C0C0C0] shadow-lg",
    outline:
      "bg-transparent border-[#FFD700] text-[#FFD700] hover:bg-[#FFD700]/20",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
}
