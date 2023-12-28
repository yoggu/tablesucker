import { Tables } from "./supabase";

export type Game = Tables<"games">;

export type GamePlayer = Tables<"game_players">;

export type Player = Tables<"players">;

export type Season = Tables<"seasons">;

export interface GamePlayersWithPlayer extends GamePlayer {
  players: Player;
}

export interface GameWithGamePlayer extends Game {
  game_players: GamePlayersWithPlayer[];
}

export enum TEAM {
  Red = 'team_red',
  Blue = 'team_blue'
}

export interface GameStats {
  id: number;
  createdAt: string;
  seasonId: number;
  winner: TEAM;
  teamRed: {
    score: number;
    players: Player[];
  };
  teamBlue: {
    score: number;
    players: Player[];
  };
}

export interface PlayerStats {
  id: number;
  createdAt: string;
  imageUrl: string | null;
  name: string;
  winRate: number;
  wins: number;
  gamesPlayed: number;
  goalsScored: number;
  goalsConceded: number;
}
