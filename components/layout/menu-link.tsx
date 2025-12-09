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
        "flex h-10 w-10 items-center justify-center gap-3 rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground @[180px]:w-full @[180px]:justify-start @[180px]:px-3",
        {
          "bg-sidebar-accent text-sidebar-foreground": pathname === href,
        },
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
