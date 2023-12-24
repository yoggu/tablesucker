import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameStats, PlayerStats, TEAM } from "@/types/types";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatDate } from "@/utils/utils";

type WinRateListProps = {
  players: PlayerStats[];
};

export default function WinRateList({ players }: WinRateListProps) {
  return (
    <div>
      <h2>Win Rate</h2>
      <ul className="flex max-w-fit flex-col gap-3">
        {players.map((player) => (
          <li
            key={player.id}
            className="grid grid-cols-6 items-center gap-4 border-b py-4 px-4"
          >
            <Link className="col-span-4" href={`/players/${player.id}`}>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={player?.imageUrl ?? ""} />
                  <AvatarFallback>
                    {player.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span>{player.name}</span>
              </div>
            </Link>
            <span className="col-span-2 text-center">
              {player.winRate * 100}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
