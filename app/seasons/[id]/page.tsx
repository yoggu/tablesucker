import { getCachedSeason } from "@/actions/season";
import Games from "@/components/games/games";
import GamesSkeleton from "@/components/games/games-skeleton";
import PageHeader from "@/components/layout/page-header";
import SeasonBadge from "@/components/season/season-badge";
import SeasonDateRange from "@/components/season/season-date-range";
import SeasonTitle from "@/components/season/season-title";
import Standings from "@/components/standings/standings";
import CardSpinnerSkeleton from "@/components/ui/card-spinner-skeleton";
import PageTitle from "@/components/ui/page-title";
import { SeasonWithState } from "@/types/types";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type SeasonProps = {
  params: {
    id: number;
  };
};

export default async function SeasonPage({ params }: SeasonProps) {
  const { data: seasonData, error: seasonError } = await getCachedSeason(params.id);
  if (seasonError) throw seasonError;
  const [season] = seasonData as SeasonWithState[];
  if (!season) return notFound();

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>
            <SeasonTitle startDate={season.start_date} />
          </PageTitle>
          <div className="mt-1 flex items-center gap-3">
            <SeasonDateRange
              className="text-base dark:text-slate-400"
              startDate={season.start_date}
              endDate={season.end_date}
            />
            <SeasonBadge state={season.state} />
          </div>
        </div>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Suspense fallback={<CardSpinnerSkeleton title="Standings" />}>
            <Standings season={season} />
          </Suspense>
        </div>
        <div className="col-span-full">
          <Suspense fallback={<GamesSkeleton />}>
            <Games limit={5} season={season} />
          </Suspense>
        </div>
      </div>
    </>
  );
}
