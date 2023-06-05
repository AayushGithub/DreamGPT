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
      dreams: {
        Row: {
          created_at: string | null
          "description ": string | null
          id: number
          reserved_tags: number | null
          title: string | null
          user_id: number | null
          user_tags: number | null
        }
        Insert: {
          created_at?: string | null
          "description "?: string | null
          id?: number
          reserved_tags?: number | null
          title?: string | null
          user_id?: number | null
          user_tags?: number | null
        }
        Update: {
          created_at?: string | null
          "description "?: string | null
          id?: number
          reserved_tags?: number | null
          title?: string | null
          user_id?: number | null
          user_tags?: number | null
        }
      }
      reserved_tags: {
        Row: {
          color: string | null
          id: number
          name: string | null
        }
        Insert: {
          color?: string | null
          id?: number
          name?: string | null
        }
        Update: {
          color?: string | null
          id?: number
          name?: string | null
        }
      }
      user_tags: {
        Row: {
          color: string | null
          id: number
          name: string | null
          user_id: number | null
        }
        Insert: {
          color?: string | null
          id?: number
          name?: string | null
          user_id?: number | null
        }
        Update: {
          color?: string | null
          id?: number
          name?: string | null
          user_id?: number | null
        }
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          first_name: string | null
          id: number
          last_name: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: number
          last_name?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
