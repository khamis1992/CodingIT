-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.api_keys (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  name text NOT NULL,
  key_hash text NOT NULL UNIQUE,
  key_prefix text NOT NULL,
  permissions jsonb DEFAULT '{}'::jsonb,
  last_used_at timestamp with time zone,
  expires_at timestamp with time zone,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT api_keys_pkey PRIMARY KEY (id),
  CONSTRAINT api_keys_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.billing_info (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL UNIQUE,
  company_name text NOT NULL,
  company_email text NOT NULL,
  tax_id text,
  address text NOT NULL,
  city text NOT NULL,
  state text NOT NULL,
  postal_code text NOT NULL,
  country text NOT NULL DEFAULT 'US'::text,
  payment_method text NOT NULL DEFAULT 'card'::text CHECK (payment_method = ANY (ARRAY['card'::text, 'bank_transfer'::text, 'invoice'::text])),
  billing_cycle text NOT NULL DEFAULT 'monthly'::text CHECK (billing_cycle = ANY (ARRAY['monthly'::text, 'annual'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT billing_info_pkey PRIMARY KEY (id),
  CONSTRAINT billing_info_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.chat_export_requests (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  export_type character varying NOT NULL CHECK (export_type::text = ANY (ARRAY['json'::character varying, 'csv'::character varying]::text[])),
  status character varying DEFAULT 'pending'::character varying CHECK (status::text = ANY (ARRAY['pending'::character varying, 'processing'::character varying, 'completed'::character varying, 'failed'::character varying]::text[])),
  date_from timestamp with time zone,
  date_to timestamp with time zone,
  session_ids ARRAY,
  s3_export_key text,
  file_size_bytes bigint,
  record_count integer,
  error_message text,
  created_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  CONSTRAINT chat_export_requests_pkey PRIMARY KEY (id),
  CONSTRAINT chat_export_requests_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.chat_message_cache (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  session_id uuid NOT NULL,
  message_id character varying NOT NULL,
  role character varying NOT NULL CHECK (role::text = ANY (ARRAY['user'::character varying, 'assistant'::character varying, 'system'::character varying]::text[])),
  content text NOT NULL,
  content_hash character varying,
  model character varying,
  template character varying,
  token_count integer,
  execution_time_ms integer,
  created_at timestamp with time zone DEFAULT now(),
  content_vector tsvector DEFAULT to_tsvector('english'::regconfig, content),
  CONSTRAINT chat_message_cache_pkey PRIMARY KEY (id),
  CONSTRAINT chat_message_cache_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.chat_sessions(id)
);
CREATE TABLE public.chat_session_tags (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  session_id uuid NOT NULL,
  tag character varying NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT chat_session_tags_pkey PRIMARY KEY (id),
  CONSTRAINT chat_session_tags_session_id_fkey FOREIGN KEY (session_id) REFERENCES public.chat_sessions(id)
);
CREATE TABLE public.chat_sessions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  session_id character varying NOT NULL UNIQUE,
  user_id uuid NOT NULL,
  team_id uuid,
  title text,
  status character varying DEFAULT 'active'::character varying CHECK (status::text = ANY (ARRAY['active'::character varying, 'archived'::character varying, 'deleted'::character varying]::text[])),
  message_count integer DEFAULT 0,
  model character varying,
  template character varying,
  s3_metadata_key text,
  s3_messages_key text,
  total_tokens integer DEFAULT 0,
  estimated_cost numeric DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  last_activity timestamp with time zone DEFAULT now(),
  CONSTRAINT chat_sessions_pkey PRIMARY KEY (id),
  CONSTRAINT chat_sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT fk_chat_sessions_team FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.code_embeddings (
  id bigint NOT NULL DEFAULT nextval('code_embeddings_id_seq'::regclass),
  content text NOT NULL,
  embedding USER-DEFINED,
  user_id uuid,
  CONSTRAINT code_embeddings_pkey PRIMARY KEY (id),
  CONSTRAINT code_embeddings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.conversation_threads (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_archived boolean DEFAULT false,
  CONSTRAINT conversation_threads_pkey PRIMARY KEY (id),
  CONSTRAINT conversation_threads_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.file_uploads (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  project_id uuid,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint,
  mime_type text,
  bucket_name text NOT NULL,
  is_public boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT file_uploads_pkey PRIMARY KEY (id),
  CONSTRAINT file_uploads_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT file_uploads_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.fragment_executions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  fragment_id uuid,
  user_id uuid,
  sandbox_id text,
  template text NOT NULL,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'running'::text, 'completed'::text, 'failed'::text, 'timeout'::text])),
  execution_url text,
  stdout text,
  stderr text,
  runtime_error text,
  cell_results jsonb,
  execution_time_ms integer,
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  metadata jsonb DEFAULT '{}'::jsonb,
  CONSTRAINT fragment_executions_pkey PRIMARY KEY (id),
  CONSTRAINT fragment_executions_fragment_id_fkey FOREIGN KEY (fragment_id) REFERENCES public.fragments(id),
  CONSTRAINT fragment_executions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.fragments (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  project_id uuid,
  title text NOT NULL,
  description text,
  template text NOT NULL,
  code text NOT NULL,
  file_path text NOT NULL,
  additional_dependencies ARRAY,
  has_additional_dependencies boolean DEFAULT false,
  install_dependencies_command text,
  port integer,
  is_public boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT fragments_pkey PRIMARY KEY (id),
  CONSTRAINT fragments_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT fragments_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  project_id uuid,
  role text NOT NULL CHECK (role = ANY (ARRAY['user'::text, 'assistant'::text])),
  content jsonb NOT NULL,
  object_data jsonb,
  result_data jsonb,
  sequence_number integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);
CREATE TABLE public.profiles (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid,
  first_name text,
  last_name text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.projects (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  title text NOT NULL,
  description text,
  template_id text,
  status text DEFAULT 'active'::text CHECK (status = ANY (ARRAY['active'::text, 'archived'::text, 'deleted'::text])),
  is_public boolean DEFAULT false,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  team_id uuid,
  CONSTRAINT projects_pkey PRIMARY KEY (id),
  CONSTRAINT projects_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT projects_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.subscription_events (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL,
  stripe_event_id text UNIQUE,
  event_type text NOT NULL,
  event_data jsonb NOT NULL DEFAULT '{}'::jsonb,
  processed_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT subscription_events_pkey PRIMARY KEY (id),
  CONSTRAINT subscription_events_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.tasks (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  user_id uuid,
  status text NOT NULL DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'processing'::text, 'completed'::text, 'error'::text])),
  progress integer NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  prompt text NOT NULL,
  repo_url text,
  selected_agent text DEFAULT 'claude'::text,
  selected_model text,
  sandbox_url text,
  branch_name text,
  logs jsonb DEFAULT '[]'::jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tasks_pkey PRIMARY KEY (id),
  CONSTRAINT tasks_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.team_members (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL,
  user_id uuid NOT NULL,
  role text NOT NULL CHECK (role = ANY (ARRAY['owner'::text, 'admin'::text, 'member'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_members_pkey PRIMARY KEY (id),
  CONSTRAINT team_members_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id),
  CONSTRAINT team_members_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.team_usage_limits (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid NOT NULL,
  usage_type text NOT NULL CHECK (usage_type = ANY (ARRAY['github_imports'::text, 'storage_mb'::text, 'execution_time_seconds'::text, 'api_calls'::text])),
  limit_value integer NOT NULL DEFAULT 0,
  current_usage integer NOT NULL DEFAULT 0,
  period_start timestamp with time zone DEFAULT now(),
  period_end timestamp with time zone DEFAULT (now() + '1 mon'::interval),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_usage_limits_pkey PRIMARY KEY (id),
  CONSTRAINT team_usage_limits_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.teams (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tier text DEFAULT 'free'::text,
  email text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  stripe_customer_id text UNIQUE,
  stripe_subscription_id text UNIQUE,
  subscription_status text DEFAULT 'active'::text CHECK (subscription_status = ANY (ARRAY['active'::text, 'canceled'::text, 'past_due'::text, 'unpaid'::text, 'incomplete'::text])),
  current_period_start timestamp with time zone,
  current_period_end timestamp with time zone,
  cancel_at_period_end boolean DEFAULT false,
  CONSTRAINT teams_pkey PRIMARY KEY (id)
);
CREATE TABLE public.thread_messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL,
  sender_id uuid,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  is_deleted boolean DEFAULT false,
  CONSTRAINT thread_messages_pkey PRIMARY KEY (id),
  CONSTRAINT thread_messages_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES public.conversation_threads(id),
  CONSTRAINT thread_messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES auth.users(id)
);
CREATE TABLE public.thread_summaries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  thread_id uuid NOT NULL,
  summary text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  message_count integer NOT NULL,
  last_message_id uuid,
  CONSTRAINT thread_summaries_pkey PRIMARY KEY (id),
  CONSTRAINT thread_summaries_thread_id_fkey FOREIGN KEY (thread_id) REFERENCES public.conversation_threads(id),
  CONSTRAINT thread_summaries_last_message_id_fkey FOREIGN KEY (last_message_id) REFERENCES public.thread_messages(id)
);
CREATE TABLE public.user_chat_analytics (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL UNIQUE,
  total_sessions integer DEFAULT 0,
  total_messages integer DEFAULT 0,
  total_tokens integer DEFAULT 0,
  total_cost numeric DEFAULT 0,
  model_usage jsonb DEFAULT '{}'::jsonb,
  template_usage jsonb DEFAULT '{}'::jsonb,
  last_activity timestamp with time zone,
  most_active_hour integer,
  most_active_day integer,
  favorite_models ARRAY,
  favorite_templates ARRAY,
  s3_objects_count integer DEFAULT 0,
  estimated_storage_size_bytes bigint DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_chat_analytics_pkey PRIMARY KEY (id),
  CONSTRAINT user_chat_analytics_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_integrations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  service_name text NOT NULL CHECK (service_name = ANY (ARRAY['github'::text, 'google_drive'::text, 'gmail'::text, 'google_calendar'::text, 'artifacts'::text])),
  is_connected boolean DEFAULT false,
  connection_data jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT user_integrations_pkey PRIMARY KEY (id),
  CONSTRAINT user_integrations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  ai_assistance boolean DEFAULT true,
  smart_suggestions boolean DEFAULT false,
  theme text DEFAULT 'system'::text CHECK (theme = ANY (ARRAY['light'::text, 'dark'::text, 'system'::text])),
  font_family text DEFAULT 'inter'::text CHECK (font_family = ANY (ARRAY['inter'::text, 'jetbrains-mono'::text, 'cal-sans'::text])),
  email_notifications boolean DEFAULT true,
  marketing_emails boolean DEFAULT false,
  security_alerts boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  analytics_enabled boolean DEFAULT true,
  data_sharing_enabled boolean DEFAULT false,
  CONSTRAINT user_preferences_pkey PRIMARY KEY (id),
  CONSTRAINT user_preferences_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_profiles (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  full_name text,
  display_name text,
  work_description text,
  avatar_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  first_name text,
  last_name text,
  onboarding_completed boolean DEFAULT false,
  CONSTRAINT user_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT user_profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_security_settings (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid UNIQUE,
  two_factor_enabled boolean DEFAULT false,
  backup_codes ARRAY,
  last_password_change timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  login_notifications boolean DEFAULT true,
  CONSTRAINT user_security_settings_pkey PRIMARY KEY (id),
  CONSTRAINT user_security_settings_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id)
);
CREATE TABLE public.user_usage (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid,
  usage_type text NOT NULL CHECK (usage_type = ANY (ARRAY['fragment_execution'::text, 'api_call'::text, 'storage_used'::text, 'project_created'::text, 'github_import'::text])),
  usage_date date DEFAULT CURRENT_DATE,
  usage_count integer DEFAULT 1,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now(),
  team_id uuid,
  CONSTRAINT user_usage_pkey PRIMARY KEY (id),
  CONSTRAINT user_usage_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT user_usage_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.users_teams (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  team_id uuid NOT NULL,
  is_default boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_teams_pkey PRIMARY KEY (id),
  CONSTRAINT users_teams_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id),
  CONSTRAINT users_teams_team_id_fkey FOREIGN KEY (team_id) REFERENCES public.teams(id)
);
CREATE TABLE public.workflow_executions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  workflow_id uuid,
  status text NOT NULL CHECK (status = ANY (ARRAY['running'::text, 'completed'::text, 'failed'::text, 'cancelled'::text])),
  input_data jsonb DEFAULT '{}'::jsonb,
  output_data jsonb,
  execution_log ARRAY DEFAULT '{}'::jsonb[],
  started_at timestamp with time zone DEFAULT now(),
  completed_at timestamp with time zone,
  error text,
  created_by uuid,
  CONSTRAINT workflow_executions_pkey PRIMARY KEY (id),
  CONSTRAINT workflow_executions_workflow_id_fkey FOREIGN KEY (workflow_id) REFERENCES public.workflows(id),
  CONSTRAINT workflow_executions_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.workflow_templates (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  category text NOT NULL,
  schema jsonb NOT NULL,
  is_public boolean DEFAULT false,
  created_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  usage_count integer DEFAULT 0,
  rating numeric DEFAULT 0.0,
  CONSTRAINT workflow_templates_pkey PRIMARY KEY (id),
  CONSTRAINT workflow_templates_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id)
);
CREATE TABLE public.workflows (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  team_id uuid,
  name text NOT NULL,
  description text,
  schema jsonb NOT NULL,
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT workflows_pkey PRIMARY KEY (id),
  CONSTRAINT workflows_team_id_fkey FOREIGN KEY (team_id) REFERENCES auth.users(id)
);