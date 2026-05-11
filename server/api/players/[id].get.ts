import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const result = await useDrizzle().query.players.findFirst({
    with: {
      team: true,
    },
    where: {
      id: Number(event.context.params!.id),
    },
  });

  return result;
});
