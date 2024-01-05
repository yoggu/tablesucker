import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Season } from "@/types/types";
import Link from "next/link";
import { calculatePlayerStats } from "@/utils/games";
import { fetchGames } from "@/actions/game";

type TopscorerListProps = {
  season: Season;
};

export default async function TopscorerList({ season }: TopscorerListProps) {
  const { data: games, error: gamesError } = await fetchGames(season.id);
  if (gamesError) throw gamesError;
  const playerStats = calculatePlayerStats(games!);
  const topScorers = playerStats.toSorted(
    (a, b) => b.goalsFor - a.goalsFor,
  );

  return (
    <div>
      <h2>Top Scorers</h2>
      <ul className="flex max-w-fit flex-col gap-3">
        {topScorers.map(({goalsFor, player}) => (
          <li
            key={player.id}
            className="grid grid-cols-6 items-center gap-4 border-b py-4 px-4"
          >
            <Link className="col-span-4" href={`/players/${player.id}`}>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={player?.image_url ?? ""} />
                  <AvatarFallback>
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{player.name}</span>
              </div>
            </Link>
            <span className="col-span-2 text-center">
              {goalsFor}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}