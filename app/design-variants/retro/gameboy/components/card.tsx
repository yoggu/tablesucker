import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
}

export function Card({ children, title }: CardProps) {
  return (
    <div className="mb-6 border-4 border-[#0F380F] bg-[#8BAC0F] p-4 shadow-[4px_4px_0px_0px_#306230] dark:border-[#1a1a2e] dark:bg-[#2d2d44] dark:shadow-[4px_4px_0px_0px_#0a0a14]">
      {title && (
        <div className="mb-4 border-b-2 border-[#0F380F] pb-2 dark:border-[#1a1a2e]">
          <h3 className="text-xs font-bold text-[#0F380F] dark:text-[#9898b8]">
            {title}
          </h3>
        </div>
      )}
      {children}
    </div>
  );
}
