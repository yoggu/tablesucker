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
    lg: "h-12 w-12",
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar
        className={`${sizeClasses[size]} border-4 border-[#FF6600] dark:border-[#FFCC00]`}
        style={{ imageRendering: 'pixelated' }}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback
          delayMs={10}
          className="bg-black text-xs font-bold text-[#FF6600] dark:text-[#FFCC00]"
        >
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-bold uppercase text-[#8B4513] dark:text-[#FFCC00]">
          {player.name}
        </span>
      )}
    </div>
  );
}
