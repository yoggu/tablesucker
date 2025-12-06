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

// Catppuccin Mocha palette
// Base: #1E1E2E, Surface0: #313244, Text: #CDD6F4
// Mauve: #CBA6F7, Pink: #F5C2E7, Red: #F38BA8, Peach: #FAB387
// Yellow: #F9E2AF, Green: #A6E3A1, Teal: #94E2D5, Blue: #89B4FA, Lavender: #B4BEFE

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
        className={`${sizeClasses[size]} border-2 border-[#45475A] bg-[#313244]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback className="bg-[#45475A] text-xs font-medium text-[#CDD6F4]">
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-medium text-[#CDD6F4]">
          {player.name}
        </span>
      )}
    </div>
  );
}
