import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#006400] bg-white shadow-[4px_4px_0px_0px_#006400] dark:border-[#39FF14] dark:bg-[#0a0a0a] dark:shadow-[4px_4px_0px_0px_#39FF14,0_0_20px_rgba(57,255,20,0.15)] ${className}`}
    >
      {/* Terminal Title Bar */}
      {title && (
        <div className="flex items-center justify-between border-b-4 border-[#006400] bg-[#006400] px-3 py-1.5 dark:border-[#39FF14] dark:bg-[#39FF14]">
          <span className="font-mono text-sm font-bold text-white dark:text-black">
            {title}
          </span>
          <div className="flex gap-1.5">
            <div className="h-3 w-3 border-2 border-white/50 dark:border-black/50" />
            <div className="h-3 w-3 border-2 border-white/50 dark:border-black/50" />
            <div className="h-3 w-3 bg-white dark:bg-black" />
          </div>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
