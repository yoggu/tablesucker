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
      "border-[#00FF88] bg-[#00FF88] text-[#0a0a14] shadow-[4px_4px_0px_0px_#AA00FF,0_0_10px_rgba(0,255,136,0.4)] hover:shadow-[2px_2px_0px_0px_#AA00FF,0_0_15px_rgba(0,255,136,0.6)] active:shadow-none",
    secondary:
      "border-[#AA00FF] bg-[#AA00FF] text-white shadow-[4px_4px_0px_0px_#00FF88,0_0_10px_rgba(170,0,255,0.4)] hover:shadow-[2px_2px_0px_0px_#00FF88,0_0_15px_rgba(170,0,255,0.6)] active:shadow-none",
    outline:
      "border-[#00FF88] bg-transparent text-[#00FF88] shadow-[4px_4px_0px_0px_#AA00FF] hover:bg-[#00FF88]/10 hover:shadow-[2px_2px_0px_0px_#AA00FF,0_0_10px_rgba(0,255,136,0.3)] active:shadow-none",
    ghost:
      "border-transparent bg-transparent text-[#00FF88] hover:bg-[#00FF88]/10 hover:shadow-[0_0_10px_rgba(0,255,136,0.3)]",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
