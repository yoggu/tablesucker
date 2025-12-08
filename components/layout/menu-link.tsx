"use client";
import { cn } from "@/lib/utils";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { HTMLAttributes } from "react";


export function MenuLink({ href, children, ...props }: LinkProps & HTMLAttributes<HTMLAnchorElement>) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 w-10 items-center justify-center gap-3 rounded-md text-slate-400 hover:bg-slate-800 hover:text-slate-50 @[180px]:w-full @[180px]:justify-start @[180px]:px-3",
        {
          "bg-white/10 text-white": pathname === href,
        },
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
