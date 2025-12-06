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
    "inline-flex items-center justify-center rounded-sm border-3 px-6 py-2.5 font-serif text-sm font-bold transition-all active:translate-x-0.5 active:translate-y-0.5 active:shadow-none";

  const variants = {
    primary:
      "border-[#5D3A1A] bg-[#C41E3A] text-[#FDF8F0] shadow-[3px_3px_0_#5D3A1A] hover:bg-[#A01830] hover:shadow-[2px_2px_0_#5D3A1A] dark:border-[#D4A574] dark:bg-[#8B2500] dark:text-[#F5E6D3] dark:shadow-[0_4px_0_#3D1A00,0_0_10px_rgba(139,37,0,0.4)] dark:hover:shadow-[0_2px_0_#3D1A00,0_0_15px_rgba(139,37,0,0.5)]",
    secondary:
      "border-[#5D3A1A] bg-[#1E5631] text-[#FDF8F0] shadow-[3px_3px_0_#5D3A1A] hover:bg-[#164425] hover:shadow-[2px_2px_0_#5D3A1A] dark:border-[#D4A574] dark:bg-[#1A5631] dark:text-[#F5E6D3] dark:shadow-[0_4px_0_#0A2A18,0_0_10px_rgba(26,86,49,0.4)] dark:hover:shadow-[0_2px_0_#0A2A18,0_0_15px_rgba(26,86,49,0.5)]",
    outline:
      "border-[#5D3A1A] bg-[#FDF8F0] text-[#5D3A1A] shadow-[3px_3px_0_#5D3A1A] hover:bg-[#E8D5C4] hover:shadow-[2px_2px_0_#5D3A1A] dark:border-[#D4A574] dark:bg-transparent dark:text-[#D4A574] dark:shadow-[0_4px_0_rgba(212,165,116,0.3)] dark:hover:bg-[#D4A574]/10",
    ghost:
      "border-transparent bg-transparent text-[#5D3A1A] hover:bg-[#5D3A1A]/10 dark:text-[#D4A574] dark:hover:bg-[#D4A574]/5",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
