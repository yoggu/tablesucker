import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`overflow-hidden border-4 border-[#00FF88] bg-[#0a0a14] shadow-[6px_6px_0px_0px_#AA00FF,0_0_15px_rgba(0,255,136,0.2)] ${className}`}
    >
      {title && (
        <div className="border-b-4 border-[#00FF88] bg-gradient-to-r from-[#AA00FF] to-[#00FF88] px-5 py-3">
          <h2 className="text-base font-black uppercase tracking-wide text-white [text-shadow:1px_1px_0_#000]">
            {title}
          </h2>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
