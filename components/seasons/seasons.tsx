import Link from "next/link";
import SeasonName from "../season/season-title";
import SeasonBadge from "../season/season-badge";
import SeasonDateRange from "../season/season-date-range";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "../ui/card";
import { getSeasons } from "@/actions/season";
import { EditIcon, TrashIcon } from "lucide-react";
import { getCurrentUser } from "@/utils/user";
import DeleteSeasonDialog from "../season/delete-season-dialog";
import EditSeasonDialog from "../season/edit-season-dialog";
import { unstable_cache } from "next/cache";
import { Toast } from "../ui/toast";

const getCachedSeasons = unstable_cache(() => getSeasons(), ["seasons"], {
  revalidate: 60,
  tags: ["seasons"],
});
export default async function Seasons() {
  const { data, error, count } = await getCachedSeasons();
  const user = await getCurrentUser();

  if (error) throw error;
  return (
    <Card>
      <CardHeader>
        <CardTitle>Seasons</CardTitle>
        <CardDescription>{count} Seasons</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-6">
          {data?.map((season) => (
            <li
              key={season.id}
              className="flex animate-fade-in justify-between border-b pb-4 last-of-type:border-0 last-of-type:pb-0 dark:border-gray-700"
            >
              <Link
                className="block w-fit hover:text-blue-600 dark:hover:text-blue-400"
                href={`/seasons/${season.id}`}
              >
                <span className="text-xl">
                  <SeasonName date={season.start_date} />
                </span>
                <div className="flex items-center gap-3 pt-1">
                  <SeasonDateRange
                    startDate={season.start_date}
                    endDate={season.end_date}
                  />
                  <SeasonBadge date={season.end_date} />
                </div>
              </Link>
              {user && (
                <div className="flex items-start gap-4">
                  <EditSeasonDialog season={season} />
                  <DeleteSeasonDialog season={season} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
