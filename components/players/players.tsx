import PlayerForm from "@/components/player/player-form";
import { getPlayers } from "@/utils/players";
import PlayerAvatar from "@/components/ui/player-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { unstable_cache } from "next/cache";

const getCachedPlayes = unstable_cache(() => getPlayers(), ["players"], {
  revalidate: 60,
  tags: ["players"],
});

export default async function Players() {
  const { data, error } = await getCachedPlayes();
  if (error) throw error;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Players</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid w-fit grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 xl:grid-cols-4">
          {data?.map((player) => (
            <li key={player.id}>
              <PlayerAvatar player={player} link showName />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
