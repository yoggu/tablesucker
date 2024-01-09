import { Player, Season } from "@/types/types";
import { getGamesCount } from "@/actions/game";

type GamesCountProps = {
  count: number;
};

export default async function GamesCount({ count }: GamesCountProps) {
  return <div>{count} Games Played</div>;
}
