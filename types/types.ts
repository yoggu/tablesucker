import { Tables } from "./supabase";

export type Game = Tables<"games">;

export type GamePlayer = Tables<"game_players">;

export type Player = Tables<"players">;

export interface ExtendedGamePlayers extends GamePlayer {
  team: TEAM;
  games: Game;
  players: Player;
}

export enum TEAM {
  Red = 'team_red',
  Blue = 'team_blue'
}

export interface TransformedGame {
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
