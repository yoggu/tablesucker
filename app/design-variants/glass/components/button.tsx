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
    "inline-flex items-center justify-center rounded-xl px-6 py-3 font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 dark:from-sky-400 dark:to-purple-500 dark:shadow-sky-500/20",
    secondary:
      "bg-white/80 text-slate-700 shadow-lg shadow-black/10 backdrop-blur-sm hover:bg-white hover:shadow-xl dark:bg-white/20 dark:text-white dark:hover:bg-white/30",
    outline:
      "border border-blue-400/50 text-blue-600 backdrop-blur-sm hover:bg-blue-50/50 dark:border-sky-400/30 dark:text-sky-400 dark:hover:bg-sky-400/10",
    ghost:
      "text-slate-600 hover:bg-white/50 backdrop-blur-sm dark:text-slate-300 dark:hover:bg-white/10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
