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
    "inline-flex items-center justify-center rounded-2xl px-6 py-3 font-semibold transition-all duration-200 hover:scale-105 active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 text-white shadow-lg shadow-purple-300/50 hover:shadow-xl hover:shadow-pink-300/50 dark:shadow-purple-900/50 dark:hover:shadow-pink-900/50",
    secondary:
      "bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 shadow-lg shadow-yellow-300/50 hover:shadow-xl hover:shadow-orange-300/50",
    outline:
      "border-2 border-purple-400 text-purple-600 hover:bg-purple-50 dark:border-purple-500 dark:text-purple-400 dark:hover:bg-purple-950/50",
    ghost:
      "text-purple-600 hover:bg-purple-100 dark:text-purple-400 dark:hover:bg-purple-900/30",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
