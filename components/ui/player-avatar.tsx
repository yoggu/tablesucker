import { Player } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Crown } from "lucide-react";
import Link from "next/link";

type PlayerAvatarProps = {
  player: Player;
  showName?: boolean;
  showCrown?: boolean;
  link?: boolean;
};

export default function PlayerAvatar({
  player,
  showName = false,
  showCrown = false,
  className,
  link,
}: PlayerAvatarProps & React.HTMLAttributes<HTMLSpanElement>) {
  return link ? (
    <Link
      title={player.name}
      className="hover:text-blue-600 dark:hover:text-blue-400"
      href={`/players/${player.id}`}
    >
      <AvatarContent
        player={player}
        showName={showName}
        showCrown={showCrown}
        className={className}
      />
    </Link>
  ) : (
    <AvatarContent
      player={player}
      showName={showName}
      showCrown={showCrown}
      className={className}
    />
  );
}

const AvatarContent = ({
  player,
  showName,
  showCrown,
  className,
}: PlayerAvatarProps & React.HTMLAttributes<HTMLSpanElement>) => (
  <div className="relative flex w-fit items-center gap-3">
    <Avatar className={className}>
      <AvatarImage src={player.image_url ?? ""} />
      <AvatarFallback delayMs={10}>
        {player.name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
    {showCrown && (
      <Crown className="absolute -top-[20px] left-[20px] rotate-[25deg]" />
    )}
    {showName && <span>{player.name}</span>}
  </div>
);
