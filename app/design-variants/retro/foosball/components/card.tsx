import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-lg border-4 border-[#5D4037] bg-[#EFEBE9] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_8px_rgba(0,0,0,0.2)] dark:border-[#3E2723] dark:bg-[#1B1410] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.05),0_4px_12px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Wood grain texture overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='4' seed='15'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wood)'/%3E%3C/svg%3E")`,
        }}
      />

      {title && (
        <div className="border-b-4 border-[#5D4037] bg-gradient-to-r from-[#6D4C41] via-[#8D6E63] to-[#6D4C41] px-5 py-3 dark:border-[#3E2723] dark:from-[#3E2723] dark:via-[#4E342E] dark:to-[#3E2723]">
          <h2 className="text-center text-lg font-bold uppercase tracking-wide text-white dark:text-[#D7CCC8]">
            {title}
          </h2>
        </div>
      )}
      <div className="relative p-5">{children}</div>
    </div>
  );
}
