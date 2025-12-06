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
    "inline-flex items-center justify-center border-4 px-4 py-2 text-[10px] font-bold transition-all active:translate-x-1 active:translate-y-1";

  const variants = {
    primary:
      "border-[#0F380F] bg-[#0F380F] text-[#9BBC0F] shadow-[4px_4px_0px_0px_#306230] hover:bg-[#306230] active:shadow-none dark:border-[#1a1a2e] dark:bg-[#6868a8] dark:text-[#0a0a14] dark:shadow-[4px_4px_0px_0px_#0a0a14] dark:hover:bg-[#8888c8]",
    secondary:
      "border-[#0F380F] bg-[#306230] text-[#9BBC0F] shadow-[4px_4px_0px_0px_#0F380F] hover:bg-[#0F380F] active:shadow-none dark:border-[#1a1a2e] dark:bg-[#4a4a6a] dark:text-[#c8c8d8] dark:shadow-[4px_4px_0px_0px_#0a0a14] dark:hover:bg-[#5a5a7a]",
    outline:
      "border-[#0F380F] bg-transparent text-[#0F380F] shadow-[4px_4px_0px_0px_#306230] hover:bg-[#306230]/30 active:shadow-none dark:border-[#4a4a6a] dark:text-[#9898b8] dark:shadow-[4px_4px_0px_0px_#0a0a14] dark:hover:bg-[#2d2d44]/50",
    ghost:
      "border-transparent bg-transparent text-[#0F380F] hover:bg-[#306230]/30 dark:text-[#9898b8] dark:hover:bg-[#2d2d44]/50",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      style={{ fontFamily: "'Press Start 2P', monospace" }}
    >
      {children}
    </button>
  );
}
