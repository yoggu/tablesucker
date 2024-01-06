import GameForm from "@/components/game-form";
import Games from "@/components/games/games";
import GamesList from "@/components/games/games-list";
import RealtimeGames from "@/components/games/realtime-games";
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
      <Games season={LatestActiveSeason} limit={5} realtime={true}  />
      <div className="mt-6 flex justify-center gap-10">
        <TopscorerList season={LatestActiveSeason} />
        <WinRateList season={LatestActiveSeason} />
      </div>
      <GameForm seasons={seasons!} players={players!} />
    </>
  );
}
