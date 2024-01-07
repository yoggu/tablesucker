import { Player } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Award, Crown } from "lucide-react";

type PlayerAvatarProps = {
  player: Player;
  showName?: boolean;
  showCrown?: boolean;
};

export default function PlayerAvatar({
  player,
  showName = false,
  showCrown = false,
  className,
}: PlayerAvatarProps & React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <div className="relative flex w-fit items-center gap-3">
      <Avatar className={className}>
        <AvatarImage src={player.image_url ?? ""} />
        <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      {showCrown && (
        <Crown className="absolute -top-[20px] left-[20px] rotate-[25deg]" />
      )}
      {showName && <span>{player.name}</span>}
    </div>
  );
}
