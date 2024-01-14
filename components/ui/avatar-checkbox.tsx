"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

import { cn } from "@/lib/utils";
import { Player } from "@/types/types";
import PlayerAvatar from "./player-avatar";

const AvatarCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
    player: Player;
  }
>(({ className, player, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    {...props}
    className={cn("relative transition", { "opacity-60 grayscale": props.disabled })}
  >
    <PlayerAvatar player={player} />
    <CheckboxPrimitive.Indicator
      className={cn(
        "absolute -left-[2px] -top-[2px] box-content h-full w-full rounded-full border-2 border-blue-400",
      )}
    ></CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
));
AvatarCheckbox.displayName = CheckboxPrimitive.Root.displayName;

export { AvatarCheckbox };
