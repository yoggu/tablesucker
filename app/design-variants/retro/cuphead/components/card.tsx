import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export function Card({ children, title, className = "" }: CardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-sm border-4 border-[#5D3A1A] bg-[#FDF8F0] shadow-[4px_4px_0_#5D3A1A] dark:border-[#D4A574]/30 dark:bg-[#1A1008] dark:shadow-[inset_0_0_30px_rgba(0,0,0,0.5)] ${className}`}
    >
      {/* Decorative Corner Flourishes */}
      <div className="pointer-events-none absolute left-2 top-2 font-serif text-lg text-[#8B4513]/30 dark:text-[#8B4513]/20">❦</div>
      <div className="pointer-events-none absolute right-2 top-2 font-serif text-lg text-[#8B4513]/30 dark:text-[#8B4513]/20">❦</div>

      {title && (
        <div className="border-b-4 border-[#5D3A1A] bg-gradient-to-r from-[#8B4513] via-[#A0522D] to-[#8B4513] px-5 py-3 dark:border-[#D4A574]/20 dark:from-[#3D2817] dark:via-[#5D3A1A] dark:to-[#3D2817]">
          <h2 className="text-center font-serif text-lg font-bold italic text-[#FDF8F0] dark:text-[#D4A574]" style={{ textShadow: '1px 1px 0 #5D3A1A' }}>
            ~ {title} ~
          </h2>
        </div>
      )}
      <div className="p-5">{children}</div>

      {/* Bottom Decorative Border */}
      <div className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 font-serif text-sm text-[#8B4513]/20 dark:text-[#D4A574]/10">
        ◆ ◆ ◆
      </div>
    </div>
  );
}
