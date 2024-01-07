import { GameStats, TEAM } from "@/types/types";
import { formatDate } from "@/utils/utils";
import PlayerAvatar from "@/components/ui/player-avatar";
import { Award } from "lucide-react";

type GameListProps = {
  games: GameStats[];
};

export default function GamesList({ games }: GameListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {games?.map((game) => (
        <li
          key={game.id}
          className="grid grid-cols-[minmax(80px,1fr)_minmax(0,100px)_minmax(80px,1fr)] gap-2 sm:gap-4 border-b pb-4 last:border-0 last:pb-0 md:gap-8 xl:gap-12 dark:border-slate-700"
        >
          <div className="flex flex-col gap-3">
            <div className="flex justify-end ">
              <span className="relative">
                Team Red
                {game.winner === TEAM.Red && (
                  <Award className="absolute -left-6 top-0 size-5 sm:-left-8 sm:size-6" />
                )}
              </span>
            </div>
            <ul className="flex flex-wrap justify-end gap-3">
              {game.teamRed.players.map((player) => (
                <li key={player.id}>
                  <PlayerAvatar player={player} link />
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center justify-end">
            <span className="text-4xl lg:text-5xl">
              {game.teamRed.score}:{game.teamBlue.score}
            </span>
            <span className="mt-3 text-xs">{formatDate(game.createdAt)}</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex">
              <span className="relative">
                Team Blue
                {game.winner === TEAM.Blue && (
                  <Award className="absolute -right-6 top-0 size-5 sm:-right-8 sm:size-6" />
                )}
              </span>
            </div>
            <ul className="flex flex-wrap gap-3">
              {game.teamBlue.players.map((player) => (
                <li key={player.id}>
                  <PlayerAvatar player={player} link />
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
