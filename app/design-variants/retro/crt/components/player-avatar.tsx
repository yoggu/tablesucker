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
        className={`${sizeClasses[size]} border-2 border-[#006400] dark:border-[#39FF14] dark:shadow-[0_0_8px_rgba(57,255,20,0.5)]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback
          delayMs={10}
          className="bg-[#006400]/20 font-mono text-xs font-bold text-[#006400] dark:bg-[#39FF14]/20 dark:text-[#39FF14]"
        >
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-mono text-sm text-[#006400] dark:text-[#39FF14]">
          {player.name}
        </span>
      )}
    </div>
  );
}
