import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#20B2AA] bg-[#F0FFFF] shadow-[8px_8px_0px_0px_#008B8B] dark:border-[#40E0D0] dark:bg-[#0f1a1a] dark:shadow-[8px_8px_0px_0px_#20B2AA] ${className}`}
    >
      {title && (
        <div className="border-b-4 border-[#20B2AA] bg-[#20B2AA] px-4 py-2 dark:border-[#40E0D0] dark:bg-[#40E0D0]">
          <span className="text-sm font-black uppercase tracking-widest text-white dark:text-[#0f1a1a]">
            ► {title}
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
