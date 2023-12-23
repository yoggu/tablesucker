import { Badge } from "@/components/ui/badge";
import { getSeasons, isCompletedSeason } from "@/utils/seasons";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  let month = `${date.getMonth() + 1}`;
  let year = `${date.getFullYear()}`.slice(-2);
  if (month.length < 2) {
    month = `0${month}`;
  }
  return `${month}/${year}`;
};



export default async function Seasons() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await getSeasons();

  if (error) throw error;
  return (
    <div>
      <div>
        <h1>Seasons</h1>
      </div>
      <ul>
        {data?.map((season) => (
          <li key={season.id}>
            <div className="flex gap-3">
              <span>Season {formatDate(season.start_date)}</span>
              <span>
                {isCompletedSeason(season.end_date) ? (
                  <Badge variant="destructive">completed</Badge>
                  ) : (
                  <Badge>running</Badge>
                )}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
