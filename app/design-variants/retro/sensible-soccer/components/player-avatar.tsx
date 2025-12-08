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
      <Avatar className={`${sizeClasses[size]} rounded-sm border-2 border-[#000]`}>
        <AvatarImage
          src={player.image_url ?? undefined}
          alt={player.name}
          className="rounded-sm"
          style={{ imageRendering: "pixelated" }}
        />
        <AvatarFallback className="rounded-sm bg-[#5A8F29] font-mono font-bold text-white">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-mono text-sm font-bold uppercase text-white">{player.name}</span>
      )}
    </div>
  );
}
