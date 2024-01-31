"use client";
import { cn } from "@/lib/utils";
import { CalendarDays, Menu, Radio, Users, X } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { MenuLink } from "./menu-link";
import { ModeToggle } from "./mode-toggle";
import Notifications from "../ui/notifications";

export default function MobileMenu({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState<Boolean>(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    document.body.classList.toggle("overflow-hidden");
  };

  return (
    <nav
      className={cn("relative z-[50] pt-2 sm:hidden", { "bg-slate-950": open })}
    >
      <div className="flex justify-between gap-4 px-2">
        <Button className="px-2" variant="ghost" onClick={toggleMenu}>
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      <div
        className={cn("absolute hidden w-full bg-white px-2 dark:bg-gray-950", {
          "block h-[calc(100dvh-48px)]": open,
        })}
      >
        <menu className="flex h-full flex-col gap-2 py-4 @container">
          <li>
            <MenuLink href="/" onClick={toggleMenu}>
              <Radio size={20} />
              <span className="hidden @[180px]:inline">Live</span>
            </MenuLink>
          </li>
          <li>
            <MenuLink href="/players" onClick={toggleMenu}>
              <Users size={20} />
              <span className="hidden @[180px]:inline">Players</span>
            </MenuLink>
          </li>
          <li>
            <MenuLink href="/seasons" onClick={toggleMenu}>
              <CalendarDays size={20} />
              <span className="hidden @[180px]:inline">Seasons</span>
            </MenuLink>
          </li>
          <li className="mt-auto">
            <div onClick={() => setOpen(false)}>{children}</div>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            <Notifications />
          </li>
        </menu>
      </div>
    </nav>
  );
}
