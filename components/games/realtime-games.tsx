"use client";
import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";
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
          event: "*",
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
