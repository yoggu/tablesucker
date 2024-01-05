"use client";
import { cn } from "@/utils/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuLinkProps = {
  href: string;
  children: React.ReactNode;
};

export function MenuLink({ href, children }: MenuLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={cn(
        "flex h-10 w-10 items-center justify-center gap-3 rounded-md hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50 xl:w-full xl:justify-start xl:px-3",
        {
          "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50":
            pathname === href,
        },
      )}
    >
      {children}
    </Link>
  );
}
