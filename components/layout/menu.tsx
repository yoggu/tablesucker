import { CalendarDays, Radio, Sheet, Users } from "lucide-react";
import { MenuLink } from "./menu-link";

export default function Menu() {
  return (
    <nav className="">
      <ul className="flex flex-col gap-2">
        <li>
          <MenuLink href="/">
            <Radio size={20} />
            <span className="hidden lg:inline">Live</span>
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/players">
            <Users size={20} />
            <span className="hidden lg:inline">Players</span>
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/seasons">
            <CalendarDays size={20} />
            <span className="hidden lg:inline">Seasons</span>
          </MenuLink>
        </li>
      </ul>
    </nav>
  );
}


