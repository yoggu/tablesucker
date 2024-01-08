import { Tables } from "./supabase";

export type Game = Tables<"games">;

export type GamePlayer = Tables<"game_players">;

export type Player = Tables<"players">;

export type Season = Tables<"seasons">;

export interface GameDetails extends Tables<"game_details"> {
  id: number;
  created_at: string;
  player_ids: number[];
  season_id: number;
  winner: TEAM;
  team_red: {
    score: number;
    players: Player[];
  };
  team_blue: {
    score: number;
    players: Player[];
  };
}

export enum TEAM {
  Red = "team_red",
  Blue = "team_blue",
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
  player: Player;
  games: number;
  wins: number;
  losses: number;
  winRate: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
}
