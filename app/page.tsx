import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TEAM } from "@/types/types";
import { calculatePlayerStats, getGamesBySeason } from "@/utils/games";
import { getLatestActiveSeason } from "@/utils/seasons";
import Link from "next/link";

export default async function Live() {
  const { data: season, error: seasonError } = await getLatestActiveSeason();
  if (seasonError) return <div>error</div>;
  const { data: games, error: gamesError } = await getGamesBySeason(season!.id);
  if (gamesError) return <div>error</div>;

  const playerStats = calculatePlayerStats(games!);
  const topScorers = playerStats.toSorted(
    (a, b) => b.goalsScored - a.goalsScored,
  );
  const winRates = playerStats.toSorted((a, b) => b.winRate - a.winRate);

  return (
    <div>
      <div>
        <h1>Live</h1>
      </div>
      <ul>
        {games?.map((game) => (
          <li key={game.id}>
            <div>
              <span>Team Red</span>
              {game.winner === TEAM.Red && <span>Winner</span>}
              <span>{game.teamRed.score}</span>
              <div>
                {game.teamRed.players.map((player) => (
                  <Link key={player.id} href={`/players/${player.id}`}>
                    <Avatar>
                      <AvatarImage src={player?.image_url ?? ""} />
                      <AvatarFallback>
                        {player.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <span>Team Blue</span>
              {game.winner === TEAM.Blue && <span>Winner</span>}
              <span>{game.teamBlue.score}</span>
              <div>
                {game.teamBlue.players.map((player) => (
                  <Link key={player.id} href={`/players/${player.id}`}>
                    <Avatar>
                      <AvatarImage src={player?.image_url ?? ""} />
                      <AvatarFallback>
                        {player.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <h2>Top Scorers</h2>
        <ul>
          {topScorers.map((player) => (
            <li key={player.id}>
              <Link href={`/players/${player.id}`}>
                <div>
                  <Avatar>
                    <AvatarImage src={player?.imageUrl ?? ""} />
                    <AvatarFallback>
                      {player.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{player.name}</span>
                  <span>{player.goalsScored}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Win Rates</h2>
        <ul>
          {winRates.map((player) => (
            <li key={player.id}>
              <Link href={`/players/${player.id}`}>
                <div>
                  <Avatar>
                    <AvatarImage src={player?.imageUrl ?? ""} />
                    <AvatarFallback>
                      {player.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>{player.name}</span>
                  <span>{player.winRate * 100}%</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
