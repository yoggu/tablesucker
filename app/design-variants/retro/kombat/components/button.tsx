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
    "inline-flex items-center justify-center border-4 px-6 py-3 text-sm font-black uppercase tracking-widest transition-all active:translate-y-1";

  const variants = {
    primary:
      "border-[#FFD700] bg-gradient-to-b from-[#8B0000] to-[#4a0000] text-[#FFD700] shadow-[0_4px_0_#4a0000,0_0_15px_rgba(255,69,0,0.3)] hover:shadow-[0_2px_0_#4a0000,0_0_20px_rgba(255,69,0,0.5)] active:shadow-none",
    secondary:
      "border-[#00BFFF] bg-gradient-to-b from-[#000080] to-[#00004d] text-[#00BFFF] shadow-[0_4px_0_#00004d,0_0_15px_rgba(0,191,255,0.3)] hover:shadow-[0_2px_0_#00004d,0_0_20px_rgba(0,191,255,0.5)] active:shadow-none",
    outline:
      "border-[#FFD700] bg-transparent text-[#FFD700] shadow-[0_4px_0_#8B4513] hover:bg-[#8B0000]/30 hover:shadow-[0_2px_0_#8B4513] active:shadow-none",
    ghost:
      "border-transparent bg-transparent text-[#FF4500] hover:text-[#FFD700] hover:bg-[#8B0000]/20",
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
}
