import { getSeasons } from "@/utils/seasons";
import Link from "next/link";
import SeasonName from "../season/season-title";
import SeasonBadge from "../season/season-badge";
import SeasonDateRange from "../season/season-date-range";

export default async function SeasonsList() {
  const { data, error } = await getSeasons();

  if (error) throw error;
  return (
    <ul className="flex flex-col gap-4">
      {data?.map((season) => (
        <li
          key={season.id}
          className="border-b pb-3 last-of-type:border-0 last-of-type:pb-0 dark:border-gray-700"
        >
          <Link className="w-fit block" href={`/seasons/${season.id}`}>
            <div className="flex gap-3">
              <span>
                <SeasonName date={season.start_date} />
              </span>
              <SeasonBadge date={season.end_date} />
            </div>
            <SeasonDateRange
              startDate={season.start_date}
              endDate={season.end_date}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
