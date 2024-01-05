"use client";
import { CalendarDays, Menu, Radio, Users, X } from "lucide-react";
import { MenuLink } from "./menu-link";
import { Button } from "../ui/button";
import { cn } from "@/utils/utils";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function MobileMenu() {
  const [open, setOpen] = useState<Boolean>(false);

  const toggleMenu = () => {
    setOpen((prev) => !prev);
    document.body.classList.toggle("overflow-hidden");
  }

  return (
    <nav className={cn("relative z-[50] pt-2 sm:hidden")}>
      <Button
        className="ml-2"
        variant="ghost"
        onClick={toggleMenu}
      >
        {open ? <X /> : <Menu />}
      </Button>
      <div
        className={cn(
          "absolute hidden w-full bg-white px-4 @container dark:bg-gray-950",
          {
            "block h-[calc(100dvh-48px)]": open,
          },
        )}
      >
        <menu className="flex pt-4 flex-col gap-2 @container">
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
        </menu>
      </div>
    </nav>
  );
}
