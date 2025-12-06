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
    "inline-flex items-center justify-center border-4 px-5 py-2.5 font-mono text-sm font-bold uppercase tracking-wider transition-all active:translate-x-1 active:translate-y-1";

  const variants = {
    primary:
      "border-[#FF6B35] bg-[#FF6B35] text-white shadow-[4px_4px_0px_0px_#00CED1] hover:shadow-[2px_2px_0px_0px_#00CED1] active:shadow-none dark:border-[#39FF14] dark:bg-[#39FF14] dark:text-black dark:shadow-[4px_4px_0px_0px_#FF69B4] dark:hover:shadow-[2px_2px_0px_0px_#FF69B4] dark:[text-shadow:none]",
    secondary:
      "border-[#FF00FF] bg-[#FF00FF] text-white shadow-[4px_4px_0px_0px_#00CED1] hover:shadow-[2px_2px_0px_0px_#00CED1] active:shadow-none dark:border-[#FF69B4] dark:bg-[#FF69B4] dark:text-black dark:shadow-[4px_4px_0px_0px_#00BFFF] dark:hover:shadow-[2px_2px_0px_0px_#00BFFF]",
    outline:
      "border-[#FF6B35] bg-transparent text-[#FF6B35] shadow-[4px_4px_0px_0px_#FF6B35] hover:bg-[#FF6B35] hover:text-white hover:shadow-[2px_2px_0px_0px_#FF6B35] dark:border-[#39FF14] dark:text-[#39FF14] dark:shadow-[4px_4px_0px_0px_#39FF14] dark:hover:bg-[#39FF14] dark:hover:text-black dark:hover:shadow-[2px_2px_0px_0px_#39FF14]",
    ghost:
      "border-transparent bg-transparent text-[#FF6B35] hover:bg-[#FF6B35]/10 dark:text-[#39FF14] dark:hover:bg-[#39FF14]/10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
