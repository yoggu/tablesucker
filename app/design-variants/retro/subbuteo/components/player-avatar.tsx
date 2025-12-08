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

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-14 w-14",
};

export function PlayerAvatar({ player, showName, size = "md" }: PlayerAvatarProps) {
  const initials = player.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center gap-2">
      {/* Subbuteo player base style */}
      <div className="relative">
        <Avatar
          className={`${sizeClasses[size]} rounded-full border-2 border-[#2D5016]`}
          style={{ boxShadow: "0 3px 6px rgba(0,0,0,0.4)" }}
        >
          <AvatarImage src={player.image_url ?? undefined} alt={player.name} />
          <AvatarFallback className="bg-gradient-to-b from-[#4A7C23] to-[#2D5016] text-sm font-bold text-white">
            {initials}
          </AvatarFallback>
        </Avatar>
        {/* Base disc */}
        <div
          className="absolute -bottom-1 left-1/2 h-2 w-10 -translate-x-1/2 rounded-full bg-gradient-to-b from-[#1A1A1A] to-[#000]"
          style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.5)" }}
        />
      </div>
      {showName && (
        <span className="text-sm font-semibold text-[#2D5016]">{player.name}</span>
      )}
    </div>
  );
}
