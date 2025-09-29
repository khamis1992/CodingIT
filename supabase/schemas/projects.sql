create table public.projects (
  id uuid not null default gen_random_uuid (),
  user_id uuid null,
  title text not null,
  description text null,
  template_id text null,
  status text null default 'active'::text,
  is_public boolean null default false,
  metadata jsonb null default '{}'::jsonb,
  created_at timestamp with time zone null default now(),
  updated_at timestamp with time zone null default now(),
  deleted_at timestamp with time zone null,
  team_id uuid null,
  constraint projects_pkey primary key (id),
  constraint projects_team_id_fkey foreign KEY (team_id) references teams (id) on delete CASCADE,
  constraint projects_user_id_fkey foreign KEY (user_id) references auth.users (id) on delete CASCADE,
  constraint projects_status_check check (
    (
      status = any (
        array['active'::text, 'archived'::text, 'deleted'::text]
      )
    )
  )
) TABLESPACE pg_default;

create index IF not exists idx_projects_team_id on public.projects using btree (team_id) TABLESPACE pg_default;

create index IF not exists idx_projects_user_id on public.projects using btree (user_id) TABLESPACE pg_default;

create trigger set_updated_at BEFORE
update on projects for EACH row
execute FUNCTION update_updated_at ();

create trigger update_projects_updated_at BEFORE
update on projects for EACH row
execute FUNCTION update_updated_at_column ();