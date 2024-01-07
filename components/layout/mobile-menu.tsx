"use client";
import { CalendarDays, Menu, Radio, Users, X } from "lucide-react";
import { MenuLink } from "./menu-link";
import { Button } from "../ui/button";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { ModeToggle } from "./mode-toggle";

export default function MobileMenu() {
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
        <menu className="flex flex-col h-full gap-2 py-4 @container">
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
            <ModeToggle />
          </li>
        </menu>
      </div>
    </nav>
  );
}
