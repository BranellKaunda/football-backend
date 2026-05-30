import { defineHandler } from "h3";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const result = await useDrizzle().query.playersXmatches.findMany({
    columns: {},
    with: {
      player: {
        columns: { id: true, firstName: true, lastName: true, teamId: true },
      },
      match: true,
    },
  });

  return result;
});
