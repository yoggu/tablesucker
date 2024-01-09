import { Player, Season, TEAM } from "@/types/types";
import { fetchGames, getGamesCount } from "@/actions/game";
import GamesLoadMore from "./games-load-more";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GamesCount from "./games-count";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Games</CardTitle>
        <CardDescription>
          <GamesCount count={count!} />
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
        />
      </CardContent>
    </Card>
  );
}
