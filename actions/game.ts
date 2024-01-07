"use server";

import { GameFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { Game, GamePlayer, GameWithGamePlayer, TEAM } from "@/types/types";
import { gameStats } from "@/utils/games";

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
    .from("games")
    .select(
      `
    *,
    game_players!inner (
      *,
      players (*)
    )
  `,
    )
    .order("created_at", { ascending: false });

  if (playerId) {
    query = query.eq("game_players.player_id", playerId);
  }

  if (seasonId) {
    query = query.eq("season_id", seasonId);
  }

  if (limit) {
    query = query.range(offset, offset + limit - 1);
  }

  const { data, error } = await query.returns<GameWithGamePlayer[]>();

  if (error) return { data: null, error };

  const transformedData = gameStats(data);

  return { data: transformedData, error: null };
}

export async function getNumberOfGames(seasonId?: number, playerId?: number) {
  const supabase = createClient(cookies());

  let query = supabase
    .from("games")
    .select(
      `
    id,
    game_players!inner (
      *,
      players (*)
    )
  `,
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (seasonId) {
    query = query.eq("season_id", seasonId);
  }

  if (playerId) {
    query = query.eq("game_players.player_id", playerId);
  }

  try {
    const { data, error, count } = await query;

    if (error) throw error;

    return { data: count, error: null };
  } catch (error) {
    console.error("Error fetching game count:", error);
    return { data: null, error };
  }
}
