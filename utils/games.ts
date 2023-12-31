import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import {
  GameWithGamePlayer,
  GameStats,
  TEAM,
  PlayerStats,
} from "@/types/types";

export async function getGamesBySeason(seasonId: number) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
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
    .eq("season_id", seasonId)
    .returns<GameWithGamePlayer[]>();

  if (error) return { data: null, error };

  const transformedData = gameStats(data);

  return { data: transformedData, error: null };
}

export const gameStats = (gamesData: GameWithGamePlayer[]): GameStats[] => {
  const gameStatsArray = gamesData.map((game) => {
    const teamRedPlayers = game.game_players
      .filter((gamePlayer) => gamePlayer.team === TEAM.Red)
      .map((gamePlayer) => gamePlayer.players);

    const teamBluePlayers = game.game_players
      .filter((gamePlayer) => gamePlayer.team === TEAM.Blue)
      .map((gamePlayer) => gamePlayer.players);

    return {
      id: game.id,
      createdAt: game.created_at,
      seasonId: game.season_id,
      winner: game.team_red_score > game.team_blue_score ? TEAM.Red : TEAM.Blue,
      teamRed: {
        score: game.team_red_score,
        players: teamRedPlayers,
      },
      teamBlue: {
        score: game.team_blue_score,
        players: teamBluePlayers,
      },
    };
  });

  return gameStatsArray.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
};

export const calculatePlayerStats = (games: GameStats[]) => {
  const playerStats: Record<number, PlayerStats> = {};

  games.forEach((game) => {
    const winner = game.winner;
    const teamRedScore = game.teamRed.score;
    const teamBlueScore = game.teamBlue.score;

    game.teamRed.players.forEach((player) => {
      if (!playerStats[player.id]) {
        playerStats[player.id] = {
          id: player.id,
          createdAt: player.created_at,
          imageUrl: player.image_url,
          name: player.name,
          winRate: 0,
          wins: 0,
          gamesPlayed: 0,
          goalsScored: 0,
          goalsConceded: 0,
        };
      }
      if (winner === TEAM.Red) {
        playerStats[player.id].wins += 1;
      }
      playerStats[player.id].gamesPlayed += 1;
      playerStats[player.id].goalsScored += teamRedScore;
      playerStats[player.id].goalsConceded += teamBlueScore;
    });

    game.teamBlue.players.forEach((player) => {
      if (!playerStats[player.id]) {
        playerStats[player.id] = {
          id: player.id,
          createdAt: player.created_at,
          imageUrl: player.image_url,
          name: player.name,
          winRate: 0,
          wins: 0,
          gamesPlayed: 0,
          goalsScored: 0,
          goalsConceded: 0,
        };
      }
      if (winner === TEAM.Blue) {
        playerStats[player.id].wins += 1;
      }
      playerStats[player.id].gamesPlayed += 1;
      playerStats[player.id].goalsScored += teamBlueScore;
      playerStats[player.id].goalsConceded += teamRedScore;
    });
  });

  Object.keys(playerStats).forEach((key) => {
    const playerId = parseInt(key, 10);
    const stats = playerStats[playerId];

    if (stats) {
      stats.winRate =
        stats.gamesPlayed > 0
          ? Math.round((stats.wins / stats.gamesPlayed) * 100)
          : 0;
    }
  });

  return Object.values(playerStats);
};

export async function getGamesByPlayerAndSeason(
  playerId: number,
  seasonId?: number,
) {
  const supabase = createClient(cookies());

  // Construct and execute the subquery to get game IDs
  let gameIdsQuery = supabase
    .from("game_players")
    .select("game_id")
    .eq("player_id", playerId);

  // If a seasonId is provided, filter games by seasonId
  if (seasonId !== undefined) {
    const gameIdsArray = await supabase
      .from("games")
      .select("id")
      .eq("season_id", seasonId)
      .then((response) => response.data?.map((game) => game.id) || []);
    gameIdsQuery = gameIdsQuery.in("game_id", gameIdsArray);
  }

  // Execute the subquery to get game IDs
  const { data: gameIdsData, error: gameIdsError } = await gameIdsQuery;
  if (gameIdsError || !gameIdsData) {
    console.error("Error fetching game IDs:", gameIdsError);
    return { data: null, error: gameIdsError };
  }

  // Extract game IDs from the query results
  const gameIds = gameIdsData.map((g) => g.game_id);

  // Fetch game details from games table based on the fetched game IDs
  const { data: gamesData, error: gamesError } = await supabase
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
    .in("id", gameIds)
    .returns<GameWithGamePlayer[]>();

  if (gamesError) {
    console.error("Error fetching games:", gamesError);
    return { data: null, error: gamesError };
  }

  const transformedData = gameStats(gamesData);

  return { data: transformedData, error: null };
}

export async function getGames(seasonId?: number, playerId?: number) {
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

  // Execute the query
  const { data, error } = await query.returns<GameWithGamePlayer[]>();

  console.log("data", data);
  if (error) return { data: null, error };

  const transformedData = gameStats(data);

  return { data: transformedData, error: null };
}
