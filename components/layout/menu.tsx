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
    <nav
      className="h-full min-h-screen border-r px-2 pt-8 dark:border-r-gray-700 @container"
    >
      <menu className="flex flex-col gap-2">
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
                  className="@[180px]:hidden"
                >
                  <p>Live</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="hidden @[180px]:inline">Live</span>
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
                  className="@[180px]:hidden"
                >
                  <p>Players</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="hidden @[180px]:inline">Players</span>
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
                  className="@[180px]:hidden"
                >
                  <p>Seasons</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <span className="hidden @[180px]:inline">Seasons</span>
          </MenuLink>
        </li>
      </menu>
    </nav>
  );
}
