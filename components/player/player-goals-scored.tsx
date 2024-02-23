import { getCachedGames } from "@/actions/game";
import { calculatePlayersStats } from "@/lib/utils";
import { Player, SeasonWithState } from "@/types/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import Counter from "../ui/counter";

type PlayerGoalsScoredProps = {
  player: Player;
  season: SeasonWithState;
};

export default async function PlayerGoalsScored({
  player,
  season,
}: PlayerGoalsScoredProps) {
  const { data: games, error: gamesError } = await getCachedGames(season.id);
  if (gamesError) throw gamesError;
  const playersStats = calculatePlayersStats(games!);
  const playerStats = playersStats?.find((stat) => stat.player.id === player.id);
  const goalsFor = playerStats?.goalsFor ?? 0;
  const gamesPlayed = playerStats?.games ?? 1;
  const playerGoalsPerGame = (goalsFor / gamesPlayed).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals Scored</CardTitle>
        <CardDescription>per Game { playerGoalsPerGame }</CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-bold">
          <Counter end={playerStats?.goalsFor ?? 0} />
        </span>
      </CardContent>
    </Card>
  );
}
