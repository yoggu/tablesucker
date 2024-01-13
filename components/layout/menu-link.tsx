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
        "flex h-10 w-10 items-center justify-center gap-3 rounded-md hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 @[180px]:w-full @[180px]:justify-start @[180px]:px-3",
        {
          "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50":
            pathname === href,
        },
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
