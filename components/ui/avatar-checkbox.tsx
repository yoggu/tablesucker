"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/utils/utils";
import { Player } from "@/types/types";
import PlayerAvatar from "./player-avatar";

const AvatarCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    player: Player;
  }
>(({ className, player, ...props }, ref) => (
  <CheckboxPrimitive.Root ref={ref} {...props} className="relative">
    <PlayerAvatar player={player} />
    <CheckboxPrimitive.Indicator
      className={cn("absolute h-full w-full -top-[2px] -left-[2px] rounded-full border-2 box-content border-blue-500")}
    ></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
AvatarCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { AvatarCheckbox };
