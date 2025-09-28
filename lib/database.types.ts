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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      api_keys: {
        Row: {
          created_at: string | null
          expires_at: string | null
          id: string
          is_active: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at: string | null
          name: string
          permissions: Json | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash: string
          key_prefix: string
          last_used_at?: string | null
          name: string
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          expires_at?: string | null
          id?: string
          is_active?: boolean | null
          key_hash?: string
          key_prefix?: string
          last_used_at?: string | null
          name?: string
          permissions?: Json | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      billing_info: {
        Row: {
          address: string
          billing_cycle: string
          city: string
          company_email: string
          company_name: string
          country: string
          created_at: string | null
          id: string
          payment_method: string
          postal_code: string
          state: string
          tax_id: string | null
          team_id: string
          updated_at: string | null
        }
        Insert: {
          address: string
          billing_cycle?: string
          city: string
          company_email: string
          company_name: string
          country?: string
          created_at?: string | null
          id?: string
          payment_method?: string
          postal_code: string
          state: string
          tax_id?: string | null
          team_id: string
          updated_at?: string | null
        }
        Update: {
          address?: string
          billing_cycle?: string
          city?: string
          company_email?: string
          company_name?: string
          country?: string
          created_at?: string | null
          id?: string
          payment_method?: string
          postal_code?: string
          state?: string
          tax_id?: string | null
          team_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "billing_info_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: true
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_export_requests: {
        Row: {
          completed_at: string | null
          created_at: string | null
          date_from: string | null
          date_to: string | null
          error_message: string | null
          export_type: string
          file_size_bytes: number | null
          id: string
          record_count: number | null
          s3_export_key: string | null
          session_ids: string[] | null
          status: string | null
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          date_from?: string | null
          date_to?: string | null
          error_message?: string | null
          export_type: string
          file_size_bytes?: number | null
          id?: string
          record_count?: number | null
          s3_export_key?: string | null
          session_ids?: string[] | null
          status?: string | null
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          date_from?: string | null
          date_to?: string | null
          error_message?: string | null
          export_type?: string
          file_size_bytes?: number | null
          id?: string
          record_count?: number | null
          s3_export_key?: string | null
          session_ids?: string[] | null
          status?: string | null
          user_id?: string
        }
        Relationships: []
      }
      chat_message_cache: {
        Row: {
          content: string
          content_hash: string | null
          content_vector: unknown | null
          created_at: string | null
          execution_time_ms: number | null
          id: string
          message_id: string
          model: string | null
          role: string
          session_id: string
          template: string | null
          token_count: number | null
        }
        Insert: {
          content: string
          content_hash?: string | null
          content_vector?: unknown | null
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          message_id: string
          model?: string | null
          role: string
          session_id: string
          template?: string | null
          token_count?: number | null
        }
        Update: {
          content?: string
          content_hash?: string | null
          content_vector?: unknown | null
          created_at?: string | null
          execution_time_ms?: number | null
          id?: string
          message_id?: string
          model?: string | null
          role?: string
          session_id?: string
          template?: string | null
          token_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "chat_message_cache_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_session_tags: {
        Row: {
          created_at: string | null
          id: string
          session_id: string
          tag: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          session_id: string
          tag: string
        }
        Update: {
          created_at?: string | null
          id?: string
          session_id?: string
          tag?: string
        }
        Relationships: [
          {
            foreignKeyName: "chat_session_tags_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          estimated_cost: number | null
          id: string
          last_activity: string | null
          message_count: number | null
          model: string | null
          s3_messages_key: string | null
          s3_metadata_key: string | null
          session_id: string
          status: string | null
          team_id: string | null
          template: string | null
          title: string | null
          total_tokens: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          last_activity?: string | null
          message_count?: number | null
          model?: string | null
          s3_messages_key?: string | null
          s3_metadata_key?: string | null
          session_id: string
          status?: string | null
          team_id?: string | null
          template?: string | null
          title?: string | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          estimated_cost?: number | null
          id?: string
          last_activity?: string | null
          message_count?: number | null
          model?: string | null
          s3_messages_key?: string | null
          s3_metadata_key?: string | null
          session_id?: string
          status?: string | null
          team_id?: string | null
          template?: string | null
          title?: string | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_chat_sessions_team"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      code_embeddings: {
        Row: {
          content: string
          embedding: string | null
          id: number
          user_id: string | null
        }
        Insert: {
          content: string
          embedding?: string | null
          id?: number
          user_id?: string | null
        }
        Update: {
          content?: string
          embedding?: string | null
          id?: number
          user_id?: string | null
        }
        Relationships: []
      }
      conversation_threads: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          is_archived: boolean | null
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_archived?: boolean | null
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          is_archived?: boolean | null
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      file_uploads: {
        Row: {
          bucket_name: string
          created_at: string | null
          file_name: string
          file_path: string
          file_size: number | null
          id: string
          is_public: boolean | null
          metadata: Json | null
          mime_type: string | null
          project_id: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          bucket_name: string
          created_at?: string | null
          file_name: string
          file_path: string
          file_size?: number | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          project_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          bucket_name?: string
          created_at?: string | null
          file_name?: string
          file_path?: string
          file_size?: number | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          mime_type?: string | null
          project_id?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "file_uploads_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      fragment_executions: {
        Row: {
          cell_results: Json | null
          completed_at: string | null
          execution_time_ms: number | null
          execution_url: string | null
          fragment_id: string | null
          id: string
          metadata: Json | null
          runtime_error: string | null
          sandbox_id: string | null
          started_at: string | null
          status: string | null
          stderr: string | null
          stdout: string | null
          template: string
          user_id: string | null
        }
        Insert: {
          cell_results?: Json | null
          completed_at?: string | null
          execution_time_ms?: number | null
          execution_url?: string | null
          fragment_id?: string | null
          id?: string
          metadata?: Json | null
          runtime_error?: string | null
          sandbox_id?: string | null
          started_at?: string | null
          status?: string | null
          stderr?: string | null
          stdout?: string | null
          template: string
          user_id?: string | null
        }
        Update: {
          cell_results?: Json | null
          completed_at?: string | null
          execution_time_ms?: number | null
          execution_url?: string | null
          fragment_id?: string | null
          id?: string
          metadata?: Json | null
          runtime_error?: string | null
          sandbox_id?: string | null
          started_at?: string | null
          status?: string | null
          stderr?: string | null
          stdout?: string | null
          template?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fragment_executions_fragment_id_fkey"
            columns: ["fragment_id"]
            isOneToOne: false
            referencedRelation: "fragments"
            referencedColumns: ["id"]
          },
        ]
      }
      fragments: {
        Row: {
          additional_dependencies: string[] | null
          code: string
          created_at: string | null
          description: string | null
          file_path: string
          has_additional_dependencies: boolean | null
          id: string
          install_dependencies_command: string | null
          is_public: boolean | null
          metadata: Json | null
          port: number | null
          project_id: string | null
          template: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          additional_dependencies?: string[] | null
          code: string
          created_at?: string | null
          description?: string | null
          file_path: string
          has_additional_dependencies?: boolean | null
          id?: string
          install_dependencies_command?: string | null
          is_public?: boolean | null
          metadata?: Json | null
          port?: number | null
          project_id?: string | null
          template: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          additional_dependencies?: string[] | null
          code?: string
          created_at?: string | null
          description?: string | null
          file_path?: string
          has_additional_dependencies?: boolean | null
          id?: string
          install_dependencies_command?: string | null
          is_public?: boolean | null
          metadata?: Json | null
          port?: number | null
          project_id?: string | null
          template?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fragments_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: Json
          created_at: string | null
          id: string
          object_data: Json | null
          project_id: string | null
          result_data: Json | null
          role: string
          sequence_number: number
        }
        Insert: {
          content: Json
          created_at?: string | null
          id?: string
          object_data?: Json | null
          project_id?: string | null
          result_data?: Json | null
          role: string
          sequence_number: number
        }
        Update: {
          content?: Json
          created_at?: string | null
          id?: string
          object_data?: Json | null
          project_id?: string | null
          result_data?: Json | null
          role?: string
          sequence_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "messages_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          first_name: string | null
          id: number
          last_name: string | null
          user_id: string | null
        }
        Insert: {
          first_name?: string | null
          id?: never
          last_name?: string | null
          user_id?: string | null
        }
        Update: {
          first_name?: string | null
          id?: never
          last_name?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      projects: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          metadata: Json | null
          status: string | null
          team_id: string | null
          template_id: string | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          status?: string | null
          team_id?: string | null
          template_id?: string | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          status?: string | null
          team_id?: string | null
          template_id?: string | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      subscription_events: {
        Row: {
          created_at: string | null
          event_data: Json
          event_type: string
          id: string
          processed_at: string | null
          stripe_event_id: string | null
          team_id: string
        }
        Insert: {
          created_at?: string | null
          event_data?: Json
          event_type: string
          id?: string
          processed_at?: string | null
          stripe_event_id?: string | null
          team_id: string
        }
        Update: {
          created_at?: string | null
          event_data?: Json
          event_type?: string
          id?: string
          processed_at?: string | null
          stripe_event_id?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "subscription_events_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          branch_name: string | null
          created_at: string
          id: number
          logs: Json | null
          progress: number
          prompt: string
          repo_url: string | null
          sandbox_url: string | null
          selected_agent: string | null
          selected_model: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          branch_name?: string | null
          created_at?: string
          id?: never
          logs?: Json | null
          progress?: number
          prompt: string
          repo_url?: string | null
          sandbox_url?: string | null
          selected_agent?: string | null
          selected_model?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          branch_name?: string | null
          created_at?: string
          id?: never
          logs?: Json | null
          progress?: number
          prompt?: string
          repo_url?: string | null
          sandbox_url?: string | null
          selected_agent?: string | null
          selected_model?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      team_members: {
        Row: {
          created_at: string | null
          id: string
          role: string
          team_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          team_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          team_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      team_usage_limits: {
        Row: {
          created_at: string | null
          current_usage: number
          id: string
          limit_value: number
          period_end: string | null
          period_start: string | null
          team_id: string
          updated_at: string | null
          usage_type: string
        }
        Insert: {
          created_at?: string | null
          current_usage?: number
          id?: string
          limit_value?: number
          period_end?: string | null
          period_start?: string | null
          team_id: string
          updated_at?: string | null
          usage_type: string
        }
        Update: {
          created_at?: string | null
          current_usage?: number
          id?: string
          limit_value?: number
          period_end?: string | null
          period_start?: string | null
          team_id?: string
          updated_at?: string | null
          usage_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_usage_limits_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          cancel_at_period_end: boolean | null
          created_at: string | null
          current_period_end: string | null
          current_period_start: string | null
          email: string | null
          id: string
          name: string
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          subscription_status: string | null
          tier: string | null
          updated_at: string | null
        }
        Insert: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string | null
          id?: string
          name: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          tier?: string | null
          updated_at?: string | null
        }
        Update: {
          cancel_at_period_end?: boolean | null
          created_at?: string | null
          current_period_end?: string | null
          current_period_start?: string | null
          email?: string | null
          id?: string
          name?: string
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          subscription_status?: string | null
          tier?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      thread_messages: {
        Row: {
          content: string
          created_at: string | null
          id: string
          is_deleted: boolean | null
          sender_id: string | null
          thread_id: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
          sender_id?: string | null
          thread_id: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          id?: string
          is_deleted?: boolean | null
          sender_id?: string | null
          thread_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thread_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "conversation_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thread_messages_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "thread_details"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      thread_summaries: {
        Row: {
          created_at: string | null
          id: string
          last_message_id: string | null
          message_count: number
          summary: string
          thread_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          message_count: number
          summary: string
          thread_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          last_message_id?: string | null
          message_count?: number
          summary?: string
          thread_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "thread_summaries_last_message_id_fkey"
            columns: ["last_message_id"]
            isOneToOne: false
            referencedRelation: "thread_messages"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thread_summaries_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "conversation_threads"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "thread_summaries_thread_id_fkey"
            columns: ["thread_id"]
            isOneToOne: false
            referencedRelation: "thread_details"
            referencedColumns: ["thread_id"]
          },
        ]
      }
      user_chat_analytics: {
        Row: {
          created_at: string | null
          estimated_storage_size_bytes: number | null
          favorite_models: string[] | null
          favorite_templates: string[] | null
          id: string
          last_activity: string | null
          model_usage: Json | null
          most_active_day: number | null
          most_active_hour: number | null
          s3_objects_count: number | null
          template_usage: Json | null
          total_cost: number | null
          total_messages: number | null
          total_sessions: number | null
          total_tokens: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          estimated_storage_size_bytes?: number | null
          favorite_models?: string[] | null
          favorite_templates?: string[] | null
          id?: string
          last_activity?: string | null
          model_usage?: Json | null
          most_active_day?: number | null
          most_active_hour?: number | null
          s3_objects_count?: number | null
          template_usage?: Json | null
          total_cost?: number | null
          total_messages?: number | null
          total_sessions?: number | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          estimated_storage_size_bytes?: number | null
          favorite_models?: string[] | null
          favorite_templates?: string[] | null
          id?: string
          last_activity?: string | null
          model_usage?: Json | null
          most_active_day?: number | null
          most_active_hour?: number | null
          s3_objects_count?: number | null
          template_usage?: Json | null
          total_cost?: number | null
          total_messages?: number | null
          total_sessions?: number | null
          total_tokens?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      user_integrations: {
        Row: {
          connection_data: Json | null
          created_at: string | null
          id: string
          is_connected: boolean | null
          service_name: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          connection_data?: Json | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          service_name: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          connection_data?: Json | null
          created_at?: string | null
          id?: string
          is_connected?: boolean | null
          service_name?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_preferences: {
        Row: {
          ai_assistance: boolean | null
          analytics_enabled: boolean | null
          created_at: string | null
          data_sharing_enabled: boolean | null
          email_notifications: boolean | null
          font_family: string | null
          id: string
          marketing_emails: boolean | null
          security_alerts: boolean | null
          smart_suggestions: boolean | null
          theme: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          ai_assistance?: boolean | null
          analytics_enabled?: boolean | null
          created_at?: string | null
          data_sharing_enabled?: boolean | null
          email_notifications?: boolean | null
          font_family?: string | null
          id?: string
          marketing_emails?: boolean | null
          security_alerts?: boolean | null
          smart_suggestions?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          ai_assistance?: boolean | null
          analytics_enabled?: boolean | null
          created_at?: string | null
          data_sharing_enabled?: boolean | null
          email_notifications?: boolean | null
          font_family?: string | null
          id?: string
          marketing_emails?: boolean | null
          security_alerts?: boolean | null
          smart_suggestions?: boolean | null
          theme?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          display_name: string | null
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          onboarding_completed: boolean | null
          updated_at: string | null
          user_id: string | null
          work_description: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          work_description?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          display_name?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_completed?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          work_description?: string | null
        }
        Relationships: []
      }
      user_security_settings: {
        Row: {
          backup_codes: string[] | null
          created_at: string | null
          id: string
          last_password_change: string | null
          login_notifications: boolean | null
          two_factor_enabled: boolean | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          last_password_change?: string | null
          login_notifications?: boolean | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          backup_codes?: string[] | null
          created_at?: string | null
          id?: string
          last_password_change?: string | null
          login_notifications?: boolean | null
          two_factor_enabled?: boolean | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      user_usage: {
        Row: {
          created_at: string | null
          id: string
          metadata: Json | null
          team_id: string | null
          usage_count: number | null
          usage_date: string | null
          usage_type: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          team_id?: string | null
          usage_count?: number | null
          usage_date?: string | null
          usage_type: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          metadata?: Json | null
          team_id?: string | null
          usage_count?: number | null
          usage_date?: string | null
          usage_type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_usage_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      users_teams: {
        Row: {
          created_at: string | null
          id: string
          is_default: boolean | null
          team_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          team_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_default?: boolean | null
          team_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "users_teams_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_executions: {
        Row: {
          completed_at: string | null
          created_by: string | null
          error: string | null
          execution_log: Json[] | null
          id: string
          input_data: Json | null
          output_data: Json | null
          started_at: string | null
          status: string
          workflow_id: string | null
        }
        Insert: {
          completed_at?: string | null
          created_by?: string | null
          error?: string | null
          execution_log?: Json[] | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          started_at?: string | null
          status: string
          workflow_id?: string | null
        }
        Update: {
          completed_at?: string | null
          created_by?: string | null
          error?: string | null
          execution_log?: Json[] | null
          id?: string
          input_data?: Json | null
          output_data?: Json | null
          started_at?: string | null
          status?: string
          workflow_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "workflow_executions_workflow_id_fkey"
            columns: ["workflow_id"]
            isOneToOne: false
            referencedRelation: "workflows"
            referencedColumns: ["id"]
          },
        ]
      }
      workflow_templates: {
        Row: {
          category: string
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          rating: number | null
          schema: Json
          updated_at: string | null
          usage_count: number | null
        }
        Insert: {
          category: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          rating?: number | null
          schema: Json
          updated_at?: string | null
          usage_count?: number | null
        }
        Update: {
          category?: string
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          rating?: number | null
          schema?: Json
          updated_at?: string | null
          usage_count?: number | null
        }
        Relationships: []
      }
      workflows: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          schema: Json
          team_id: string | null
          updated_at: string | null
          version: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          schema: Json
          team_id?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          schema?: Json
          team_id?: string | null
          updated_at?: string | null
          version?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      thread_details: {
        Row: {
          created_at: string | null
          created_by: string | null
          is_archived: boolean | null
          last_activity: string | null
          message_count: number | null
          summary: string | null
          summary_created_at: string | null
          summary_id: string | null
          summary_updated_at: string | null
          thread_id: string | null
          thread_name: string | null
          total_messages: number | null
          updated_at: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      analyze_unused_indexes: {
        Args: { min_days_unused?: number; min_size_bytes?: number }
        Returns: {
          drop_command: string
          index_definition: string
          index_name: string
          index_scans: number
          index_size: string
          schema_name: string
          table_name: string
        }[]
      }
      can_use_feature: {
        Args: {
          feature_type: string
          requested_amount?: number
          team_uuid: string
        }
        Returns: boolean
      }
      check_api_key: {
        Args: { key_hash: string; key_prefix: string }
        Returns: {
          is_valid: boolean
          permissions: Json
          user_id: string
        }[]
      }
      check_thread_needs_summary: {
        Args: { p_thread_id: string }
        Returns: boolean
      }
      cleanup_old_sessions: {
        Args: { p_days_old?: number; p_user_id: string }
        Returns: number
      }
      create_default_team_for_user: {
        Args: { team_name?: string; user_email: string; user_uuid: string }
        Returns: string
      }
      get_team_usage_summary: {
        Args: { team_uuid: string }
        Returns: {
          current_usage: number
          is_unlimited: boolean
          limit_value: number
          period_end: string
          period_start: string
          usage_percentage: number
          usage_type: string
        }[]
      }
      get_thread_messages: {
        Args: { p_thread_id: string }
        Returns: {
          content: string
          created_at: string
          id: string
          sender_id: string
          sender_name: string
          thread_id: string
        }[]
      }
      get_user_chat_summary: {
        Args: { p_user_id: string }
        Returns: {
          favorite_models: string[]
          favorite_templates: string[]
          last_activity: string
          total_messages: number
          total_sessions: number
          total_tokens: number
        }[]
      }
      get_user_projects: {
        Args: { user_uuid: string }
        Returns: {
          created_at: string
          description: string
          fragment_count: number
          id: string
          is_public: boolean
          status: string
          title: string
        }[]
      }
      get_user_stats: {
        Args: { user_uuid: string }
        Returns: {
          active_projects: number
          last_activity: string
          storage_used_bytes: number
          total_executions: number
          total_file_uploads: number
          total_fragments: number
          total_messages: number
          total_projects: number
        }[]
      }
      get_user_teams: {
        Args:
          | {
              p_is_default: boolean
              p_limit: number
              p_offset: number
              p_user_id: string
            }
          | { p_user_id: string }
        Returns: {
          team: Json
        }[]
      }
      increment_usage: {
        Args: { amount?: number; feature_type: string; team_uuid: string }
        Returns: boolean
      }
      increment_user_usage: {
        Args: {
          increment_by?: number
          usage_type_param: string
          user_uuid: string
        }
        Returns: undefined
      }
      initialize_team_usage_limits: {
        Args: { team_uuid: string; tier_name?: string }
        Returns: undefined
      }
      match_code_embeddings: {
        Args: {
          match_count: number
          match_threshold: number
          query_embedding: string
        }
        Returns: {
          content: string
          id: number
          similarity: number
        }[]
      }
      reset_monthly_usage: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      reset_team_usage_period: {
        Args: {
          new_period_end?: string
          new_period_start?: string
          team_uuid: string
        }
        Returns: boolean
      }
      search_fragments: {
        Args: { search_term: string; user_uuid?: string }
        Returns: {
          created_at: string
          description: string
          id: string
          is_public: boolean
          project_id: string
          project_title: string
          rank: number
          title: string
        }[]
      }
      search_user_messages: {
        Args: { p_limit?: number; p_query: string; p_user_id: string }
        Returns: {
          content: string
          created_at: string
          message_id: string
          rank: number
          role: string
          session_id: string
          session_title: string
        }[]
      }
      soft_delete_project: {
        Args: { project_uuid: string }
        Returns: boolean
      }
      update_team_subscription_tier: {
        Args: {
          new_tier: string
          stripe_customer_id?: string
          stripe_subscription_id?: string
          team_uuid: string
        }
        Returns: boolean
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
