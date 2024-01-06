import { Player, Season, TEAM } from "@/types/types";
import { fetchGames } from "@/actions/game";
import RealtimeGames from "./realtime-games"; // Add missing import
import GamesLoadMore from "./games-load-more"; // Add missing import

type GamesProps = {
  season?: Season;
  player?: Player;
  offset?: number;
  limit?: number;
  realtime?: boolean;
};

export default async function Games({
  season,
  player,
  offset,
  limit,
  realtime
}: GamesProps) {
  const { data: games, error: gamesError } = await fetchGames(
    season?.id,
    player?.id,
    offset,
    limit
  );
  if (gamesError) throw gamesError;

  return (
    <>
      {realtime ? (
        <RealtimeGames
          initialGames={games ?? []}
          season={season!}
          player={player!}
          limit={limit ?? 5}
        />
      ) : (
        <GamesLoadMore
          initialGames={games ?? []}
          season={season!}
          player={player!}
          limit={limit ?? 10}
        />
      )}
    </>
  );
}
