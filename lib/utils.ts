import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import {
  GameDetails,
  GameDetailsView,
  Player,
  PlayerStats,
  TeamEnum,
} from "@/types/types";

export function getPlayersStats(games: GameDetails[]) {
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

export function getWinRateOverTime(games: GameDetails[], player: Player) {
  return games
    .reverse()
    .reduce((acc: Array<{ game: number; wins: number }>, game, index) => {
      const isWin =
        game.winner === TeamEnum.Red
          ? game.team_red.player_ids.includes(player.id)
          : game.team_blue.player_ids.includes(player.id);
      const win = isWin ? 1 : 0;
      const previousWins = index > 0 ? acc[index - 1].wins : 0;

      acc.push({ game: index + 1, wins: win + previousWins });

      return acc;
    }, [])
    .map((game) => ({
      game: game.game,
      winrate: Math.round((game.wins / game.game) * 100),
    }));
}

export function transformGameDetail(gameDetail: GameDetailsView): GameDetails {
  return {
    id: gameDetail.id,
    created_at: gameDetail.created_at,
    season_id: gameDetail.season_id,
    winner: gameDetail.winner,
    player_ids: [
      ...gameDetail.team_red_player_ids,
      ...gameDetail.team_blue_player_ids,
    ],
    team_red: {
      player_ids: gameDetail.team_red_player_ids,
      score: gameDetail.team_red_score,
      players: gameDetail.team_red_players,
    },
    team_blue: {
      player_ids: gameDetail.team_blue_player_ids,
      score: gameDetail.team_blue_score,
      players: gameDetail.team_blue_players,
    },
  };
}

export function getNemesis(
  player: Player,
  games: GameDetails[],
): { id: number; winRate: number } {
  const opponents = games.reduce(
    (acc: Record<string, { played: number; won: number }>, game) => {
      const opposingTeam = game.team_red.player_ids.includes(player.id)
        ? TeamEnum.Blue
        : TeamEnum.Red;

      const playerHasWon = game.winner !== opposingTeam;

      game[opposingTeam].player_ids.forEach((id) => {
        if (!acc[id]) acc[id] = { played: 1, won: playerHasWon ? 1 : 0 };
        else {
          acc[id].played += 1;
          if (playerHasWon) acc[id].won += 1;
        }
      });
      return acc;
    },
    {},
  );

  const winRates = Object.keys(opponents).reduce((acc: any, id) => {
    acc[id] = Math.round((opponents[id].won / opponents[id].played) * 100);
    return acc;
  }, {});

  const nemesisId = Object.keys(winRates).reduce((a, b) => {
    return winRates[a] < winRates[b] ? a : b;
  });

  return { id: parseInt(nemesisId, 10), winRate: winRates[nemesisId] };
}

export function getBestTeamMate(
  player: Player,
  games: GameDetails[],
): { id: number; winRate: number } {
  const teamMates = games.reduce(
    (acc: Record<string, { played: number; won: number }>, game) => {
      const playerTeam = game.team_red.player_ids.includes(player.id)
        ? TeamEnum.Red
        : TeamEnum.Blue;

      const playerHasWon = game.winner === playerTeam;

      game[playerTeam].player_ids.forEach((id) => {
        if (!acc[id]) acc[id] = { played: 1, won: playerHasWon ? 1 : 0 };
        else {
          acc[id].played += 1;
          if (playerHasWon) acc[id].won += 1;
        }
      });
      return acc;
    },
    {},
  );

  const winRates = Object.keys(teamMates).reduce((acc: any, id) => {
    acc[id] = Math.round((teamMates[id].won / teamMates[id].played) * 100);
    return acc;
  }, {});

  const teamMateId = Object.keys(winRates).reduce((a, b) => {
    return winRates[a] > winRates[b] ? a : b;
  });

  return { id: parseInt(teamMateId, 10), winRate: winRates[teamMateId] };
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
