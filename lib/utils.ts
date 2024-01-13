import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { TeamEnum, PlayerStats, GameDetails } from "@/types/types";

export function calculatePlayerStats(games: GameDetails[]) {
  const playerStats: Record<number, PlayerStats> = {};

  games.forEach((game) => {
    const winner = game.winner;
    const teamRedScore = game.team_red.score;
    const teamBlueScore = game.team_blue.score;

    game.team_red.players.forEach((player) => {
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
      if (winner === TeamEnum.Red) {
        playerStats[player.id].wins += 1;
      }
      playerStats[player.id].games += 1;
      playerStats[player.id].goalsFor += teamRedScore;
      playerStats[player.id].goalsAgainst += teamBlueScore;
    });

    game.team_blue.players.forEach((player) => {
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
      if (winner === TeamEnum.Blue) {
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
}

export function isCompletedSeason(dateString: string | null) {
  if (!dateString) return false;

  const endDate = new Date(dateString);
  const today = transformDateToUTC(new Date())

  return endDate < today;
}

export function isUpcomingSeason(dateString: string) {
  const date = new Date(dateString);
  const today = transformDateToUTC(new Date());
  return date > today;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const locale =
    typeof navigator !== "undefined" ? navigator.language : "de-CH";
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
};

export const transformDateToUTC = (date: Date) => {
  return new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
};
