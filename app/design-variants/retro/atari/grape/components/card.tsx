import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#9370DB] bg-[#F8F4FF] shadow-[8px_8px_0px_0px_#6A5ACD] dark:border-[#DDA0DD] dark:bg-[#150a1a] dark:shadow-[8px_8px_0px_0px_#9370DB] ${className}`}
    >
      {title && (
        <div className="border-b-4 border-[#9370DB] bg-[#9370DB] px-4 py-2 dark:border-[#DDA0DD] dark:bg-[#DDA0DD]">
          <span className="text-sm font-black uppercase tracking-widest text-white dark:text-[#150a1a]">
            ► {title}
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
