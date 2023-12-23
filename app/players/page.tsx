import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cookies } from "next/headers";
import Link from "next/link";
import PlayerForm from "@/components/player-form";

export default async function Players() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("players").select("*");

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
