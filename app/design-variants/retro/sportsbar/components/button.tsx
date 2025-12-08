import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({ children, variant = "primary", className = "" }: ButtonProps) {
  const baseClasses =
    "px-5 py-2.5 rounded-lg font-bold uppercase tracking-wide text-sm transition-all duration-200 border-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-[#228B22] to-[#006400] border-[#32CD32] text-white hover:from-[#32CD32] hover:to-[#228B22] shadow-lg hover:shadow-[#32CD32]/30",
    secondary:
      "bg-gradient-to-b from-[#B8860B] to-[#8B6914] border-[#FFD700] text-white hover:from-[#DAA520] hover:to-[#B8860B] shadow-lg hover:shadow-[#FFD700]/30",
    outline:
      "bg-transparent border-[#8B4513] text-[#F5E6D3] hover:bg-[#8B4513]/20 hover:border-[#CD853F]",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
}
