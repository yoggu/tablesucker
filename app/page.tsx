import GameForm from "@/components/game-form";
import Games from "@/components/games/games";
import PageHeader from "@/components/layout/page-header";
import SeasonName from "@/components/season/season-title";
import Topscorer from "@/components/topscorer/topscorer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/ui/page-title";
import WinRate from "@/components/win-rate/win-rate";
import { getPlayers } from "@/utils/players";
import { getSeasons } from "@/utils/seasons";
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
          <Link href={`/seasons/${latestActiveSeason.id}`}>
            <SeasonName date={latestActiveSeason.start_date} />
          </Link>
        </PageTitle>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full lg:col-span-4 flex flex-col gap-6">
          <Games season={latestActiveSeason} limit={5} realtime={true} />
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
          <WinRate season={latestActiveSeason} realtime={true} />
          <Topscorer season={latestActiveSeason} realtime={true} />
        </div>
      </div>
    </>
  );
}
