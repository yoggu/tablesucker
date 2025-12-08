import { getCachedPlayer } from "@/actions/player";
import { getCachedSeasons } from "@/actions/season";
import Games from "@/components/games/games";
import GamesSkeleton from "@/components/games/games-skeleton";
import PageHeader from "@/components/layout/page-header";
import PlayerGoalsScored from "@/components/player/player-goals-scored";
import PlayerNemesis from "@/components/player/player-nemesis";
import PlayerTeamMate from "@/components/player/player-teammate";
import PlayerWinRate from "@/components/player/player-win-rate";
import PlayerWinRateChart from "@/components/player/player-win-rate-chart";
import SeasonSelector from "@/components/season/season-selector";
import SeasonTitle from "@/components/season/season-title";
import Standings from "@/components/standings/standings";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CardSpinnerSkeleton from "@/components/ui/card-spinner-skeleton";
import PageTitle from "@/components/ui/page-title";
import PlayerAvatar from "@/components/ui/player-avatar";
import { Player, SeasonStateEnum } from "@/types/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type PlayerProps = {
  params: Promise<{
    id: number;
  }>;
  searchParams: Promise<{
    season: string;
  }>;
};

function PlayerPageSkeleton() {
  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 animate-pulse rounded-full bg-slate-800 xl:h-16 xl:w-16" />
          <div className="h-8 w-32 animate-pulse rounded bg-slate-800" />
        </div>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <CardSpinnerSkeleton title="Season" />
        </div>
      </div>
    </>
  );
}

export default function PlayerPage(props: PlayerProps) {
  return (
    <Suspense fallback={<PlayerPageSkeleton />}>
      <PlayerPageContent {...props} />
    </Suspense>
  );
}

async function PlayerPageContent(props: PlayerProps) {
  const params = await props.params;
  const searchParams = await props.searchParams;
  const { data: playerData, error: playerError } = await getCachedPlayer(params.id);
  if (playerError) throw playerError;
  const [player] = playerData as Player[];
  if (!player) return notFound();

  const seasonId = parseInt(searchParams?.season);
  const { data: seasons, error: seasonsError } = await getCachedSeasons([
    SeasonStateEnum.Active,
    SeasonStateEnum.Completed,
  ]);
  if (seasonsError) throw seasonsError;
  if (!seasons || seasons?.length === 0) return <NoSeasons player={player} />;
  const season = seasons.find((s) => s.id === seasonId) ?? seasons[0];

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-4">
          <PlayerAvatar
            player={player}
            className="h-12 w-12 xl:h-16 xl:w-16 xl:text-2xl"
          />
          <PageTitle>{player?.name}</PageTitle>
        </div>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Card>
            <CardHeader>
              <CardTitle>
                <SeasonTitle startDate={season?.created_at} />
              </CardTitle>
              <CardDescription>
                {`Select a season to view games and standings for ${player?.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SeasonSelector seasons={seasons} />
            </CardContent>
          </Card>
        </div>
        <div className="order-2 col-span-full grid gap-6 md:order-none md:col-span-5">
          <Suspense fallback={<GamesSkeleton />}>
            <Games season={season} player={player} limit={5} />
          </Suspense>
          <Suspense fallback={<CardSpinnerSkeleton title="Win Rate over time" />}>
            <PlayerWinRateChart player={player} season={season} />
          </Suspense>
          <Suspense fallback={<CardSpinnerSkeleton title="Standings" />}>
            <Standings player={player} season={season} />
          </Suspense>
        </div>
        <div className="order-1 col-span-full flex flex-col gap-6 md:order-none md:col-span-1">
          <Suspense fallback={<CardSpinnerSkeleton title="Win Rate" />}>
            <PlayerWinRate player={player} season={season} />
          </Suspense>
          <Suspense fallback={<CardSpinnerSkeleton title="Goals Scored" />}>
            <PlayerGoalsScored player={player} season={season} />
          </Suspense>
          <Suspense fallback={<CardSpinnerSkeleton title="Nemesis" />}>
            <PlayerNemesis player={player} season={season} />
          </Suspense>
          <Suspense fallback={<CardSpinnerSkeleton title="Teammate" />}>
            <PlayerTeamMate player={player} season={season} />
          </Suspense>
        </div>
      </div>
    </>
  );
}

function NoSeasons({ player }: { player: Player }) {
  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-4">
          <PlayerAvatar
            player={player}
            className="h-12 w-12 xl:h-16 xl:w-16 xl:text-2xl"
          />
          <PageTitle>{player?.name}</PageTitle>
        </div>
      </PageHeader>
      <div className="text-center">
        <p className="text-slate-400">
          No seasons found. Create a season to get started.
        </p>
      </div>
    </>
  );
}
