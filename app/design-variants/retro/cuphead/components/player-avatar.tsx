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
        className={`${sizeClasses[size]} border-3 border-[#5D3A1A] shadow-[2px_2px_0_#5D3A1A] dark:border-[#D4A574] dark:shadow-[0_0_10px_rgba(212,165,116,0.3)]`}
        style={{ filter: 'sepia(20%)' }}
      >
        <AvatarImage src={player.image_url ?? ""} className="dark:sepia-[0.4] dark:contrast-110" />
        <AvatarFallback
          delayMs={10}
          className="bg-[#E8D5C4] font-serif text-sm font-bold text-[#5D3A1A] dark:bg-[#3D2817] dark:text-[#D4A574]"
        >
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-serif text-sm font-semibold text-[#5D3A1A] dark:text-[#D4A574]">
          {player.name}
        </span>
      )}
    </div>
  );
}
