import { Player } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

type PlayerAvatarProps = {
  player: Player;
}

export default function PlayerAvatar({ player }: PlayerAvatarProps) {
  return (
    <Avatar>
      <AvatarImage src={player.image_url ?? ""} />
      <AvatarFallback>{player.name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
