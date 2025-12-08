import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export function Button({ children, variant = "primary", className = "" }: ButtonProps) {
  const baseClasses =
    "px-4 py-2 rounded-none font-mono font-bold uppercase text-sm border-4 border-[#000] transition-transform active:translate-x-1 active:translate-y-1";

  const variantClasses = {
    primary: "bg-[#FF0000] text-white hover:bg-[#CC0000]",
    secondary: "bg-[#0000FF] text-white hover:bg-[#0000CC]",
    outline: "bg-[#5A8F29] text-white hover:bg-[#4A7F19]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ boxShadow: "3px 3px 0 #000" }}
    >
      {children}
    </button>
  );
}
