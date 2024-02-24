import { getCachedGames } from "@/actions/game";
import { getWinRateOverTime } from "@/lib/utils";
import { Player, SeasonWithState } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import PlayerLineChart from "./player-line-chart";

type PlayerWinRateChart = {
  player: Player;
  season: SeasonWithState;
};

export default async function PlayerWinRateChart({
  player,
  season,
}: PlayerWinRateChart) {
  const { data: games, error: gamesError } = await getCachedGames(
    season.id,
    player.id,
  );
  if (gamesError) throw gamesError;
  const winRateData = getWinRateOverTime(games!, player);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win Rate over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <PlayerLineChart data={winRateData} />
      </CardContent>
    </Card>
  );
}
