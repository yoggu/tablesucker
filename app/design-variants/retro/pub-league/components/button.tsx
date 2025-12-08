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
      "bg-[#FDD835] border-[#FBC02D] text-[#1B5E20] hover:bg-[#FFEB3B] shadow-md hover:shadow-lg",
    secondary:
      "bg-[#D32F2F] border-[#F44336] text-white hover:bg-[#E53935] shadow-md hover:shadow-lg",
    outline:
      "bg-transparent border-[#4CAF50] text-[#A5D6A7] hover:bg-[#4CAF50]/20 hover:text-[#C8E6C9]",
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </button>
  );
}
