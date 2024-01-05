import { CalendarDays, Radio, Users } from "lucide-react";
import { MenuLink } from "./menu-link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Menu() {
  return (
    <nav className="">
      <ul className="flex flex-col gap-2">
        <li>
          <MenuLink href="/">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Radio size={20} />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={12}
                  className="xl:hidden"
                >
                  <p>Live</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="hidden xl:inline">Live</span>
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/players">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Users size={20} />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={12}
                  className="xl:hidden"
                >
                  <p>Players</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="hidden xl:inline">Players</span>
          </MenuLink>
        </li>
        <li>
          <MenuLink href="/seasons">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <CalendarDays size={20} />
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  sideOffset={12}
                  className="xl:hidden"
                >
                  <p>Seasons</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="hidden xl:inline">Seasons</span>
          </MenuLink>
        </li>
      </ul>
    </nav>
  );
}
