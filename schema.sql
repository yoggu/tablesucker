


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "citext" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."season_state" AS ENUM (
    'upcoming',
    'active',
    'completed'
);


ALTER TYPE "public"."season_state" OWNER TO "postgres";


CREATE TYPE "public"."team" AS ENUM (
    'team_red',
    'team_blue'
);


ALTER TYPE "public"."team" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_game"("p_season_id" integer, "p_team_red_score" integer, "p_team_blue_score" integer, "p_team_red_players" integer[], "p_team_blue_players" integer[]) RETURNS TABLE("game_id" integer)
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public', 'pg_catalog'
    AS $$
DECLARE
    new_game_id INTEGER;
BEGIN
    -- Insert into games table (fully-qualified)
    INSERT INTO public.games (season_id, team_red_score, team_blue_score)
    VALUES (p_season_id, p_team_red_score, p_team_blue_score)
    RETURNING id INTO new_game_id;

    -- Insert into game_players for team red (fully-qualified)
    INSERT INTO public.game_players (game_id, player_id, team)
    SELECT new_game_id, unnest(p_team_red_players), 'team_red';

    -- Insert into game_players for team blue (fully-qualified)
    INSERT INTO public.game_players (game_id, player_id, team)
    SELECT new_game_id, unnest(p_team_blue_players), 'team_blue';

    -- Return the new game ID
    RETURN QUERY SELECT new_game_id;

EXCEPTION WHEN OTHERS THEN
    RAISE;
END;
$$;


ALTER FUNCTION "public"."create_game"("p_season_id" integer, "p_team_red_score" integer, "p_team_blue_score" integer, "p_team_red_players" integer[], "p_team_blue_players" integer[]) OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_game"("p_game_id" integer, "p_season_id" integer, "p_team_red_players" integer[], "p_team_red_score" integer, "p_team_blue_players" integer[], "p_team_blue_score" integer) RETURNS "void"
    LANGUAGE "plpgsql"
    SET "search_path" TO 'public', 'pg_catalog'
    AS $$
BEGIN
    -- Update the game (fully-qualified)
    UPDATE public.games
    SET season_id = p_season_id,
        team_red_score = p_team_red_score,
        team_blue_score = p_team_blue_score
    WHERE id = p_game_id;

    -- Remove existing player associations (fully-qualified)
    DELETE FROM public.game_players
    WHERE game_id = p_game_id;

    -- Insert new player associations for team red (fully-qualified)
    INSERT INTO public.game_players (game_id, player_id, team)
    SELECT p_game_id, unnest(p_team_red_players), 'team_red';

    -- Insert new player associations for team blue (fully-qualified)
    INSERT INTO public.game_players (game_id, player_id, team)
    SELECT p_game_id, unnest(p_team_blue_players), 'team_blue';
END;
$$;


ALTER FUNCTION "public"."update_game"("p_game_id" integer, "p_season_id" integer, "p_team_red_players" integer[], "p_team_red_score" integer, "p_team_blue_players" integer[], "p_team_blue_score" integer) OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."game_players" (
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "game_id" bigint NOT NULL,
    "player_id" bigint NOT NULL,
    "team" "public"."team" NOT NULL
);


ALTER TABLE "public"."game_players" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."games" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "season_id" bigint NOT NULL,
    "team_red_score" integer NOT NULL,
    "team_blue_score" integer NOT NULL
);


ALTER TABLE "public"."games" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."players" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "name" "extensions"."citext" NOT NULL,
    "image_url" "text",
    "is_archived" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."players" OWNER TO "postgres";


CREATE OR REPLACE VIEW "public"."game_details" WITH ("security_invoker"='on') AS
 SELECT "id",
    "created_at",
    "season_id",
        CASE
            WHEN ("team_red_score" > "team_blue_score") THEN 'team_red'::"text"
            ELSE 'team_blue'::"text"
        END AS "winner",
    "team_red_score",
    "team_blue_score",
    ( SELECT "array_agg"("gp"."player_id") AS "array_agg"
           FROM "public"."game_players" "gp"
          WHERE (("gp"."game_id" = "g"."id") AND ("gp"."team" = 'team_red'::"public"."team"))) AS "team_red_player_ids",
    ( SELECT "array_agg"("gp"."player_id") AS "array_agg"
           FROM "public"."game_players" "gp"
          WHERE (("gp"."game_id" = "g"."id") AND ("gp"."team" = 'team_blue'::"public"."team"))) AS "team_blue_player_ids",
    ( SELECT "json_agg"("json_build_object"('id', "p"."id", 'created_at', "p"."created_at", 'name', "p"."name", 'image_url', "p"."image_url")) AS "json_agg"
           FROM ("public"."game_players" "gp"
             JOIN "public"."players" "p" ON (("gp"."player_id" = "p"."id")))
          WHERE (("gp"."game_id" = "g"."id") AND ("gp"."team" = 'team_red'::"public"."team"))) AS "team_red_players",
    ( SELECT "json_agg"("json_build_object"('id', "p"."id", 'created_at', "p"."created_at", 'name', "p"."name", 'image_url', "p"."image_url")) AS "json_agg"
           FROM ("public"."game_players" "gp"
             JOIN "public"."players" "p" ON (("gp"."player_id" = "p"."id")))
          WHERE (("gp"."game_id" = "g"."id") AND ("gp"."team" = 'team_blue'::"public"."team"))) AS "team_blue_players"
   FROM "public"."games" "g";


ALTER VIEW "public"."game_details" OWNER TO "postgres";


ALTER TABLE "public"."games" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."games_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE "public"."players" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."players_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE TABLE IF NOT EXISTS "public"."seasons" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "start_date" "date" NOT NULL,
    "end_date" "date"
);


