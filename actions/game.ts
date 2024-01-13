"use server";

import { GameFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { GameDetails } from "@/types/types";
import { revalidateTag } from "next/cache";

type GameFormInputs = z.infer<typeof GameFormSchema>;

export async function createGame(inputData: GameFormInputs) {
  const supabase = createClient(cookies());
  const parsed = GameFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  try {
    const { data, error } = await supabase
      .rpc("create_game", {
        season_id: parseInt(parsed.data.season_id),
        team_red_players: parsed.data.team_red.players,
        team_red_score: parseInt(parsed.data.team_red.score),
        team_blue_players: parsed.data.team_blue.players,
        team_blue_score: parseInt(parsed.data.team_blue.score),
      })
      .single();

    if (error) return { data: null, error };

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchGames(
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
