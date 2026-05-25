import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  date,
} from "drizzle-orm/pg-core";

export const matchStatusEnum = pgEnum("match_status", [
  "Scheduled",
  "Live",
  "Halftime",
  "Finished",
  "Postponed",
  "Cancelled",
  "Abandoned",
]);

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  location: text("location").notNull(),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  photo: text("photo").notNull(),
  dob: date("dob").notNull(),
  position: text("position").notNull(),
  weightKg: integer("weight_kg").notNull(),
  heightCm: integer("height_cm").notNull(),
});

export const leagues = pgTable("leagues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  season: text("season").notNull(),
  rank: integer("rank").notNull(),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  homeTeamId: integer("home_team_id")
    .notNull()
    .references(() => teams.id),
  awayTeamId: integer("away_team_id")
    .notNull()
    .references(() => teams.id),
  homeTeamGoals: integer("home_team_goals").default(0),
  awayTeamGoals: integer("away_team_goals").default(0),
  matchDate: date("match_date").notNull(),
  status: matchStatusEnum().notNull().default("Finished"),
  refereeId: integer("referee_id")
    .notNull()
    .references(() => referees.id),
  competitionId: integer("competition_id")
    .notNull()
    .references(() => leagues.id),
});

export const teamsXleagues = pgTable("teams_x_leagues", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  leagueId: integer("league_id")
    .notNull()
    .references(() => leagues.id),
});

export const referees = pgTable("referees", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dob: date("dob").notNull(),
  location: text("location").notNull(),
});

export const playersXmatches = pgTable("players_x_matches", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id),
  matchId: integer("match_id")
    .notNull()
    .references(() => matches.id),
});

export const playerRecords = pgTable("player_records", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id),
  goals: integer("goals").default(0),
  assists: integer("assists").default(0),
  yellowCards: integer("yellow_cards").default(0),
  redCards: integer("red_cards").default(0),
});
