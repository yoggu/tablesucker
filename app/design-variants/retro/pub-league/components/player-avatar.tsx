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
      <Avatar className={`${sizeClasses[size]} border-2 border-[#2E7D32] shadow-md`}>
        <AvatarImage src={player.image_url ?? undefined} alt={player.name} />
        <AvatarFallback className="bg-[#1B5E20] font-bold text-[#FDD835]">
          {initials}
        </AvatarFallback>
      </Avatar>
      {showName && (
        <span className="font-semibold text-[#E8F5E9]">{player.name}</span>
      )}
    </div>
  );
}
