import { defineHandler } from "nitro";
import { useDrizzle } from "~/server/utils/drizzle";

export default defineHandler(async (event) => {
  const result = await useDrizzle().query.match_actions.findFirst({
    where: {
      id: Number(event.context.params!.id),
    },
  });

  return result;
});
