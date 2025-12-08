import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border-2 border-[#8B4513] bg-[#F5F5DC] p-4 ${className}`}
      style={{
        boxShadow: "0 4px 12px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)",
        backgroundImage: "linear-gradient(to bottom, rgba(255,255,255,0.3), transparent)",
      }}
    >
      {title && (
        <div className="mb-4 border-b-2 border-[#8B4513]/30 pb-2">
          <h2 className="text-lg font-bold uppercase tracking-wide text-[#8B4513]">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
