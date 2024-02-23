import { getCachedGames } from "@/actions/game";
import { calculatePlayerStats, findNemesis } from "@/lib/utils";
import { Player, SeasonWithState } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { getCachedPlayer } from "@/actions/player";
import PlayerAvatar from "../ui/player-avatar";

type PlayerNemesisProps = {
  player: Player;
  season: SeasonWithState;
};

export default async function PlayerNemesis({
  player,
  season,
}: PlayerNemesisProps) {
  const { data: games, error: gamesError } = await getCachedGames(
    season.id,
    player.id,
  );
  if (gamesError) throw gamesError;
  const nemesis = findNemesis(player, games!);

  if (!nemesis) return null;
  const { data: nemesisData, error: nemesisError } = await getCachedPlayer(
    nemesis.id,
  );
  if (nemesisError) throw nemesisError;
  const [nemesisPlayer] = nemesisData as Player[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nemesis</CardTitle>
        <CardDescription>
          You lost {(100-nemesis.winRate)}% of the games against
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlayerAvatar player={nemesisPlayer} showName link />
      </CardContent>
    </Card>
  );
}
