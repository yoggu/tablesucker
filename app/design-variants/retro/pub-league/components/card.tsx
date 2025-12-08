import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border-2 border-[#2E7D32] bg-[#1B5E20] p-4 ${className}`}
      style={{
        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2), 0 4px 12px rgba(0,0,0,0.3)",
        backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.05), transparent)",
      }}
    >
      {title && (
        <div className="mb-4 border-b border-[#4CAF50]/30 pb-2">
          <h2 className="text-lg font-bold uppercase tracking-wide text-[#FDD835]">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
