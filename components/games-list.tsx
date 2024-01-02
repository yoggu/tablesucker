import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Player, Season, TEAM } from "@/types/types";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatDate } from "@/utils/utils";
import { fetchGames } from "@/actions/game";
import GamesListLoadMore from "./games-list-load-more";

type GameListProps = {
  season?: Season;
  player?: Player;
  offset?: number;
  limit?: number;
};

export default async function GamesList({
  season,
  player,
  offset,
  limit,
}: GameListProps) {
  const { data: games, error: gamesError } = await fetchGames(
    season?.id,
    player?.id,
    offset,
    limit,
  );
  if (gamesError) throw gamesError;

  return (
    <GamesListLoadMore
      initialGames={games!}
      season={season}
      player={player}
      limit={limit ?? 10}
    />
  );
}
