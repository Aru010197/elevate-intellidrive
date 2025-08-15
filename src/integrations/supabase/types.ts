export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      bond_requests: {
        Row: {
          amount: number
          bondid: string
          created_at: string | null
          id: string
          investorid: string | null
          status: string | null
        }
        Insert: {
          amount: number
          bondid: string
          created_at?: string | null
          id?: string
          investorid?: string | null
          status?: string | null
        }
        Update: {
          amount?: number
          bondid?: string
          created_at?: string | null
          id?: string
          investorid?: string | null
          status?: string | null
        }
        Relationships: []
      }
      commission_reports: {
        Row: {
          bondcommission: number | null
          icdcommission: number | null
          id: string
          month: string
          totalcommission: number | null
        }
        Insert: {
          bondcommission?: number | null
          icdcommission?: number | null
          id?: string
          month: string
          totalcommission?: number | null
        }
        Update: {
          bondcommission?: number | null
          icdcommission?: number | null
          id?: string
          month?: string
          totalcommission?: number | null
        }
        Relationships: []
      }
      icd_requests: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          investorid: string | null
          status: string | null
          tenure: number
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          investorid?: string | null
          status?: string | null
          tenure: number
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          investorid?: string | null
          status?: string | null
          tenure?: number
        }
        Relationships: []
      }
      investment_requests: {
        Row: {
          amount: number
          approved_at: string | null
          approved_by: string | null
          created_at: string | null
          id: string
          investment_type: string
          investor_name: string
          notes: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          amount: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          investment_type: string
          investor_name: string
          notes?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          amount?: number
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string | null
          id?: string
          investment_type?: string
          investor_name?: string
          notes?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      investments: {
        Row: {
          amount: number
          created_at: string | null
          duration: string | null
          id: string
          interest_rate: number | null
          interestrate: number | null
          investor: string
          min_investment: number | null
          mininvestment: number | null
          name: string | null
          roi: number | null
          status: string | null
          tenure: number | null
          type: string
        }
        Insert: {
          amount: number
          created_at?: string | null
          duration?: string | null
          id?: string
          interest_rate?: number | null
          interestrate?: number | null
          investor: string
          min_investment?: number | null
          mininvestment?: number | null
          name?: string | null
          roi?: number | null
          status?: string | null
          tenure?: number | null
          type: string
        }
        Update: {
          amount?: number
          created_at?: string | null
          duration?: string | null
          id?: string
          interest_rate?: number | null
          interestrate?: number | null
          investor?: string
          min_investment?: number | null
          mininvestment?: number | null
          name?: string | null
          roi?: number | null
          status?: string | null
          tenure?: number | null
          type?: string
        }
        Relationships: []
      }
      investor_performance: {
        Row: {
          aum: number | null
          commission: number | null
          id: string
          name: string
          performance: string | null
          products: string | null
        }
        Insert: {
          aum?: number | null
          commission?: number | null
          id?: string
          name: string
          performance?: string | null
          products?: string | null
        }
        Update: {
          aum?: number | null
          commission?: number | null
          id?: string
          name?: string
          performance?: string | null
          products?: string | null
        }
        Relationships: []
      }
      investors: {
        Row: {
          aum: number | null
          company: string | null
          datejoined: string | null
          email: string
          id: string
          name: string
          phone: string | null
          status: string | null
        }
        Insert: {
          aum?: number | null
          company?: string | null
          datejoined?: string | null
          email: string
          id?: string
          name: string
          phone?: string | null
          status?: string | null
        }
        Update: {
          aum?: number | null
          company?: string | null
          datejoined?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          status?: string | null
        }
        Relationships: []
      }
      invites: {
        Row: {
          created_at: string | null
          email: string
          id: string
          invite_code: string
          role: string
          used: boolean | null
          used_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          invite_code: string
          role?: string
          used?: boolean | null
          used_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          invite_code?: string
          role?: string
          used?: boolean | null
          used_at?: string | null
        }
        Relationships: []
      }
      kyc_requests: {
        Row: {
          documents: Json | null
          id: string
          notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          status: string | null
          submitted_at: string | null
          user_email: string
          user_id: string | null
          user_name: string
        }
        Insert: {
          documents?: Json | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          submitted_at?: string | null
          user_email: string
          user_id?: string | null
          user_name: string
        }
        Update: {
          documents?: Json | null
          id?: string
          notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          status?: string | null
          submitted_at?: string | null
          user_email?: string
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      pending_requests: {
        Row: {
          amount: number | null
          created_at: string | null
          date: string | null
          details: string | null
          id: string
          status: string | null
          type: string
          user_id: string | null
          user_name: string
        }
        Insert: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          details?: string | null
          id?: string
          status?: string | null
          type: string
          user_id?: string | null
          user_name: string
        }
        Update: {
          amount?: number | null
          created_at?: string | null
          date?: string | null
          details?: string | null
          id?: string
          status?: string | null
          type?: string
          user_id?: string | null
          user_name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string | null
          id: string
          investor_code: string | null
          referral_code: string | null
          referralcode: string | null
          role: string
        }
        Insert: {
          created_at?: string | null
          id: string
          investor_code?: string | null
          referral_code?: string | null
          referralcode?: string | null
          role: string
        }
        Update: {
          created_at?: string | null
          id?: string
          investor_code?: string | null
          referral_code?: string | null
          referralcode?: string | null
          role?: string
        }
        Relationships: []
      }
      referrals: {
        Row: {
          commission: number | null
          created_at: string | null
          id: string
          investment: number | null
          investoremail: string
          partneremail: string
          status: string | null
        }
        Insert: {
          commission?: number | null
          created_at?: string | null
          id?: string
          investment?: number | null
          investoremail: string
          partneremail: string
          status?: string | null
        }
        Update: {
          commission?: number | null
          created_at?: string | null
          id?: string
          investment?: number | null
          investoremail?: string
          partneremail?: string
          status?: string | null
        }
        Relationships: []
      }
      reit_requests: {
        Row: {
          amount: number
          created_at: string | null
          id: string
          investorid: string | null
          reitid: string
          status: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          id?: string
          investorid?: string | null
          reitid: string
          status?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          id?: string
          investorid?: string | null
          reitid?: string
          status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
