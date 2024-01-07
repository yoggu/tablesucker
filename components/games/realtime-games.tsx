"use client";
import { GameStats, Player, Season, TEAM } from "@/types/types";
import { useEffect, useState } from "react";
import { fetchGames } from "@/actions/game";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function RealtimeGames() {
  const router = useRouter();

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
            router.refresh();
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return <></>;
}
