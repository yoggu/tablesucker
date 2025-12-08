import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-lg border-2 border-[#8B7355] bg-gradient-to-b from-[#4A3728] to-[#3D2914] p-5 ${className}`}
      style={{
        boxShadow: "inset 0 1px 0 rgba(222,184,135,0.1), 0 8px 24px rgba(0,0,0,0.4)",
        backgroundImage: `
          linear-gradient(to bottom, rgba(139,115,85,0.05) 1px, transparent 1px),
          linear-gradient(to right, rgba(139,115,85,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "20px 20px",
      }}
    >
      {title && (
        <div className="mb-4 border-b border-[#8B7355]/40 pb-3">
          <h2
            className="font-serif text-xl font-bold text-[#DEB887]"
            style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.5)" }}
          >
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
