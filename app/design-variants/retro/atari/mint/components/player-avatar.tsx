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
        className={`${sizeClasses[size]} border-4 border-[#20B2AA] shadow-[3px_3px_0px_0px_#008B8B] dark:border-[#40E0D0] dark:shadow-[3px_3px_0px_0px_#20B2AA]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback className="bg-[#20B2AA] text-xs font-black text-white dark:bg-[#40E0D0] dark:text-[#0f1a1a]">
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-bold uppercase tracking-wide text-[#008B8B] dark:text-[#40E0D0]">
          {player.name}
        </span>
      )}
    </div>
  );
}
