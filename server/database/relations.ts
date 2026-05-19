import { defineRelations } from "drizzle-orm";
import * as schema from "~/server/database/schema.ts";

export const relations = defineRelations(schema, (r) => ({
  matches: {
    homeTeam: r.one.teams({
      from: r.matches.homeTeamId,
      to: r.teams.id,
    }),
    awayTeam: r.one.teams({
      from: r.matches.awayTeamId,
      to: r.teams.id,
    }),
    competition: r.one.leagues({
      from: r.matches.competitionId,
      to: r.leagues.id,
    }),
    referee: r.one.referees({
      from: r.matches.refereeId,
      to: r.referees.id,
    }),
  },

  players: {
    team: r.one.teams({
      from: r.players.teamId,
      to: r.teams.id,
    }),
  },
}));
