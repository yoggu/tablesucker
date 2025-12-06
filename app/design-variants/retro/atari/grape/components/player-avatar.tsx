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
        className={`${sizeClasses[size]} border-4 border-[#9370DB] shadow-[3px_3px_0px_0px_#6A5ACD] dark:border-[#DDA0DD] dark:shadow-[3px_3px_0px_0px_#9370DB]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback className="bg-[#9370DB] text-xs font-black text-white dark:bg-[#DDA0DD] dark:text-[#150a1a]">
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-bold uppercase tracking-wide text-[#6A5ACD] dark:text-[#DDA0DD]">
          {player.name}
        </span>
      )}
    </div>
  );
}
