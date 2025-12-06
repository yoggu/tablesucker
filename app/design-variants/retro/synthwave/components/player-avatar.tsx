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
        className={`${sizeClasses[size]} border-2 border-[#FF00FF] ring-2 ring-[#00FFFF] dark:shadow-[0_0_10px_rgba(255,0,255,0.5),0_0_20px_rgba(0,255,255,0.3)]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback
          delayMs={10}
          className="bg-gradient-to-br from-[#FF00FF] to-[#00FFFF] text-xs font-bold text-white"
        >
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-bold text-[#FF1493] dark:text-[#FF00FF] dark:[text-shadow:0_0_10px_rgba(255,0,255,0.5)]">
          {player.name}
        </span>
      )}
    </div>
  );
}
