import { TEAM } from "@/types/types";
import { getGamesByPlayerAndSeason } from "@/utils/games";
import { getPlayerById } from "@/utils/players";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link"

type PlayerProps = {
  params: {
    id: number;
  };
}

export default async function Player({ params }: PlayerProps) {
  const { data: player, error: playerError } = await getPlayerById(params.id);
  if (playerError) throw playerError;
  const { data: games, error: gamesError } = await getGamesByPlayerAndSeason(player!.id);
  if (gamesError) throw gamesError;

  return (
    <div>
      <div>
        <h1>Player {player?.name}</h1>
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
    </div>
  )
}
