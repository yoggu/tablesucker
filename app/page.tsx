import GameForm from "@/components/game-form";
import GamesList from "@/components/games-list";
import TopscorerList from "@/components/topscorer-list";
import WinRateList from "@/components/win-rate-list";
import { getPlayers } from "@/utils/players";
import { getSeasons } from "@/utils/seasons";

export default async function Live() {
  const { data: seasons, error: seasonsError } = await getSeasons(true);
  if (seasonsError) throw seasonsError;
  const LatestActiveSeason = seasons![0];
  const { data: players, error: playersError } = await getPlayers();
  if (playersError) throw playersError;

  return (
    <div>
      <div>
        <h1>Live</h1>
      </div>
      <GamesList season={LatestActiveSeason} />
      <div className="mt-6 flex justify-center gap-10">
        <TopscorerList season={LatestActiveSeason} />
        <WinRateList season={LatestActiveSeason} />
      </div>
      <GameForm seasons={seasons!} players={players!} />
    </div>
  );
}
