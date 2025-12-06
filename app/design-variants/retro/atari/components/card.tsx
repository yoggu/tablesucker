import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#FF6600] bg-[#FFF8E7] shadow-[8px_8px_0px_0px_#CC5200] dark:border-[#FFCC00] dark:bg-[#0f0f23] dark:shadow-[8px_8px_0px_0px_#FF6600] ${className}`}
    >
      {/* Arcade Cabinet Header */}
      {title && (
        <div className="border-b-4 border-[#FF6600] bg-[#FF6600] px-4 py-2 dark:border-[#FFCC00] dark:bg-[#FFCC00]">
          <span className="text-sm font-black uppercase tracking-widest text-white dark:text-black">
            ► {title}
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
