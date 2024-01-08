import { fetchGames } from "@/actions/game";
import { Player, Season } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Counter from "../ui/counter";
import { calculatePlayerStats } from "@/utils/games";

type PlayerWinRateProps = {
  player: Player;
  season: Season;
};

export default async function PlayerWinRate({
  player,
  season,
}: PlayerWinRateProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;
  const playerStats = calculatePlayerStats(games!);
  const playerWinRate =
    playerStats?.find((stat) => stat.player.id === player.id)?.winRate ?? 0;

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
