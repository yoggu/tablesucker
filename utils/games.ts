import {
  GameWithGamePlayer,
  GameStats,
  TEAM,
  PlayerStats,
} from "@/types/types";
import { createClient } from "./supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export function gameStats (gamesData: GameWithGamePlayer[]): GameStats[] {
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

export function calculatePlayerStats (games: GameStats[]) {
  const playerStats: Record<number, PlayerStats> = {};

  games.forEach((game) => {
    const winner = game.winner;
    const teamRedScore = game.teamRed.score;
    const teamBlueScore = game.teamBlue.score;

    game.teamRed.players.forEach((player) => {
      if (!playerStats[player.id]) {
        playerStats[player.id] = {
          player,
          games: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
        };
      }
      if (winner === TEAM.Red) {
        playerStats[player.id].wins += 1;
      }
      playerStats[player.id].games += 1;
      playerStats[player.id].goalsFor += teamRedScore;
      playerStats[player.id].goalsAgainst += teamBlueScore;
    });

    game.teamBlue.players.forEach((player) => {
      if (!playerStats[player.id]) {
        playerStats[player.id] = {
          player,
          games: 0,
          wins: 0,
          losses: 0,
          winRate: 0,
          goalsFor: 0,
          goalsAgainst: 0,
          goalDifference: 0,
        };
      }
      if (winner === TEAM.Blue) {
        playerStats[player.id].wins += 1;
      }
      playerStats[player.id].games += 1;
      playerStats[player.id].goalsFor += teamBlueScore;
      playerStats[player.id].goalsAgainst += teamRedScore;
    });
  });

  Object.keys(playerStats).forEach((key) => {
    const playerId = parseInt(key, 10);
    const stats = playerStats[playerId];

    if (stats) {
      stats.winRate =
        stats.games > 0 ? Math.round((stats.wins / stats.games) * 100) : 0;

      stats.goalDifference = stats.goalsFor - stats.goalsAgainst;
      stats.losses = stats.games - stats.wins;
    }
  });

  return Object.values(playerStats);
};
