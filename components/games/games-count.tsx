import { Player, Season } from "@/types/types";
import { getGamesCount } from "@/actions/game";

type GamesCountProps = {
  season?: Season;
  player?: Player;
};

export default async function GamesCount({
  season,
  player,
}: GamesCountProps) {
  const { data: count, error: countError } = await getGamesCount(
    season?.id,
    player?.id,
  );
  if (countError) throw countError;

  return <div>{count} Games Played</div>;
}
