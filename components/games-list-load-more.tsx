"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameStats, Player, Season, TEAM } from "@/types/types";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatDate } from "@/utils/utils";
import { useState } from "react";
import { fetchGames } from "@/actions/game";

type GamesListLoadMoreProps = {
  initialGames: GameStats[];
  season?: Season;
  player?: Player;
  initialOffset?: number;
  limit: number;
};

export default function GamesListLoadMore({
  initialGames,
  season,
  player,
  initialOffset = 0,
  limit,
}: GamesListLoadMoreProps) {
  const [games, setGames] = useState<GameStats[]>(initialGames);
  const [offset, setOffset] = useState<number>(initialOffset);

  async function loadMoreGames() {
    const newOffset = offset + limit;
    const { data: games, error: gamesError } = await fetchGames(
      season?.id,
      player?.id,
      newOffset,
      limit,
    );
    if (gamesError) throw gamesError;
    if (games?.length) {
      setOffset(newOffset);
      setGames((prevGames: GameStats[]) => [...prevGames, ...games]);
    }
  }

  return (
    <>
      <ul className="mx-auto mt-6 flex max-w-fit flex-col gap-6">
        {games?.map((game) => (
          <li
            key={game.id}
            className="flex justify-center gap-12 border-b px-4 py-4"
          >
            <div className="flex flex-col items-end">
              <div className="flex flex-col">
                <div className="h-7">
                  {game.winner === TEAM.Red && <Badge>Winner</Badge>}
                </div>
                <span>Team Red</span>
              </div>
              <ul className="mt-3 flex gap-2">
                {game.teamRed.players.map((player) => (
                  <li key={player.id}>
                    <Link href={`/players/${player.id}`}>
                      <Avatar>
                        <AvatarImage src={player?.image_url ?? ""} />
                        <AvatarFallback>
                          {player.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col items-center justify-end px-4">
              <span className="text-5xl">
                {game.teamRed.score}:{game.teamBlue.score}
              </span>
              <span className="mt-3 text-xs">{formatDate(game.createdAt)}</span>
            </div>
            <div className="flex flex-col">
              <div className="flex flex-col">
                <div className="h-7">
                  {game.winner === TEAM.Blue && <Badge>Winner</Badge>}
                </div>
                <span>Team Blue</span>
              </div>
              <ul className="mt-3 flex gap-2">
                {game.teamBlue.players.map((player) => (
                  <li key={player.id}>
                    <Link href={`/players/${player.id}`}>
                      <Avatar>
                        <AvatarImage src={player?.image_url ?? ""} />
                        <AvatarFallback>
                          {player.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex justify-center">
        <button
          className="rounded-md border px-4 py-2"
          onClick={loadMoreGames}
        >
          Load More
        </button>
      </div>
    </>
  );
}
