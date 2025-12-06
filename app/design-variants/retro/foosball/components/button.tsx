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
    "inline-flex items-center justify-center rounded-md border-2 px-6 py-2.5 font-bold uppercase tracking-wide transition-all active:translate-y-0.5 active:shadow-none";

  const variants = {
    primary:
      "border-[#B71C1C] bg-[#E53935] text-white shadow-[0_4px_0_#B71C1C,0_4px_8px_rgba(0,0,0,0.3)] hover:bg-[#EF5350] hover:shadow-[0_2px_0_#B71C1C,0_2px_4px_rgba(0,0,0,0.3)] dark:border-[#7F0000] dark:bg-[#C62828] dark:shadow-[0_4px_0_#7F0000,0_4px_12px_rgba(0,0,0,0.4)] dark:hover:bg-[#D32F2F]",
    secondary:
      "border-[#1565C0] bg-[#1E88E5] text-white shadow-[0_4px_0_#1565C0,0_4px_8px_rgba(0,0,0,0.3)] hover:bg-[#42A5F5] hover:shadow-[0_2px_0_#1565C0,0_2px_4px_rgba(0,0,0,0.3)] dark:border-[#0D47A1] dark:bg-[#1565C0] dark:shadow-[0_4px_0_#0D47A1,0_4px_12px_rgba(0,0,0,0.4)] dark:hover:bg-[#1976D2]",
    outline:
      "border-[#5D4037] bg-transparent text-[#5D4037] hover:bg-[#5D4037]/10 dark:border-[#8D6E63] dark:text-[#D7CCC8] dark:hover:bg-[#8D6E63]/10",
    ghost:
      "border-transparent bg-transparent text-[#5D4037] hover:bg-[#5D4037]/10 dark:text-[#D7CCC8] dark:hover:bg-[#D7CCC8]/10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
