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
      <Avatar
        className={`${sizeClasses[size]} border-2 border-[#B8860B]`}
        style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.3)" }}
      >
        <AvatarImage
          src={player.image_url ?? undefined}
          alt={player.name}
          style={{ filter: "sepia(20%)" }}
        />
        <AvatarFallback className="bg-gradient-to-b from-[#DEB887] to-[#D2691E] font-serif font-bold text-[#3D2914]">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-serif text-[#F5DEB3]">{player.name}</span>
      )}
    </div>
  );
}
