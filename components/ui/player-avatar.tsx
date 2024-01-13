import { Player } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Award, Crown } from "lucide-react";
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
  const AvatarContent = () => (
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

  return link ? (
    <Link title={player.name} className="hover:text-blue-600 dark:hover:text-blue-400" href={`/players/${player.id}`}>
      <AvatarContent />
    </Link>
  ) : (
    <AvatarContent />
  );
}
