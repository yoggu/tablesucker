import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-white/30 bg-white/60 p-6 shadow-xl shadow-black/5 backdrop-blur-xl transition-all hover:bg-white/70 hover:shadow-2xl dark:border-white/10 dark:bg-white/10 dark:shadow-black/20 dark:hover:bg-white/15 ${className}`}
    >
      {children}
    </div>
  );
}
