-- ============================================================================
-- AUIS portal — fix for SuperTokens core schema drift
--
-- STATUS: APPLIED to the production database on 25 Aug 2026.
--   Verified afterwards: sign-up and password reset both work again.
--   Kept here as the record of what was run, and for any future restore
--   from an older snapshot or a new environment on a pre-12.0.0 schema.
--   Every statement is idempotent, so re-running it is harmless.
--   Nothing runs this automatically - it is executed by hand via psql.
--
-- Symptom:
--   ERROR: column "time_joined" of relation "app_id_to_user_id" does not exist
--   -> sign-ups fail, password resets fail after the token is already consumed.
--
-- Cause:
--   supertokens-postgresql-plugin 9.5.0 (shipped with supertokens-core 12.0.0)
--   added two columns to app_id_to_user_id. The core's startup DDL only creates
--   tables that DO NOT EXIST -- it never ALTERs an existing table. Because this
--   database was created by an older core, the columns were never added, while
--   the running core's queries now reference them.
--
--   Source: supertokens-postgresql-plugin SCHEMA-REWORK.md, "Added":
--     "New columns on app_id_to_user_id: time_joined,
--      primary_or_recipe_user_time_joined (both BIGINT NOT NULL DEFAULT 0)
--      plus four pagination indexes scoped to app
--      (app_id_to_user_id_pagination_index1..4)."
--
-- BEFORE RUNNING: take a database backup / snapshot.
-- Run against the SAME Postgres the SuperTokens core uses.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- 0. Before: confirm the columns really are missing
-- ---------------------------------------------------------------------------
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'app_id_to_user_id'
ORDER BY ordinal_position;

-- ---------------------------------------------------------------------------
-- 1. The actual fix — add the two missing columns
--    (ADD COLUMN with a constant DEFAULT does not rewrite the table on PG 11+,
--     so this is fast even on a large user table.)
-- ---------------------------------------------------------------------------
BEGIN;

ALTER TABLE app_id_to_user_id
  ADD COLUMN IF NOT EXISTS time_joined BIGINT NOT NULL DEFAULT 0;

ALTER TABLE app_id_to_user_id
  ADD COLUMN IF NOT EXISTS primary_or_recipe_user_time_joined BIGINT NOT NULL DEFAULT 0;

COMMIT;

-- ---------------------------------------------------------------------------
-- 2. Backfill the real join times for existing users.
--    Optional (0 is a valid "not yet backfilled" sentinel in LEGACY migration
--    mode, which is the default), but it keeps the two tables consistent.
-- ---------------------------------------------------------------------------
UPDATE app_id_to_user_id a
SET time_joined = sub.time_joined,
    primary_or_recipe_user_time_joined = sub.primary_or_recipe_user_time_joined
FROM (
  SELECT app_id,
         user_id,
         MIN(time_joined)                        AS time_joined,
         MIN(primary_or_recipe_user_time_joined) AS primary_or_recipe_user_time_joined
  FROM all_auth_recipe_users
  GROUP BY app_id, user_id
) sub
WHERE sub.app_id = a.app_id
  AND sub.user_id = a.user_id;

-- ---------------------------------------------------------------------------
-- 3. The four pagination indexes the same release adds.
--    Not required for correctness (their absence only costs performance on
--    user listing / dashboard search) but this matches what a fresh install has.
--    Definitions copied from GeneralQueries.java in the plugin source.
-- ---------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS app_id_to_user_id_pagination_index1
  ON app_id_to_user_id (app_id, primary_or_recipe_user_time_joined DESC, primary_or_recipe_user_id DESC);

CREATE INDEX IF NOT EXISTS app_id_to_user_id_pagination_index2
  ON app_id_to_user_id (app_id, primary_or_recipe_user_time_joined ASC, primary_or_recipe_user_id DESC);

CREATE INDEX IF NOT EXISTS app_id_to_user_id_pagination_index3
  ON app_id_to_user_id (recipe_id, app_id, primary_or_recipe_user_time_joined DESC, primary_or_recipe_user_id DESC);

CREATE INDEX IF NOT EXISTS app_id_to_user_id_pagination_index4
  ON app_id_to_user_id (recipe_id, app_id, primary_or_recipe_user_time_joined ASC, primary_or_recipe_user_id DESC);

-- ---------------------------------------------------------------------------
-- 4. After: verify
-- ---------------------------------------------------------------------------
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'app_id_to_user_id'
ORDER BY ordinal_position;

-- Expect to see, in addition to the original five columns:
--   time_joined                        | bigint | 0 | NO
--   primary_or_recipe_user_time_joined | bigint | 0 | NO

-- Then: restart the core (fly apps restart auis-supertokens), create a test
-- account on the site, and run one password reset end to end.
