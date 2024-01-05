import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import PlayerForm from "@/components/player-form";
import { getPlayers } from "@/utils/players";
import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";

export default async function Players() {
  const { data, error } = await getPlayers();

  if (error) throw error;

  return (
    <>
      <PageHeader>
        <PageTitle>Players</PageTitle>
      </PageHeader>
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
