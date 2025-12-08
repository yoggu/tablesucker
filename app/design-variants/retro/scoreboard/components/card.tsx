import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded border-2 border-[#333] bg-[#0A0A0A] shadow-[0_0_20px_rgba(255,107,0,0.1)] ${className}`}
    >
      {title && (
        <div className="border-b-2 border-[#333] bg-[#111] px-4 py-2">
          <h2 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#FF6B00]">
            {title}
          </h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
