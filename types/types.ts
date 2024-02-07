import { Table } from "@tanstack/react-table";
import { Tables, Enums, Json } from "./supabase";
import { PushSubscription } from "web-push";

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

export type SeasonWithStateView = Tables<"seasons_with_state">;

export interface SeasonWithState extends SeasonWithStateView {
  id: number;
  created_at: string;
  start_date: string;
  end_date: string | null;
  state: SeasonState;
}

export interface GameDetailsView extends Tables<"game_details"> {
  created_at: string;
  id: number;
  season_id: number;
  team_blue_player_ids: number[];
  team_blue_players: Player[];
  team_blue_score: number;
  team_red_player_ids: number[];
  team_red_players: Player[];
  team_red_score: number;
  winner: Team;
}
export interface GameDetails {
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

export interface Subscription extends Tables<"subscriptions"> {
  id: number;
  endpoint: string;
  created_at: string;
  subscription: string;
}
