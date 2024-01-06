import { Player, Season, TEAM } from "@/types/types";
import { fetchGames } from "@/actions/game";
import GamesRealtime from "./games-realtime"; // Add missing import
import GamesListLoadMore from "./games-list-load-more"; // Add missing import

type GameListProps = {
  season?: Season;
  player?: Player;
  offset?: number;
  limit?: number;
  isRealtime?: boolean;
};

export default async function GamesList({
  season,
  player,
  offset,
  limit,
  isRealtime = false,
}: GameListProps) {
  const { data: games, error: gamesError } = await fetchGames(
    season?.id,
    player?.id,
    offset,
    limit,
  );
  if (gamesError) throw gamesError;

  return isRealtime ? (
    <GamesRealtime
      initialGames={games ?? []}
      season={season!}
      player={player!}
      limit={limit ?? 5}
    />
  ) : (
    <GamesListLoadMore
      initialGames={games ?? []}
      season={season!}
      player={player!}
      limit={limit ?? 10}
    />
  );
}
