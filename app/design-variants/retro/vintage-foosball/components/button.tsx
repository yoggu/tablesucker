import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({ children, variant = "primary", className = "" }: ButtonProps) {
  const baseClasses =
    "px-5 py-2.5 rounded font-serif font-semibold transition-all duration-200 border-2";

  const variantClasses = {
    primary:
      "bg-gradient-to-b from-[#B8860B] to-[#8B6914] border-[#DAA520] text-[#3D2914] hover:from-[#DAA520] hover:to-[#B8860B] shadow-md hover:shadow-lg",
    secondary:
      "bg-gradient-to-b from-[#8B0000] to-[#5C0000] border-[#CD5C5C] text-[#F5DEB3] hover:from-[#A52A2A] hover:to-[#8B0000] shadow-md hover:shadow-lg",
    outline:
      "bg-transparent border-[#8B7355] text-[#DEB887] hover:bg-[#8B7355]/20 hover:border-[#DEB887]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ textShadow: variant === "primary" ? "none" : "1px 1px 1px rgba(0,0,0,0.3)" }}
    >
      {children}
    </button>
  );
}
