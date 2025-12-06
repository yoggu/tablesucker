import { getCachedGames } from "@/actions/game";
import { SeasonWithState } from "@/types/types";
import { getAllPlayersWinRateOverTime } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import AllPlayersLineChart from "./all-players-line-chart";

type WinRateChartProps = {
  season: SeasonWithState;
};

export default async function WinRateChart({ season }: WinRateChartProps) {
  const { data: games, error: gamesError } = await getCachedGames(season.id);
  if (gamesError) throw gamesError;

  if (!games || games.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Win Rate Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            No games played yet this season.
          </p>
        </CardContent>
      </Card>
    );
  }

  const { data, players } = getAllPlayersWinRateOverTime(games);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win Rate Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <AllPlayersLineChart data={data} players={players} />
      </CardContent>
    </Card>
  );
}
