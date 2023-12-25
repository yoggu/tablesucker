"use server";

import { GameFormSchema } from "@/utils/schema";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { Game, GamePlayer, TEAM } from "@/types/types";

type GameFormInputs = z.infer<typeof GameFormSchema>;
type InsertGame = Omit<Game, "id" | "created_at">;
type InsertGamePlayer = Omit<GamePlayer, "created_at">;

const cookieStore = cookies();
const supabase = createClient(cookieStore);

export async function createPlayer(inputData: GameFormInputs) {
  const parsed = GameFormSchema.safeParse(inputData);
  if (!parsed.success) return { data: null, error: parsed.error.flatten() };

  const gamesRows: InsertGame[] = [
    {
      season_id: parsed.data.season_id,
      team_red_score: parsed.data.team_red.score,
      team_blue_score: parsed.data.team_blue.score,
    },
  ];
  try {
    const { data: gameData, error: gameError } = await supabase
      .from("games")
      .insert(gamesRows)
      .select()
      .single();
    if (gameError) return { data: null, gameError };

    const gamePlayersRows: InsertGamePlayer[] = [
      ...parsed.data.team_red.players.map((player) => ({
        game_id: gameData.id,
        player_id: player,
        team: TEAM.Red,
      })),
      ...parsed.data.team_blue.players.map((player) => ({
        game_id: gameData.id,
        player_id: player,
        team: TEAM.Red,
      })),
    ];

    const { data: gamePlayerData, error: gamePlayerError } = await supabase
      .from("game_players")
      .insert(gamePlayersRows)
      .select();
    if (gamePlayerError) return { data: null, gamePlayerError };

    revalidatePath("/");
    return { gameData, error: null };
  } catch (error) {
    return { data: null, error };
  }

}
