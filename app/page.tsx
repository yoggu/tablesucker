import { getCachedGames } from "@/actions/game";
import { getCachedPlayers } from "@/actions/player";
import { getCachedSeasons } from "@/actions/season";
import DialogGameForm from "@/components/game/dialog-game-form";
import RandomTeamDialog from "@/components/game/random-team-dialog";
import Games from "@/components/games/games";
import GamesSkeleton from "@/components/games/games-skeleton";
import RealtimeGames from "@/components/games/realtime-games";
import PageHeader from "@/components/layout/page-header";
import RankingSkeleton from "@/components/ranking/ranking-skeleton";
import SeasonTitle from "@/components/season/season-title";
import Topscorer from "@/components/topscorer/topscorer";
import PageTitle from "@/components/ui/page-title";
import WinRate from "@/components/win-rate/win-rate";
import WinRateChart from "@/components/win-rate/win-rate-chart";
import { SeasonStateEnum } from "@/types/types";
import Link from "next/link";
import { Suspense } from "react";

export default function LivePage() {
  return (
    <Suspense fallback={<LivePageSkeleton />}>
      <LivePageContent />
    </Suspense>
  );
}

async function LivePageContent() {
  const { data: seasons, error: seasonsError } = await getCachedSeasons([
    SeasonStateEnum.Active,
  ]);
  if (seasonsError) throw seasonsError;
  if (!seasons || seasons?.length === 0) return <NoActiveSeason />;
  const latestActiveSeason = seasons[0];

  const { data: players, error: playersError } = await getCachedPlayers();
  if (playersError) throw playersError;
  if (!players || players?.length === 0) return <NoPlayers />;

  const { data: games } = await getCachedGames(latestActiveSeason.id);

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Active Season</PageTitle>
          <div className="mt-1">
            <Link
              href={`/seasons/${latestActiveSeason.id}`}
              className="text-muted-foreground hover:text-link-hover"
            >
              <SeasonTitle startDate={latestActiveSeason.start_date} />
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <DialogGameForm seasons={seasons} players={players} />
          <RandomTeamDialog seasons={seasons} players={players} games={games ?? []} />
        </div>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
          <RealtimeGames />
          <Suspense fallback={<GamesSkeleton />}>
            <Games season={latestActiveSeason} limit={3} />
          </Suspense>
          <Suspense fallback={<div className="h-[400px] animate-pulse rounded-lg bg-muted" />}>
            <WinRateChart season={latestActiveSeason} />
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

function LivePageSkeleton() {
  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>Active Season</PageTitle>
          <div className="mt-1 h-6 w-32 animate-pulse rounded bg-muted" />
        </div>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full flex flex-col gap-6 lg:col-span-4">
          <GamesSkeleton />
        </div>
        <div className="col-span-full flex flex-col gap-6 lg:col-span-2">
          <RankingSkeleton title="Win Rate" />
          <RankingSkeleton title="Topscorer" />
        </div>
      </div>
    </>
  );
}

function NoActiveSeason() {
  return (
    <>
      <PageHeader>
        <PageTitle>Active Season</PageTitle>
      </PageHeader>
      <div className="text-center">
        <p className="text-lg">
          No active season found. Please add at least one active season.
        </p>
      </div>
    </>
  );
}

function NoPlayers() {
  return (
    <>
      <PageHeader>
        <PageTitle>Active Season</PageTitle>
      </PageHeader>
      <div className="text-center">
        <p className="text-lg">
          No players found. Please add at least one player.
        </p>
      </div>
    </>
  );
}
