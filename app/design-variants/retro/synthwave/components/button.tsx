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
    "inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-[#FF00FF] to-[#FF1493] text-white shadow-lg hover:shadow-[0_0_20px_rgba(255,0,255,0.5)] dark:shadow-[0_0_15px_rgba(255,0,255,0.4)] dark:hover:shadow-[0_0_30px_rgba(255,0,255,0.6)]",
    secondary:
      "bg-gradient-to-r from-[#00FFFF] to-[#00CED1] text-black shadow-lg hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] dark:shadow-[0_0_15px_rgba(0,255,255,0.4)] dark:hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]",
    outline:
      "border-2 border-[#FF00FF] text-[#FF00FF] hover:bg-[#FF00FF]/10 dark:border-[#FF00FF] dark:text-[#FF00FF] dark:hover:bg-[#FF00FF]/20 dark:hover:shadow-[0_0_15px_rgba(255,0,255,0.3)]",
    ghost:
      "text-[#FF00FF] hover:bg-[#FF00FF]/10 dark:text-[#FF00FF] dark:hover:bg-[#FF00FF]/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
