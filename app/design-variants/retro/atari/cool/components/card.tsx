import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#00DDFF] bg-[#0a1628] shadow-[6px_6px_0px_0px_#0088FF] ${className}`}
    >
      {title && (
        <div className="border-b-4 border-[#00DDFF] bg-[#0088FF] px-5 py-3">
          <h2 className="text-base font-black uppercase tracking-wide text-white">
            {title}
          </h2>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
