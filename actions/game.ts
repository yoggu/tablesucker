"use server";

import { GameFormSchema } from "@/lib/schema";
import { transformGameDetail } from "@/lib/utils";
import { GameDetails, GameDetailsView } from "@/types/types";
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
  ["games_count"],
  {
    revalidate: 60,
    tags: ["games"],
  },
);

export async function createGame(inputData: GameFormInputs) {
  const supabase = createClient(cookies());
  const parsed = GameFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const { data, error } = await supabase
    .rpc("create_game", {
      p_season_id: parsed.data.season_id,
      p_team_red_players: parsed.data.team_red.players,
      p_team_red_score: parsed.data.team_red.score,
      p_team_blue_players: parsed.data.team_blue.players,
      p_team_blue_score: parsed.data.team_blue.score,
    })
    .single();

  if (!error) {
    revalidateTag("games");
  }

  return { data, error };
}

export async function updateGame(id: number, inputData: GameFormInputs) {
  const supabase = createClient(cookies());
  const parsed = GameFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };
  const { error } = await supabase.rpc("update_game", {
    p_game_id: id,
    p_season_id: parsed.data.season_id,
    p_team_red_players: parsed.data.team_red.players,
    p_team_red_score: parsed.data.team_red.score,
    p_team_blue_players: parsed.data.team_blue.players,
    p_team_blue_score: parsed.data.team_blue.score,
  });

  if (!error) {
    revalidateTag("games");
  }
  return { error };
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
    query = query.or(
      `team_red_player_ids.cs.{${playerId}},team_blue_player_ids.cs.{${playerId}}`,
    );
  }

  if (limit) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error } = await query.returns<GameDetailsView[]>();
  if (error) return { data, error };

  const gameDetails: GameDetails[] = data.map((game) =>
    transformGameDetail(game),
  );
  return { data: gameDetails, error: null };
}

export async function deleteGame(gameId: number) {
  const supabase = createClient(cookies());

  const { error } = await supabase.from("games").delete().eq("id", gameId);

  if (!error) {
    revalidateTag("games");
  }
  return { error };
}

export async function getGamesCount(seasonId?: number, playerId?: number) {
  const supabase = createClient(cookies());

  let query = supabase.from("game_details").select("*", { count: "exact" });

  if (seasonId) {
    query = query.eq("season_id", seasonId);
  }

  if (playerId) {
    query = query.or(
      `team_red_player_ids.cs.{${playerId}},team_blue_player_ids.cs.{${playerId}}`,
    );
  }

  const { count, error } = await query.returns<{ count: number }>();
  return { data: count, error };
}
