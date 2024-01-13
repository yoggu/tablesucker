"use client";
import { getCachedGames } from "@/actions/game";
import { GameDetails, Player, SeasonWithState } from "@/types/types";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { Button } from "../ui/button";
import GamesList from "./games-list";

type GamesLoadMoreProps = {
  initialGames: GameDetails[];
  gamesCount: number;
  season?: SeasonWithState;
  player?: Player;
  initialOffset?: number;
  limit: number;
  user?: User | null;
  seasons?: SeasonWithState[] | null;
  players?: Player[] | null;
};

export default function GamesLoadMore({
  initialGames,
  gamesCount,
  season,
  player,
  initialOffset = 0,
  limit,
  user,
  seasons,
  players,
}: GamesLoadMoreProps) {
  const [isPending, startTransition] = useTransition();
  const [games, setGames] = useState<GameDetails[]>(initialGames);
  const [offset, setOffset] = useState<number>(initialOffset);
  const [showLoadMore, setShowLoadMore] = useState<boolean>(false);

  useEffect(() => {
    setShowLoadMore(games.length < gamesCount);
  }, [games]);

  async function loadMoreGames() {
    const newOffset = offset + limit;
    const { data: moreGames, error: gamesError } = await getCachedGames(
      season?.id,
      player?.id,
      newOffset,
      limit,
    );
    if (gamesError) throw gamesError;
    setOffset(newOffset);
    setGames((prevGames: GameDetails[]) => [...prevGames, ...moreGames]);
  }

  return (
    <>
      <GamesList
        seasons={seasons}
        players={players}
        games={games}
        user={user}
      />
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
