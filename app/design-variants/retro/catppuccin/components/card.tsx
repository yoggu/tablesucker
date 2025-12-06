import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

// Catppuccin Mocha - warm, cozy, pastel colors on dark background

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-[#45475A] bg-[#1E1E2E] shadow-lg ${className}`}
    >
      {title && (
        <div className="border-b border-[#45475A] bg-[#313244] px-4 py-3">
          <h2 className="text-sm font-medium text-[#CBA6F7]">
            {title}
          </h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
