import GameForm from "@/components/game-form";
import GamesList from "@/components/games-list/games-list";
import PageHeader from "@/components/layout/page-header";
import SeasonName from "@/components/season-title";
import TopscorerList from "@/components/topscorer-list";
import PageTitle from "@/components/ui/page-title";
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
    <>
      <PageHeader>
        <PageTitle><SeasonName date={LatestActiveSeason.start_date} /></PageTitle>
      </PageHeader>
      <GamesList season={LatestActiveSeason} limit={5} isRealtime={true} />
      <div className="mt-6 flex justify-center gap-10">
        <TopscorerList season={LatestActiveSeason} />
        <WinRateList season={LatestActiveSeason} />
      </div>
      <GameForm seasons={seasons!} players={players!} />
    </>
  );
}
