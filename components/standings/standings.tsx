import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlayerStats, Season } from "@/types/types";
import { calculatePlayerStats } from "@/utils/games";
import { fetchGames } from "@/actions/game";
import { StandingsTable } from "./standings-table";
import { columns } from "./standings-columns";

type StandingsProps = {
  season: Season;
};

export default async function Standings({ season }: StandingsProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;
  const playerStats: PlayerStats[] = calculatePlayerStats(games!);

  return (
    <div className="w-full">
      <h2>Standings</h2>
      <StandingsTable columns={columns} data={playerStats} />
    </div>
  );
}
