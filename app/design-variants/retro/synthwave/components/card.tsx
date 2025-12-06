import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border-2 border-[#FF00FF]/50 bg-white/80 shadow-lg backdrop-blur-sm dark:border-[#FF00FF] dark:bg-[#1a0533]/80 dark:shadow-[0_0_20px_rgba(255,0,255,0.3),inset_0_0_30px_rgba(0,255,255,0.05)] ${className}`}
    >
      {/* Neon Header */}
      {title && (
        <div className="border-b border-[#FF00FF]/30 bg-gradient-to-r from-[#FF00FF]/10 via-[#00FFFF]/10 to-[#FF00FF]/10 px-4 py-2 dark:border-[#FF00FF]/50 dark:from-[#FF00FF]/20 dark:via-[#00FFFF]/20 dark:to-[#FF00FF]/20">
          <span className="text-sm font-bold uppercase tracking-widest text-[#FF1493] dark:text-[#FF00FF] dark:[text-shadow:0_0_10px_rgba(255,0,255,0.5)]">
            ◆ {title}
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
