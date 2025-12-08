import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-none border-4 border-[#000] bg-[#5A8F29] p-4 ${className}`}
      style={{
        boxShadow: "4px 4px 0 #000",
      }}
    >
      {title && (
        <div className="mb-4 border-b-4 border-[#000] pb-2">
          <h2 className="font-mono text-lg font-bold uppercase tracking-wide text-white">
            {title}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}
