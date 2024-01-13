"use server";

import { GameDetails } from "@/types/types";
import { GameFormSchema } from "@/lib/schema";
import { revalidateTag, unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";
import { createClient } from "../lib/supabase/server";

type GameFormInputs = z.infer<typeof GameFormSchema>;

export const getCachedGames = unstable_cache(
  async (
    seasonId?: number,
    playerId?: number,
    offset: number = 0,
    limit?: number,
  ) => getGames(seasonId, playerId, offset, limit),
  ["games"],
  {
    revalidate: 60,
    tags: ["games"],
  },
);

export const getCachedGamesCount = unstable_cache(
  async (seasonId?: number, playerId?: number) =>
    getGamesCount(seasonId, playerId),
  ["games"],
  {
    revalidate: 60,
    tags: ["games"],
  },
);

export async function createGame(inputData: GameFormInputs) {
  const supabase = createClient(cookies());
  const parsed = GameFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  try {
    const { data, error } = await supabase
      .rpc("create_game", {
        p_season_id: parseInt(parsed.data.season_id),
        p_team_red_players: parsed.data.team_red.players,
        p_team_red_score: parseInt(parsed.data.team_red.score),
        p_team_blue_players: parsed.data.team_blue.players,
        p_team_blue_score: parseInt(parsed.data.team_blue.score),
      })
      .single();

    if (error) return { data: null, error };

    revalidateTag("games");
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function updateGame(id: number, inputData: GameFormInputs) {
  const supabase = createClient(cookies());
  const parsed = GameFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  try {
    const { error } = await supabase.rpc("update_game", {
      p_game_id: id,
      p_season_id: parseInt(parsed.data.season_id),
      p_team_red_players: parsed.data.team_red.players,
      p_team_red_score: parseInt(parsed.data.team_red.score),
      p_team_blue_players: parsed.data.team_blue.players,
      p_team_blue_score: parseInt(parsed.data.team_blue.score),
    });

    revalidateTag("games");
    return { error };
  } catch (error) {
    return { data: null, error: error as Error };
  }
}

export async function getGames(
  seasonId?: number,
  playerId?: number,
  offset: number = 0,
  limit?: number,
) {
  const supabase = createClient(cookies());

  let query = supabase
    .from("game_details")
    .select("*")
    .order("created_at", { ascending: false });

  if (seasonId) {
    query = query.eq("season_id", seasonId);
  }

  if (playerId) {
    query = query.contains("player_ids", [playerId]);
  }

  if (limit) {
    query = query.range(offset, offset + limit - 1);
  }

  try {
    const { data, error } = await query.returns<GameDetails[]>();

    if (error) return { data: null, error };

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching games:", error);
    return { data: null, error: error as Error };
  }
}

export async function deleteGame(gameId: number) {
  const supabase = createClient(cookies());

  try {
    const { error } = await supabase.from("games").delete().eq("id", gameId);

    revalidateTag("games");
    return { error };
  } catch (error) {
    console.error("Error deleting game:", error);
    return { error: error as Error };
  }
}

export async function getGamesCount(seasonId?: number, playerId?: number) {
  const supabase = createClient(cookies());

  let query = supabase.from("game_details").select("*", { count: "exact" });

  if (seasonId) {
    query = query.eq("season_id", seasonId);
  }

  if (playerId) {
    query = query.contains("player_ids", [playerId]);
  }

  try {
    const { count, error } = await query;

    if (error) throw error;

    return { data: count, error: null };
  } catch (error) {
    console.error("Error fetching game count:", error);
    return { data: null, error: error as Error };
  }
}
