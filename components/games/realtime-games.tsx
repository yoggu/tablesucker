"use client";
import { GameStats, Player, Season, TEAM } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchGames } from "@/actions/game";

import { createClient } from "@/utils/supabase/client";
import GamesList from "./games-list";

type RealtimeGamesProps = {
  initialGames: GameStats[];
  season?: Season;
  player?: Player;
  initialOffset?: number;
  limit?: number;
};

export default function RealtimeGames({
  initialGames,
  season,
  player,
  limit,
}: RealtimeGamesProps) {
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

  return <GamesList games={games} />;
}
