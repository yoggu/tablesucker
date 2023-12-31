"use server";

import { GameFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Game, GamePlayer, GameWithGamePlayer, TEAM } from "@/types/types";
import { gameStats } from "@/utils/games";

type GameFormInputs = z.infer<typeof GameFormSchema>;
type InsertGame = Omit<Game, "id" | "created_at">;
type InsertGamePlayer = Omit<GamePlayer, "created_at">;

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function createGame(inputData: GameFormInputs) {
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
      await supabase
        .from("games")
        .delete()
        .match({ id: gameData.id });

      return { data: null, error: gamePlayerError };
    }

    revalidatePath("/");
    return { data: gameData, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function fetchGames(seasonId?: number, playerId?: number, offset: number = 0, limit?: number) {
  const supabase = createClient(cookies());

  // Construct the base query
  let query = supabase.from("games").select(`
    *,
    game_players!inner (
      *,
      players (*)
    )
  `);

  // If a playerId is provided, get game IDs for games the player participated in
  if (playerId !== undefined) {
    const { data: gameIdsData, error: gameIdsError } = await supabase
      .from("game_players")
      .select("game_id")
      .eq("player_id", playerId);
    if (gameIdsError || !gameIdsData) {
      console.error("Error fetching game IDs:", gameIdsError);
      return { data: null, error: gameIdsError };
    }
    const gameIds = gameIdsData.map(({ game_id }) => game_id);
    query = query.in("id", gameIds);
  }

  // If a seasonId is provided, filter games by seasonId
  if (seasonId !== undefined) {
    query = query.eq("season_id", seasonId);
  }

  console.log("limit", limit, "offset", offset);
  // Apply range for pagination after all filters
  if (limit !== undefined) {
    query = query.range(offset, offset + limit - 1);
  }

  // Execute the query
  const { data, error } = await query.returns<GameWithGamePlayer[]>();

  if (error) return { data: null, error };

  const transformedData = gameStats(data);

  return { data: transformedData, error: null };
}
