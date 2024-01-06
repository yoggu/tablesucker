import { getPlayerById } from "@/utils/players";
import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";
import PlayerAvatar from "@/components/ui/player-avatar";
import Games from "@/components/games/games";

type PlayerProps = {
  params: {
    id: number;
  };
};

export default async function Player({ params }: PlayerProps) {
  const { data: player, error: playerError } = await getPlayerById(params.id);
  if (playerError) throw playerError;

  return (
    <>
      <PageHeader>
        <div className="flex gap-4 items-center">
          <PlayerAvatar player={player!} className="h-12 w-12 xl:h-16 xl:w-16"/>
          <PageTitle>{player?.name}</PageTitle>
        </div>
      </PageHeader>
      <Games player={player!} />
    </>
  );
}
