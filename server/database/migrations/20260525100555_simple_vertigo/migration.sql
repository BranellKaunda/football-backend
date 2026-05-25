CREATE TYPE "match_status" AS ENUM('Scheduled', 'Live', 'Halftime', 'Finished', 'Postponed', 'Cancelled', 'Abandoned');--> statement-breakpoint
CREATE TABLE "leagues" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"season" text NOT NULL,
	"rank" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" serial PRIMARY KEY,
	"home_team_id" integer NOT NULL,
	"away_team_id" integer NOT NULL,
	"home_team_goals" integer DEFAULT 0,
	"away_team_goals" integer DEFAULT 0,
	"match_date" date NOT NULL,
	"status" "match_status" DEFAULT 'Finished'::"match_status" NOT NULL,
	"referee_id" integer NOT NULL,
	"competition_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player_records" (
	"id" serial PRIMARY KEY,
	"player_id" integer NOT NULL,
	"goals" integer DEFAULT 0,
	"assists" integer DEFAULT 0,
	"yellow_cards" integer DEFAULT 0,
	"red_cards" integer DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" serial PRIMARY KEY,
	"team_id" integer NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"photo" text NOT NULL,
	"dob" date NOT NULL,
	"position" text NOT NULL,
	"weight_kg" integer NOT NULL,
	"height_cm" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referees" (
	"id" serial PRIMARY KEY,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"dob" date NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams_x_leagues" (
	"id" serial PRIMARY KEY,
	"team_id" integer NOT NULL,
	"league_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_id_teams_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_id_teams_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_referee_id_referees_id_fkey" FOREIGN KEY ("referee_id") REFERENCES "referees"("id");--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_competition_id_leagues_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "leagues"("id");--> statement-breakpoint
ALTER TABLE "player_records" ADD CONSTRAINT "player_records_player_id_players_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id");--> statement-breakpoint
ALTER TABLE "players" ADD CONSTRAINT "players_team_id_teams_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "teams_x_leagues" ADD CONSTRAINT "teams_x_leagues_team_id_teams_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "teams_x_leagues" ADD CONSTRAINT "teams_x_leagues_league_id_leagues_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues"("id");