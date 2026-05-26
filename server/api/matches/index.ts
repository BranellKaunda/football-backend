import { useDrizzle } from "~/server/utils/drizzle";
import { defineHandler } from "nitro";
import { getQuery } from "h3";

export default defineHandler(async (event) => {
  const query = getQuery(event);

  const OR = [
    query.teamId && { homeTeamId: query.teamId },
    query.teamId && { awayTeamId: query.teamId },
    query.date && { matchDate: query.date },
    query.competitionId && { competitionId: query.competitionId },
    query.status && { status: query.status },
  ].filter(Boolean);

  const results = await useDrizzle().query.matches.findMany({
    columns: {
      id: true,
      matchDate: true,
      status: true,
      homeTeamGoals: true,
      awayTeamGoals: true,
    },
    with: {
      homeTeam: true,
      awayTeam: true,
      competition: true,
      referee: true,
      players: {
        columns: { id: true, firstName: true, lastName: true, teamId: true },
      },
    },

    where: {
      OR: OR as any,
    },
  });

  return results;
});
