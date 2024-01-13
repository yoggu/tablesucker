export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      game_players: {
        Row: {
          created_at: string
          game_id: number
          player_id: number
          team: Database["public"]["Enums"]["team"]
        }
        Insert: {
          created_at?: string
          game_id: number
          player_id: number
          team: Database["public"]["Enums"]["team"]
        }
        Update: {
          created_at?: string
          game_id?: number
          player_id?: number
          team?: Database["public"]["Enums"]["team"]
        }
        Relationships: [
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "game_details"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_players_game_id_fkey"
            columns: ["game_id"]
            isOneToOne: false
            referencedRelation: "games"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          }
        ]
      }
      games: {
        Row: {
          created_at: string
          id: number
          season_id: number
          team_blue_score: number
          team_red_score: number
        }
        Insert: {
          created_at?: string
          id?: never
          season_id: number
          team_blue_score: number
          team_red_score: number
        }
        Update: {
          created_at?: string
          id?: never
          season_id?: number
          team_blue_score?: number
          team_red_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "games_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons_with_state"
            referencedColumns: ["id"]
          }
        ]
      }
      players: {
        Row: {
          created_at: string
          id: number
          image_url: string | null
          is_archived: boolean
          name: string
        }
        Insert: {
          created_at?: string
          id?: never
          image_url?: string | null
          is_archived?: boolean
          name: string
        }
        Update: {
          created_at?: string
          id?: never
          image_url?: string | null
          is_archived?: boolean
          name?: string
        }
        Relationships: []
      }
      seasons: {
        Row: {
          created_at: string
          end_date: string | null
          id: number
          start_date: string
        }
        Insert: {
          created_at?: string
          end_date?: string | null
          id?: never
          start_date: string
        }
        Update: {
          created_at?: string
          end_date?: string | null
          id?: never
          start_date?: string
        }
        Relationships: []
      }
    }
    Views: {
      game_details: {
        Row: {
          created_at: string | null
          id: number | null
          player_ids: number[] | null
          season_id: number | null
          team_blue: Json | null
          team_red: Json | null
          winner: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number | null
          player_ids?: never
          season_id?: number | null
          team_blue?: never
          team_red?: never
          winner?: never
        }
        Update: {
          created_at?: string | null
          id?: number | null
          player_ids?: never
          season_id?: number | null
          team_blue?: never
          team_red?: never
          winner?: never
        }
        Relationships: [
          {
            foreignKeyName: "games_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "games_season_id_fkey"
            columns: ["season_id"]
            isOneToOne: false
            referencedRelation: "seasons_with_state"
            referencedColumns: ["id"]
          }
        ]
      }
      seasons_with_state: {
        Row: {
          created_at: string | null
          end_date: string | null
          id: number | null
          start_date: string | null
          state: Database["public"]["Enums"]["season_state"] | null
        }
        Insert: {
          created_at?: string | null
          end_date?: string | null
          id?: number | null
          start_date?: string | null
          state?: never
        }
        Update: {
          created_at?: string | null
          end_date?: string | null
          id?: number | null
          start_date?: string | null
          state?: never
        }
        Relationships: []
      }
    }
    Functions: {
      create_game: {
        Args: {
          p_season_id: number
          p_team_red_score: number
          p_team_blue_score: number
          p_team_red_players: number[]
          p_team_blue_players: number[]
        }
        Returns: {
          game_id: number
        }[]
      }
      update_game: {
        Args: {
          p_game_id: number
          p_season_id: number
          p_team_red_players: number[]
          p_team_red_score: number
          p_team_blue_players: number[]
          p_team_blue_score: number
        }
        Returns: undefined
      }
    }
    Enums: {
      season_state: "upcoming" | "active" | "completed"
      team: "team_red" | "team_blue"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
