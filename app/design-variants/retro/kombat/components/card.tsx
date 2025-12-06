import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#FFD700] bg-[#1a1a1a] shadow-[0_0_20px_rgba(255,69,0,0.3),inset_0_0_30px_rgba(139,0,0,0.2)] ${className}`}
    >
      {/* MK Style Header */}
      {title && (
        <div className="border-b-4 border-[#FFD700] bg-gradient-to-r from-[#8B0000] via-[#4a0000] to-[#8B0000] px-4 py-2">
          <span className="text-sm font-black uppercase tracking-widest text-[#FFD700] [text-shadow:0_0_10px_rgba(255,69,0,0.5)]">
            ⚔ {title} ⚔
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
