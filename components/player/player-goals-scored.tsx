import { fetchGames } from "@/actions/game";
import { Player, Season } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import Counter from "../ui/counter";
import { calculatePlayerStats } from "@/utils/games";

type PlayerGoalsScoredProps = {
  player: Player;
  season: Season;
};

export default async function PlayerGoalsScored({
  player,
  season,
}: PlayerGoalsScoredProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;
  const gameStats = calculatePlayerStats(games!);
  const playerWinRate =
    gameStats?.find((stat) => stat.player.id === player.id)?.goalsFor ?? 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Goals Scored</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-4xl font-bold">
          <Counter end={playerWinRate} />
        </span>
      </CardContent>
    </Card>
  );
}
