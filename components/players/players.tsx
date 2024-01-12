import { getPlayers } from "@/utils/players";
import PlayerAvatar from "@/components/ui/player-avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { unstable_cache } from "next/cache";
import { getCurrentUser } from "@/utils/user";
import EditPlayerDialog from "../player/edit-player-dialog";
import ArchivePlayerDialog from "../player/archive-player-dialog";
import Link from "next/link";

const getCachedPlayes = unstable_cache(() => getPlayers(), ["players"], {
  revalidate: 60,
  tags: ["players"],
});

export default async function Players() {
  const { data, error, count } = await getCachedPlayes();
  if (error) throw error;
  const user = await getCurrentUser();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Players</CardTitle>
        <CardDescription>{count} Players</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-6 lg:grid-cols-2">
          {data?.map((player) => (
            <li
              className="flex animate-fade-in justify-between border-b pb-4 last:border-b-0 last:pb-0 lg:col-span-1 dark:border-gray-700 lg:even:[&:nth-last-child(-n+2)]:border-b-0 lg:even:[&:nth-last-child(-n+2)]:pb-0"
              key={player.id}
            >
              <Link
                className="w-full hover:text-blue-600 dark:hover:text-blue-400"
                href={`/players/${player.id}`}
              >
                <PlayerAvatar player={player} showName />
              </Link>
              {user && (
                <div className="flex  gap-3">
                  <EditPlayerDialog player={player} />
                  <ArchivePlayerDialog player={player} />
                </div>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
