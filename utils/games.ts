import { cookies } from 'next/headers';
import { createClient } from './supabase/server';
import { TransformedGame, ExtendedGamePlayers, TEAM } from '@/types/types';

export const cookieStore = cookies();
export const supabase = createClient(cookieStore);

export async function getGamesBySeason(seasonId: number) {
  const { data, error } = await supabase
    .from('game_players')
    .select(`
      *,
      games (
        *,
        seasons (id)
      ),
      players (*)
    `)
    .eq('games.season_id', seasonId);

  if (error) return { data: null, error };

  const transformedData = transformGameData(data as ExtendedGamePlayers[]);

  return { data: transformedData, error: null };
}

export const transformGameData = (gamePlayers: ExtendedGamePlayers[]): TransformedGame[] => {
  const games: Record<number, TransformedGame> = {};

  gamePlayers.forEach((gamePlayer) => {
    const gameId = gamePlayer.games.id;
    if (!games[gameId]) {
      games[gameId] = {
        id: gameId,
        createdAt: gamePlayer.games.created_at,
        seasonId: gamePlayer.games.season_id,
        winner: gamePlayer.games.team_red_score > gamePlayer.games.team_blue_score ? TEAM.Red : TEAM.Blue,
        teamRed: {
          score: gamePlayer.games.team_red_score,
          players: [],
        },
        teamBlue: {
          score: gamePlayer.games.team_blue_score,
          players: [],
        }
      };
    }

    const teamKey = gamePlayer.team === TEAM.Red ? 'teamRed' : 'teamBlue';
    games[gameId][teamKey].players.push(gamePlayer.players);
  });

  return Object.values(games).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};



export async function getGamesByPlayer() {
  const { data, error } = await supabase.from("games").select("*");
  return { data, error };
}
