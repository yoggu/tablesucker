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
        className={`${sizeClasses[size]} border-2 border-[#FFD700] shadow-[0_0_10px_rgba(255,69,0,0.5)]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback
          delayMs={10}
          className="bg-gradient-to-br from-[#8B0000] to-[#4a0000] text-xs font-black text-[#FFD700]"
        >
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-black uppercase text-[#FFD700] [text-shadow:0_0_5px_rgba(255,69,0,0.5)]">
          {player.name}
        </span>
      )}
    </div>
  );
}
