import { getCachedGames } from "@/actions/game";
import { getCachedPlayer } from "@/actions/player";
import { findBestTeamMate } from "@/lib/utils";
import { Player, SeasonWithState } from "@/types/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import PlayerAvatar from "../ui/player-avatar";

type PlayerTeamMateProps = {
  player: Player;
  season: SeasonWithState;
};

export default async function PlayerTeamMate({
  player,
  season,
}: PlayerTeamMateProps) {
  const { data: games, error: gamesError } = await getCachedGames(
    season.id,
    player.id,
  );
  if (gamesError) throw gamesError;
  const teamMate = findBestTeamMate(player, games!);

  if (!teamMate) return null;
  const { data: teamMateData, error: teamMateError } = await getCachedPlayer(
    teamMate.id,
  );
  if (teamMateError) throw teamMateError;
  const [teamMatePlayer] = teamMateData as Player[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Best Teammate</CardTitle>
        <CardDescription>
          You won {(teamMate.winRate)}% of games with
        </CardDescription>
      </CardHeader>
      <CardContent>
        <PlayerAvatar player={teamMatePlayer} showName link />
      </CardContent>
    </Card>
  );
}
