import { getSeasons } from "@/actions/season";
import GameForm from "@/components/game/game-form";
import Games from "@/components/games/games";
import RealtimeGames from "@/components/games/realtime-games";
import PageHeader from "@/components/layout/page-header";
import SeasonName from "@/components/season/season-title";
import Topscorer from "@/components/topscorer/topscorer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";
import WinRate from "@/components/win-rate/win-rate";
import { getPlayers } from "@/utils/players";
import Link from "next/link";

export default async function Live() {
  const { data: seasons, error: seasonsError } = await getSeasons(true);
  if (seasonsError) throw seasonsError;
  const latestActiveSeason = seasons![0];
  const { data: players, error: playersError } = await getPlayers();
  if (playersError) throw playersError;

  return (
    <>
      <PageHeader>
        <PageTitle>
          <Link href={`/seasons/${latestActiveSeason.id}`} className="dark:hover:text-blue-500">
            <SeasonName date={latestActiveSeason.start_date} />
          </Link>
        </PageTitle>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full lg:col-span-4 flex flex-col gap-6">
          <RealtimeGames />
          <Games season={latestActiveSeason} limit={5} />
          <Card>
            <CardHeader>
              <CardTitle>Add Game</CardTitle>
            </CardHeader>
            <CardContent>
              <GameForm seasons={seasons!} players={players!} />
            </CardContent>
          </Card>
        </div>
        <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
          <WinRate season={latestActiveSeason} />
          <Topscorer season={latestActiveSeason} />
        </div>
      </div>
    </>
  );
}
