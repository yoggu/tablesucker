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
      "border-[#006400] bg-[#006400] text-white shadow-[4px_4px_0px_0px_#004d00] hover:shadow-[2px_2px_0px_0px_#004d00] active:shadow-none dark:border-[#39FF14] dark:bg-[#39FF14] dark:text-black dark:shadow-[4px_4px_0px_0px_#2db82d] dark:hover:shadow-[2px_2px_0px_0px_#2db82d] dark:[text-shadow:none]",
    secondary:
      "border-[#008080] bg-[#008080] text-white shadow-[4px_4px_0px_0px_#006666] hover:shadow-[2px_2px_0px_0px_#006666] active:shadow-none dark:border-[#00FFFF] dark:bg-[#00FFFF] dark:text-black dark:shadow-[4px_4px_0px_0px_#00cccc]",
    outline:
      "border-[#006400] bg-transparent text-[#006400] shadow-[4px_4px_0px_0px_#006400] hover:bg-[#006400] hover:text-white hover:shadow-[2px_2px_0px_0px_#006400] dark:border-[#39FF14] dark:text-[#39FF14] dark:shadow-[4px_4px_0px_0px_#39FF14] dark:hover:bg-[#39FF14] dark:hover:text-black",
    ghost:
      "border-transparent bg-transparent text-[#006400] hover:bg-[#006400]/10 dark:text-[#39FF14] dark:hover:bg-[#39FF14]/10",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
