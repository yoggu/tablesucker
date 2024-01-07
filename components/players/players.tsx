import PlayerForm from "@/components/player/player-form";
import { getPlayers } from "@/utils/players";
import PlayerAvatar from "@/components/ui/player-avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default async function Players() {
  const { data, error } = await getPlayers();

  if (error) throw error;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Players</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 w-fit gap-y-4 gap-x-8">
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
