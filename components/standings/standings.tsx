import { getCachedGames } from "@/actions/game";
import { calculatePlayerStats } from "@/lib/utils";
import { Player, PlayerStats, SeasonWithState } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { columns } from "./standings-columns";
import { StandingsTable } from "./standings-table";

type StandingsProps = {
  season: SeasonWithState;
  player?: Player;
};

export default async function Standings({ season, player }: StandingsProps) {
  const { data: games, error: gamesError } = await getCachedGames(season.id);
  if (gamesError) throw gamesError;
  const playerStats: PlayerStats[] = calculatePlayerStats(games!);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Standings</CardTitle>
      </CardHeader>
      <CardContent>
        <StandingsTable highlightPlayerId={player?.id} columns={columns} data={playerStats} />
      </CardContent>
    </Card>
  );
}
