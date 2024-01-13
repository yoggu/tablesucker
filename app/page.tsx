import { getCachedPlayes } from "@/actions/player";
import { getCachedSeasons, getSeasons } from "@/actions/season";
import DialogGameForm from "@/components/game/dialog-game-form";
import Games from "@/components/games/games";
import GamesSkeleton from "@/components/games/games-skeleton";
import RealtimeGames from "@/components/games/realtime-games";
import PageHeader from "@/components/layout/page-header";
import RankingSkeleton from "@/components/ranking/ranking-skeleton";
import SeasonTitle from "@/components/season/season-title";
import Topscorer from "@/components/topscorer/topscorer";
import PageTitle from "@/components/ui/page-title";
import WinRate from "@/components/win-rate/win-rate";
import { SeasonStateEnum } from "@/types/types";
import Link from "next/link";
import { Suspense } from "react";

export default async function Live() {
  const { data: seasons, error: seasonsError } = await getCachedSeasons([SeasonStateEnum.Active]);
  if (seasonsError) throw seasonsError;
  const latestActiveSeason = seasons![0];
  const { data: players, error: playersError } = await getCachedPlayes();
  if (playersError) throw playersError;

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>
            Active Season
          </PageTitle>
          <div className="mt-1">
            <Link
              href={`/seasons/${latestActiveSeason.id}`}
              className="hover:text-blue-600 dark:hover:text-blue-400 dark:text-slate-400"
            >
              <SeasonTitle startDate={latestActiveSeason.start_date} />
            </Link>
            </div>
        </div>
        <DialogGameForm seasons={seasons!} players={players!} />
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
          <RealtimeGames />
          <Suspense fallback={<GamesSkeleton />}>
            <Games season={latestActiveSeason} limit={5} />
          </Suspense>
        </div>
        <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
          <Suspense fallback={<RankingSkeleton title="Win Rate" />}>
            <WinRate season={latestActiveSeason} />
          </Suspense>
          <Suspense fallback={<RankingSkeleton title="Topscorer" />}>
            <Topscorer season={latestActiveSeason} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
