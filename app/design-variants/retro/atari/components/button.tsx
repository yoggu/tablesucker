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
      "border-[#FF6600] bg-[#FF6600] text-white shadow-[6px_6px_0px_0px_#CC5200] hover:shadow-[3px_3px_0px_0px_#CC5200] active:shadow-none dark:border-[#FFCC00] dark:bg-[#FFCC00] dark:text-black dark:shadow-[6px_6px_0px_0px_#CC9900]",
    secondary:
      "border-[#0066FF] bg-[#0066FF] text-white shadow-[6px_6px_0px_0px_#0052CC] hover:shadow-[3px_3px_0px_0px_#0052CC] active:shadow-none dark:border-[#00CCFF] dark:bg-[#00CCFF] dark:text-black dark:shadow-[6px_6px_0px_0px_#0099CC]",
    outline:
      "border-[#FF6600] bg-black text-[#FF6600] shadow-[6px_6px_0px_0px_#FF6600] hover:bg-[#FF6600] hover:text-white hover:shadow-[3px_3px_0px_0px_#CC5200] dark:border-[#FFCC00] dark:text-[#FFCC00] dark:shadow-[6px_6px_0px_0px_#FFCC00] dark:hover:bg-[#FFCC00] dark:hover:text-black",
    ghost:
      "border-transparent bg-transparent text-[#FF6600] hover:bg-[#FF6600]/20 dark:text-[#FFCC00] dark:hover:bg-[#FFCC00]/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
