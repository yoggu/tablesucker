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
    sm: "h-9 w-9",
    md: "h-11 w-11",
    lg: "h-14 w-14",
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar
        className={`${sizeClasses[size]} border-2 border-[#5D4037] bg-[#8D6E63] shadow-[0_2px_4px_rgba(0,0,0,0.3)] dark:border-[#3E2723] dark:shadow-[0_2px_8px_rgba(0,0,0,0.5)]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback
          delayMs={10}
          className="bg-[#D7CCC8] font-bold text-[#5D4037] dark:bg-[#4E342E] dark:text-[#D7CCC8]"
        >
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-semibold text-[#3E2723] dark:text-[#D7CCC8]">
          {player.name}
        </span>
      )}
    </div>
  );
}
