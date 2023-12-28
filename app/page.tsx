import GameForm from "@/components/game-form";
import GameList from "@/components/game-list";
import TopscorerList from "@/components/topscorer-list";
import WinRateList from "@/components/win-rate-list";
import { calculatePlayerStats, getGamesBySeason } from "@/utils/games";
import { getPlayers } from "@/utils/players";
import { getActiveSeasons } from "@/utils/seasons";

export default async function Live() {
  const { data: seasons, error: seasonError } = await getActiveSeasons();
  if (seasonError) return <div>error</div>;
  const LatestActiveSeason = seasons![0];
  const { data: games, error: gamesError } = await getGamesBySeason(LatestActiveSeason?.id);
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
      <GameForm seasons={seasons!} players={players!} />
    </div>
  );
}
