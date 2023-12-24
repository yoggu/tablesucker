import { TEAM } from "@/types/types";
import { getGamesByPlayerAndSeason } from "@/utils/games";
import { getPlayerById } from "@/utils/players";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import GameList from "@/components/game-list";

type PlayerProps = {
  params: {
    id: number;
  };
};

export default async function Player({ params }: PlayerProps) {
  const { data: player, error: playerError } = await getPlayerById(params.id);
  if (playerError) throw playerError;
  const { data: games, error: gamesError } = await getGamesByPlayerAndSeason(
    player!.id,
  );
  if (gamesError) throw gamesError;

  return (
    <div>
      <div>
        <h1>{player?.name}</h1>
      </div>
      <GameList games={games} />
    </div>
  );
}
