import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

// Kanagawa Wave theme - inspired by The Great Wave off Kanagawa
// Deep indigo background with wave blue accents and cream foreground

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-lg border border-[#54546D] bg-[#1F1F28] shadow-lg ${className}`}
    >
      {title && (
        <div className="border-b border-[#54546D] bg-[#2A2A37] px-4 py-3">
          <h2 className="text-sm font-medium tracking-wide text-[#7E9CD8]">
            {title}
          </h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
