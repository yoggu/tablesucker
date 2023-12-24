import { cookies } from "next/headers";
import { createClient } from "./supabase/server";
import {
  GameStats,
  ExtendedGamePlayers,
  TEAM,
  PlayerStats,
} from "@/types/types";

export async function getGamesBySeason(seasonId: number) {
  const supabase = createClient(cookies());
  const { data, error } = await supabase
    .from("game_players")
    .select(
      `
      *,
      games (
        *,
        seasons (id)
      ),
      players (*)
    `,
    )
    .eq("games.season_id", seasonId).returns<ExtendedGamePlayers[]>();

  if (error) return { data: null, error };

  const transformedData = gameStats(data);

  return { data: transformedData, error: null };
}

export const gameStats = (gamePlayers: ExtendedGamePlayers[]): GameStats[] => {
  const gameStats: Record<number, GameStats> = {};

  gamePlayers.forEach((gamePlayer) => {
    const gameId = gamePlayer.games.id;
    if (!gameStats[gameId]) {
      gameStats[gameId] = {
        id: gameId,
        createdAt: gamePlayer.games.created_at,
        seasonId: gamePlayer.games.season_id,
        winner:
          gamePlayer.games.team_red_score > gamePlayer.games.team_blue_score
            ? TEAM.Red
            : TEAM.Blue,
        teamRed: {
          score: gamePlayer.games.team_red_score,
          players: [],
        },
        teamBlue: {
          score: gamePlayer.games.team_blue_score,
          players: [],
        },
      };
    }

    const teamKey = gamePlayer.team === TEAM.Red ? "teamRed" : "teamBlue";
    gameStats[gameId][teamKey].players.push(gamePlayer.players);
  });

  return Object.values(gameStats).sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
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
    const playerId = parseInt(key, 10); // Convert key to a number
    const stats = playerStats[playerId];

    if (stats) {
      stats.winRate = stats.gamesPlayed > 0 ? stats.wins / stats.gamesPlayed : 0;
    }
  });


  return Object.values(playerStats);
};

export async function getGamesByPlayer() {
  const supabase = createClient(cookies());
  const { data, error } = await supabase.from("games").select("*");
  return { data, error };
}
