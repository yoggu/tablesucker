import { getPlayerById } from "@/utils/players";
import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";
import PlayerAvatar from "@/components/ui/player-avatar";
import Games from "@/components/games/games";
import Standings from "@/components/standings/standings";
import { getSeasons } from "@/actions/season";
import SeasonSelector from "@/components/season/season-selector";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SeasonName from "@/components/season/season-title";
import PlayerWinRate from "@/components/player/player-win-rate";
import PlayerGoalsScored from "@/components/player/player-goals-scored";
import GamesSkeleton from "@/components/games/games-skeleton";
import { Suspense } from "react";
import CardSpinnerSkeleton from "@/components/ui/card-spinner-skeleton";

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
  const seasonId = searchParams?.season;
  const { data: seasons, error: seasonsError } = await getSeasons();
  if (seasonsError) throw seasonsError;
  const { data: player, error: playerError } = await getPlayerById(params.id);
  if (playerError) throw playerError;
  const season =
    seasons!.find((s) => s.id === parseInt(seasonId)) ?? seasons![0];

  return (
    <>
      <PageHeader>
        <div className="flex items-center gap-4">
          <PlayerAvatar
            player={player!}
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
                <SeasonName date={season.created_at} />
              </CardTitle>
              <CardDescription>
                {`Select a season to view games and standings for ${player?.name}`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SeasonSelector seasons={seasons!} />
            </CardContent>
          </Card>
        </div>
        <div className="order-2 col-span-full grid gap-6 md:order-none md:col-span-5">
          <Suspense fallback={<GamesSkeleton />}>
            <Games season={season} player={player!} limit={5} />
          </Suspense>
          <Suspense fallback={<CardSpinnerSkeleton title="Standings" />}>
            <Standings season={season} />
          </Suspense>
        </div>
        <div className="order-1 col-span-full flex flex-col gap-6 md:order-none md:col-span-1">
          <Suspense fallback={<CardSpinnerSkeleton title="Win Rate" />}>
            <PlayerWinRate player={player!} season={season} />
          </Suspense>
          <Suspense fallback={<CardSpinnerSkeleton title="Goals Scored" />}>
            <PlayerGoalsScored player={player!} season={season} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
