import { Player, Season, TEAM } from "@/types/types";
import { fetchGames } from "@/actions/game";
import GamesLoadMore from "./games-load-more";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NumberOfGamesPlayed from "./number-of-games-played";
import { Suspense } from "react";
import { Skeleton } from "../ui/skeleton";
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Games</CardTitle>
        <CardDescription>
          <Suspense
            fallback={
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Loading
              </span>
            }
          >
            <NumberOfGamesPlayed season={season} player={player} />
          </Suspense>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GamesLoadMore
          key={games[0]?.id}
          initialGames={games ?? []}
          season={season!}
          player={player!}
          limit={limit ?? 10}
        />
      </CardContent>
    </Card>
  );
}
