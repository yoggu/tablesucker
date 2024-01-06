import GameForm from "@/components/game-form";
import Games from "@/components/games/games";
import PageHeader from "@/components/layout/page-header";
import SeasonName from "@/components/season/season-title";
import Topscorer from "@/components/topscorer/topscorer";
import PageTitle from "@/components/ui/page-title";
import WinRate from "@/components/win-rate/win-rate";
import { getPlayers } from "@/utils/players";
import { getSeasons } from "@/utils/seasons";

export default async function Live() {
  const { data: seasons, error: seasonsError } = await getSeasons(true);
  if (seasonsError) throw seasonsError;
  const LatestActiveSeason = seasons![0];
  const { data: players, error: playersError } = await getPlayers();
  if (playersError) throw playersError;

  return (
    <>
      <PageHeader>
        <PageTitle>
          <SeasonName date={LatestActiveSeason.start_date} />
        </PageTitle>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full lg:col-span-4">
          <Games season={LatestActiveSeason} limit={5} realtime={true} />
        </div>
        <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
          <WinRate season={LatestActiveSeason} realtime={true} />
          <Topscorer season={LatestActiveSeason} realtime={true} />
        </div>
        <GameForm seasons={seasons!} players={players!} />
      </div>
    </>
  );
}
