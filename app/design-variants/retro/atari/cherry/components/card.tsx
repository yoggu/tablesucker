import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#DC143C] bg-[#FFF0F5] shadow-[8px_8px_0px_0px_#8B0000] dark:border-[#FF6B6B] dark:bg-[#1a0a0f] dark:shadow-[8px_8px_0px_0px_#DC143C] ${className}`}
    >
      {title && (
        <div className="border-b-4 border-[#DC143C] bg-[#DC143C] px-4 py-2 dark:border-[#FF6B6B] dark:bg-[#FF6B6B]">
          <span className="text-sm font-black uppercase tracking-widest text-white dark:text-[#1a0a0f]">
            ► {title}
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
