-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE extensions.wrappers_fdw_stats (
  fdw_name text NOT NULL,
  create_times bigint,
  rows_in bigint,
  rows_out bigint,
  bytes_in bigint,
  bytes_out bigint,
  metadata jsonb,
  created_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at timestamp with time zone NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT wrappers_fdw_stats_pkey PRIMARY KEY (fdw_name)
);