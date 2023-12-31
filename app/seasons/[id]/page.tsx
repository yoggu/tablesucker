import GamesList from "@/components/games-list";
import SeasonBadge from "@/components/season-badge";
import SeasonDateRange from "@/components/season-date-range";
import SeasonName from "@/components/season-title";
import { getGamesBySeason } from "@/utils/games";
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
    <div>
      <div>
        <div className="flex gap-3">
          <h1><SeasonName date={season!.start_date} /></h1>
          <SeasonBadge date={season!.end_date} />
          </div>
          <SeasonDateRange startDate={season!.start_date} endDate={season!.end_date} />
      </div>
      <GamesList season={season!} />
    </div>
  );
}
