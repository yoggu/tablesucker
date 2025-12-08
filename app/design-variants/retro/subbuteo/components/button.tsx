import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({ children, variant = "primary", className = "" }: ButtonProps) {
  const baseClasses =
    "px-5 py-2.5 rounded-full font-semibold uppercase tracking-wide text-sm transition-all duration-200 border-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-[#4A7C23] to-[#2D5016] border-[#2D5016] text-white hover:from-[#5A8C33] hover:to-[#3D6026] shadow-md",
    secondary:
      "bg-gradient-to-b from-[#C41E3A] to-[#8B0000] border-[#8B0000] text-white hover:from-[#D42E4A] hover:to-[#9B1010] shadow-md",
    outline:
      "bg-transparent border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513]/10",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ boxShadow: variant !== "outline" ? "0 3px 6px rgba(0,0,0,0.2)" : "none" }}
    >
      {children}
    </button>
  );
}
