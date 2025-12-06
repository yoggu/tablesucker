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

// Kanagawa colors
// bg: #1F1F28, fg: #DCD7BA, wave blue: #7E9CD8, sakura pink: #D27E99
// spring green: #98BB6C, autumn yellow: #DCA561, winter red: #C34043

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
        className={`${sizeClasses[size]} border-2 border-[#54546D] bg-[#2A2A37] dark:border-[#54546D]`}
      >
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback className="bg-[#363646] text-xs font-medium text-[#DCD7BA] dark:bg-[#363646] dark:text-[#DCD7BA]">
          {player.name.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="text-sm font-medium text-[#DCD7BA]">
          {player.name}
        </span>
      )}
    </div>
  );
}
