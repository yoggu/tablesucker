import { test, expect } from '@playwright/test';
import {
  getPlayersStats,
  getWinRateOverTime,
  getAllPlayersWinRateOverTime,
  transformGameDetail,
  getNemesis,
  getBestTeamMate,
  formatDate,
  transformDateToUTC,
} from '../lib/utils';
import { GameDetails, Player, TeamEnum, GameDetailsView } from '../types/types';

// Mock data
const mockPlayer1: Player = {
  id: 1,
  name: 'Alice',
  created_at: '2024-01-01',
  image_url: null,
  is_archived: false,
};
const mockPlayer2: Player = {
  id: 2,
  name: 'Bob',
  created_at: '2024-01-01',
  image_url: null,
  is_archived: false,
};
const mockPlayer3: Player = {
  id: 3,
  name: 'Charlie',
  created_at: '2024-01-01',
  image_url: null,
  is_archived: false,
};
const mockPlayer4: Player = {
  id: 4,
  name: 'Diana',
  created_at: '2024-01-01',
  image_url: null,
  is_archived: false,
};

const createMockGame = (
  id: number,
  redPlayers: Player[],
  bluePlayers: Player[],
  redScore: number,
  blueScore: number,
  createdAt: string = '2024-01-01T12:00:00Z'
): GameDetails => ({
  id,
  created_at: createdAt,
  season_id: 1,
  winner: redScore > blueScore ? TeamEnum.Red : TeamEnum.Blue,
  player_ids: [...redPlayers.map((p) => p.id), ...bluePlayers.map((p) => p.id)],
  team_red: {
    player_ids: redPlayers.map((p) => p.id),
    score: redScore,
    players: redPlayers,
  },
  team_blue: {
    player_ids: bluePlayers.map((p) => p.id),
    score: blueScore,
    players: bluePlayers,
  },
});

test.describe('getPlayersStats', () => {
  test('calculates correct stats for single game', () => {
    const games = [createMockGame(1, [mockPlayer1], [mockPlayer2], 10, 5)];
    const stats = getPlayersStats(games);

    const player1Stats = stats.find((s) => s.player.id === 1);
    const player2Stats = stats.find((s) => s.player.id === 2);

    expect(player1Stats?.wins).toBe(1);
    expect(player1Stats?.losses).toBe(0);
    expect(player1Stats?.winRate).toBe(100);
    expect(player1Stats?.goalsFor).toBe(10);
    expect(player1Stats?.goalsAgainst).toBe(5);
    expect(player1Stats?.goalDifference).toBe(5);

    expect(player2Stats?.wins).toBe(0);
    expect(player2Stats?.losses).toBe(1);
    expect(player2Stats?.winRate).toBe(0);
  });

  test('calculates correct stats for multiple games', () => {
    const games = [
      createMockGame(1, [mockPlayer1], [mockPlayer2], 10, 5),
      createMockGame(2, [mockPlayer2], [mockPlayer1], 8, 6),
      createMockGame(3, [mockPlayer1], [mockPlayer2], 7, 3),
    ];
    const stats = getPlayersStats(games);

    const player1Stats = stats.find((s) => s.player.id === 1);
    expect(player1Stats?.games).toBe(3);
    expect(player1Stats?.wins).toBe(2);
    expect(player1Stats?.losses).toBe(1);
    expect(player1Stats?.winRate).toBe(67); // 2/3 = 66.67% rounded
  });

  test('handles empty games array', () => {
    const stats = getPlayersStats([]);
    expect(stats).toEqual([]);
  });

  test('handles team games with multiple players', () => {
    const games = [
      createMockGame(
        1,
        [mockPlayer1, mockPlayer2],
        [mockPlayer3, mockPlayer4],
        10,
        5
      ),
    ];
    const stats = getPlayersStats(games);

    expect(stats.find((s) => s.player.id === 1)?.wins).toBe(1);
    expect(stats.find((s) => s.player.id === 2)?.wins).toBe(1);
    expect(stats.find((s) => s.player.id === 3)?.wins).toBe(0);
    expect(stats.find((s) => s.player.id === 4)?.wins).toBe(0);
  });
});

test.describe('getWinRateOverTime', () => {
  test('calculates cumulative win rate', () => {
    const games = [
      createMockGame(1, [mockPlayer1], [mockPlayer2], 10, 5, '2024-01-01'),
      createMockGame(2, [mockPlayer1], [mockPlayer2], 5, 10, '2024-01-02'),
      createMockGame(3, [mockPlayer1], [mockPlayer2], 10, 5, '2024-01-03'),
    ];
    const result = getWinRateOverTime(games, mockPlayer1);

    expect(result[0].winrate).toBe(100); // 1/1
    expect(result[1].winrate).toBe(50); // 1/2
    expect(result[2].winrate).toBe(67); // 2/3
  });

  test('handles player with all losses', () => {
    const games = [
      createMockGame(1, [mockPlayer2], [mockPlayer1], 10, 5),
      createMockGame(2, [mockPlayer2], [mockPlayer1], 10, 5),
    ];
    const result = getWinRateOverTime(games, mockPlayer1);

    expect(result.every((r) => r.winrate === 0)).toBe(true);
  });

  test('handles player with all wins', () => {
    const games = [
      createMockGame(1, [mockPlayer1], [mockPlayer2], 10, 5),
      createMockGame(2, [mockPlayer1], [mockPlayer2], 10, 5),
    ];
    const result = getWinRateOverTime(games, mockPlayer1);

    expect(result.every((r) => r.winrate === 100)).toBe(true);
  });
});

