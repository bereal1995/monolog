export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      User: {
        Row: {
          authId: string
          username: string | null
          updatedAt: string | null
          createdAt?: string | null
          avatarUrl: string | null
        }
        Insert: {
          authId: string
          username: string | null
          updatedAt: string | null
          createdAt?: string | null
          avatarUrl: string | null
        }
        Update: {
          authId: string
          username: string | null
          updatedAt: string | null
          createdAt?: string | null
          avatarUrl: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export type SupabaseUser = Database['public']['Tables']['User']['Row']