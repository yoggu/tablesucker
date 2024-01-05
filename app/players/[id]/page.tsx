import { getPlayerById } from "@/utils/players";
import GamesList from "@/components/games-list/games-list";
import PageHeader from "@/components/layout/page-header";
import PageTitle from "@/components/ui/page-title";

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
        <PageTitle>{player?.name}</PageTitle>
      </PageHeader>
      <GamesList player={player!} />
    </>
  );
}