test.describe('getAllPlayersWinRateOverTime', () => {
  test('tracks all players win rates over time', () => {
    const games = [
      createMockGame(1, [mockPlayer1], [mockPlayer2], 10, 5, '2024-01-01'),
      createMockGame(2, [mockPlayer1], [mockPlayer2], 5, 10, '2024-01-02'),
    ];
    const { data, players } = getAllPlayersWinRateOverTime(games);

    expect(players.length).toBe(2);
    expect(data.length).toBe(2);
    expect(data[0][`player_${mockPlayer1.id}`]).toBe(100);
    expect(data[1][`player_${mockPlayer1.id}`]).toBe(50);
  });

  test('handles empty games', () => {
    const { data, players } = getAllPlayersWinRateOverTime([]);
    expect(data).toEqual([]);
    expect(players).toEqual([]);
  });
});

test.describe('getNemesis', () => {
  test('finds opponent with lowest win rate against', () => {
    const games = [
      // Player1 loses to Player2
      createMockGame(1, [mockPlayer2], [mockPlayer1], 10, 5),
      createMockGame(2, [mockPlayer2], [mockPlayer1], 10, 5),
      // Player1 beats Player3
      createMockGame(3, [mockPlayer1], [mockPlayer3], 10, 5),
    ];
    const result = getNemesis(mockPlayer1, games);

    expect(result.id).toBe(2); // Player2 is nemesis
    expect(result.winRate).toBe(0); // 0% win rate against Player2
  });

  test('calculates correct win rate percentages', () => {
    const games = [
      createMockGame(1, [mockPlayer1], [mockPlayer2], 10, 5),
      createMockGame(2, [mockPlayer2], [mockPlayer1], 10, 5),
      createMockGame(3, [mockPlayer1], [mockPlayer2], 10, 5),
    ];
    const result = getNemesis(mockPlayer1, games);

    expect(result.id).toBe(2);
    expect(result.winRate).toBe(67); // 2/3 wins
  });
});

test.describe('getBestTeamMate', () => {
  test('finds teammate with highest win rate together', () => {
    const games = [
      // Player1 + Player2 win together
      createMockGame(
        1,
        [mockPlayer1, mockPlayer2],
        [mockPlayer3, mockPlayer4],
        10,
        5
      ),
      createMockGame(
        2,
        [mockPlayer1, mockPlayer2],
        [mockPlayer3, mockPlayer4],
        10,
        5
      ),
      // Player1 + Player3 lose together
      createMockGame(
        3,
        [mockPlayer1, mockPlayer3],
        [mockPlayer2, mockPlayer4],
        5,
        10
      ),
    ];
    const result = getBestTeamMate(mockPlayer1, games);

    expect(result.id).toBe(2); // Player2 is best teammate
    expect(result.winRate).toBe(100); // 100% win rate with Player2
  });

  test('calculates correct win rate percentages', () => {
    const games = [
      createMockGame(
        1,
        [mockPlayer1, mockPlayer2],
        [mockPlayer3, mockPlayer4],
        10,
        5
      ),
      createMockGame(
        2,
        [mockPlayer1, mockPlayer2],
        [mockPlayer3, mockPlayer4],
        5,
        10
      ),
      createMockGame(
        3,
        [mockPlayer1, mockPlayer2],
        [mockPlayer3, mockPlayer4],
        10,
        5
      ),
    ];
    const result = getBestTeamMate(mockPlayer1, games);

    expect(result.id).toBe(2);
    expect(result.winRate).toBe(67); // 2/3 wins
  });
});

test.describe('transformGameDetail', () => {
  test('transforms GameDetailsView to GameDetails', () => {
    const view = {
      id: 1,
      created_at: '2024-01-01T12:00:00Z',
      season_id: 1,
      winner: 'team_red' as const,
      team_red_player_ids: [1, 2],
      team_red_players: [mockPlayer1, mockPlayer2],
      team_red_score: 10,
      team_blue_player_ids: [3, 4],
      team_blue_players: [mockPlayer3, mockPlayer4],
      team_blue_score: 5,
    };

    const result = transformGameDetail(view as GameDetailsView);

    expect(result.id).toBe(1);
    expect(result.team_red.player_ids).toEqual([1, 2]);
    expect(result.team_blue.player_ids).toEqual([3, 4]);
    expect(result.player_ids).toEqual([1, 2, 3, 4]);
  });
});

test.describe('formatDate', () => {
  test('formats date string to locale format', () => {
    const result = formatDate('2024-01-15T12:00:00Z');
    // Result depends on locale, just check it's a non-empty string
    expect(typeof result).toBe('string');
    expect(result.length).toBeGreaterThan(0);
  });
});

test.describe('transformDateToUTC', () => {
  test('transforms date to UTC midnight', () => {
    const date = new Date(2024, 0, 15, 12, 30, 0); // Jan 15, 2024 12:30:00 local
    const result = transformDateToUTC(date);

    expect(result.getUTCFullYear()).toBe(2024);
    expect(result.getUTCMonth()).toBe(0);
    expect(result.getUTCDate()).toBe(15);
    expect(result.getUTCHours()).toBe(0);
    expect(result.getUTCMinutes()).toBe(0);
  });
});
