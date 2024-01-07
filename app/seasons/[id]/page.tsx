import { getSeasonById } from "@/actions/season";
import Games from "@/components/games/games";
import PageHeader from "@/components/layout/page-header";
import SeasonBadge from "@/components/season/season-badge";
import SeasonDateRange from "@/components/season/season-date-range";
import SeasonName from "@/components/season/season-title";
import Standings from "@/components/standings/standings";
import PageTitle from "@/components/ui/page-title";

type SeasonProps = {
  params: {
    id: number;
  };
};

export default async function SeasonPage({ params }: SeasonProps) {
  const { data: season, error: seasonError } = await getSeasonById(params.id);
  if (seasonError) throw seasonError;

  return (
    <>
      <PageHeader>
        <div>
          <PageTitle>
            <SeasonName date={season!.start_date} />
          </PageTitle>
          <div className="mt-2 flex items-center gap-4">
            <SeasonDateRange
              className="text-lg"
              startDate={season!.start_date}
              endDate={season!.end_date}
            />
            <SeasonBadge date={season!.end_date} />
          </div>
        </div>
      </PageHeader>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-full">
          <Standings season={season!} />
        </div>
        <div className="col-span-full">
          <Games limit={5} season={season!} />
        </div>
      </div>
    </>
  );
}
