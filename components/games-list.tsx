import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Player, Season, TEAM } from "@/types/types";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatDate } from "@/utils/utils";
import { fetchGames } from "@/actions/game";
import GamesListLoadMore from "./games-list-load-more";

type GameListProps = {
  season?: Season;
  player?: Player;
  offset?: number;
  limit?: number;
};

export default async function GamesList({ season, player, offset, limit }: GameListProps) {
  const { data: games, error: gamesError } = await fetchGames(season?.id, player?.id, offset, limit);
  if (gamesError) throw gamesError;

  return (
    <GamesListLoadMore initialGames={games!} season={season} player={player} limit={limit ?? 10} />
    // <ul className="mx-auto mt-6 flex max-w-fit flex-col gap-6">
    //   { {games?.map((game) => (
    //     <li key={game.id} className="flex border-b py-4 px-4 justify-center gap-12">
    //       <div className="flex flex-col items-end">
    //         <div className="flex flex-col">
    //           <div className="h-7">{game.winner === TEAM.Red && <Badge>Winner</Badge>}</div>
    //           <span>Team Red</span>
    //         </div>
    //         <ul className="flex gap-2 mt-3">
    //           {game.teamRed.players.map((player) => (
    //             <li key={player.id}>
    //               <Link href={`/players/${player.id}`}>
    //                 <Avatar>
    //                   <AvatarImage src={player?.image_url ?? ""} />
    //                   <AvatarFallback>
    //                     {player.name.slice(0, 2).toUpperCase()}
    //                   </AvatarFallback>
    //                 </Avatar>
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //       <div className="flex flex-col px-4 justify-end items-center">
    //         <span className="text-5xl">
    //           {game.teamRed.score}:{game.teamBlue.score}
    //         </span>
    //         <span className="text-xs mt-3">
    //           {formatDate(game.createdAt)}
    //         </span>
    //       </div>
    //       <div className="flex flex-col">
    //         <div className="flex flex-col">
    //           <div className="h-7">{game.winner === TEAM.Blue && <Badge>Winner</Badge>}</div>
    //           <span>Team Blue</span>
    //         </div>
    //         <ul className="flex gap-2 mt-3">
    //           {game.teamBlue.players.map((player) => (
    //             <li key={player.id}>
    //               <Link href={`/players/${player.id}`}>
    //                 <Avatar>
    //                   <AvatarImage src={player?.image_url ?? ""} />
    //                   <AvatarFallback>
    //                     {player.name.slice(0, 2).toUpperCase()}
    //                   </AvatarFallback>
    //                 </Avatar>
    //               </Link>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     </li>
    //   ))} </ul>
  );
}
