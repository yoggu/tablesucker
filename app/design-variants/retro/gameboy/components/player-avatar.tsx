import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface DemoPlayer {
  id: number;
  name: string;
  image_url?: string | null;
}

interface PlayerAvatarProps {
  player: DemoPlayer;
  showName?: boolean;
  size?: "sm" | "md" | "lg";
}

export function PlayerAvatar({
  player,
  showName = false,
  size = "md",
}: PlayerAvatarProps) {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-[8px]",
    md: "text-[10px]",
    lg: "text-xs",
  };

  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="flex items-center gap-2">
      <div className="border-2 border-[#0F380F] bg-[#306230] dark:border-[#1a1a2e] dark:bg-[#2d2d44]">
        <Avatar className={`${sizeClasses[size]} rounded-none`}>
          <AvatarImage
            src={player.image_url || undefined}
            alt={player.name}
            className="grayscale contrast-125 brightness-110 dark:brightness-75"
          />
          <AvatarFallback
            className={`rounded-none bg-[#8BAC0F] ${textSizes[size]} font-bold text-[#0F380F] dark:bg-[#4a4a6a] dark:text-[#c8c8d8]`}
            style={{ fontFamily: "'Press Start 2P', monospace" }}
          >
            {initials}
          </AvatarFallback>
        </Avatar>
      </div>
      {showName && (
        <span
          className="text-[10px] font-bold text-[#0F380F] dark:text-[#9898b8]"
          style={{ fontFamily: "'Press Start 2P', monospace" }}
        >
          {player.name}
        </span>
      )}
    </div>
  );
}