ALTER TABLE "public"."seasons" OWNER TO "postgres";


ALTER TABLE "public"."seasons" ALTER COLUMN "id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "public"."seasons_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



CREATE OR REPLACE VIEW "public"."seasons_with_state" WITH ("security_invoker"='on') AS
 SELECT "id",
    "created_at",
    "start_date",
    "end_date",
        CASE
            WHEN ("start_date" > CURRENT_DATE) THEN 'upcoming'::"public"."season_state"
            WHEN (("end_date" IS NULL) OR ("end_date" >= CURRENT_DATE)) THEN 'active'::"public"."season_state"
            ELSE 'completed'::"public"."season_state"
        END AS "state"
   FROM "public"."seasons";


ALTER VIEW "public"."seasons_with_state" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "subscription" json,
    "endpoint" "text" NOT NULL
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


ALTER TABLE "public"."subscriptions" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."subscriptions_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);



ALTER TABLE ONLY "public"."game_players"
    ADD CONSTRAINT "game_players_pkey" PRIMARY KEY ("game_id", "player_id");



ALTER TABLE ONLY "public"."games"
    ADD CONSTRAINT "games_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."players"
    ADD CONSTRAINT "players_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."seasons"
    ADD CONSTRAINT "seasons_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



CREATE OR REPLACE TRIGGER "game_notification" AFTER INSERT ON "public"."games" FOR EACH ROW EXECUTE FUNCTION "supabase_functions"."http_request"('https://tablesucker.vercel.app/api/send-notification', 'POST', '{"Content-type":"application/json"}', '{}', '1000');



ALTER TABLE ONLY "public"."game_players"
    ADD CONSTRAINT "game_players_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "public"."games"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."game_players"
    ADD CONSTRAINT "game_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "public"."players"("id");



ALTER TABLE ONLY "public"."games"
    ADD CONSTRAINT "games_season_id_fkey" FOREIGN KEY ("season_id") REFERENCES "public"."seasons"("id") ON DELETE CASCADE;



CREATE POLICY "Enable delete for authenticated users only" ON "public"."game_players" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Enable delete for authenticated users only" ON "public"."games" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Enable delete for authenticated users only" ON "public"."seasons" FOR DELETE TO "authenticated" USING (true);



CREATE POLICY "Enable insert for all users" ON "public"."game_players" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for all users" ON "public"."games" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for all users" ON "public"."players" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for all users" ON "public"."seasons" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable insert for all users" ON "public"."subscriptions" FOR INSERT WITH CHECK (true);



CREATE POLICY "Enable read access for all users" ON "public"."game_players" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."games" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."players" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."seasons" FOR SELECT USING (true);



CREATE POLICY "Enable read access for all users" ON "public"."subscriptions" FOR SELECT USING (true);



CREATE POLICY "Enable update for authenticated users only" ON "public"."game_players" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Enable update for authenticated users only" ON "public"."games" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Enable update for authenticated users only" ON "public"."players" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



CREATE POLICY "Enable update for authenticated users only" ON "public"."seasons" FOR UPDATE TO "authenticated" USING (true) WITH CHECK (true);



ALTER TABLE "public"."game_players" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."games" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."players" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."seasons" ENABLE ROW LEVEL SECURITY;


ALTER TABLE "public"."subscriptions" ENABLE ROW LEVEL SECURITY;




ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";






ALTER PUBLICATION "supabase_realtime" ADD TABLE ONLY "public"."games";



GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT USAGE ON SCHEMA "public" TO "postgres";












































































































































































































































































































GRANT ALL ON FUNCTION "public"."create_game"("p_season_id" integer, "p_team_red_score" integer, "p_team_blue_score" integer, "p_team_red_players" integer[], "p_team_blue_players" integer[]) TO "anon";
GRANT ALL ON FUNCTION "public"."create_game"("p_season_id" integer, "p_team_red_score" integer, "p_team_blue_score" integer, "p_team_red_players" integer[], "p_team_blue_players" integer[]) TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_game"("p_season_id" integer, "p_team_red_score" integer, "p_team_blue_score" integer, "p_team_red_players" integer[], "p_team_blue_players" integer[]) TO "service_role";



GRANT ALL ON FUNCTION "public"."update_game"("p_game_id" integer, "p_season_id" integer, "p_team_red_players" integer[], "p_team_red_score" integer, "p_team_blue_players" integer[], "p_team_blue_score" integer) TO "anon";
GRANT ALL ON FUNCTION "public"."update_game"("p_game_id" integer, "p_season_id" integer, "p_team_red_players" integer[], "p_team_red_score" integer, "p_team_blue_players" integer[], "p_team_blue_score" integer) TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_game"("p_game_id" integer, "p_season_id" integer, "p_team_red_players" integer[], "p_team_red_score" integer, "p_team_blue_players" integer[], "p_team_blue_score" integer) TO "service_role";






























GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."game_players" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."game_players" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."game_players" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."games" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."games" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."games" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."players" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."players" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."players" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."game_details" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."game_details" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."game_details" TO "service_role";



GRANT ALL ON SEQUENCE "public"."games_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."games_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."games_id_seq" TO "service_role";



GRANT ALL ON SEQUENCE "public"."players_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."players_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."players_id_seq" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."seasons" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."seasons" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."seasons" TO "service_role";



GRANT ALL ON SEQUENCE "public"."seasons_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."seasons_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."seasons_id_seq" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."seasons_with_state" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."seasons_with_state" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."seasons_with_state" TO "service_role";



GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."subscriptions" TO "anon";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."subscriptions" TO "authenticated";
GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLE "public"."subscriptions" TO "service_role";



GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."subscriptions_id_seq" TO "service_role";









ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO "service_role";































