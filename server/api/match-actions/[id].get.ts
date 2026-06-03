import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const result = await useDrizzle().query.match_actions.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
    with: {
      player: {
        columns: { id: true, firstName: true, lastName: true, photo: true },
      },
      playerExtra: {
        columns: { id: true, firstName: true, lastName: true, photo: true },
      },
      team: {
        columns: { id: true, name: true, logo: true },
      },
      match: {
        columns: { id: true, matchDate: true, status: true, homeTeamGoals: true, awayTeamGoals: true },
      },
    },
  });

  return result;
});
