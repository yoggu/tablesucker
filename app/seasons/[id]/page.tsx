import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TEAM } from "@/types/types";
import { getGamesBySeason } from "@/utils/games";
import { getSeasonById } from "@/utils/seasons";
import Link from "next/link";

type SeasonProps = {
  params: {
    id: number;
  };
};

export default async function Season({ params }: SeasonProps) {
  const { data: season, error: seasonError } = await getSeasonById(params.id);
  if (seasonError) return <div>error</div>;
  const { data: games, error: gamesError } = await getGamesBySeason(season!.id);
  if (gamesError) return <div>error</div>;
  return (
    <div>
      <div>
        <h1>Season {season?.start_date }</h1>
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
  );
}
