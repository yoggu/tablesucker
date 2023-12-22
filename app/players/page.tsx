import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Players() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const { data, error } = await supabase.from("players").select("*");

  console.log(data);
  return (
    <div>
      Players
      {data?.map((player) => (
        <div key={player.id}>{player.name}</div>
      ))}
    </div>
  );
}
