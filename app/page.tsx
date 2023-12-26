import GameForm from "@/components/game-form";
import GameList from "@/components/game-list";
import TopscorerList from "@/components/topscorer-list";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import WinRateList from "@/components/win-rate-list";
import { TEAM } from "@/types/types";
import { calculatePlayerStats, getGamesBySeason } from "@/utils/games";
import { getPlayers } from "@/utils/players";
import { getLatestActiveSeason } from "@/utils/seasons";
import Link from "next/link";

export default async function Live() {
  const { data: season, error: seasonError } = await getLatestActiveSeason();
  if (seasonError) return <div>error</div>;
  const { data: games, error: gamesError } = await getGamesBySeason(season!.id);
  if (gamesError) return <div>error</div>;
  const { data: players, error: playersError } = await getPlayers();
  if (playersError) return <div>error</div>;

  const playerStats = calculatePlayerStats(games!);
  const topScorers = playerStats.toSorted(
    (a, b) => b.goalsScored - a.goalsScored,
  );
  const winRates = playerStats.toSorted((a, b) => b.winRate - a.winRate);

  return (
    <div>
      <div>
        <h1>Live</h1>
      </div>
      <GameList games={games} />
      <div className="mt-6 flex justify-center gap-10">
        <TopscorerList players={topScorers} />
        <WinRateList players={winRates} />
      </div>
      <GameForm seasonId={season!.id} players={players!} />
    </div>
  );
}
