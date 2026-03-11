import { getCachedGames, getCachedGamesCount } from "@/actions/game";
import { getCachedPlayers } from "@/actions/player";
import { getCachedSeasons } from "@/actions/season";
import { getCurrentUser } from "@/actions/user";
import DialogGameForm from "@/components/game/dialog-game-form";
import RandomTeamDialog from "@/components/game/random-team-dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Player, SeasonWithState } from "@/types/types";
import GamesLoadMore from "./games-load-more";

type GamesProps = {
  season?: SeasonWithState;
  player?: Player;
  offset?: number;
  limit?: number;
};

export default async function Games({
  season,
  player,
  offset,
  limit,
}: GamesProps) {
  const { data: games, error: gamesError } = await getCachedGames(
    season?.id,
    player?.id,
    offset,
    limit,
  );
  if (gamesError) throw gamesError;

  const { data: count, error: countError } = await getCachedGamesCount(
    season?.id,
    player?.id,
  );
  if (countError) throw countError;

  const user = await getCurrentUser();

  let seasons: SeasonWithState[] | null = null;
  let players: Player[] | null = null;
  if (user) {
    const { data: seasonsData, error: seasonsError } = await getCachedSeasons();
    if (seasonsError) throw seasonsError;
    seasons = seasonsData;
    const { data: playersData, error: playersError } = await getCachedPlayers();
    if (playersError) throw playersError;
    players = playersData;
  }

  // Force re-rendering of GamesLoadMore component when games are updated
  const key = Math.floor(Math.random() * 1000);

  return (
    <Card>
      <CardHeader className="gap-4 sm:flex-row sm:items-start sm:justify-between sm:space-y-0">
        <div>
          <CardTitle>Games</CardTitle>
          <CardDescription>
            {count} {count === 1 ? "Game" : "Games"} Played
          </CardDescription>
        </div>
        {user && seasons && players && (
          <div className="flex gap-2 self-end sm:self-start">
            <DialogGameForm seasons={seasons} players={players} />
            <RandomTeamDialog seasons={seasons} players={players} />
          </div>
        )}
      </CardHeader>
      <CardContent>
        <GamesLoadMore
          key={key}
          initialGames={games ?? []}
          gamesCount={count ?? 0}
          season={season}
          player={player}
          limit={limit ?? 10}
          user={user}
          seasons={seasons}
          players={players}
        />
      </CardContent>
    </Card>
  );
}
