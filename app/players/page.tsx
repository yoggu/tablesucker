import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cookies } from "next/headers";

export default async function Players() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("players").select("*");

  if (error) throw error;

  return (
    <div>
      Players
      {data?.map((player) => (
        <div key={player.id}>
          <Avatar>
            <AvatarImage src={player?.image_url ?? ""} />
            <AvatarFallback>{player.name}</AvatarFallback>
          </Avatar>
        </div>
      ))}
    </div>
  );
}
