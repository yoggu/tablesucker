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
    "inline-flex items-center justify-center border-4 px-6 py-3 text-sm font-black uppercase tracking-wide transition-all active:translate-x-1 active:translate-y-1";

  const variants = {
    primary:
      "border-[#00DDFF] bg-[#0088FF] text-white shadow-[4px_4px_0px_0px_#005599] hover:shadow-[2px_2px_0px_0px_#005599] active:shadow-none",
    secondary:
      "border-[#00DDFF] bg-[#00DDFF] text-[#0a1628] shadow-[4px_4px_0px_0px_#0088FF] hover:shadow-[2px_2px_0px_0px_#0088FF] active:shadow-none",
    outline:
      "border-[#00DDFF] bg-transparent text-[#00DDFF] shadow-[4px_4px_0px_0px_#0088FF] hover:bg-[#0088FF]/20 hover:shadow-[2px_2px_0px_0px_#0088FF] active:shadow-none",
    ghost:
      "border-transparent bg-transparent text-[#00DDFF] hover:bg-[#0088FF]/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
