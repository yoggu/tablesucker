import { getCachedGames, getCachedGamesCount } from "@/actions/game";
import { getCachedPlayes } from "@/actions/player";
import { getCachedSeasons } from "@/actions/season";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Player, Season } from "@/types/types";
import { getCurrentUser } from "@/actions/user";
import GamesLoadMore from "./games-load-more";

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
  const { data: games, error: gamesError } = await getCachedGames(
    season?.id,
    player?.id,
    offset,
    limit,
  );
  if (gamesError) throw gamesError;

  const { data: count, error: countError } = await getCachedGamesCount(
    season?.id,
    player?.id,
  );
  if (countError) throw countError;

  const user = await getCurrentUser();

  let seasons: Season[] | null = null;
  let players: Player[] | null = null;
  if (user) {
    const { data: seasonsData, error: seasonsError } = await getCachedSeasons();
    if (seasonsError) throw seasonsError;
    seasons = seasonsData!;
    const { data: playersData, error: playersError } = await getCachedPlayes();
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
          key={count!}
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
