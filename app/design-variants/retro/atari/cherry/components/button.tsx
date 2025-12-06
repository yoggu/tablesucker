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
    "inline-flex items-center justify-center border-4 px-6 py-3 text-sm font-black uppercase tracking-widest transition-all active:translate-x-1 active:translate-y-1";

  const variants = {
    primary:
      "border-[#DC143C] bg-[#DC143C] text-white shadow-[6px_6px_0px_0px_#8B0000] hover:shadow-[3px_3px_0px_0px_#8B0000] active:shadow-none dark:border-[#FF6B6B] dark:bg-[#FF6B6B] dark:text-[#1a0a0f] dark:shadow-[6px_6px_0px_0px_#DC143C]",
    secondary:
      "border-[#4169E1] bg-[#4169E1] text-white shadow-[6px_6px_0px_0px_#27408B] hover:shadow-[3px_3px_0px_0px_#27408B] active:shadow-none dark:border-[#6495ED] dark:bg-[#6495ED] dark:text-[#1a0a0f] dark:shadow-[6px_6px_0px_0px_#4169E1]",
    outline:
      "border-[#DC143C] bg-[#1a0a0f] text-[#DC143C] shadow-[6px_6px_0px_0px_#DC143C] hover:bg-[#DC143C] hover:text-white hover:shadow-[3px_3px_0px_0px_#8B0000] dark:border-[#FF6B6B] dark:text-[#FF6B6B] dark:shadow-[6px_6px_0px_0px_#FF6B6B] dark:hover:bg-[#FF6B6B] dark:hover:text-[#1a0a0f]",
    ghost:
      "border-transparent bg-transparent text-[#DC143C] hover:bg-[#DC143C]/20 dark:text-[#FF6B6B] dark:hover:bg-[#FF6B6B]/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
