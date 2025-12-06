import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-3xl border-2 border-purple-200 bg-white p-6 shadow-lg shadow-purple-200/50 transition-all hover:shadow-xl hover:shadow-purple-300/50 dark:border-purple-800/50 dark:bg-[#2D2640] dark:shadow-purple-900/30 dark:hover:shadow-purple-800/40 ${className}`}
    >
      {children}
    </div>
  );
}
