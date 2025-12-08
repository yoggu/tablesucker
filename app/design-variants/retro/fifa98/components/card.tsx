import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded border-2 border-[#FFD700] ${className}`}
      style={{
        background: "linear-gradient(135deg, #1E3A5F 0%, #0D1F33 50%, #1E3A5F 100%)",
      }}
    >
      {title && (
        <div
          className="border-b-2 border-[#FFD700] px-4 py-2"
          style={{
            background: "linear-gradient(90deg, #FFD700, #FFA500, #FFD700)",
          }}
        >
          <h2 className="font-black uppercase tracking-wider text-[#0D1F33]">
            {title}
          </h2>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
