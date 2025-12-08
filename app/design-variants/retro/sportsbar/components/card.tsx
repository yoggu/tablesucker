import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border-2 border-[#8B4513] bg-gradient-to-b from-[#2D1810] to-[#1A0F0A] p-4 shadow-xl ${className}`}
      style={{
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 8px 20px rgba(0,0,0,0.5)",
      }}
    >
      {title && (
        <div className="mb-4 border-b border-[#8B4513]/50 pb-2">
          <h2
            className="text-lg font-bold uppercase tracking-wide text-[#FFD700]"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.8)" }}
          >
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
