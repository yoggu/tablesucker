import { getPlayer } from "@/actions/player";
import { getCachedSeasons } from "@/actions/season";
import Games from "@/components/games/games";
import GamesSkeleton from "@/components/games/games-skeleton";
import PageHeader from "@/components/layout/page-header";
import PlayerGoalsScored from "@/components/player/player-goals-scored";
import PlayerWinRate from "@/components/player/player-win-rate";
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
  params: {
    id: number;
  };
  searchParams: {
    season: string;
  };
};

export default async function PlayerPage({
  searchParams,
  params,
}: PlayerProps) {
  const { data: players, error: playerError } = await getPlayer(params.id);
  if (playerError) throw playerError;
  if (!players || players?.length === 0) return notFound();
  const player = players[0];

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
        <p className="text-gray-500 dark:text-gray-400">
          No seasons found. Create a season to get started.
        </p>
      </div>
    </>
  );
}
