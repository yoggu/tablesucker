"use client";
import { GameDetails, Player, Season } from "@/types/types";
import { useState, useTransition } from "react";
import { fetchGames } from "@/actions/game";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import GamesList from "./games-list";

type GamesLoadMoreProps = {
  initialGames: GameDetails[];
  season?: Season;
  player?: Player;
  initialOffset?: number;
  limit: number;
};

export default function GamesLoadMore({
  initialGames,
  season,
  player,
  initialOffset = 0,
  limit,
}: GamesLoadMoreProps) {
  const [isPending, startTransition] = useTransition();
  const [games, setGames] = useState<GameDetails[]>(initialGames);
  const [offset, setOffset] = useState<number>(initialOffset);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(
    initialGames.length === limit,
  );

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
      setGames((prevGames: GameDetails[]) => [...prevGames, ...games]);
      if (games.length < limit) {
        setShowLoadMore(false);
      }
    } else {
      setShowLoadMore(false);
    }
  }

  return (
    <>
      <GamesList games={games} />
      {showLoadMore && (
        <div className="mt-6 flex justify-center">
          {isPending ? (
            <Button disabled={isPending} variant={"outline"}>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading
            </Button>
          ) : (
            <Button
              variant={"outline"}
              onClick={() => {
                startTransition(() => {
                  loadMoreGames();
                });
              }}
            >
              Load More
            </Button>
          )}
        </div>
      )}
    </>
  );
}
