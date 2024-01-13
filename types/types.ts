import { Tables, Enums } from "./supabase";

export type Game = Tables<"games">;

export type GamePlayer = Tables<"game_players">;

export type Player = Tables<"players">;

export type Season = Tables<"seasons">;

export type SeasonState = Enums<"season_state">;

export type Team = Enums<"team">;

export enum TeamEnum {
  Red = "team_red",
  Blue = "team_blue",
}

export enum SeasonStateEnum {
  Upcoming = "upcoming",
  Active = "active",
  Completed = "completed",
}

export interface SeasonWithState extends Tables<"seasons_with_state"> {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string | null;
  state: SeasonState;
}
export interface GameDetails extends Tables<"game_details"> {
  id: number;
  created_at: string;
  player_ids: number[];
  season_id: number;
  winner: Team;
  team_red: {
    score: number;
    players: Player[];
  };
  team_blue: {
    score: number;
    players: Player[];
  };
}

export interface GameStats {
  id: number;
  createdAt: string;
  seasonId: number;
  winner: Team;
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
