import { Player, Season } from "@/types/types";
import { fetchGames, getGamesCount } from "@/actions/game";
import GamesLoadMore from "./games-load-more";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentUser } from "@/utils/user";
import { getSeasons } from "@/actions/season";
import { getPlayers } from "@/utils/players";

type GamesProps = {
  season?: Season;
  player?: Player;
  offset?: number;
  limit?: number;
};

export default async function Games({
  season,
  player,
  offset,
  limit,
}: GamesProps) {
  const { data: games, error: gamesError } = await fetchGames(
    season?.id,
    player?.id,
    offset,
    limit,
  );
  if (gamesError) throw gamesError;

  const { data: count, error: countError } = await getGamesCount(
    season?.id,
    player?.id,
  );
  if (countError) throw countError;

  const user = await getCurrentUser();

  let seasons: Season[] | null = null;
  let players: Player[] | null = null;
  if (user) {
    const { data: seasonsData, error: seasonsError } = await getSeasons();
    if (seasonsError) throw seasonsError;
    seasons = seasonsData!;
    const { data: playersData, error: playersError } = await getPlayers();
    if (playersError) throw playersError;
    players = playersData!;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Games</CardTitle>
        <CardDescription>
          {count} {count === 1 ? "Game" : "Games"} Played
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GamesLoadMore
          key={games[0]?.id}
          initialGames={games ?? []}
          gamesCount={count!}
          season={season!}
          player={player!}
          limit={limit ?? 10}
          user={user}
          seasons={seasons}
          players={players}
        />
      </CardContent>
    </Card>
  );
}
