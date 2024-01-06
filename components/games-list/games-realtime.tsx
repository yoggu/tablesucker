"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GameStats, Player, Season, TEAM } from "@/types/types";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { formatDate } from "@/utils/utils";
import { useEffect, useState, useTransition } from "react";
import { fetchGames } from "@/actions/game";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import PlayerAvatar from "../ui/player-avatar";
import { createClient } from "@/utils/supabase/client";

type GamesRealtimeProps = {
  initialGames: GameStats[];
  season?: Season;
  player?: Player;
  initialOffset?: number;
  limit?: number;
};

export default function GamesRealtime({
  initialGames,
  season,
  player,
  limit,
}: GamesRealtimeProps) {
  const [games, setGames] = useState<GameStats[]>(initialGames);

  async function loadGames() {
    const { data: gamesData, error: gamesError } = await fetchGames(
      season?.id,
      player?.id,
      0,
      limit,
    );
    if (gamesError) throw gamesError;
    if (gamesData?.length) {
      setGames(gamesData);
    }
  }

  useEffect(() => {
    const supabase = createClient();
    const channel = supabase
      .channel("realtime_games")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "games",
        },
        (payload) => {
          if (!payload.errors) {
            loadGames();
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <>
      <ul className="mx-auto flex max-w-fit flex-col gap-6">
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
                      <PlayerAvatar player={player} />
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
                      <PlayerAvatar player={player} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
