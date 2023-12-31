import { getPlayerById } from "@/utils/players";
import GamesList from "@/components/games-list";

type PlayerProps = {
  params: {
    id: number;
  };
};

export default async function Player({ params }: PlayerProps) {
  const { data: player, error: playerError } = await getPlayerById(params.id);
  if (playerError) throw playerError;

  return (
    <div>
      <div>
        <h1>{player?.name}</h1>
      </div>
      <GamesList player={player!} />
    </div>
  );
}
