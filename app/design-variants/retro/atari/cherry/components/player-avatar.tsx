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

  return (
    <div className="flex items-center gap-2">
      <Avatar
        className={`${sizeClasses[size]} border-4 border-[#DC143C] shadow-[3px_3px_0px_0px_#8B0000] dark:border-[#FF6B6B] dark:shadow-[3px_3px_0px_0px_#DC143C]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback className="bg-[#DC143C] text-xs font-black text-white dark:bg-[#FF6B6B] dark:text-[#1a0a0f]">
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-bold uppercase tracking-wide text-[#8B0000] dark:text-[#FF6B6B]">
          {player.name}
        </span>
      )}
    </div>
  );
}
