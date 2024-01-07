import { Player, Season } from "@/types/types";
import { getNumberOfGames } from "@/actions/game";


type NumberOfGamesPlayedProps = {
  season?: Season;
  player?: Player;
};

export default async function NumberOfGamesPlayed({
  season,
  player
}: NumberOfGamesPlayedProps) {
  const { data: count, error: countError } = await getNumberOfGames(
    season?.id,
    player?.id
  );
  if (countError) throw countError;

  return (
    <span>{ count } Games Played</span>
  );
}
