import GamesList from "@/components/games/games-list";
import PageHeader from "@/components/layout/page-header";
import SeasonBadge from "@/components/season-badge";
import SeasonDateRange from "@/components/season-date-range";
import SeasonName from "@/components/season-title";
import Standings from "@/components/standings/standings";
import PageTitle from "@/components/ui/page-title";
import { getSeasonById } from "@/utils/seasons";

type SeasonProps = {
  params: {
    id: number;
  };
};

export default async function Season({ params }: SeasonProps) {
  const { data: season, error: seasonError } = await getSeasonById(params.id);
  if (seasonError) throw seasonError;

  return (
    <>
      <PageHeader>
        <SeasonBadge date={season!.end_date} />
        <div className="my-2">
          <PageTitle>
            <SeasonName date={season!.start_date} />
          </PageTitle>
        </div>
        <SeasonDateRange
          className="text-lg"
          startDate={season!.start_date}
          endDate={season!.end_date}
        />
      </PageHeader>
      <Standings season={season!} />
      <GamesList limit={5} season={season!} />
    </>
  );
}
