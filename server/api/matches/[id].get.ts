import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const results = await useDrizzle().query.matches.findFirst({
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
    },

    where: {
      id: Number(event.context.params!.id),
    },
  });

  return results;
});
