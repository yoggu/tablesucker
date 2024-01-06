"use client";
import { GameStats, Player, Season, TEAM } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchGames } from "@/actions/game";

import { createClient } from "@/utils/supabase/client";
import WinRateList from "./win-rate-list";

type RealtimeWinRateProps = {
  initialGames: GameStats[];
  season?: Season;
  player?: Player;
  initialOffset?: number;
  limit?: number;
};

export default function RealtimeWinRate({
  initialGames,
  season,
  player,
  limit,
}: RealtimeWinRateProps) {
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
      .channel("realtime_win_rate")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "games",
        },
        (payload) => {
          console.log("realtime_win_rate", payload);
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

  return <WinRateList games={games} />;
}
