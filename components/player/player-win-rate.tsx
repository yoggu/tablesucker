import { getCachedGames } from "@/actions/game";
import { calculatePlayersStats } from "@/lib/utils";
import { Player, SeasonWithState } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Counter from "../ui/counter";

type PlayerWinRateProps = {
  player: Player;
  season: SeasonWithState;
};

export default async function PlayerWinRate({
  player,
  season,
}: PlayerWinRateProps) {
  const { data: games, error: gamesError } = await getCachedGames(season.id);
  if (gamesError) throw gamesError;
  const playersStats = calculatePlayersStats(games!);
  const playerWinRate =
    playersStats?.find((stat) => stat.player.id === player.id)?.winRate ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-bold">
          <Counter end={playerWinRate} />%
        </span>
      </CardContent>
    </Card>
  );
}
