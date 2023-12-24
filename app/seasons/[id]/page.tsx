import GameList from "@/components/game-list";
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
  if (seasonError) return <div>error</div>;
  const { data: games, error: gamesError } = await getGamesBySeason(season!.id);
  if (gamesError) return <div>error</div>;
  return (
    <div>
      <div>
        <div className="flex gap-3">
          <h1><SeasonName date={season!.start_date} /></h1>
          <SeasonBadge date={season!.end_date} />
          </div>
          <SeasonDateRange startDate={season!.start_date} endDate={season!.end_date} />
      </div>
      <GameList games={games} />
    </div>
  );
}
