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

// Stadium Scoreboard - LED dot matrix style
// Background: #0A0A0A (near black), Amber LED: #FF6B00, Red LED: #FF0000

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
        className={`${sizeClasses[size]} border-2 border-[#FF6B00]/50 bg-[#1A1A1A]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback className="bg-[#1A1A1A] font-mono text-xs font-bold text-[#FF6B00]">
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-mono text-sm font-bold uppercase tracking-wider text-[#FF6B00]">
          {player.name}
        </span>
      )}
    </div>
  );
}
