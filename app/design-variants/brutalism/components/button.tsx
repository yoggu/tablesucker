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
    "inline-flex items-center justify-center border-4 border-black px-6 py-3 text-sm font-black uppercase tracking-wider transition-all hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 dark:border-white";

  const variants = {
    primary:
      "bg-[#0066FF] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none dark:bg-[#00FFFF] dark:text-black dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
    secondary:
      "bg-[#FF3333] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none dark:bg-[#FF00FF] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
    outline:
      "bg-transparent text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:text-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:bg-white dark:hover:text-black dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]",
    ghost:
      "border-transparent bg-transparent text-black shadow-none hover:bg-black hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-black",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
