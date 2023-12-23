import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import PlayerForm from "@/components/player-form";
import { getPlayers } from "@/utils/players";

export default async function Players() {
  const { data, error } = await getPlayers();

  if (error) throw error;

  return (
    <>
      <div>
        <h1>Players</h1>
      </div>
      <div className="flex gap-3 mt-3">
        {data?.map((player) => (
          <div key={player.id}>
            <Link href={`/players/${player.id}`}>
              <Avatar>
                <AvatarImage src={player?.image_url ?? ""} />
                <AvatarFallback>
                  {player.name.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-5">
        <PlayerForm />
      </div>
    </>
  );
}
