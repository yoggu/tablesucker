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
      "border-[#9370DB] bg-[#9370DB] text-white shadow-[6px_6px_0px_0px_#6A5ACD] hover:shadow-[3px_3px_0px_0px_#6A5ACD] active:shadow-none dark:border-[#DDA0DD] dark:bg-[#DDA0DD] dark:text-[#150a1a] dark:shadow-[6px_6px_0px_0px_#9370DB]",
    secondary:
      "border-[#20B2AA] bg-[#20B2AA] text-white shadow-[6px_6px_0px_0px_#008B8B] hover:shadow-[3px_3px_0px_0px_#008B8B] active:shadow-none dark:border-[#40E0D0] dark:bg-[#40E0D0] dark:text-[#150a1a] dark:shadow-[6px_6px_0px_0px_#20B2AA]",
    outline:
      "border-[#9370DB] bg-[#150a1a] text-[#9370DB] shadow-[6px_6px_0px_0px_#9370DB] hover:bg-[#9370DB] hover:text-white hover:shadow-[3px_3px_0px_0px_#6A5ACD] dark:border-[#DDA0DD] dark:text-[#DDA0DD] dark:shadow-[6px_6px_0px_0px_#DDA0DD] dark:hover:bg-[#DDA0DD] dark:hover:text-[#150a1a]",
    ghost:
      "border-transparent bg-transparent text-[#9370DB] hover:bg-[#9370DB]/20 dark:text-[#DDA0DD] dark:hover:bg-[#DDA0DD]/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
