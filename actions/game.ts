"use server";

import { GameFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { Game, GameDetails, GamePlayer, TEAM } from "@/types/types";

type GameFormInputs = z.infer<typeof GameFormSchema>;
type InsertGame = Omit<Game, "id" | "created_at">;
type InsertGamePlayer = Omit<GamePlayer, "created_at">;

export async function createGame(inputData: GameFormInputs) {
  const supabase = createClient(cookies());
  const parsed = GameFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const gamesRows: InsertGame[] = [
    {
      season_id: parseInt(parsed.data.season_id),
      team_red_score: parseInt(parsed.data.team_red.score),
      team_blue_score: parseInt(parsed.data.team_blue.score),
    },
  ];
  try {
    const { data: gameData, error: gameError } = await supabase
      .from("games")
      .insert(gamesRows)
      .select()
      .single();
    if (gameError) return { data: null, error: gameError };

    const gamePlayersRows: InsertGamePlayer[] = [
      ...parsed.data.team_red.players.map((player) => ({
        game_id: gameData.id,
        player_id: player,
        team: TEAM.Red,
      })),
      ...parsed.data.team_blue.players.map((player) => ({
        game_id: gameData.id,
        player_id: player,
        team: TEAM.Blue,
      })),
    ];
    const { data: gamePlayerData, error: gamePlayerError } = await supabase
      .from("game_players")
      .insert(gamePlayersRows)
      .select();

    if (gamePlayerError) {
      await supabase.from("games").delete().match({ id: gameData.id });

      return { data: null, error: gamePlayerError };
    }
    return { data: gameData, error: null };
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
