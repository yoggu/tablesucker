import { getCachedGames } from "@/actions/game";
import { calculatePlayerStats, findNemesis } from "@/lib/utils";
import { Player, SeasonWithState } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
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
  const { data: games, error: gamesError } = await getCachedGames(season.id, player.id);
  if (gamesError) throw gamesError;
  const nemesisId = findNemesis(player, games!);

  if (!nemesisId) return null;
  const { data: nemesisData, error: nemesisError } = await getCachedPlayer(nemesisId);
  if (nemesisError) throw nemesisError;
  const [nemesis] = nemesisData as Player[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nemesis</CardTitle>
      </CardHeader>
      <CardContent>
        <PlayerAvatar player={nemesis} showName link />
      </CardContent>
    </Card>
  );
}
