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
      "border-[#20B2AA] bg-[#20B2AA] text-white shadow-[6px_6px_0px_0px_#008B8B] hover:shadow-[3px_3px_0px_0px_#008B8B] active:shadow-none dark:border-[#40E0D0] dark:bg-[#40E0D0] dark:text-[#0f1a1a] dark:shadow-[6px_6px_0px_0px_#20B2AA]",
    secondary:
      "border-[#FF6B6B] bg-[#FF6B6B] text-white shadow-[6px_6px_0px_0px_#CC5555] hover:shadow-[3px_3px_0px_0px_#CC5555] active:shadow-none dark:border-[#FF8888] dark:bg-[#FF8888] dark:text-[#0f1a1a] dark:shadow-[6px_6px_0px_0px_#FF6B6B]",
    outline:
      "border-[#20B2AA] bg-[#0f1a1a] text-[#20B2AA] shadow-[6px_6px_0px_0px_#20B2AA] hover:bg-[#20B2AA] hover:text-white hover:shadow-[3px_3px_0px_0px_#008B8B] dark:border-[#40E0D0] dark:text-[#40E0D0] dark:shadow-[6px_6px_0px_0px_#40E0D0] dark:hover:bg-[#40E0D0] dark:hover:text-[#0f1a1a]",
    ghost:
      "border-transparent bg-transparent text-[#20B2AA] hover:bg-[#20B2AA]/20 dark:text-[#40E0D0] dark:hover:bg-[#40E0D0]/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
