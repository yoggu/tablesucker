import SeasonDateRange from "@/components/season-date-range";
import SeasonTitle from "@/components/season-title";
import { Badge } from "@/components/ui/badge";
import { getSeasons, isCompletedSeason } from "@/utils/seasons";
import Link from "next/link";

export default async function Seasons() {
  const { data, error } = await getSeasons();

  if (error) throw error;
  return (
    <div>
      <div>
        <h1>Seasons</h1>
      </div>
      <ul className="mt-6 flex flex-col gap-5">
        {data?.map((season) => (
          <li key={season.id} className="border-b py-2">
            <Link href={`/seasons/${season.id}`}>
              <div className="flex gap-3 ">
                <SeasonTitle date={season.start_date} />
                <div>
                  {isCompletedSeason(season.end_date) ? (
                    <Badge variant="destructive">completed</Badge>
                  ) : (
                    <Badge>active</Badge>
                  )}
                </div>
              </div>
              <SeasonDateRange
                startDate={season.start_date}
                endDate={season.end_date}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
